<!-- Home.vue -->
<template>
     <div class="content">
        <div class="container clearfix">
            <div class="left-content leftfix">
                <div
                  v-for="(tab, index) in ['焦点','社区','景观','推广']"
                  :key="index"
                  @mouseenter="hoverIndex = index"
                >
                  {{ tab }}
                </div> 
            </div>

    <div class="center-content leftfix">
        <!-- 轮播图展示 -->
        <div class="carousel">
          <img :src="carouselImages[currentIndex].image" alt="carousel image" />
        </div>
      
      <!-- 悬浮层，绑定 mouseenter 和 mouseleave -->
      <div 
        class="hover-panel"
        v-show="hoverIndex !== -1"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false; hoverIndex = -1"
      >
        <ul class="hover-menu">
          <li
            v-for="(item, i) in tabs[hoverIndex]?.items || []"
            :key="i"
            @mouseenter="currentImage = item.image"
          >
            {{ item.text }}
          </li>
        </ul>
        <div class="hover-image">
          <img :src="currentImage" alt="预览图" />
        </div>
      </div>
    </div>




            
        </div>
     </div>
         <!-- 次要内容1 -->
      <div class="second-content">      
        <div class="container clearfix">
            <img class="leftfix" src="./img/17.jpg" alt="图片">
            <img class="leftfix" src="./img/18.jpg" alt="图片">
            <img class="leftfix" src="./img/19.jpg" alt="图片">
            <img class="leftfix" src="./img/20.jpg" alt="图片">
            <img class="leftfix" src="./img/21.jpg" alt="图片">
        </div>
      </div>
</template>

<script>
import TypeNav from './TypeNav/index.vue'  
import Map from '@/pages/Map/index.vue'

export default {
  name: 'Home',
  components: {
    TypeNav,
    Map
  },
  data() {
    return {
      hoverIndex: -1,
      currentImage: '',
      isHovering: false,
      carouselImages: [
        { image: require('./img/1.jpg') },
        { image: require('./img/2.jpg') },
        { image: require('./img/3.jpg') },
        { image: require('./img/4.jpg') }
      ],
      currentIndex: 0, 
      tabs: [
        {
          name: '焦点',
          items: [
            { text: '岗日嘎布山脉', image: require('./img/1.jpg') },
            { text: '火山爆发', image: require('./img/2.jpg') },
            { text: '青海“红河谷” ', image: require('./img/3.jpg') },
            { text: '山河四省', image: require('./img/4.jpg') }
          ]
        },
        {
          name: '社区',
          items: [
            { text: '社区推荐', image: require('./img/5.jpg') },
            { text: '风土人情', image: require('./img/6.jpg') },
            { text: '城市中国', image: require('./img/7.jpg') },
            { text: '乡村印象', image: require('./img/8.jpg') }
          ]
        },
        {
          name: '景观',
          items: [
            { text: '石林', image: require('./img/9.jpg') },
            { text: '丹霞', image: require('./img/10.jpg') },
            { text: '雅丹', image: require('./img/11.jpg') },
            { text: '喀斯特', image: require('./img/12.jpg') }
          ]
        },
        {
          name: '推广',
          items: [
            { text: '四川100个最美观景拍摄点', image: require('./img/13.jpg') },
            { text: '内蒙古100个最美观景拍摄点', image: require('./img/14.jpg') },
            { text: '西藏100个最美观景拍摄点', image: require('./img/15.jpg') },
            { text: '青海100个最美观景拍摄点', image: require('./img/16.jpg') }
          ]
        },
        
      ]
    };
  },
  watch: {
  hoverIndex(newIndex) {
    if (newIndex !== -1 && this.tabs[newIndex]?.items?.[0]) {
      this.currentImage = this.tabs[newIndex].items[0].image;
    }
  }
},
  mounted() {
    this.startCarousel();
  },
  beforeDestroy() {
    clearInterval(this.carouselTimer);
  },
  methods: {
    startCarousel() {
      this.carouselTimer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
      }, 3000); // 每3秒切换一次
    }
  }


}
</script>

<style  scoped>
.container{
    width: 1190px;
    margin: 0 auto;
}
*{
    padding: 0;
    margin: 0;
}
ul{
    list-style-type: none;
}
a:link {
    color: black;
}
a:visited {
    color: #666;
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
/* #region 主要内容 */

.content{
    margin-top: 10px;
}
.content .container .left-content{
    background-color: rgb(255, 222, 185);
    width: 200px;
    height: 458px;
    display: flex;
    flex-direction: column;
}

.content .container .left-content div{
  flex: 1; 
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  transition: background-color 0.3s, color 0.3s;
}
.content .container .left-content div:hover{
    background-color: rgb(255, 195, 121);
    color: white;
    cursor: pointer;
}

/* 中间 */
.hover-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* 确保完全覆盖 */
  height: 100%;
  background-color: white;
  z-index: 10;
  display: flex;
  border: 1px solid #ccc;
}

.hover-menu {
  width: 200px;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
  list-style: none;
}

.hover-menu li {
  padding: 20px;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.hover-menu li:hover {
  background-color: #eee;
}

.hover-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hover-image img {
  max-width: 100%;
  max-height: 100%;
}

.content .container .center-content{
   position: relative;
    width: 970px;
    height: 458px;
    margin: 0 10px;
}
.content .container .center-content img{
    width: 970px;
    height: 458px;
}


/* 轮播图 */
.carousel {
  width: 970px;
  height: 458px;
  overflow: hidden;
}
.carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


/* #endregion主要内容 */
/* #region次要内容1 */


.second-content .container img{
    width: 239px;
    height: 190px;
    margin-right: 11px;
    margin-top: 10px;

}
.second-content .container img:first-child{
    width: 190px;
    height: 190px;
}
.second-content .container img:last-child{
    margin-right: 0;
}

/* #endregion次要内容1 */

</style>
