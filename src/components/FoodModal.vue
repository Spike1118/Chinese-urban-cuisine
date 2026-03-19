<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      @keydown.escape="$emit('close')"
    >
      <!-- 遮罩层 -->
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        @click="$emit('close')"
        aria-hidden="true"
      ></div>

      <!-- 模态框内容 -->
      <div
        ref="modalContent"
        class="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-transform duration-300"
        @click.stop
        role="document"
        tabindex="-1"
      >
        <!-- 关闭按钮 -->
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="关闭弹窗"
        >
          &times;
        </button>

        <!-- 模态框头部 -->
        <div class="text-center py-8 px-6">
          <div
            class="modal-food-image w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg"
            :style="{
              background: `linear-gradient(135deg, ${food?.color}, ${adjustedColor})`
            }"
            role="img"
            :aria-label="food?.name + '的图标'"
          >
            {{ food?.emoji }}
          </div>
          <h2 id="modalTitle" class="text-3xl font-bold text-gray-800 mb-2">{{ food?.name }}</h2>
          <p class="text-gray-500">{{ cityName }}</p>
        </div>

        <!-- 模态框主体 -->
        <div class="px-8 pb-8 space-y-6">
          <!-- 简介 -->
          <section aria-labelledby="desc-heading">
            <h3 id="desc-heading" class="section-title text-lg font-semibold text-primary-500 mb-2">简介</h3>
            <p class="modal-description text-gray-600 leading-relaxed">{{ food?.description }}</p>
          </section>

          <!-- 特点 -->
          <section aria-labelledby="tags-heading">
            <h3 id="tags-heading" class="section-title text-lg font-semibold text-primary-500 mb-2">特点</h3>
            <div class="modal-tags flex flex-wrap gap-2" role="list">
              <span
                v-for="tag in food?.tags"
                :key="tag"
                class="px-3 py-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-full"
                role="listitem"
              >
                {{ tag }}
              </span>
            </div>
          </section>

          <!-- 详细介绍 -->
          <section aria-labelledby="detail-heading">
            <h3 id="detail-heading" class="section-title text-lg font-semibold text-primary-500 mb-2">详细介绍</h3>
            <p class="modal-detail text-gray-600 leading-relaxed whitespace-pre-line">{{ food?.detail }}</p>
          </section>

          <!-- 推荐店铺 -->
          <section aria-labelledby="shops-heading">
            <h3 id="shops-heading" class="section-title text-lg font-semibold text-primary-500 mb-2">推荐店铺</h3>
            <ul class="modal-shops space-y-2" aria-label="推荐店铺列表">
              <li
                v-for="(shop, index) in food?.shops"
                :key="index"
                class="flex items-center gap-2 text-gray-700"
              >
                <span class="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" aria-hidden="true"></span>
                {{ shop }}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { adjustColor } from '../utils.js'

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

const modalContent = ref(null)
const previousFocusElement = ref(null)

// 使用工具函数计算调整后的颜色
const adjustedColor = computed(() => {
  return adjustColor(props.food?.color, -30)
})

// 监听模态框打开，保存焦点位置并聚焦到模态框
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      previousFocusElement.value = document.activeElement
      // 下一帧聚焦到模态框内容
      requestAnimationFrame(() => {
        modalContent.value?.focus()
      })
    } else {
      // 关闭时恢复焦点
      previousFocusElement.value?.focus()
    }
  }
)

// 防止模态框打开时背景滚动
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)
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
</style>
