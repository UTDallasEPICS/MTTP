<template>
    <div class = "container">
        <h1>
            <table class = "table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Edit</th>
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
        </h1>

    </div>
</template>

<script setup>

const users = ref(null)
users.value = await getUsers()
console.log('users', users.value)


/**
*   @desc get users
*/
async function getUsers() {
  return await $fetch('/api/user')
}

</script>