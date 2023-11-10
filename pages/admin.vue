<template>
    <PageHeader/>
    <div class = "mb-20 content-center">
      <div class = "container content-center" id="form">

      
        <h2 class="text-center text-2xl font-bold mt-4">Admin Page</h2>
        <h3 class="text-center text-xl font-bold">Modify volunteer and MTTP employee/admin info, and their permissions</h3>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-96">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-lg font-medium leading-6 text-gray-900">First name</label>
            <div class="mt-2">
              <input v-model="user.firstName" type="text" name="first-name" id="first-name" autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-lg font-medium leading-6 text-gray-900">Last name</label>
            <div class="mt-2">
              <input v-model="user.lastName" type="text" name="last-name" id="last-name" autocomplete="family-name"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="email" class="block text-lg font-medium leading-6 text-gray-900">Email</label>
            <div class="mt-2">
              <input v-model="user.email" type="text" name="email" id="email" autocomplete="email" class="block w-full
              rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="role" class="block text-lg font-medium leading-6 text-gray-900">Role</label>
            <div class="mt-2">
              <select v-model="user.role" class="block w-full bg-gray-200 text-gray-700 border rounded-md py-2 px-3
              mb-3 leading-tight focus:outline-none focus:bg-white">
                <option disabled value="">Please select role</option>
                <option value="1">volunteer</option>
                <option value="2">employee</option>
                <option value="3">admin</option>
                <option value="4">other</option>
              </select>
            </div>
          </div>
          
          <div class="flex items-center justify-end sm:col-span-6">
            <label for="file-upload">Import:</label>
            <input type="file" id="file-upload" name="file-upload" accept=".xlsx">

            <button type="button" class="text-lg font-semibold leading-6 text-gray-900 mr-3" @click="clearForm">Clear</button>
            <button type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600" @click.prevent="addUser(user)">Submit User</button>
          </div>
        </div>
      </div>

      <div id="table" class="mt-4 mx-96 table-auto">
        <div class="relative overflow-x-auto rounded-lg">
          <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400 border-solid border-2 ">
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
            <tr v-for="(u) in users">
                <th scope="row">{{ u.userId }}</th>

                <!-- Display first name -->
                <td v-if="!editButtonPressed">{{ u.firstName }}</td>
                <td v-else>
                  <div v-if="u.userId != editedUser.userId">{{ u.firstName }}</div>
                  <input v-else type="text" v-model="editedUser.firstName" style="text-align: center; width: 100%;">
                </td>

                <!-- display last name -->
                <td v-if="!editButtonPressed">{{ u.lastName }}</td>
                <td v-else>
                  <div v-if="u.userId != editedUser.userId">{{ u.lastName }}</div>
                  <input v-else type="text" v-model="editedUser.lastName" style="text-align: center; width: 100%;">
                </td>

                <!-- display email-->
                <td v-if="!editButtonPressed">{{ u.email }}</td>
                <td v-else>
                  <div v-if="u.userId != editedUser.userId">{{ u.email }}</div>
                  <input v-else type="text" v-model="editedUser.email" style="text-align: center; width: 100%;">
                </td>

                <!--
                    role displays string based on int value
                -->
                <div v-if="!editButtonPressed" style="text-align: center; width: 100%;">
                  <td v-if="u.role == 4">ex-employee</td>
                  <td v-else-if="u.role == 1">volunteer</td>
                  <td v-else-if="u.role == 2">employee</td>
                  <td v-else-if="u.role == 3">admin</td>
                </div>
                <div v-else style="text-align: center; width: 100%;">
                  <div v-if="u.userId != editedUser.userId" >
                    <td v-if="u.role == 4">ex-employee</td>
                    <td v-else-if="u.role == 1">volunteer</td>
                    <td v-else-if="u.role == 2">employee</td>
                    <td v-else-if="u.role == 3">admin</td>
                  </div>
                  <td v-else>
                    <select v-model="editedUser.role">
                            <option value=1>volunteer</option>
                            <option value=2>employee</option>
                            <option value=3>admin</option>
                            <option value=4>ex-employee</option>
                        </select>
                  </td>
                </div>

              <td>
                
                <button id="editUserButton" class="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600" v-if="!editButtonPressed" @click="{editedUser.userId = u.userId; 
                                                    editedUser.firstName = u.firstName; 
                                                    editedUser.lastName = u.lastName;
                                                    editedUser.email = u.email;
                                                    editedUser.role = u.role;
                                                    editButtonPressed = true;}">Edit</button>
                <div v-else>
                  <div v-if="editedUser.userId == u.userId">
                    <button id="applyEditButton" class="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600" @click="{editButtonPressed = false;
                                                          editUser(editedUser);}">Apply</button>
                    <button id="cancelEditButton" class="rounded-md bg-gray-600 px-3 py-2 text-xs font-semibold text-white shadow-sm
            hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600" @click="editButtonPressed = false">Cancel</button>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        
        </div>
    </div>
  
 
</template>

<script setup>

const showName = ref(true)
const editButtonPressed = ref(false)
const editIndex = ref(0)

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

 function myFunction() {
  showName = !showName
}

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

import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
//import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const open = ref(true)

</script>