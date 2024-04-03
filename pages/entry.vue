<template>
  <div>
    <h2 class="text-center text-3xl font-bold mt-4" style="margin-top: 35px">Student Sign-Up</h2>
    <h2 class="text-center text-s font-bold" style="margin-top: 10px">Add student voter information</h2>
    <hr class="rounded center-text" style="border-top: 7px solid #122C4F; width: 65%; margin: 0 auto; margin-top: 7px">
    <!--the form to add a new entry to the student table-->
    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-16">

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
        <label for="address" class="block text-lg font-medium leading-6 text-gray-900">Address</label>
        <div class="mt-2">
          <input type="text" v-model="student.street" name="address" id="street-address" autocomplete="address" class="block w-full
          rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
           focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>

      <!--street name-->
      <div class="sm:col-span-3">
        <label for="street-number" class="block text-lg font-medium leading-6 text-gray-900">Apt number</label>
        <div class="mt-2">
          <input type="text" v-model="student.streetNumber" name="street-number" id="street-number" autocomplete="" class="block w-full
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
          <input type="text" v-model="student.county" name="county" id="county" class="block w-full rounded-md
          border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
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

      <!--Phone number-->
      <div class="sm:col-span-2 sm:col-start-1">
        <label for="phoneNumber" class="block text-lg font-medium leading-6 text-gray-900">Phone Number</label>
        <div class="mt-2">
          <input type="text" v-model="student.phoneNumber" name="phoneNumber" id="phoneNumber" class="block w-full rounded-md
          border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>
      
      <!--Email Address-->
      <div class="sm:col-span-2">
        <label for="studentEmail" class="block text-lg font-medium leading-6 text-gray-900">Email Address</label>
        <div class="mt-2">
          <input type="text" v-model="student.studentEmail" name="studentEmail" id="studentEmail" class="block w-full rounded-md
          border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>

      <!--School Name-->
      <div class="sm:col-span-2">
        <label for="schoolName" class="block text-lg font-medium leading-6 text-gray-900">School Name</label>
        <div class="mt-2">
          <input type="text" name="schoolName" v-model="student.schoolName" id="schoolName" class="block
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
    <button type="button"  class="rounded-md mr-96 bg-blue-500 px-3 py-2 text-lg font-semibold
    text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
    focus-visible:outline-indigo-600" @click.prevent="addStudent(student)" @click="clearForm ">Save Voter</button>
  </div>
</template>

<style scoped>

/*.jost-font {
  font-family: "Jost", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}*/
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
  authorId: cvuser.value.id,
  phoneNumber: null,
  studentEmail: null,
  schoolName: null,
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
    authorId: cvuser.value.id,
    phoneNumber: null,
    studentEmail: null,
    schoolName: null,
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
        phoneNumber: student.phoneNumber,
        studentEmail: student.studentEmail,
        schoolName: student.schoolName,
      }
    });
    console.log(addedStudent.value.authorId)
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
