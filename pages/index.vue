<template>
  <div>
    <PageHeader :userRole="userRole"/>
    <h2>home page</h2>
  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue'


const userRole = ref(2)



import PageHeader from "~/components/pageHeader.vue";
</script>
