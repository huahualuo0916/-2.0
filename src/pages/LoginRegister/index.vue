<template>
  <div class="container">
    <div class="auth-wrapper">
        <!-- 左侧轮播图区域 -->
        <div class="auth-banner">
        <div class="slide" v-for="(img, i) in images" :key="i" :class="{ active: i === currentIndex }">
            <img :src="img" alt="banner image" />
        </div>
        </div>

        <!-- 右侧登录/注册表单区域 -->
        <div class="auth-form">
        <h2>{{ isLogin ? '登录' : '注册' }}</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
            <input v-model="username" placeholder="用户名" required />
            </div>
            <div class="form-group">
            <input v-model="password" type="password" placeholder="密码" required />
            </div>
            <p class="error" v-if="error">{{ error }}</p>
            <button type="submit">{{ isLogin ? '登录' : '注册' }}</button>
            <p class="switch">
            {{ isLogin ? '还没有账号？' : '已有账号？' }}
            <router-link :to="isLogin ? '/register' : '/login'">
                {{ isLogin ? '去注册' : '去登录' }}
            </router-link>
            </p>
        </form>
        </div>


        <!-- 弹窗及遮幕 -->
        <transition name="modal-fade">
        <div v-if="showModal" class="modal-overlay">
            <div class="custom-modal" :class="modalClass">
            <p>{{ modalMessage }}</p>
            <button class="modal-btn" @click="closeModal">确定</button>
            </div>
        </div>
        </transition>


    </div>
  </div>
</template>

<script>
export default {
  name: "LoginRegister",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      currentIndex: 0,
      images: [
        require("@/assets/loginpicture/img1.jpg"),
        require("@/assets/loginpicture/img2.jpg"),
        require("@/assets/loginpicture/img3.jpg"),
        require("@/assets/loginpicture/img4.jpg"),
        require("@/assets/loginpicture/img5.jpg")
      ],
      showModal: false,
      modalMessage: "",
      modalClass: "",
      shouldRedirectAfterModal: false,
    };
  },
  computed: {
    isLogin() {
      return this.$route.path === "/login";
    },
  },
  methods: {
    handleSubmit() {
      if (this.isLogin) {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user || user.username !== this.username || user.password !== this.password) {
          this.error = "用户名或密码错误";
          this.showModalWithMessage("登录失败，用户名或密码错误", "error");
        } else {
          this.showModalWithMessage("登录成功！", "success", true);
        }
      } else {
        sessionStorage.setItem("user", JSON.stringify({
          username: this.username,
          password: this.password,
        }));
        this.showModalWithMessage("注册成功！", "success");
        this.$router.push("/login");
      }
    },
    startSlider() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 3000);
    },
    showModalWithMessage(message, type, shouldRedirect = false) {
      this.modalMessage = message;
      this.modalClass = type === "success" ? "modal-success" : "modal-error";
      this.showModal = true;
      this.shouldRedirectAfterModal = shouldRedirect;
    },
    closeModal() {
      this.showModal = false;
      if (this.shouldRedirectAfterModal) {
        this.shouldRedirectAfterModal = false;
        this.$router.push("/");
      }
      this.username = "";
      this.password = "";
      this.error = "";
    },
  },
  mounted() {
    this.startSlider();
  },
};
</script>

<style scoped>
.container{
    width: 1190px;
    margin: 0 auto;
}
.auth-wrapper {
  display: flex;
  height: 70vh;
  font-family: 'Arial', sans-serif;
}

.auth-banner {
  flex: 1.5;
  position: relative;
  overflow: hidden;
}

.slide {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.slide.active {
  opacity: 1;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.auth-form {
  flex: 1;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fefefe;
  box-shadow: -5px 0 15px rgba(0,0,0,0.05);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 30px;
  font-family: '微雅软黑';
}

.form-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #409eff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #66b1ff;
}

.error {
  color: red;
  text-align: center;
  margin-bottom: 10px;
}

.switch {
  text-align: center;
  margin-top: 15px;
}

/* 弹窗样式 */
.custom-modal {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
  z-index: 9999;
  text-align: center;
  font-size: 18px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* 半透明黑幕 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
}


.modal-success {
  background-color: #e1f7e7;
  color: #1a8c43;
}

.modal-error {
  background-color: #fde4e1;
  color: #c0392b;
}

.modal-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.modal-btn:hover {
  background-color: #66b1ff;
}
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}

</style>
