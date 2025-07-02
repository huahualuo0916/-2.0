<template>
  <!-- 顶部导航条 -->
  <div class="topbar">
        <!-- 版心 -->
         <div class="container clearfix">
            <!-- 左边区域 -->
             <div class="left leftfix clearfix">
                <div class="leftfix" id="welcome">
                    <router-link to="/home">首页</router-link>
                </div>
                <div class="leftfix" id="please">
                    <span id="please-inner">请</span>
                </div>
                <div class="leftfix" id="log">
                    <router-link to="/login">登录</router-link>
                </div>
                <div class="leftfix" id="regis">
                    <router-link to="/register">免费注册</router-link>
                </div>
             </div>
             <!-- 右边区域 -->
              <div class="rightfix right clearfix">
                <div class="leftfix"><a href="#" >写点什么</a></div>
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
    <!-- 头部 -->
     <div class="header">
        <div class="container  clearfix">
            <div class="logo leftfix">
                <router-link to="/home">
                    <img src="./images/logo.png" alt="logo">
                </router-link> 
            </div>
            <div class="title leftfix">宝宝看天下</div>
            <div class="search rightfix">
                <form action="#">
                    <input type="text">
                    <button @click="gosearch">确认</button>
                </form>
            </div>
        </div>
     </div>
</template>

<script>
export default {
    name:'',
    methods:{
        gosearch(){
            this.$router.push('/home/search')
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

/* #region 顶部导航条 */
.topbar{
    height: 30px;
    line-height: 30px;
    background-color: #ececec;
}
.topbar .container .left{
    font-size: 12px;
}
#welcome{
    padding-right: 10px;
}
#please #please-inner{
    padding-left: 10px;
    border-left: 1px black solid;
}
#log a{
    padding-right: 10px;
    border-right: 1px black solid;
}
#regis{
    padding-left: 10px;
}
.right{
    font-size: 12px;
    height: 30px;
    line-height: 30px;
}
.right a{
    padding: 0 10px;
    border-left: 1px black solid;
}
.right div:first-child a{
    padding-left: 0;
    border-left: 0;
}
.right div:last-child a{
    padding-right: 0;
}
/* #endregion 顶部导航条end */
/* #region头部 */
.header{
    height: 120px;
}
.header .container .logo{
    height: 120px;
}
.header .container .logo img{
    width: 150px;
    height: 120px;
}
.header .container .title{
    font-size: 40px;
    line-height: 120px;
    height: 120px;
    margin-left: 120px;
    color: #013b8d;
}

.header .container .search form{
    font-size: 0px;
    margin-top: 42px;
}

.header .container .search input{
    width: 508px;
    height: 34px;
    padding: 0;
    border: 1px solid #1677ff;
}
.header .container .search button{
    width: 80px;
    height: 36px;
    border: 0;
    color: white;
    background-color:#1677ff;
    vertical-align: top;
}
.header .container .search button:hover{
    background-color: #4096ff;
}
.header .container .search button:active{
    background-color: #4096ff;
}
/* #endregion头部end */
</style>