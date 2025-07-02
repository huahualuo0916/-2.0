<template>
  <div class="footer">
        <div class="container">
            <div class="footer-top clearfix">
                <div class="top1 leftfix">
                    <ul>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                    </ul>
                </div>
                <div class="top2 leftfix">
                    <ul>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        
                    </ul>
                </div>
                <div class="top3 leftfix">
                    <ul>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                    </ul>
                </div>
                <div class="top4 leftfix">
                    <ul>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                    </ul>
                </div>
                <div class="top5 leftfix">
                    <ul>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                    </ul>
                </div>
                <div class="top6 leftfix">
                    <ul>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">关于我们</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-middle"></div>
            <div class="footer-bottom">
                <div class="footer-bottom-list">
                    <ul class="clearfix">
                        <li class="leftfix"><a href="#">关于我们1</a></li>
                        <li class="leftfix"><a href="#">关于我们2</a></li>
                        <li class="leftfix"><a href="#">关于我们3</a></li>
                        <li class="leftfix"><a href="#">关于我们4</a></li>
                        <li class="leftfix"><a href="#">关于我们5</a></li>
                        <li class="leftfix"><a href="#">关于我们6</a></li>
                    </ul>
                </div>
                <div class="banquan">版权号DJDYSDB22382838237</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

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

/* #region页脚 */
.footer{
    background-color: gray;
    margin-top: 50px;
    height: 400px;
    text-align: center;
}
.footer-top div{
    width: 190px;
    height: 176px;
    margin-top: 40px;
    margin-bottom: 22px;
    margin-right: 10px;
    font-size: 14px;
}
.footer-top div:last-child{
    margin-right: 0;
}
.footer-top div ul li{
    margin: 4px;
}
.footer-top div ul li a{
    color: white;
}
.footer-middle{
    width: 1190px;
    border-bottom: 1px solid black;  
}
.footer-bottom-list{
    display: inline-block;
    margin: 0 auto;
    margin-top: 40px;
}
.footer-bottom-list ul li a{
    color: white;
    padding: 0 20px;
    border-right: 1px solid white;
    font-size: 14px;
}
.footer-bottom-list ul li:first-child a{
    padding-left: 0;
}
.footer-bottom-list ul li:last-child a{
    padding-right: 0;
    border-right: 0;
}
.banquan{
    margin-top: 40px;
    color: white;
    font-size: 14px;
}

/* #endregion页脚 */

</style>