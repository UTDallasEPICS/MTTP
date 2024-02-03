<template>
    <NuxtPage ></NuxtPage>
</template>


<script setup lang="ts">

const runtime = useRuntimeConfig()
const router = useRouter()
const routes = ref(router.getRoutes())
const route = useRoute()
const cvCookie = useCookie('cvtoken')
const cvuser = useCookie('cvuser')


if(!cvCookie.value)
{
    await navigateTo('/api/login')
}

</script>