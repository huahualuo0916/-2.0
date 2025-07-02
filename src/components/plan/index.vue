<template>
  <div class="route-container">
    <div class="controls">
      <input v-model="start" placeholder="请输入起点" />
      <input v-model="end" placeholder="请输入终点" />
      <select v-model="routeType">
        <option value="driving">驾车</option>
        <option value="walking">步行</option>
        <option value="transit">公交</option>
      </select>
      <button @click="planRoute">开始规划</button>
    </div>

    <div class="info" v-if="routeInfo">
      <p>总距离：{{ routeInfo.distance }}</p>
      <p>预估时间：{{ routeInfo.duration }}</p>
    </div>

    <div id="map" class="map"></div>
  </div>
</template>

<script>
export default {
  name: 'RoutePlanner',
  data() {
    return {
      map: null,
      start: '',
      end: '',
      routeType: 'driving',
      routeInfo: null,
    }
  },
  mounted() {
    this.map = new BMap.Map('map') // 使用 BMap（非 GL）
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 13)
    this.map.enableScrollWheelZoom(true)
  },
  methods: {
    planRoute() {
      if (!this.start || !this.end) {
        alert('请输入起点和终点')
        return
      }

      this.map.clearOverlays()
      this.routeInfo = null

      const renderOptions = {
        map: this.map,
        autoViewport: true,
      }

      const opts = {
        renderOptions,
        onSearchComplete: (res) => {
          if (res.getNumPlans && res.getNumPlans() > 0) {
            const plan = res.getPlan(0)
            this.routeInfo = {
              distance: plan.getDistance(true),
              duration: plan.getDuration(true),
            }
          } else if (res.getNumRoutes && res.getNumRoutes() > 0) {
            const route = res.getRoute(0)
            this.routeInfo = {
              distance: route.getDistance(true),
              duration: route.getDuration(true),
            }
          } else {
            alert('未找到合适的路线')
          }
        },
      }

      if (this.routeType === 'driving') {
        const driving = new BMap.DrivingRoute(this.map, opts)
        driving.search(this.start, this.end)
      } else if (this.routeType === 'walking') {
        const walking = new BMap.WalkingRoute(this.map, opts)
        walking.search(this.start, this.end)
      } else if (this.routeType === 'transit') {
        const transit = new BMap.TransitRoute(this.map, opts)
        transit.search(this.start, this.end)
      }
    },
  },
}
</script>

<style scoped>
.route-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.controls {
  padding: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
input, select, button {
  padding: 6px;
}
.map {
  flex: 1;
  height: 600px;
}
.info {
  padding: 10px;
  font-size: 14px;
}
</style>
