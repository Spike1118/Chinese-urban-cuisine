<template>
  <div
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
    @keydown.space.prevent="$emit('click')"
    :class="[
      'food-card bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl',
      'focus-within:outline-2 focus-within:outline-primary-500 focus-within:outline-offset-2 focus:outline-none'
    ]"
    :style="{ animationDelay: `${index * 50}ms` }"
    tabindex="0"
    role="button"
    :aria-label="'查看详情：' + food.name + '，来自' + cityName"
  >
    <div
      class="food-image h-32 flex items-center justify-center text-6xl relative overflow-hidden"
      :style="{ backgroundColor: food.color }"
      aria-hidden="true"
    >
      <span class="relative z-10">{{ food.emoji }}</span>
      <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
    </div>

    <div class="p-5">
      <h3 class="text-xl font-bold text-gray-800 mb-2">{{ food.name }}</h3>
      <p class="text-primary-500 font-semibold text-sm mb-3">{{ cityName }}</p>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ food.description }}</p>

      <div class="flex flex-wrap gap-2" role="list" aria-label="标签列表">
        <span
          v-for="tag in food.tags"
          :key="tag"
          class="px-3 py-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-medium rounded-full"
          role="listitem"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  food: {
    type: Object,
    required: true
  },
  cityName: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

defineEmits(['click'])
</script>

<style scoped>
.food-card {
  animation: fadeInUp 0.4s ease-out forwards;
  opacity: 0;
}

.food-card:hover .food-image {
  transform: scale(1.05);
}

.food-image {
  transition: transform 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
