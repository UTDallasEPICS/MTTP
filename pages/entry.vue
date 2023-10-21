<template>
  <div>
    <PageHeader />
    <h2>Entry Page</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="formData.firstName" required>
      </div>

      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="formData.lastName" required>
      </div>

      <div class="form-group">
        <label for="street">Street Address:</label>
        <input type="text" id="street" v-model="formData.address.street" required>
      </div>

      <div class="form-group">
        <label for="apartment">Apartment, Suite, etc. (Optional):</label>
        <input type="text" id="apartment" v-model="formData.address.apartment">
      </div>

      <div class="form-group">
        <label for="city">City:</label>
        <input type="text" id="city" v-model="formData.address.city" required>
      </div>

      <div class="form-group">
        <label for="zipcode">Zipcode:</label>
        <input type="text" id="zipcode" v-model="formData.address.zipcode" required>
      </div>

      <div class="form-group">
        <label for="county">County:</label>
        <select id="county" v-model="formData.address.county" required>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      </div>


    </form>
    <button type="submit">Submit</button>
  </div>
</template>

<style scoped>
.entry-page{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 400px;
  margin: 20px auto; /* Add margin to create spacing around the form */
}

.form-container {
  margin: 100px; /* Add margin to create spacing around the form */
}

.form-group {
  margin-bottom: 10px; /* Add margin to create spacing between form groups */
  text-align: center;
}

.form-group label {
  display: block;
  text-align: center;
}

.form-group input,
.form-group select {
  width: 50%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

h2 {
  text-align: center;
}

button {
  align-content: center;
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

import PageHeader from "~/components/pageHeader.vue";
</script>