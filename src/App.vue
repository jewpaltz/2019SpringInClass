<template>
  <div>
    <Nav />
    <div class="container" id="main">

      <div class="alert alert-danger" role="alert" v-for="(e, i) in Globals.errors" :key="i" >
        <button type="button" class="close" aria-label="Close" @click="Globals.deleteError(i)">
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{{e.message}}</strong> 
      </div>
      
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import { Globals } from "@/models/api";

export default {
  data: ()=>({
    Globals: Globals
  }),
  components: {
    Nav
  }
}
</script>


<style lang="scss">

</style>
