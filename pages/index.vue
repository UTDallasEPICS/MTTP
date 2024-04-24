<template>
  <div>
    <!--The header tab that acts as navigation throughout the website
        Takes in the current user's role to only display links to pages
          they have access to-->
        <h1 style = "text-align: center; font-size: 30px; font-weight: bold; margin-top: 80px; color:#122C4f">Welcome, {{ name }}</h1>
        <img src="..\src\assets\March-to-the-Polls.png" style="display:block; margin: 40px auto 0; height:150px; width:400px"/>
        <h1 style="text-align: center; font-size: 45px; margin-top: 20px; color:#122C4F">USER PORTAL</h1>

  </div>
</template>

<script setup>

import {ref} from 'vue'
const cvuser = useCookie('cvuser')
const name = cvuser.value.firstName
console.log(name)
</script>
