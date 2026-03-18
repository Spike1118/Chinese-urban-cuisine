<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <!-- 遮罩层 -->
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        @click="$emit('close')"
      ></div>

      <!-- 模态框内容 -->
      <div
        class="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-transform duration-300"
        @click.stop
      >
        <!-- 关闭按钮 -->
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl transition-colors z-10"
          aria-label="关闭"
        >
          &times;
        </button>

        <!-- 模态框头部 -->
        <div class="text-center py-8 px-6">
          <div
            class="modal-food-image w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg"
            :style="{
              background: `linear-gradient(135deg, ${food?.color}, ${adjustColor(food?.color, -30)})`
            }"
          >
            {{ food?.emoji }}
          </div>
          <h2 id="modalTitle" class="text-3xl font-bold text-gray-800 mb-2">{{ food?.name }}</h2>
        </div>

        <!-- 模态框主体 -->
        <div class="px-8 pb-8 space-y-6">
          <!-- 简介 -->
          <div class="info-section">
            <h3 class="section-title text-lg font-semibold text-primary-500 mb-2">简介</h3>
            <p class="modal-description text-gray-600 leading-relaxed">{{ food?.description }}</p>
          </div>

          <!-- 产地 -->
          <div class="info-section">
            <h3 class="section-title text-lg font-semibold text-primary-500 mb-2">产地</h3>
            <p class="modal-city text-gray-800 font-medium">{{ cityName }}</p>
          </div>

          <!-- 特点 -->
          <div class="info-section">
            <h3 class="section-title text-lg font-semibold text-primary-500 mb-2">特点</h3>
            <div class="modal-tags flex flex-wrap gap-2">
              <span
                v-for="tag in food?.tags"
                :key="tag"
                class="px-3 py-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- 详细介绍 -->
          <div class="info-section">
            <h3 class="section-title text-lg font-semibold text-primary-500 mb-2">详细介绍</h3>
            <p class="modal-detail text-gray-600 leading-relaxed whitespace-pre-line">{{ food?.detail }}</p>
          </div>

          <!-- 推荐店铺 -->
          <div class="info-section">
            <h3 class="section-title text-lg font-semibold text-primary-500 mb-2">推荐店铺</h3>
            <ul class="modal-shops space-y-2">
              <li
                v-for="(shop, index) in food?.shops"
                :key="index"
                class="flex items-center gap-2 text-gray-700"
              >
                <span class="w-2 h-2 rounded-full bg-primary-500"></span>
                {{ shop }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  food: {
    type: Object,
    default: null
  },
  cityName: {
    type: String,
    default: ''
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

// 调整颜色亮度
const adjustColor = (color, amount) => {
  const hex = color.replace('#', '')
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount))
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount))
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
</script>

<style scoped>
.info-section {
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-section:last-child {
  border-bottom: none;
}

.section-title {
  color: #ea580c;
}

.modal-description,
.modal-detail {
  line-height: 1.8;
}

.modal-city {
  font-size: 1.1rem;
}

.modal-tags .tag {
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.modal-shops li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  color: #374151;
}

.modal-shops li:last-child {
  border-bottom: none;
}

.modal-food-image {
  background: linear-gradient(135deg, #f97316, #ea580c);
}
</style>
