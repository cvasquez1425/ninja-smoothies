<template>
  <div id="app">
    <Navbar />
    <router-view />
    <!-- HelloWorld component gets loaded right here. inject the component right here-->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
</style>
