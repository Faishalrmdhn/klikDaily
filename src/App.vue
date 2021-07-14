<template>
  <div id="app">
    <h6>Create Order</h6>
    <div>
      <router-view />
  </div>
  </div>
  
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app{
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8;
  font-family: Open Sans, sans-serif;
}
html,
body {
  font-family: Open Sans;
  margin: 0;
  padding: 0;
}
</style>
