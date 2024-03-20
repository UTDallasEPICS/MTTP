<template>
    <PageHeader :userRole="userRole"/>
    <NuxtPage ></NuxtPage>
</template>


<script setup lang="ts">

const runtime = useRuntimeConfig()
const router = useRouter()
const routes = ref(router.getRoutes())
const route = useRoute()
const cvCookie = useCookie('cvtoken')
const cvuser = useCookie('cvuser')


const userRole = computed(() => (cvuser.value.role));

if(!cvCookie.value)
{
  navigateTo('/api/login')
}

</script>