<template>
  <div class="app-container">
    <div class="container">
      <button id="getQuestion" @click="getQuestion">请求问题</button>
      <div id="question-box">{{ currentQuestion }}</div>
      <div class="button-group">
        <button 
          v-for="option in ['A', 'B', 'C', 'D']" 
          :key="option"
          class="option-btn"
          :class="{ selected: selectedAnswer === option }"
          @click="selectAnswer(option)"
        >
          {{ option }}
        </button>
      </div>
      <button 
        id="submitBtn" 
        @click="submitAnswer"
        :disabled="!selectedAnswer || !currentQuestion"
      >
        发送答案
      </button>
      <div id="result" :class="resultClass">{{ resultMessage }}</div>
      <div class="status-text">{{ statusText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InteractiveQuiz',
  data() {
    return {
      currentQuestion: null,
      selectedAnswer: null,
      resultMessage: '',
      resultClass: '',
      statusText: ''
    }
  },
  methods: {
    async getQuestion() {
      try {
        this.updateStatus('正在获取题目...')
        const response = await fetch('http://localhost:5000/api/giveques', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) throw new Error('获取题目失败')
        
        const data = await response.json()
        this.currentQuestion = data.question
        this.resetUI()
        this.updateStatus('请选择答案后提交')
      } catch (error) {
        this.showResult(`错误: ${error.message}`, 'wrong')
        this.updateStatus('')
      }
    },
    
    selectAnswer(option) {
      if (!this.currentQuestion) return
      this.selectedAnswer = option
    },
    
    async submitAnswer() {
      try {
        if (!this.selectedAnswer || !this.currentQuestion) return
        
        this.updateStatus('正在验证答案...')
        const response = await fetch('http://localhost:5000/api/answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ answer: this.selectedAnswer })
        })

        if (!response.ok) throw new Error('提交失败')
        
        const data = await response.json()
        this.showResult(data.answer)
        this.updateStatus('')
      } catch (error) {
        this.showResult(`提交错误: ${error.message}`, 'wrong')
        this.updateStatus('')
      }
    },
    
    showResult(message, type = '') {
      this.resultMessage = message
      this.resultClass = type
      // 可以在这里添加动画逻辑
    },
    
    resetUI() {
      this.selectedAnswer = null
      this.resultMessage = ''
      this.resultClass = ''
    },
    
    updateStatus(text) {
      this.statusText = text
    }
  }
}
</script>

<style scoped>
.app-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 800px;
  margin: 2rem auto;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 2rem;
}

#question-box {
  min-height: 80px;
  padding: 1.5rem;
  margin: 1rem 0;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease;
}

.button-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
}

#getQuestion {
  background: #4a90e2;
  color: white;
  width: 100%;
}

.option-btn {
  background: #e9ecef;
  color: #495057;
}

.option-btn.selected {
  background: #4a90e2;
  color: white;
  transform: scale(1.02);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

#submitBtn {
  background: #00c853;
  color: white;
  width: 100%;
}

#submitBtn:disabled {
  background: #c0c0c0;
  cursor: not-allowed;
}

#result {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
}

.correct {
  background: #d4edda;
  color: #155724;
}

.wrong {
  background: #f8d7da;
  color: #721c24;
}

.response-message {
  background: #e9ecef;
  color: #495057;
}

.status-text {
  color: #6c757d;
  font-style: italic;
  text-align: center;
  margin: 1rem 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>