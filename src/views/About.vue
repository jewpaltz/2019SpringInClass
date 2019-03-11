<template>
  <div class="row">
    <div class="col">
      <h1>This is {{name}}'s page. He is {{age}} years old </h1>
      <input v-model="age" type="text" class="form-control" placeholder="Age" />
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" :style="{width: age + '%'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data: ()=> ({
      name: "Moshe",
      age: 42
    })
}
</script>

<style type="scss">

</style>

