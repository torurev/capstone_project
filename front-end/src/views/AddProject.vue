<template>
  <form @submit.prevent="handleSubmit">
    <label>Title</label>
    <input type="text" v-model="title" required />
    <label>Details</label>
    <textarea v-model="details" required></textarea>
    <label>Assignee</label>
    <select v-model="assignee" required>
      <option value="" disabled>Select assignee</option>
      <option v-for="staff in staffs" :key="staff.id" :value="staff.id">{{ staff.name }}</option>
    </select>
    <button>Add Project</button>
  </form>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      title: '',
      details: '',
      assignee: '',
      staffs: [],
    };
  },
  mounted() {
    this.fetchStaffs();
  },
  methods: {
    fetchStaffs() {
      fetch('http://localhost:3000/staffs')
        .then((response) => response.json())
        .then((data) => (this.staffs = data))
        .catch((error) => console.error('Error fetching staffs:', error));
    },
    handleSubmit() {
      let project = {
        title: this.title,
        details: this.details,
        assignee: this.assignee, // Include assignee ID
        complete: false,
        id: Math.floor(Math.random() * 10000).toString(),
      };

      fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'Project successfully created',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.$router.push('/');
          });
        })
        .catch((error) => {
          console.error('Error creating project:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue creating the project',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
    },
  },
};
</script>

<style>
form {
  padding: 20px;
  border-radius: 10px;
  background: white;
}
label {
  display: block;
  margin: 20px 0 10px 0;
  color: #bbb;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
}
textarea {
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
}
form button {
  display: block;
  margin: 20px auto 0;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  background: #00ce89;
}
</style>
