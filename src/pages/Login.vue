<template>
  <div class="row justify-around items-center q-mt-lg">
    <q-card class="q-pa-lg shadow-1" style="min-width: 450px;">
      <div class="text-center "><span class="" style="font-size: 3em">Login</span></div>
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input  outlined clearable v-model="user.email" type="email" label="Email" autofocus  :error="haveError" :error-message="errorMessage">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input  outlined clearable v-model="user.password" type="password" label="Password" >
            <template v-slot:prepend>
              <q-icon name="password" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn :loading="formLoading" @click="login" :disable="formLoading" no-caps unelevated color="primary" size="lg" class="full-width" label="Sign in" />
      </q-card-actions>
      <q-card-section class="text-center q-pa-none">
        <p class="text-grey-6">Not reigistered? <router-link to="/register">Created an Account</router-link></p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return{
      user: {
        email: null,
        password: null
      },
      haveError:false,
      errorMessage: ''
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', this.user).catch(err => {
        this.haveError = true
        console.log(err);
        this.errorMessage = err.response.data.message
      })
    }
  },
  computed: {
    formLoading(){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.$store.state.auth.formLoading
    }
  }
}
</script>

<style scoped>

</style>
