<template>
    <div v-if="userRole == 'staff' || userRole == 'admin'">
    <div>
      
      <h2 class="text-center text-3xl font-bold mt-4"  style="margin-top: 35px">View Database</h2>
      <h3 class="text-center text-s font-bold" style="margin-top: 10px">View the full database and Import/Export</h3>
      <br>
      
      <!--import and export function
          only shows up if user is staff or higher ( not volunteer )-->
      <div v-if="userRole == 'staff' || userRole == 'admin'" class="flex items-center justify-center sm:col-span-6">
        <input type="file" @change="handleFileSelect" accept=".xlsx, .csv">
        <button type="button" class="rounded-md bg-green-500 px-3 py-2 text-lg font-semibold text-white shadow-sm
        hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-green-600" @click.prevent="importData">Import</button>
        <button type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm
        hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-indigo-600" @click.prevent="exportData">Export</button>
       
      </div>
      <Notification :isVisible="isImportSuccessful" :message="successMessage" />
      <Notification :isVisible="isError" :message="errorMessage" />
      <Loading :isLoading = "isLoading" />
    </div>

    <!--table for the database display-->
    <div class="mt-4 mx-10">
      <div class="relative overflow-x-auto rounded-lg">
        <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr class="h-9">
            <th scope="col" class="px-6 py-3">Author Name</th>
            <th scope="col" class="px-6 py-3">Student First Name</th>
            <th scope="col" class="px-6 py-3">Student Last Name</th>
            <th scope="col" class="px-6 py-3">Address</th>
            <th scope="col" class="px-6 py-3">City</th>
            <th scope="col" class="px-6 py-3">County</th>
            <th scope="col" class="px-6 py-3">Zip Code</th>
            <th scope="col" class="px-6 py-3">Voted</th>
            <th scope="col" class="px-6 py-3">Phone Number</th>
            <th scope="col" class="px-6 py-3">Student Email</th>
            <th scope="col" class="px-6 py-3">School Name</th>
            <th scope="col" class="px-6 py-3">Edit</th>
            <th scope="col" class="px-6 py-3">Remove</th>
          </tr>
          </thead>
          <tbody>
          <tr class="h-9" v-for="(u) in students" v-show="currUserId == u.id || (userRole == 'staff' || userRole == 'admin')" :key="u.studentId">
            <th scope="row">{{ u.author?.firstName }} {{ u.author.lastName }}</th>
            <td>{{ u.firstName }}</td>
            <td>{{ u.lastName }}</td>
            <td>{{u.streetNumber}} {{ u.streetAddress }}</td>
            <!-- <td>{{ u.streetAddress }}</td> -->
            <td>{{ u.county }}</td>
            <td>{{ u.city }}</td>
            <td>{{ u.zipCode }}</td>
            <td>
                <input type="checkbox" v-model="u.voted" disabled>
            </td>
            <td>{{ u.phoneNumber }}</td>
            <td>{{ u.studentEmail }}</td>
            <td>{{ u.schoolName }}</td>
            
            <!--if the edit button is pressed the user can change the value of the entry
                !!! NOT YET FINISHED !!!-->
            <td>
              <button id="editUserButton" class="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600" v-if="!editButtonPressed" @click="{
                                                    editedStudent.studentId = u.studentId;
                                                    editedStudent.firstName = u.firstName;
                                                    editedStudent.lastName = u.lastName;
                                                    editedStudent.streetAddress = u.streetAddress;
                                                    editedStudent.county = u.county;
                                                    editedStudent.city = u.city;
                                                    editedStudent.zipCode = u.zipCode;
                                                    editedStudent.voted = u.voted;
                                                    editedStudent.authorId = u.authorId;
                                                    editedStudent.phoneNumber = u.phoneNumber;
                                                    editedStudent.studentEamil = u.studentEamil;
                                                    editedStudent.schoolName = u.schoolName;
                                                    editButtonPressed = true;}">Edit</button>
              <div v-else>
                <div v-if="editedStudent.studentId == u.studentId">
                  <button id="applyEditButton" class="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600" @click="{editButtonPressed = false;
                                                          editStudent(editedStudent);}">Apply</button>
                  <button id="cancelEditButton" class="rounded-md bg-gray-600 px-3 py-2 text-xs font-semibold text-white shadow-sm
            hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600" @click="editButtonPressed = false">Cancel</button>
                </div>
              </div>
            </td>

            <!--Remove function-->
            <td>
              <button id="applyRemoveButton" class="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600" @click="removeStudent(u.studentId)">Remove</button>
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
  import Notification from "~/components/Notification.vue";
  import Loading from "~/components/LoadingOverlay.vue";
  import Modal from "../src/components/Modal.vue";
  import { ref } from "vue";
  import * as XLSX from 'xlsx';
  import * as Papa from 'papaparse';

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
        const fileType = getFileType(file);

        if (!fileType) {
          console.error('Unsupported file type');
          return;
        }

        let jsonData;

        if (fileType === 'xlsx') {
          const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        } else if (fileType === 'csv') {
          jsonData = await parseCsvFile(file);
        }

        // Now you have jsonData containing the data from the file
        // Process and add the data to the Prisma database
        await addDataToDatabase(jsonData);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const getFileType = (file) => {
    if (file.name.endsWith('.xlsx')) {
      return 'xlsx';
    } else if (file.name.endsWith('.csv')) {
      return 'csv';
    } else {
      return null;
   }
  };

  const isImportSuccessful = ref(false);
  const successMessage = ref('');
  

  const handleFileSelect = async (event) => {
  const file = event.target.files[0];

  if (file) {
    console.log("File type: ", file.type);
    try {
      const fileType = getFileType(file);

      if (!fileType) {
        console.error('Unsupported file type');
        return;
      }

      const jsonData = await (fileType === 'xlsx' ?
        parseXlsxFile(file) :
        parseCsvFile(file));

      // Store jsonData in a ref or reactive property
      importedDataRef.value = jsonData;
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }
};
const clearSuccessMessage = () => {
  isImportSuccessful.value = false;
   successMessage.value = '';
};

const isError = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);
const importedDataRef = ref(null);
const importData = async () => {
  try {
    isLoading.value = true;

    if (!importedDataRef.value) {
      // Display an error message if no file is imported
      isError.value = true;
      errorMessage.value = 'No file imported. Please select a file to import.';
      isLoading.value = false;
      // Clear success state and message after a delay (adjust as needed)
      setTimeout(() => {
      clearSuccessMessage();
      }, 3000);
      return;
    }
    let jsonData;

    if (Array.isArray(importedDataRef.value)) {
      jsonData = importedDataRef.value;
    } else if (importedDataRef.value.data) {
      jsonData = importedDataRef.value.data;
    } else {
      console.error('Invalid data format for import.');
      return;
    }

    // Process and add the data to the Prisma database
    await addDataToDatabase(jsonData);

    // Set the success state and message
    isImportSuccessful.value = true;
    successMessage.value = 'Import successful!';
    isLoading.value = false;
    
    // Clear success state and message after a delay (adjust as needed)
    setTimeout(() => {
      clearSuccessMessage();
    }, 3000);
  } catch (error) {
    isError.value = true; // Show error notification
    errorMessage.value = 'An error occurred during import. Please check the console for details.';
    isLoading.value = false; // Hide loading overlay
    console.error('Error importing data:', error);
  }
};


const parseXlsxFile = async (file) => {
  const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

const parseCsvFile = (file) => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        console.error('Error parsing CSV file:', error);
        resolve([]);
      },
    });
  });
};

  /**
   * @desc adding data from an imported file to the student table
   * @param jsonData the data from a parsed file
   */
  const addDataToDatabase = async (jsonData) => {
  // Iterate through jsonData and add each record to the Prisma database
  for (const record of jsonData) {
    const newStudent = {
      firstName: record['firstName'],
      lastName: record['lastName'],
      streetAddress: record['streetAddress'],
      streetNumber: record['streetNumber'],
      county: record['county'],
      city: record['city'],
      zipCode: record['zipCode'],
      voted: record['voted'],
      authorId: record['authorId'],
      phoneNumber: record['phoneNumber'],
      studentEmail: record['studentEmail'],
      schoolName: record['schoolName'],
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
  
  
  
  const students = ref(null)
  const student = ref({
    firstName: null,
    lastName: null,
    streetNumber: null,
    streetAddress: null,
    county: null,
    city: null,
    zipCode: null,
    voted: null,
    authorId: null,
    phoneNumber: null,
    studentEmail: null,
    schoolName: null,
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
    authorId: null,
    phoneNumber: null,
    studentEmail: null,
    schoolName: null,
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
   @param editedStudent student object 
   */
   async function editStudent(editedStudent) {
  let student = null

  console.log('editedStudent: ', editedStudent)

  if(editedStudent)
    user = await $fetch('/api/student', {
      method: 'PUT',
      body: {
        firstName: editedStudent.firstName,
        lastName: editedStudent.lastName,
        streetAddress: editedStudent.streetAddress,
        county: editedStudent.county,
        city: editedStudent.city,
        zipCode: editedStudent.zipCode,
        voted: editedStudent.voted,
        phoneNumber: editedStudent.phoneNumber,
        studentEmail: editedStudent.studentEmail,
        schoolName: editedStudent.schoolName,
      }
    })

  if(student)   students.value = await getStudents()
}

/**
   *   @desc delete student
   @param studentId id of the student being removed 
   */
  const removeStudent = async (studentId) => {
  try {
    // Ensure the URL matches your backend API
    const apiUrl = `/api/student`;

    // Make the DELETE request to the backend API
    await $fetch(apiUrl, {
      method: 'DELETE',
      body: { studentId },
    });

    // Display a success message
    isImportSuccessful.value = true;
    successMessage.value = 'Student removed successfully!';

    setTimeout(() => {
      clearSuccessMessage();
    }, 3000);

    // Refresh the list of students after removing one
    students.value = await getStudents();
  } catch (error) {
    isError.value = true; // Show error notification
    errorMessage.value = 'An error occurred while removing the student. Please check the console for details.';

    console.error('Error removing student:', error);
  }
  }



  
  const cvuser = useCookie('cvuser')
  const userRole = (cvuser.value.role)
  console.log(cvuser.role)
  const currUserId = parseInt(cvuser.value.userId)

  </script>
