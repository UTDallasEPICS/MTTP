<template>
  <PageHeader/>
  <head>
    <link rel="stylesheet" href="~/src/assets/fonts.css">
  </head>
    <div class = "container">
        <h1>Users</h1>
        <h3>Add Volunteers, MTTP admin and employees, and adjust their permissions.</h3>
        <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block text-sm font-bold text-gray-700 mb-2" for="first-name">
                    First Name
                  </label>
                  <input
                      v-model="user.firstName"
                      class="input-style"
                      id="first-name"
                      type="text"
                      placeholder="Jane"
                  >

                  <!-- Last Name Input -->
                  <label class="block text-sm font-bold text-gray-700 mt-4 mb-2" for="last-name">
                    Last Name
                  </label>
                  <input
                      v-model="user.lastName"
                      class="input-style"
                      id="last-name"
                      type="text"
                      placeholder="Doe"
                  >

                  <!-- Email Input -->
                  <label class="block text-sm font-bold text-gray-700 mt-4 mb-2" for="email">
                    Email
                  </label>
                  <input
                      v-model="user.email"
                      class="input-style"
                      id="email"
                      type="text"
                      placeholder="abc@123.com"
                  >

                  <label class="block text-sm font-bold text-gray-700 mt-4 mb-2" for="role">
                    Role
                  </label>
                    <select v-model="user.role">
                        <option disabled value="">Please select role</option>
                        <option value=1>volunteer</option>
                        <option value=2>employee</option>
                        <option value=3>admin</option>
                        <option value=4>other</option>
                    </select>
                    
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            @click.prevent="addUser(user)">
                        Add User
                    </button>
                </div>
                
            </div>
        </form>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              #
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              First Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Last Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Email
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Role
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Edit
            </th>
          </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(u, index) in users" :key="u.userId">
            <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ u.firstName }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ u.lastName }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ u.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <!-- role displays string based on int value -->
              <span
                  v-if="u.role === 4"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
              >
            ex-employee
          </span>
              <span
                  v-else-if="u.role === 1"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
              >
            volunteer
          </span>
              <span
                  v-else-if="u.role === 2"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
              >
            employee
          </span>
              <span
                  v-else-if="u.role === 3"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
              >
            admin
          </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                  type="button"
                  class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-offset-2"
              >
                Edit
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
</template>

<style>
    .container {
        margin: 0 auto;
        max-width: 1200px;
    }
    .input-style {
      @apply block w-full bg-gray-100 text-gray-700 border rounded py-2 px-3 mb-2 focus:outline-none focus:bg-white;
    }

</style>

<script setup>

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

    console.log('user: ', user)

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
    
    if(addedUser)   users.value = await getUsers()
}


/**
*   @desc edit users
    @param fn firstName of the user
    @param ln lastName of the user
    @param em email of the user
    @param rl role of the user
*/
async function editUser(editedUser) {
   
}

import PageHeader from '~/components/PageHeader.vue'

</script>