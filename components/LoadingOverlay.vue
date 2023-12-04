<!-- LoadingOverlay.vue -->

<template>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loader"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watchEffect } from 'vue';
  
  const props = defineProps(['isLoading']);
  
  const isVisible = ref(false);
  
  watchEffect(() => {
    isVisible.value = props.isLoading;
  });
  
  onMounted(() => {
    // Hide the overlay after a delay (adjust as needed)
    setTimeout(() => {
      isVisible.value = false;
    }, 3000);
  });
  </script>
  
  <style scoped>
  /* Add your overlay styling here */
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  