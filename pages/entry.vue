<template>
  <h1>{{ userRole }}</h1>
  <div>
    <h2 class="text-center text-2xl font-bold mt-4">Entry Page</h2>
    <h3 class="text-center text-xl font-bold">Add student voter information and modify recent entries</h3>

    <!--the form to add a new entry to the student table-->
    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-96">

      <!--first name-->
      <div class="sm:col-span-3">
        <label for="first-name" class="block text-lg font-medium leading-6 text-gray-900">First Name</label>
        <div class="mt-2">
          <input type="text" v-model="student.firstName" name="first-name" id="first-name" autocomplete="given-name" class="block w-full
          rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>

      <!--last name-->
      <div class="sm:col-span-3">
        <label for="last-name" class="block text-lg font-medium leading-6 text-gray-900">Last Name</label>
        <div class="mt-2">
          <input type="text" v-model="student.lastName" name="last-name" id="last-name" autocomplete="family-name" class="block w-full
          rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>

      <!--street number-->
      <div class="sm:col-span-3">
        <label for="street-number" class="block text-lg font-medium leading-6 text-gray-900">Street/Apt Number</label>
        <div class="mt-2">
          <input type="text" v-model="student.streetNumber" name="street-number" id="street-number" autocomplete="street-number" class="block w-full
          rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
           focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>

      <!--street name-->
      <div class="sm:col-span-3">
        <label for="address" class="block text-lg font-medium leading-6 text-gray-900">Address</label>
        <div class="mt-2">
          <input type="text" v-model="student.street" name="address" id="street-address" autocomplete="address" class="block w-full
          rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
           focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>

      <!--city name-->
      <div class="sm:col-span-2 sm:col-start-1">
        <label for="city" class="block text-lg font-medium leading-6 text-gray-900">City</label>
        <div class="mt-2">
          <input type="text" v-model="student.city" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md
          border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>
      
      <!--county name-->
      <div class="sm:col-span-2">
        <label for="county" class="block text-lg font-medium leading-6 text-gray-900">County</label>
        <div class="mt-2">
          <select class="block w-full bg-gray-200 text-gray-700 border rounded-md py-2 px-3
          mb-3 leading-tight focus:outline-none focus:bg-white" v-model="student.county">
            <option disabled value="">Please select county</option>
            <option value="Dallas">Dallas</option>
            <option value="Collin">Collin</option>
            <option value="Denton">Denton</option>
            <option value="Tarrant">Tarrant</option>
          </select>
        </div>
      </div>

      <!--ZIP code-->
      <div class="sm:col-span-2">
        <label for="zip-code" class="block text-lg font-medium leading-6 text-gray-900">ZIP code</label>
        <div class="mt-2">
          <input type="text" name="zip-code" v-model="student.zipcode" id="zip-code" autocomplete="zip-code" class="block
          w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset
          ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>
    </div>
  </div>

  <!--buttons for the form-->
  <div class="mt-6 flex items-center justify-end gap-x-6">
    <!--clears the form-->
    <button type="button" class="text-lg font-semibold leading-6 text-gray-900 mr-3" @click="clearForm">Clear</button>
    <!--saves the information in the form-->
    <button type="button" class="rounded-md bg-indigo-600 mr-96 px-3 py-2 text-lg font-semibold
    text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
    focus-visible:outline-indigo-600" @click.prevent="addStudent(student)" @click="clearForm ">Save Voter</button>
  </div>
</template>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded-md;
}

.select {
  @apply w-full px-4 py-2 border rounded-md;
}

.btn {
  @apply w-full py-2 text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-md;
}
</style>

<script setup>
const cvuser = useCookie('cvuser')
const userRole = cvuser.value.role
const students = ref(null)
const student = ref({
  firstName: null,
  lastName: null,
  streetAddress: null,
  streetNumber: null,
  city: null,
  county: null,
  zipcode: null,
  authorId: cvuser.value.userId,
});



const clearForm = () => {
  student.value = {
    firstName: null,
    lastName: null,
    streetAddress: null,
    streetNumber: null,
    city: null,
    county: null,
    zipcode: null,
    authorId: cvuser.value.userId,
  }
};


/**
 *   @desc get students
 */
async function getStudents() {
  return await $fetch('/api/student')
}

/**
 *   @desc add student
 @param student student object 
 */

const isError = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);
const importedDataRef = ref(null);

async function addStudent(student) {
  isLoading.value = true;

  try {
    const addedStudent = await $fetch('/api/student', {
      method: 'POST',
      body: {
        firstName: student.firstName,
        lastName: student.lastName,
        streetNumber: parseInt(student.streetNumber),
        streetAddress: student.street,
        city: student.city,
        zipCode: parseInt(student.zipcode),
        county: student.county,
        authorId: parseInt(student.authorId),
      }
    });

    // If the student is added successfully, update the UI and show success message
    if (addedStudent) {
      // Set the success state and message
      isImportSuccessful.value = true;
      successMessage.value = 'Student added successfully!';
      
      // Clear success state and message after a delay (adjust as needed)
      setTimeout(() => {
        clearSuccessMessage();
      }, 3000);

      // Refresh the list of students after adding one
      students.value = await getStudents();
    }
  } catch (error) {
    isError.value = true; // Show error notification
    errorMessage.value = 'An error occurred during student addition. Please check the console for details.';

    console.error('Error adding student:', error);
  } finally {
    isLoading.value = false; // Ensure isLoading is always set to false, regardless of success or failure
  }
}



</script>
