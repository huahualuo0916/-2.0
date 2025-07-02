<template>
  <div class="container">
    <div id="map"></div>
    <div class="chatbox">
      <ChatBox />
    </div>
  </div>
</template>

<script>
import { onMounted, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import ChatBox from '@/components/ChatBox/index.vue';
import { emitter, EVENTS } from '@/event-bus';

export default {
  name: 'MapComponent',
  components: { ChatBox },
  setup() {
    const route = useRoute();
    let mapInstance = null;
    let geoc = null;
    let localSearch = null;
    let locationSelectHandler = null;

    const updateMap = () => {
      const provinceName = route.query.name || '北京';
      if (mapInstance) {
        mapInstance.centerAndZoom(provinceName, 8);
      }
    };

    const initMap = () => {
      try {
        mapInstance = new BMapGL.Map('map');
        geoc = new BMapGL.Geocoder();
        localSearch = new BMapGL.LocalSearch(mapInstance, {
          renderOptions: { map: mapInstance, panel: null },
          pageCapacity: 5,
        });

        // 添加控件
        mapInstance.addControl(new BMapGL.ZoomControl());
        mapInstance.addControl(new BMapGL.ScaleControl());
        mapInstance.addControl(new BMapGL.NavigationControl3D());
        mapInstance.addControl(new BMapGL.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        }));

        updateMap();
        mapInstance.enableScrollWheelZoom(true);
      } catch (error) {
        console.error('地图初始化失败:', error);
      }
    };

    const searchNearbyPOIs = (point) => {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          localSearch.setSearchCompleteCallback(null);
          reject(new Error('搜索超时'));
        }, 5000);

        localSearch.setSearchCompleteCallback((results) => {
          clearTimeout(timeout);
          if (results?.getNumPois() > 0) {
            const pois = [];
            for (let i = 0; i < results.getNumPois(); i++) {
              pois.push(results.getPoi(i));
            }
            pois.sort((a, b) => a.distance - b.distance);
            resolve(pois.slice(0, 3).map(poi => ({
              title: poi.title,
              address: poi.address,
              distance: poi.distance
            })));
          } else {
            geoc.getLocation(point, (rs) => {
              const addComp = rs.addressComponents;
              resolve([{
                title: "当前位置",
                address: `${addComp.street} ${addComp.streetNumber}`,
                distance: 0
              }]);
            });
          }
        });

        localSearch.searchNearby("景点,公园,博物馆,名胜古迹,旅游区,风景区", point, 500);
      });
    };

    const setupLocationSelection = () => {
      emitter.on(EVENTS.START_LOCATION_SELECTION, () => {
        if (locationSelectHandler) {
          mapInstance.removeEventListener('click', locationSelectHandler);
        }
        
        locationSelectHandler = async function(e) {
          const pt = e.latlng;
          mapInstance.clearOverlays();
          const marker = new BMapGL.Marker(pt);
          mapInstance.addOverlay(marker);
          
          try {
            const pois = await searchNearbyPOIs(pt);
            emitter.emit(EVENTS.LOCATION_SELECTED, pois);
          } catch (error) {
            console.error('位置搜索失败:', error);
          }
          
          mapInstance.removeEventListener('click', locationSelectHandler);
          locationSelectHandler = null;
        };
        
        mapInstance.addEventListener('click', locationSelectHandler);
      });
    };

    const clearMapMarkers = () => {
      if (mapInstance) {
        mapInstance.clearOverlays();
      }
    };

    onMounted(() => {
      initMap();
      setupLocationSelection();
      emitter.on(EVENTS.CLEAR_MAP_MARKERS, clearMapMarkers);
    });

    onUnmounted(() => {
      emitter.off(EVENTS.START_LOCATION_SELECTION);
      emitter.off(EVENTS.CLEAR_MAP_MARKERS);
      if (locationSelectHandler) {
        mapInstance?.removeEventListener('click', locationSelectHandler);
      }
      if (localSearch) {
        localSearch.clearResults();
      }
    });

    watch(() => route.fullPath, updateMap);

    return {};
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 1190px;
  height: 80vh;
  margin: 0 auto;
  padding: 20px;
}

#map {
  width: 55%;
  height: 100%;
}

.chatbox {
  width: 40%;
  height: 76vh;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    width: 100%;
    height: auto;
  }
  
  #map, .chatbox {
    width: 100%;
    height: 50vh;
  }
}
</style>