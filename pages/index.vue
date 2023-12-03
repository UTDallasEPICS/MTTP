<template>
  <div>
    <PageHeader :userRole="userRole"/>
    <h2>home page</h2>
  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue'

//const props = defineProps(['userRole'])
const userRole = ref(2)
//console.log(props.userRole)
//const perms = ref(props.userRole)


import PageHeader from "~/components/pageHeader.vue";
</script>