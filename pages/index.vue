<template>
  <div>
    <!--The header tab that acts as navigation throughout the website
        Takes in the current user's role to only display links to pages
          they have access to-->
    <PageHeader :userRole="userRole"/>
    <h2>Hello</h2>
  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue'


const cvuser = useCookie('cvuser')
const userRole = parseInt(cvuser.value.role)
console.log(cvuser)



import PageHeader from "~/components/pageHeader.vue";
</script>
