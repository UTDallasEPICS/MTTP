<template>
    <PageHeader v-if="loggedIn" :userRole="userRole"/>
    <NuxtPage ></NuxtPage>
</template>


<script setup lang="ts">

import { authClient } from "~~/lib/auth-client";

const route = useRoute();
const { data: session } = await authClient.useSession(useFetch);
const loggedIn = computed(() => !!session.value);
const userRole = computed(() => session.value?.user?.role);

if (!import.meta.server && !loggedIn.value && route.path !== "/login") {
  navigateTo("/login");
}

</script>
