<template>
  <form @submit.prevent="handleSubmit">
    <label>Name</label>
    <input type="text" v-model="name" required />
    <label>Position</label>
    <input type="text" v-model="position" required />
    <button>Update Staff</button>
  </form>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: ["id"],
  data() {
    return {
      uri: "http://localhost:3000/staffs/" + this.id,
      name: "",
      position: "",
    };
  },
  mounted() {
    fetch(this.uri)
      .then((res) => res.json())
      .then((data) => {
        this.name = data.name;
        this.position = data.position;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    handleSubmit() {
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.name, position: this.position }),
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Staff Updated Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push("/staff");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
