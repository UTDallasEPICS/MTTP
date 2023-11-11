<template>
    <div v-if="currentUserRole == 3">
    <div>
      <PageHeader />
      <h2 class="text-center text-2xl font-bold mt-4">View Database</h2>
      <h3 class="text-center text-xl font-bold">View the full database and Import/ Export</h3>
  
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-96">
        
        
        <div class="flex items-center justify-start sm:col-span-6">
          <input type="file" @change="handleFileImport" accept=".xlsx">
            <button type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600" @click.prevent="exportData">Export</button>
        </div>

      </div>
    </div>
  
    <div class="mt-4 mx-96">
      <div class="relative overflow-x-auto rounded-lg">
        <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Author Name</th>
            <th scope="col" class="px-6 py-3">Student First Name</th>
            <th scope="col" class="px-6 py-3">Student Last Name</th>
            <th scope="col" class="px-6 py-3">Address</th>
            <th scope="col" class="px-6 py-3">County</th>
            <th scope="col" class="px-6 py-3">City</th>
            <th scope="col" class="px-6 py-3">Zip Code</th>
            <th scope="col" class="px-6 py-3">Voted</th>
            <th scope="col" class="px-6 py-3">Edit</th>
            <th scope="col" class="px-6 py-3">Remove</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(u) in students" :key="u.studentId">
            <th scope="row">{{ u.author.firstName }} {{ u.author.lastName }}</th>
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
            <td>
              <button @click="openModal">Remove</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
    <div v-else>
        <h1>Access Denied</h1>
    </div>
  </template>
  
  <script setup>
  
  import Modal from "../src/components/Modal.vue";
  import { ref } from "vue";
  import * as XLSX from 'xlsx';

  const exportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(students.value);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, 'students.xlsx');
  };

  const handleFileImport = async (event) => {
  const file = event.target.files[0];

    if (file) {
      try {
        const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Now you have jsonData containing the data from the XLSX file
        // Process and add the data to the Prisma database
        await addDataToDatabase(jsonData);
      } catch (error) {
        console.error('Error reading XLSX file:', error);
      }
    }
  };

  const addDataToDatabase = async (jsonData) => {
  // Iterate through jsonData and add each record to the Prisma database
  for (const record of jsonData) {
    const newStudent = {
      firstName: record['firstName'],
      lastName: record['lastName'],
      streetAddress: record['streetAddress'],
      county: record['county'],
      city: record['city'],
      zipCode: record['zipCode'],
      voted: record['voted'],
      authorId: record['authorId'],
    };

    // Use Prisma to add the new student to the database
    await $fetch('/api/student', {
      method: 'POST',
      body: newStudent,
    });
  }

  // Refresh the list of students after importing data
  students.value = await getStudents();
};
  
  const isModalVisible = ref(false);
  
  function openModal() {
    isModalVisible.value = true;
  }
  
  function closeModal() {
    isModalVisible.value = false;
  }
  
  const currentUserRole = ref(3)
  
  const students = ref(null)
  const student = ref({
    firstName: null,
    lastName: null,
    streetAddress: null,
    county: null,
    city: null,
    zipCode: null,
    voted: null,
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
    voted: null,
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
          voted: editedUser.voted,
          zipCode: parseInt(editedUser.zipCode),
        }
      })
  
    if(student)   students.value = await getStudents()
  }
  
  import PageHeader from "~/components/pageHeader.vue";
  
  </script>