<template>
    <div>
      <PageHeader />
      <h2 class="text-center text-2xl font-bold mt-4">View Database</h2>
      <h3 class="text-center text-xl font-bold">View the full database and Import/ Export</h3>
  
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-96">
        
        
        <div class="flex items-center justify-start sm:col-span-6">
          <button type="button" class="text-lg font-semibold leading-6 text-gray-900 mr-3" >Import</button>
          <button type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm
           hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
           focus-visible:outline-indigo-600" >Export</button>
        </div>
      </div>
    </div>
  
    <div class="mt-4 mx-96">
      <div class="relative overflow-x-auto rounded-lg">
        <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Author Name</th>
            <th scope="col" class="px-6 py-3">First Name</th>
            <th scope="col" class="px-6 py-3">Last Name</th>
            <th scope="col" class="px-6 py-3">Address</th>
            <th scope="col" class="px-6 py-3">County</th>
            <th scope="col" class="px-6 py-3">City</th>
            <th scope="col" class="px-6 py-3">Zip Code</th>
            <th scope="col" class="px-6 py-3">Voted</th>
            <th scope="col" class="px-6 py-3">Edit</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(u) in students" :key="u.studentId">
            <th scope="row">{{ u.author?.firstName }} {{ u.author?.lastName }}</th>
            <td>{{ u.firstName }}</td>
            <td>{{ u.lastName }}</td>
            <td>{{ u.streetAddress }}</td>
            <td>{{ u.county }}</td>
            <td>{{ u.city }}</td>
            <td>{{ u.zipCode }}</td>
            <td>
                <input type="checkbox" v-model="u.voted" disabled>
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
  
  const author = ref(null)
  
  const students = ref(null)
  const student = ref({
    firstName: null,
    lastName: null,
    streetAddress: null,
    county: null,
    city: null,
    zipCode: null,
    authorId: null
  })
  const editedStudent = ref({
    studentId: null,
    firstName: null,
    lastName: null,
    streetAddress: null,
    county: null,
    city: null,
    zipCode: null,
    authorId: null
  })
  
  students.value = await getStudents()
  
  
  
  /**
   *   @desc get users
   */
  async function getStudents() {
    return await $fetch('/api/student')
  }
  

  
  /**
   *   @desc edit student
   @param fn firstName of the user
   @param ln lastName of the user
   @param em email of the user
   @param rl role of the user
   */
  async function editStudent(editedStudent) {
    let student = null
  
    console.log('editedStudent: ', editedStudent)
  
    if(editedStudent)
      student = await $fetch('/api/student', {
        method: 'PUT',
        body: {
          studentId: parseInt(editedStduent.studentId),
          firstName: editedStudent.firstName,
          lastName: editedUser.lastName,
          streetAddress: editedUser.streetAddress,
          county: editedUser.county,
          city: editedUser.city,
          zipCode: parseInt(editedUser.zipCode),
        }
      })
  
    if(student)   students.value = await getStudents()
  }
  
  import PageHeader from "~/components/pageHeader.vue";
  
  </script>