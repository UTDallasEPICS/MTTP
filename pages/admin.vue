<template>
    <PageHeader/>
    <div class = "container">
        <h1>Users</h1>
        
         

        <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <span>
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                          First Name
                      </label>
                      <input v-model="user.firstName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
                    </span>

                    <span>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Last Name
                    </label>
                    <input v-model="user.lastName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Doe">
                    </span>

                    <span>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Email
                    </label>
                    <input v-model="user.email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="abc@123.com">
                    </span>

                    <span>
                    <label for="roles" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a role</label>
                    <select v-model="user.role" id="roles">
                        <option disabled value="">Please select role</option>
                        <option value=1>volunteer</option>
                        <option value=2>employee</option>
                        <option value=3>admin</option>
                        <option value=4>other</option>
                    </select>
                    </span>

                    <span>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            @click.prevent="addUser(user)">
                        Add User
                    </button>
                    </span>
                  </div>
                
            </div>
        </form>

    <div class="relative overflow-x-auto">
      <table class = "w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          <td>{{ u.firstName }}</td>
          <td>{{ u.lastName }}</td>
          <td>{{ u.email }}</td>

          <!--
              role displays string based on int value
          -->
          <td v-if="u.role == 4">ex-employee</td>
          <td v-else-if="u.role == 1">volunteer</td>
          <td v-else-if="u.role == 2">employee</td>
          <td v-else-if="u.role == 3">admin</td>

          <td>
            <!-- Modal toggle -->
            <button @click.prevent="showModal=true">Edit</button>
          </td>

        </tr>
        </tbody>
      </table>
    
    </div>

    <div class="save-btn">
      <button class="modalbutton" @click.prevent="showModal = true">Show Modal</button>
    </div>

    <SavedModal v-show="showModal" @close-modal="showModal = false" />
  </div>
 
</template>

<script setup>

import SavedModal from '~/components/SavedModal.vue'



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

import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
//import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const open = ref(true)

</script>