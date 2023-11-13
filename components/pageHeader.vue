<template>
  <header class="page-header">
    <div class="left">
      <nuxt-link to="/">
        <img src="~/../src/assets/mttp_logo-transparent.png" alt="Your Logo" />
      </nuxt-link>
    </div>
    <div class="right">
      <nuxt-link to="/entry">Enter Info</nuxt-link>
      <nuxt-link to="/database">View Database</nuxt-link>
      <nuxt-link to="/admin">Admin</nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff; /* Set the background to white */
  color: #333; /* Set the text color to dark */
  padding: 20px 20px;
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
