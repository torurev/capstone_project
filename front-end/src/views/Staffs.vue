<template>
  <div class="home">
    <FilterNavStaff :current="current" @filterChange="current = $event" />
    <div v-if="staffs && staffs.length">
      <div v-for="staff in filteredStaffs" :key="staff.id">
        <SingleStaff
          :staff="staff"
          @delete="handleDelete"
          @complete="handleComplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FilterNavStaff from "../components/FilterNavStaff.vue";
import SingleStaff from "../components/SingleStaff.vue";

export default {
  name: "Home",
  components: { SingleStaff, FilterNavStaff },
  data() {
    return {
      staffs: [],
      current: "all",
    };
  },
  mounted() {
    fetch("http://localhost:3000/staffs")
      .then((res) => res.json())
      .then((data) => (this.staffs = data))
      .catch((err) => console.log(err));
  },
  methods: {
    handleDelete(id) {
      this.staffs = this.staffs.filter((staff) => {
        return staff.id !== id;
      });
    },
    handleComplete(id) {
      let p = this.staffs.find((staff) => {
        return staff.id === id;
      });
      p.complete = !p.complete;
    },
  },
  computed: {
    filteredStaffs() {
      if (this.current === "completed") {
        return this.staffs.filter((staff) => staff.complete);
      }
      if (this.current === "ongoing") {
        return this.staffs.filter((staff) => !staff.complete);
      }
      return this.staffs;
    },
  },
};
</script>
