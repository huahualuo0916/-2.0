import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'


//引入地图组件
import Vue3baiduMapGl from 'vue3-baidu-map-gl';


const app = createApp(App)


app.use(router)  // 注册路由


app.use(Vue3baiduMapGl, { 
    ak: 'SbqTyUJrHcEM0sgLsi5vTFfym4EATCSV' 
  });



// 挂载
app.mount('#app')