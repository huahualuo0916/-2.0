<template>
  <div class="app-container">
    <div class="input-group">
      <button @click="loadData">随机学习一个地点</button>
      <input
        type="text"
        v-model="locationInput"
        placeholder="输入地名进行搜索"
        @keyup.enter="searchLocation"
      />
      <button @click="searchLocation">搜索地点</button>
    </div>
    <div v-if="loading" class="loading">加载中...</div>
    <div class="container">
      <div v-if="content" class="content-section" v-html="processedContent"></div>
      <div v-if="images.length > 0" class="gallery">
        <div v-for="(url, index) in images" :key="index" class="gallery-item">
          <img :src="url" alt="内容图片" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicContent',
  data() {
    return {
      loading: false,
      locationInput: '',
      content: '',
      images: []
    }
  },
  computed: {
    processedContent() {
      if (!this.content) return ''
      return this.content
        .split('\n\n')
        .map(paragraph => {
          if (paragraph.startsWith('关键词：') || paragraph.startsWith('名称由来：')) {
            return `<h3>${paragraph.replace(/：/g, '</h3><p>')}</p>`
          }
          return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`
        })
        .join('')
    }
  },
  methods: {
    async loadData() {
      try {
        this.loading = true
        this.content = ''
        this.images = []

        const response = await fetch('http://localhost:5000/api/learn2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) throw new Error(`HTTP错误 ${response.status}`)
        const data = await response.json()
        this.content = data.content
        this.images = data.image || []
      } catch (error) {
        console.error('加载失败:', error)
        this.content = `<div class="error">加载失败: ${error.message}</div>`
      } finally {
        this.loading = false
      }
    },
    async searchLocation() {
      if (!this.locationInput.trim()) {
        alert('请输入要查询的地名')
        return
      }

      try {
        this.loading = true
        this.content = ''
        this.images = []

        const response = await fetch('http://localhost:5000/api/learn1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer: this.locationInput.trim() })
        })

        if (!response.ok) throw new Error(`HTTP错误 ${response.status}`)
        const data = await response.json()
        this.content = data.content
        this.images = data.image || []
      } catch (error) {
        console.error('加载失败:', error)
        this.content = `<div class="error">加载失败: ${error.message}</div>`
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  font-family: '系统默认', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin-top: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.input-group {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

input[type="text"] {
  padding: 15px 20px;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  font-size: 16px;
  flex: 1;
  max-width: 400px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
}

input[type="text"]:focus {
  border-color: #4dabf7;
  box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.2);
  outline: none;
}

button {
  background: linear-gradient(135deg, #4dabf7 0%, #228be6 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #228be6 0%, #1c7ed6 100%);
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
  grid-auto-rows: 1fr;
}

.gallery img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fff;
}

.gallery-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  min-height: 250px;
  max-height: 400px;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.loading {
  text-align: center;
  padding: 25px;
  font-size: 18px;
  color: #495057;
  font-weight: 500;
  letter-spacing: 1px;
}

.content-section {
  line-height: 1.8;
  color: #343a40;
  margin-bottom: 30px;
  font-size: 16px;
}

.content-section h3 {
  color: #1c7ed6;
  margin: 25px 0 15px;
  font-size: 20px;
  font-weight: 600;
}

.content-section p {
  margin-bottom: 15px;
  padding-left: 20px;
  border-left: 3px solid #4dabf7;
}

.error {
  color: #e03131;
  padding: 20px;
  background: #fff5f5;
  border-radius: 8px;
  border-left: 4px solid #ff6b6b;
}
</style>