<template>
  <div class="row justify-around items-center q-mt-lg">
    <q-card class="q-pa-lg shadow-1" style="min-width: 450px;">
      <div class="text-center "><span class="" style="font-size: 3em">Register</span></div>
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input  outlined clearable v-model="user.name" type="text" label="Name (Optional)"  >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input  outlined clearable v-model="user.email" type="email" label="Email" :error="haveError" :error-message="errorMessage" >
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
        <q-btn no-caps unelevated color="primary" size="lg" class="full-width" label="Register" :loading="formLoading"  :disable="formLoading" @click="register"/>
      </q-card-actions>
      <q-card-section class="text-center q-pa-none">
        <p class="text-grey-6">Already have account? <router-link to="/login">Sign in</router-link></p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return{
      user: {
        email: null,
        password: null,
        name: null
      },
      haveError:false,
      errorMessage: ''
    }
  },
  methods: {
    register() {
      this.$store.dispatch('auth/register', this.user).catch(err => {
        this.haveError = true
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
