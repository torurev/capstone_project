<template>
  <div class="staff">
    <div class="actions">
      <h3 @click="toggleShowDetails">{{ staff.name }}</h3>
      <p>{{ staff.position }}</p>
      <div class="icons">
        <span @click="confirmDelete" class="material-icons">delete</span>
        <router-link :to="{ name: 'EditStaff', params: { id: staff.id } }">
          <span class="material-icons">edit</span>
        </router-link>
      </div>
    </div>
    <div v-if="showDetails" class="details">
      <p v-if="assignedProjects.length > 0">Projects Assigned:</p>
      <ul v-if="assignedProjects.length > 0">
        <li v-for="project in assignedProjects" :key="project.id">
          {{ project.title }}
        </li>
      </ul>
      <p v-else>No projects assigned</p>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: ["staff"],
  data() {
    return {
      showDetails: false,
      assignedProjects: [],
    };
  },
  methods: {
    toggleShowDetails() {
      this.showDetails = !this.showDetails;
      if (this.showDetails) {
        this.fetchAssignedProjects();
      }
    },
    fetchAssignedProjects() {
      fetch("http://localhost:3000/projects")
        .then((response) => response.json())
        .then((projects) => {
          this.assignedProjects = projects.filter(
            (project) => project.assignee === this.staff.id.toString()
          );
        })
        .catch((err) => console.error("Error fetching projects:", err));
    },
    confirmDelete() {
      Swal.fire({
        title: `Are you sure you want to delete ${this.staff.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteStaff();
        }
      });
    },
    deleteStaff() {
      fetch(`http://localhost:3000/staffs/${this.staff.id}`, {
        method: "DELETE",
      })
        .then(() => {
          Swal.fire(
            "Deleted!",
            `${this.staff.name} has been deleted.`,
            "success"
          );
          this.$emit("delete", this.staff.id);
        })
        .catch((err) => console.error("Error deleting staff:", err));
    },
  },
};
</script>

<style scoped>
.staff {
  margin: 20px auto;
  padding: 10px 20px;
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
</style>
