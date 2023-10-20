<template>
    <div class = "container">
        <h1>
            <table class = "table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                    </tr>
                </thead>

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