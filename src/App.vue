<template>
  <div class="container">
    <header class="text-center py-12 no-print">
      <h1 class="text-5xl font-bold text-white mb-4 drop-shadow-lg">🍜 中国城市美食导航</h1>
      <p class="text-xl text-white/90">探索中国八大城市的地道美食</p>
    </header>

    <nav class="bg-white/95 backdrop-blur-md rounded-2xl p-4 mb-8 shadow-lg no-print">
      <div class="flex flex-wrap justify-center gap-3">
        <button
          v-for="city in cities"
          :key="city.id"
          @click="selectCity(city.id)"
          :class="[
            'px-5 py-2.5 rounded-full font-semibold transition-all duration-300 border-2',
            currentCity === city.id
              ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/30'
              : 'bg-white border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white hover:-translate-y-0.5'
          ]"
          :aria-selected="currentCity === city.id"
          :aria-label="city.name"
        >
          {{ city.name }}
        </button>
      </div>
    </nav>

    <main class="pb-16">
      <!-- 控制栏 -->
      <div class="bg-white/95 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg no-print">
        <div class="flex flex-wrap gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="🔍 搜索美食名称、描述或标签..."
            class="flex-1 min-w-[250px] px-5 py-3 border-2 border-gray-200 rounded-full text-lg transition-all duration-300 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20"
          />
          <select
            v-model="sortBy"
            class="px-5 py-3 border-2 border-gray-200 rounded-full text-lg bg-white cursor-pointer transition-all duration-300 focus:outline-none focus:border-primary-500"
          >
            <option value="city">按城市</option>
            <option value="name">按名称</option>
            <option value="tags">按标签数量</option>
          </select>
        </div>
      </div>

      <!-- 美食网格 -->
      <div v-if="filteredFoods.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-2xl font-semibold text-white mb-2">未找到匹配的美食</h3>
        <p class="text-white/80">请尝试其他搜索关键词</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <FoodCard
          v-for="(food, index) in filteredFoods"
          :key="food.id"
          :food="food"
          :city-name="cityMap[food.city]"
          :index="index"
          @click="openModal(food)"
        />
      </div>
    </main>

    <!-- 食物详情模态框 -->
    <FoodModal
      :food="selectedFood"
      :city-name="cityMap[selectedFood?.city]"
      :is-open="isModalOpen"
      @close="closeModal"
    />

    <footer class="text-center py-8 text-white/80 no-print">
      <p>🍜 中国城市美食导航 &copy; {{ currentYear }}</p>
      <p>探索中华美食文化</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import FoodCard from './components/FoodCard.vue'
import FoodModal from './components/FoodModal.vue'
import { foodData, cityMap, cities } from './data.js'

// 状态
const currentCity = ref('all')
const searchQuery = ref('')
const sortBy = ref('city')
const isModalOpen = ref(false)
const selectedFood = ref(null)
const currentYear = new Date().getFullYear()

// 筛选和排序
const filteredFoods = computed(() => {
  let result = [...foodData]

  // 按城市筛选
  if (currentCity.value !== 'all') {
    result = result.filter(food => food.city === currentCity.value)
  }

  // 搜索
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(food =>
      food.name.toLowerCase().includes(query) ||
      food.description.toLowerCase().includes(query) ||
      food.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 排序
  switch (sortBy.value) {
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
      break
    case 'tags':
      result.sort((a, b) => b.tags.length - a.tags.length)
      break
    case 'city':
    default:
      result.sort((a, b) => a.city.localeCompare(b.city))
      break
  }

  return result
})

// 方法
const selectCity = (cityId) => {
  currentCity.value = cityId
  window.history.pushState({}, '', `?city=${cityId}`)
}

const openModal = (food) => {
  selectedFood.value = food
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
}

const closeModal = () => {
  isModalOpen.value = false
  selectedFood.value = null
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.width = ''
}

// 键盘事件
const handleKeydown = (e) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

// 初始化
onMounted(() => {
  // 从 URL 恢复筛选状态
  const urlParams = new URLSearchParams(window.location.search)
  const city = urlParams.get('city')
  if (city && cities.includes(city)) {
    currentCity.value = city
  }

  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
