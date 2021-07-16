<template>
  <div>
    <div class="d-flex justify-content-center">
      <img :src="require('../assets/success_paid.svg')" alt="success-paid">
    </div>
    <b-row >
      <b-col cols="12">
        <div class="d-flex justify-content-center dialog-text">Pesananmu Berhasil!</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>

    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
            loadingCancel: {
                type: Boolean,
                default: false
            }
        },
    }
</script>

<style scoped>
 .dialog-text{
   font-family: Open Sans, sans-serif;
   font-size: 14px;
   font-weight: 600;
 }
</style>