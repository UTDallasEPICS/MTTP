<template>
    <div>
      <PageHeader :userRole="userRole" />
      <h2>database page</h2>

      <button @click="{}">Export</button>

    </div>
  </template>
  
<script setup lang="ts">
    import {ref} from 'vue'
    import PageHeader from "~/components/pageHeader.vue";
    const userRole = ref(2)



</script>