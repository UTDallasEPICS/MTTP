<template>
  <header class="page-header">
    <div class="left">
      <nuxt-link to="/">
         <img src="~/../src/assets/figmaLogoSmallTransparent.png" alt="Your Logo" /> 
      </nuxt-link>
    </div>
    <div class="right">
      <nuxt-link v-if="userRole <= 3" to="/entry" >Student Entry</nuxt-link>
      <nuxt-link to="/database" v-if="userRole <= 3">View Students</nuxt-link>
      <nuxt-link to="/admin" v-if="userRole == 3" >Admin</nuxt-link>
      <a href="/api/logout">Logout</a>
    </div>
  </header>
</template>

<script setup>
  const props = defineProps(['userRole']);
</script>


<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #889FCB; /* Set the background to white */
  color: #333; /* Set the text color to dark */
  padding: 10px 20px;
}

.left {
  display: flex;
  align-items: center;
}

.left img {
  width: auto; /* Adjust the image size as needed */
  height: 60px;
}

.right a {
  color: #333; /* Set button text color to dark */
  margin-left: 20px;
  text-decoration: none;
}
</style>
