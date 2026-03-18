<template>
  <div
    @click="$emit('click')"
    :class="[
      'food-card bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl',
      'focus-within:outline-2 focus-within:outline-primary-500 focus-within:outline-offset-2'
    ]"
  >
    <div
      class="food-image h-32 flex items-center justify-center text-6xl relative overflow-hidden"
      :style="{ backgroundColor: food.color }"
    >
      <span class="relative z-10">{{ food.emoji }}</span>
      <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
    </div>

    <div class="p-5">
      <h3 class="text-xl font-bold text-gray-800 mb-2">{{ food.name }}</h3>
      <p class="text-primary-500 font-semibold text-sm mb-3">{{ cityName }}</p>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ food.description }}</p>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in food.tags"
          :key="tag"
          class="px-3 py-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-medium rounded-full"
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
