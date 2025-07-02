<template>
  <div class="chat-container">
    <div class="chat-header">🌏 地理人文 AI 聊天室</div>

    <div class="chat-window" ref="chatWindow">
      <div v-for="(msg, index) in messages" :key="index" class="message">
        <div v-if="msg.role === 'user'" class="user-message">🙋 你：{{ msg.content }}</div>
        <div v-else class="ai-message">
          🤖 AI：<p v-html="formatText(msg.content)"></p>
          <img v-if="msg.image" :src="msg.image" class="ai-image" />
        </div>
      </div>
      <div v-if="loading" class="loading">AI 正在生成回答...</div>
    </div>

    <div class="location-input">
      <div class="location-buttons">
        <button @click="startLocationSelection" :disabled="isSelectingLocation">
          {{ isSelectingLocation ? '请在地图上点击选择位置' : '📍 获取地图周边' }}
        </button>
        <button 
          @click="clearLocationInfo" 
          class="clear-btn" 
          :disabled="!selectedPOIs.length && !selectedPOI"
          title="清除选择的位置信息"
        >
          🗑️ 清除位置
        </button>
      </div>
      <div class="location-display" v-if="selectedPOIs.length > 0">
        <div class="poi-item" v-for="(poi, index) in selectedPOIs" :key="index" @click="selectPOI(poi)">
          {{ poi.title }} ({{ poi.distance }}米)
        </div>
      </div>
      <input 
        v-else
        v-model="locationDisplayText" 
        placeholder="选择的位置将显示在这里" 
        readonly
        @click="useLocationInChat"
      />
    </div>

    <div class="chat-input">
      <input 
        v-model="userInput" 
        placeholder="请输入你想问的内容…" 
        @keyup.enter="sendMessage" 
      />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import axios from 'axios';
import { emitter, EVENTS } from '@/event-bus';

const userInput = ref('');
const messages = ref([]);
const loading = ref(false);
const isSelectingLocation = ref(false);
const selectedPOIs = ref([]);
const selectedPOI = ref(null);
const chatWindow = ref(null);

const locationDisplayText = computed(() => {
  return selectedPOI.value 
    ? `${selectedPOI.value.title} (${selectedPOI.value.distance}米)`
    : selectedPOIs.value.length > 0
      ? '请点击上方选择具体位置'
      : '';
});

const formatText = (text) => {
  return text.replace(/\n/g, '<br>');
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatWindow.value) {
      chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
    }
  });
};

const startLocationSelection = () => {
  isSelectingLocation.value = true;
  selectedPOIs.value = [];
  selectedPOI.value = null;
  emitter.emit(EVENTS.START_LOCATION_SELECTION);
  scrollToBottom();
};

const clearLocationInfo = () => {
  selectedPOIs.value = [];
  selectedPOI.value = null;
  emitter.emit(EVENTS.CLEAR_MAP_MARKERS);
};

const handleLocationSelected = (pois) => {
  selectedPOIs.value = pois;
  isSelectingLocation.value = false;
  scrollToBottom();
};

const selectPOI = (poi) => {
  selectedPOI.value = poi;
  scrollToBottom();
};

const useLocationInChat = () => {
  if (selectedPOI.value) {
    userInput.value = `关于${selectedPOI.value.title}(${selectedPOI.value.address})，`;
  } else if (selectedPOIs.value.length > 0) {
    userInput.value = `关于${selectedPOIs.value[0].title}(${selectedPOIs.value[0].address})，`;
  }
};

const sendMessage = async () => {
  const input = userInput.value.trim();
  if (!input) return;

  messages.value.push({ role: 'user', content: input });
  userInput.value = '';
  loading.value = true;
  scrollToBottom();

  try {
    const res = await axios.post('http://localhost:5000/api/learn', { 
      user_input: input,
      location: selectedPOI.value 
        ? `${selectedPOI.value.title}, ${selectedPOI.value.address}`
        : selectedPOIs.value.length > 0
          ? `${selectedPOIs.value[0].title}, ${selectedPOIs.value[0].address}`
          : null
    });
    
    messages.value.push({
      role: 'ai',
      content: res.data.content,
      image: res.data.image?.[0] || null
    });
  } catch (err) {
    console.error('请求出错:', err);
    messages.value.push({
      role: 'ai',
      content: '❌ 出现错误，无法获取 AI 回复。'
    });
  } finally {
    loading.value = false;
    scrollToBottom();
  }
};

onMounted(() => {
  emitter.on(EVENTS.LOCATION_SELECTED, handleLocationSelected);
  scrollToBottom();
});

onUnmounted(() => {
  emitter.off(EVENTS.LOCATION_SELECTED, handleLocationSelected);
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
}

.chat-header {
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 18px;
}

.chat-window {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.message {
  margin-bottom: 15px;
}

.user-message {
  text-align: right;
  color: #333;
  background-color: #e3f2fd;
  padding: 10px;
  border-radius: 10px 10px 0 10px;
  margin-left: 20%;
}

.ai-message {
  text-align: left;
  color: #333;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 10px 10px 10px 0;
  margin-right: 20%;
}

.ai-image {
  max-width: 100%;
  margin-top: 10px;
  border-radius: 5px;
}

.loading {
  padding: 10px;
  text-align: center;
  color: #666;
  font-style: italic;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.location-input {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  gap: 10px;
}

.location-buttons {
  display: flex;
  gap: 10px;
}

.location-input button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  flex: 1;
}

.location-input button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.clear-btn {
  background-color: #f44336;
  color: white;
}

.location-input input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.location-display {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.poi-item {
  padding: 8px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.poi-item:hover {
  background-color: #e3f2fd;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

.chat-input button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>