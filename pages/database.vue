<template>
    <div class="mt-4 mx-96">
      <div class="relative overflow-x-auto rounded-lg">
        <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">#</th>
            <th scope="col" class="px-6 py-3">First Name</th>
            <th scope="col" class="px-6 py-3">Last Name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Role</th>
            <th scope="col" class="px-6 py-3">Edit</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(u) in users" :key="u.userId">
            <th scope="row">{{ u.userId }}</th>
            <td>{{ u.firstName }}</td>
            <td>{{ u.lastName }}</td>
            <td>{{ u.email }}</td>
            <td>
              <span v-if="u.role === 4">ex-employee</span>
              <span v-else-if="u.role === 1">volunteer</span>
              <span v-else-if="u.role === 2">employee</span>
              <span v-else-if="u.role === 3">admin</span>
            </td>
            <td>
              <button @click="openModal">Edit</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  
  import Modal from "../src/components/Modal.vue";
  import { ref } from "vue";
  
  const isModalVisible = ref(false);
  
  function openModal() {
    isModalVisible.value = true;
  }
  
  function closeModal() {
    isModalVisible.value = false;
  }
  
  
  
  const users = ref(null)
  const user = ref({
    firstName: null,
    lastName: null,
    email: null,
    role: null,
  })
  const editedUser = ref({
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
    role: null,
  })
  const clearForm = () => {
    user.value.firstName = null;
    user.value.lastName = null;
    user.value.email = null;
    user.value.role = null;
  };
  
  users.value = await getUsers()
  
  
  
  /**
   *   @desc get users
   */
  async function getUsers() {
    return await $fetch('/api/user')
  }
  
  /**
   *   @desc add users
   @param fn firstName of the user
   @param ln lastName of the user
   @param em email of the user
   @param rl role of the user
   */
  async function addUser(user) {
  
    let addedUser = null
  
    if(user)
      addedUser = await $fetch('/api/user', {
        method: 'POST',
        body: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: parseInt(user.role),
        }
      })
  
    if(addedUser)
      users.value = await getUsers()
  }
  
  
  /**
   *   @desc edit users
   @param fn firstName of the user
   @param ln lastName of the user
   @param em email of the user
   @param rl role of the user
   */
  async function editUser(editedUser) {
    let user = null
  
    console.log('editedUser: ', editedUser)
  
    if(editedUser)
      user = await $fetch('/api/user', {
        method: 'PUT',
        body: {
          userId: parseInt(editedUser.userId),
          firstName: editedUser.firstName,
          lastName: editedUser.lastName,
          email: editedUser.email,
          role: parseInt(editedUser.role),
        }
      })
  
    if(user)   users.value = await getUsers()
  }
  
  import PageHeader from "~/components/pageHeader.vue";
  
  </script>
