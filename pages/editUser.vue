<template>
    <div class = "content-center">
    
      <!--the submission form for new users-->
      <div class = "container content-center" id="form" style="margin: 0 auto">
      
      
        <h2 class="text-center text-3xl font-bold mt-6">Edit Users</h2>
        <h3 class="text-center text-s font-bold">Modify volunteer and MTTP employee/admin info, and their permissions</h3>
        <hr class="rounded center-text" style="border-top: 7px solid #122C4F; width: 65%; margin: 0 auto; margin-top: 7px">
  
        <div class="mt-10 grid grid-cols-1 gap-x-24 gap-y-8 sm:grid-cols-6 mx-40">
          <div class="sm:col-span-3 ml-28">
            <label for="first-name" class="block text-lg font-medium leading-6 text-gray-900">First name</label>
            <div class="mt-2">
              <input v-model="user.firstName" type="text" name="first-name" id="first-name" autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
            </div>
          </div>
  
          <div class="sm:col-span-3 mr-28">
            <label for="last-name" class="block text-lg font-medium leading-6 text-gray-900">Last name</label>
            <div class="mt-2">
              <input v-model="user.lastName" type="text" name="last-name" id="last-name" autocomplete="family-name"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
            </div>
          </div>
  
          <div class="sm:col-span-3 ml-28">
            <label for="email" class="block text-lg font-medium leading-6 text-gray-900">Email</label>
            <div class="mt-2">
              <input v-model="user.email" type="text" name="email" id="email" autocomplete="email" class="block w-full
              rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
            </div>
          </div>
  
          <div class="sm:col-span-3 mr-28">
            <label for="role" class="block text-lg font-medium leading-6 text-gray-900">Role</label>
            <div class="mt-2">
              <select v-model="user.role" class="block w-full bg-gray-200 text-gray-700 border rounded-md py-2 px-3
              mb-3 leading-tight focus:outline-none focus:bg-white">
                <option disabled value="">Please select role</option>
                <option value="staff">staff</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>
            <button type="button" class="text-lg font-semibold leading-6 text-gray-900 mr-3 mx-72" @click="getUser()">Clear</button>
            <button type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600 w-60 mx-72" @click.prevent="editUser(user)">Apply Edits</button>
          </div>
        </div>
      
    </div>
  
  
  </template>
  
  <script setup>

  
  const editButtonPressed = ref(false)
  

  const users = ref(null)
  const user = ref({
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  role: null,
  })
  const editedUser = ref({
  id: null,
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
  @param user user object {firstName, lastName, email, role}
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
          role: user.role,
        }
      })
    if(addedUser)
      users.value = await getUsers()
  }
  
  
  /**
  *   @desc edit users
  @param editedUser user object {id, firstName, lastName, email, role}
  */
  async function editUser(editedUser) {
    console.log(editedUser)
  let user = null
  
  console.log('editedUser: ', editedUser)
  
    if(editedUser)
      user = await $fetch('/api/user', {
        method: 'PUT',
        body: {
          id: parseInt(editedUser.id),
          firstName: editedUser.firstName,
          lastName: editedUser.lastName,
          email: editedUser.email,
          role: editedUser.role,
        }
      })
  if(user)   users.value = await getUsers()
  }
  
async function getUser() {
    let user = null
    let userId = window.location.href.split('?')[1]
    user = await $fetch('/api/user', {
    method: 'GET',
    })
    console.log("success")
    for (let i = 0; i < user.length; i++) {
        if (user[i].id == userId) {
            console.log(user[i].firstName)
            this.user.id = user[i].id
            this.user.firstName = user[i].firstName
            this.user.lastName = user[i].lastName
            this.user.role = user[i].role
            this.user.email = user[i].email
        }
    }
    if(user)   users.value = await getUsers()

}
  
  const cvuser = useCookie('cvuser')
  //const userRole = cvuser.value.role // do we remove parseInt since we changed it to enum not int? remove line
  
  // Nuxt router guards - if cvuser.value.role is in list of allowed roles, allow else redirect to index
  // we can also hide navbar elements in app.vue depending on role so that
  // someone can only see the admin link if their role is admin
  
  
  
  </script>