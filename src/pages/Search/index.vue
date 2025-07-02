<template>
  <div class="chat-container">
    <div class="chat-header">🌏 地理人文 AI 聊天室</div>

    <div class="chat-window">
      <div v-for="(msg, index) in messages" :key="index" class="message">
        <div v-if="msg.role === 'user'" class="user-message">🙋 你：{{ msg.content }}</div>
        <div v-else class="ai-message">
          🤖 AI：<p v-html="formatText(msg.content)"></p>
          <img v-if="msg.image" :src="msg.image" class="ai-image" />
        </div>
      </div>
      <div v-if="loading" class="loading">AI 正在生成回答...</div>
    </div>

    <div class="chat-input">
      <input v-model="userInput" placeholder="请输入你想问的内容…" @keyup.enter="sendMessage" />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const userInput = ref('')
const messages = ref([])
const loading = ref(false)

const formatText = (text) => {
  return text.replace(/\n/g, '<br>')
}

const sendMessage = async () => {
  const input = userInput.value.trim()
  if (!input) return

  // 添加用户消息
  messages.value.push({ role: 'user', content: input })
  userInput.value = ''
  loading.value = true

  try {
    // 发起请求，将用户输入传给后端 /api/learn
    const res = await axios.post('http://localhost:5000/api/learn', { user_input: input })
    const { content, image } = res.data

    // 添加 AI 回答
    messages.value.push({
      role: 'ai',
      content,
      image: image?.[0] || null
    })
  } catch (err) {
    console.error('请求出错:', err)
    messages.value.push({
      role: 'ai',
      content: '❌ 出现错误，无法获取 AI 回复。'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.chat-container {
  max-width: 680px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  background: #fafafa;
}
.chat-header {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
}
.chat-window {
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 12px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 8px;
}
.message {
  margin-bottom: 14px;
}
.user-message {
  text-align: right;
  color: #333;
  background: #e0f7fa;
  padding: 8px;
  border-radius: 8px;
  display: inline-block;
  max-width: 80%;
}
.ai-message {
  text-align: left;
  background: #f3f4ff;
  padding: 8px;
  border-radius: 8px;
  display: inline-block;
  max-width: 80%;
}
.chat-input {
  display: flex;
  gap: 10px;
}
.chat-input input {
  flex: 1;
  padding: 10px;
}
.chat-input button {
  padding: 10px 16px;
}
.ai-image {
  max-width: 100%;
  margin-top: 10px;
  border-radius: 6px;
}
.loading {
  font-style: italic;
  color: #888;
}
</style>
