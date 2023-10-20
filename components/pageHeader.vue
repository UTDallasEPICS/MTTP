<!-- components/PageHeader.vue -->
<template>
  <header class="page-header">
    <div class="logo">
      <nuxt-link to="/">Your Logo</nuxt-link>
    </div>
    <nav class="navigation">
      <nuxt-link to="/about">About</nuxt-link>
      <nuxt-link to="/contact">Contact</nuxt-link>
    </nav>
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
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}

.logo {
  font-size: 24px;
}

.navigation a {
  color: #fff;
  margin-left: 20px;
}
</style>
