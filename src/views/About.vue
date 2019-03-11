<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>This page is all about {{name}}</h2>
    <input type="text" class="form-control" />
  </div>
</template>
<style lang="sass">

</style>

<script>
export default {
  data: ()=> ({
    name: "Moshe"
  }),

}
</script>
