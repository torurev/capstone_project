<template>
  <form @submit.prevent="handleSubmit">
    <label>Name</label>
    <input type="text" v-model="name" required />
    <label>Position</label>
    <input type="text" v-model="position" required />
    <button>Add Staff</button>
  </form>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      name: "",
      position: "",
    };
  },
  methods: {
    handleSubmit() {
      let staff = {
        name: this.name,
        position: this.position,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      console.log(staff);

      fetch("http://localhost:3000/staffs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(staff),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          Swal.fire({
            title: "Success!",
            text: "staff successfully created",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            this.$router.push("/staff");
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Error!",
            text: "There was an issue creating the staff",
            icon: "error",
            confirmButtonText: "OK",
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
