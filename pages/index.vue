<template>
  <div>
    <!--The header tab that acts as navigation throughout the website
        Takes in the current user's role to only display links to pages
          they have access to-->
    <PageHeader :userRole="userRole"/>
    <h2>home page</h2>
  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue'


const userId = ref(1)
const userRole = ref(3)



import PageHeader from "~/components/pageHeader.vue";
</script>
