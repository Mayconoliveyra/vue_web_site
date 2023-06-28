<template>
  <header class="header">
    <a class="toggleHeader" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-bars fa-2x"></i>
    </a>
    <UserDropdown />
  </header>
</template>

<script>
import UserDropdown from "./UserDropdown";
export default {
  name: "Header",
  components: { UserDropdown },
  props: {
    title: String,
    hideToggle: Boolean,
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>

<style scoped>
.header {
  grid-area: header;
  background-color: rgb(60, 60, 105);

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.header > .toggleHeader {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-content: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>