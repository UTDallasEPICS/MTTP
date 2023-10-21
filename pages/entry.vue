<template>
  <div>
    <PageHeader />
    <h2 class="text-center text-2xl font-bold mt-4">Entry Page</h2>
    <h3 class="text-center text-xl font-bold">Add student voter information and modify recent entries</h3>
    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-96">
      <div class="sm:col-span-3">
        <label for="first-name" class="block text-lg font-medium leading-6 text-gray-900">First name</label>
        <div class="mt-2">
          <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full
          rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>

      <div class="sm:col-span-3">
        <label for="last-name" class="block text-lg font-medium leading-6 text-gray-900">Last name</label>
        <div class="mt-2">
          <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full
          rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>

      <div class="col-span-full">
        <label for="street-address" class="block text-lg font-medium leading-6 text-gray-900">Street address</label>
        <div class="mt-2">
          <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full
          rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
           focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>

      <div class="sm:col-span-2 sm:col-start-1">
        <label for="city" class="block text-lg font-medium leading-6 text-gray-900">City</label>
        <div class="mt-2">
          <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md
          border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>

      <div class="sm:col-span-2">
        <label for="county" class="block text-lg font-medium leading-6 text-gray-900">County</label>
        <div class="mt-2">
          <select class="block w-full bg-gray-200 text-gray-700 border rounded-md py-2 px-3
          mb-3 leading-tight focus:outline-none focus:bg-white">
            <option disabled value="">Please select county</option>
            <option value="1">Dallas</option>
            <option value="2">Collin</option>
            <option value="3">Denton</option>
            <option value="4">Ellis</option>
            <option value="5">Kaufman</option>
            <option value="6">Rockwall</option>
          </select>
        </div>
      </div>

      <div class="sm:col-span-2">
        <label for="zip-code" class="block text-lg font-medium leading-6 text-gray-900">ZIP code</label>
        <div class="mt-2">
          <input type="text" name="zip-code" id="zip-code" autocomplete="zip-code" class="block
          w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset
          ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
        </div>
      </div>
    </div>
  </div>
  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" class="text-lg font-semibold leading-6 text-gray-900">Clear</button>
    <button type="button" class="rounded-md bg-indigo-600 mr-96 px-3 py-2 text-lg font-semibold
    text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
    focus-visible:outline-indigo-600">Save Voter</button>
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

<script>
export default {
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        address: {
          street: '',
          apartment: '',
          city: '',
          zipcode: '',
          county: '',
        },
      },
    };
  },
  methods: {
    submitForm() {
      // Combine street and apartment into one address string
      this.formData.address.address = `${this.formData.address.street}${
          this.formData.address.apartment ? `, ${this.formData.address.apartment}` : ''
      }`;

      // Remove apartment property
      delete this.formData.address.apartment;

      // Handle form submission, e.g., send data to a server or process it locally
      console.log(this.formData);
    },
  },
};
</script>
