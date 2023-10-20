<template>
    <div class = "container">
        <h1>Users</h1>
        
        <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        First Name
                    </label>
                    <input v-model="fn" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
                    
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Last Name
                    </label>
                    <input v-model="ln" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Doe">
                
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Email
                    </label>
                    <input v-model="em" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="abc@123.com">
                
                    <select v-model="rl">
                        <option disabled value="">Please select role</option>
                        <option value="1">volunteer</option>
                        <option value="2">employee</option>
                        <option value="3">admin</option>
                        <option value="0">other</option>
                    </select>

                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            @click.prevent="$event => addUser(fn, ln, em, rl)">
                        Add
                    </button>
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
                        <td v-if="u.role == 0">ex-employee</td>
                        <td v-else-if="u.role == 1">volunteer</td>
                        <td v-else-if="u.role == 2">employee</td>
                        <td v-else-if="u.role == 3">admin</td>
                        
                        <td><button type="button" class="btn btn-warning btn-sm">Edit</button></td>
                        
                    </tr>
                </tbody>
            </table>
            
        </div>
    </div>
</template>

<script setup>

const users = ref(null)
const fn = ref(null)
const ln = ref(null)
const em = ref(null)
const rl = ref(null)

users.value = await getUsers()



/**
*   @desc get users
*/
async function getUsers() {
  return await $fetch('/api/user')
}

/**
*   @desc add users
    @param user the user to add
*/

async function addUser(fn, ln, em, rl) {
    console.log('user: ', ln)


    if(fn && ln && em && rl)
        return await $fetch('/api/user', {
            method: 'POST',
            body: {
                firstName: fn,
                lastName:  ln,
                email:     em,
                role:      rl
        }
        })
}

</script>