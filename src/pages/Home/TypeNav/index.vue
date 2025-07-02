<template>
  <!-- 主导航条 -->
  <div class="main-nav">
        <div class="container clearfix">
            <div class="types leftfix">
                <div class="region-nav">
                    <!-- 触发按钮 -->
                    <div 
                      class="trigger"
                      @mouseenter="showPanel(true)"
                      @mouseleave="scheduleHide()"
                    >
                      <span>全部行政区分类</span>
                      <i class="arrow"></i>
                    </div>
                
                    <!-- 导航面板 -->
                    <transition name="nav-panel">
                      <div 
                        v-show="isVisible"
                        class="panel"
                        @mouseenter="cancelHide()"
                        @mouseleave="scheduleHide()"
                      >
                        <!-- 四列省份列表 -->
                        <div class="province-list">
                          <div 
                            v-for="province in provinces"
                            :key="province.id"
                            class="province-item"
                            @mouseenter="setActiveProvince(province)"
                            @click="navigateToProvince(province)" 
                            :class="{ active: activeProvince?.id === province.id }"
                          >
                            {{ province.name }}
                          </div>
                        </div>
                    
                        <!-- 地图预览 -->
                        <div class="map-preview">
                          <template v-if="activeProvince">
                            <img 
                              :src="getMapImage(activeProvince.map)"
                              :alt="activeProvince.name"
                              class="map-image"
                            >
                            <div class="info">
                              <h3>{{ activeProvince.name }}</h3>
                              <p>{{ activeProvince.type }}</p>
                            </div>
                          </template>
                          <div v-else class="placeholder">
                                选择省份
                          </div>
                        </div>
                      </div>
                    </transition>
                </div>
            </div>
            <div class="list leftfix clearfix">
                <div class="leftfix"><router-link to="/home/examine">知识问答</router-link></div>
                <div class="leftfix"><router-link to="/home/learn">learn</router-link></div>
                <div class="leftfix"><router-link to="/home/plan">路线规划</router-link></div>
                <div class="leftfix"><a href="#" >写点什么</a></div>
                <div class="leftfix"><a href="#" >写点什么</a></div>
                <div class="leftfix"><a href="#" >写点什么</a></div>
                <div class="leftfix"><a href="#" >写点什么</a></div>
                <div class="leftfix"><a href="#" >写点什么</a></div>
                <div class="leftfix"><a href="#" >写点什么</a></div>
                <div class="leftfix"><a href="#" >写点什么</a></div>
            </div>
        </div>
    </div>
    
        
    
</template>


<script>
export default {
    name:"TypeNav",
  data() {
    return {
      isVisible: false,
      activeProvince: null,
      hideTimer: null,
      provinces: [
        // 直辖市
        { id: 1, name: '北京市', map: 'beijing', type: '直辖市' },
        { id: 2, name: '天津市', map: 'tianjin', type: '直辖市' },
        { id: 3, name: '上海市', map: 'shanghai', type: '直辖市' },
        { id: 4, name: '重庆市', map: 'chongqing', type: '直辖市' },
        
        // 省份
        { id: 5, name: '河北省', map: 'hebei', type: '省' },
        { id: 6, name: '山西省', map: 'shanxi', type: '省' },
        { id: 7, name: '辽宁省', map: 'liaoning', type: '省' },
        { id: 8, name: '吉林省', map: 'jilin', type: '省' },
        { id: 9, name: '黑龙江省', map: 'heilongjiang', type: '省' },
        { id: 10, name: '江苏省', map: 'jiangsu', type: '省' },
        { id: 11, name: '浙江省', map: 'zhejiang', type: '省' },
        { id: 12, name: '安徽省', map: 'anhui', type: '省' },
        { id: 13, name: '福建省', map: 'fujian', type: '省' },
        { id: 14, name: '江西省', map: 'jiangxi', type: '省' },
        { id: 15, name: '山东省', map: 'shandong', type: '省' },
        { id: 16, name: '河南省', map: 'henan', type: '省' },
        { id: 17, name: '湖北省', map: 'hubei', type: '省' },
        { id: 18, name: '湖南省', map: 'hunan', type: '省' },
        { id: 19, name: '广东省', map: 'guangdong', type: '省' },
        { id: 20, name: '海南省', map: 'hainan', type: '省' },
        { id: 21, name: '四川省', map: 'sichuan', type: '省' },
        { id: 22, name: '贵州省', map: 'guizhou', type: '省' },
        { id: 23, name: '云南省', map: 'yunnan', type: '省' },
        { id: 24, name: '陕西省', map: 'shanxi1', type: '省' },
        { id: 25, name: '甘肃省', map: 'gansu', type: '省' },
        { id: 26, name: '青海省', map: 'qinghai', type: '省' },
        { id: 27, name: '台湾省', map: 'taiwan', type: '省' },
        
        // 自治区
        { id: 28, name: '内蒙古自治区', map: 'neimenggu', type: '自治区' },
        { id: 29, name: '广西壮族自治区', map: 'guangxi', type: '自治区' },
        { id: 30, name: '西藏自治区', map: 'xizang', type: '自治区' },
        { id: 31, name: '宁夏回族自治区', map: 'ningxia', type: '自治区' },
        { id: 32, name: '新疆维吾尔自治区', map: 'xinjiang', type: '自治区' },
        
        // 特别行政区
        { id: 33, name: '香港特别行政区', map: 'xianggang', type: '特别行政区' },
        { id: 34, name: '澳门特别行政区', map: 'aomen', type: '特别行政区' }
      ]
    }
  },
  methods: {
    getMapImage(mapName) {
      
      try {
        return require('@/assets/maps/'+ mapName + '.jpg')
      } catch {
        return require('@/assets/maps/default.jpg')
      }
    },
    showPanel(immediate = false) {
      clearTimeout(this.hideTimer)
      if (immediate) {
        this.isVisible = true
      } else {
        setTimeout(() => {
          if (!this.isVisible) this.isVisible = true
        }, 150)
      }
    },
    scheduleHide() {
      this.hideTimer = setTimeout(() => {
        this.isVisible = false
        this.activeProvince = null
      }, 200)
    },
    cancelHide() {
      clearTimeout(this.hideTimer)
    },
    setActiveProvince(province) {
      this.activeProvince = province
      this.cancelHide()
    },


    
    navigateToProvince(province) {
      this.$router.push({
        path: `/home/${province.map}`,
        query: { 
          name: province.name,
          type: province.type 
        }
      });
        this.isVisible = false;
        this.activeProvince = null;
    }
  }
}
</script>



<style scoped>
/* 版心 */
.container{
    width: 1190px;
    margin: 0 auto;
}

ul{
    list-style-type: none;
}
a:link {
    color: black;
}
a:visited {
    color: black;
}
a:hover {
    color: green;
}
a:active {
    color: orange;
}
a{
    text-decoration: none;
}
/* 浮动 */
.clearfix::after{
    content: '';
    display: block;
    clear: both;
}
.leftfix{
    float: left;
}
.rightfix{
    float: right;
}

.region-nav {
  position: relative;
  display: inline-block;
  font-family: "Microsoft YaHei", sans-serif;
}

.main-nav{
    height: 48px;
    border-bottom: 1px solid #0078d4;
}

.main-nav .container .list{
    line-height: 48px;
}
.main-nav .container .list a{
    padding: 0 10px;
    font-size: 16px;
}

/* 触发按钮 */
.trigger {
  padding: 12px 24px;
  background: #1677ff;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: background 0.2s;
}
.trigger:hover {
  background: #4096ff;
}
.trigger span {
  font-size: 16px;
  font-weight: 500;
}
.arrow {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 8px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid white;
  transition: transform 0.2s;
}
.is-visible .arrow {
  transform: rotate(180deg);
}

/* 导航面板 */
.panel {
  position: absolute;
  top: 100%;
  left: 0;
  width: 1200px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  margin-top: 8px;
  z-index: 1000;
}

/* 四列省份列表 */
.province-list {
  width: 600px;
  height: 500px;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.province-item {
  padding: 10px 12px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  min-width: 120px; 
  white-space: nowrap;
}
.province-item:hover,
.province-item.active {
  background: #e6f4ff;
  color: #1677ff;
}

/* 地图预览区 */
.map-preview {
  width: 500px;
  padding: 20px;
  border-left: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  margin: auto;
}
.map-image {
  width: 500px;
  height: 500px;
  object-fit: cover;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.info {
  margin-top: 16px;
}
.info h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}
.info p {
  margin: 4px 0 0;
  font-size: 14px;
  color: #666;
}
.placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}

/* 过渡动画 */
.nav-panel-enter-active,
.nav-panel-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: top center;
}
.nav-panel-enter-from,
.nav-panel-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

</style>

