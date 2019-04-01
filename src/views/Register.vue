<template>
<div class="row">
    <div class="col-lg-6">
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <a class="nav-link active" href="">Register</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Single Sign in</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Register</h4>
        <p class="card-text">
            <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="FirstName">First Name</label>
                  <input type="text" v-model="data.FirstName"
                    class="form-control" name="FirstName" id="FirstName" aria-describedby="helpFirstName" placeholder="First Name">
                  <small id="helpFirstName" class="form-text text-muted">If you have a middle name you can enter that too</small>
                </div>
                <div class="form-group">
                  <label for="LastName">Last Name</label>
                  <input type="text" v-model="data.LastName"
                    class="form-control" name="LastName" id="LastName" aria-describedby="helpLastName" placeholder="Last Name">
                  <small id="helpLastName" class="form-text text-muted">Sir Name</small>
                </div>
                <div class="form-group">
                  <label for="Password">Password</label>
                  <input type="password" v-model="data.Password"
                    class="form-control" name="Password" id="Password" placeholder="Password">
                </div>
                <div class="form-group">
                  <label for="Birthday">Birthday</label>
                  <input type="date" v-model="data.Birthday"
                    class="form-control" name="Birthday" id="Birthday" aria-describedby="helpBirthday" placeholder="Your Birthday">
                  <small id="helpBirthday" class="form-text text-muted">Please include the year</small>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </p>
      </div>
    </div>
    </div>
</div>
</template>

<script>
import { Register } from "@/models/users";

export default {
    data: ()=> ({
        data: {}
    }),
    methods: {
        submit(){
            Register(this.data);
        }
    }
}
</script>

<style>

</style>
