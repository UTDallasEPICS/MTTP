<template>
  <header class="page-header">
    <div class="left">
      <nuxt-link to="/">
         <img src="..\src\assets\OutlinedLogo.png" alt="Your Logo" /> 
      </nuxt-link>
    </div>
    <div class="right flex">
      <div class="right">
        <nuxt-link v-if="userRole === 'staff' || userRole === 'admin'" to="/entry" >Student Entry</nuxt-link>
        <nuxt-link to="/database" v-if="userRole === 'staff' || userRole === 'admin'">View Students</nuxt-link>
        <nuxt-link to="/admin" v-if="userRole === 'admin'" >Admin</nuxt-link>
      </div>
      <a class="right" href="/api/logout">Logout</a>
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
  background-color: #122C4F; /* Set the background to blue */
  color: #ffffff; /* Set the text color to white */
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
  color: #ffff; /* Set button text color to dark */
  margin-left: 20px;
  text-decoration: none;
}
</style>
