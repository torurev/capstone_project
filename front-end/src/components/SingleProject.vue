<template>
  <div class="project" :class="{ complete: project.complete }">
    <div class="actions">
      <h3 @click="showDetails = !showDetails">{{ project.title }}</h3>
      <div class="icons">
        <span @click="deleteProject" class="material-icons">delete</span>
        <router-link :to="{ name: 'EditProject', params: { id: project.id } }">
          <span class="material-icons">edit</span>
        </router-link>
        <span @click="toggleComplete" class="material-icons tick">done</span>
      </div>
    </div>
    <div v-if="showDetails" class="details">
      <p>{{ project.details }}</p>
      <h5>Assignee: {{ assigneeName }}</h5>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: ["project", "staffs"],
  data() {
    return {
      showDetails: false,
      uri: "http://localhost:3000/projects/" + this.project.id,
    };
  },
  computed: {
    assigneeName() {
      if (!this.staffs) return "Loading...";
      const assignee = this.staffs.find(
        (staff) => staff.id === this.project.assignee
      );
      return assignee ? assignee.name : "None";
    },
  },
  methods: {
    deleteProject() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(this.uri, { method: "DELETE" })
            .then(() => {
              this.$emit("delete", this.project.id);
              Swal.fire(
                "Deleted!",
                "Your project has been deleted.",
                "success"
              );
            })
            .catch((err) => {
              console.log(err);
              Swal.fire(
                "Error!",
                "There was an issue deleting the project.",
                "error"
              );
            });
        }
      });
    },
    toggleComplete() {
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: !this.project.complete }),
      })
        .then(() => {
          this.$emit("complete", this.project.id);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.project {
  margin: 20px auto;
  padding: 10px 20px;
  border-left: 4px solid #e90074;
  border-radius: 4px;
  background: white;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
}
h3 {
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.material-icons {
  margin-left: 10px;
  color: #bbb;
  font-size: 24px;
  cursor: pointer;
}
.material-icons:hover {
  color: #777;
}
.project.complete {
  border-left: 4px solid #00ce89;
}
.project.complete .tick {
  color: #00ce89;
}
</style>
