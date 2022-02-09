<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="q-px-lg">
        <q-toolbar-title to="/">
          <q-btn flat label="Novos"   to="/"/>
        </q-toolbar-title>
        <q-btn-dropdown flat v-if="user">

          <template v-slot:label>
            <div class="row items-center no-wrap">
              <span>
                {{ user.email }}
              </span>
            </div>
          </template>
          <q-list>
            <q-item clickable @click="$store.dispatch('auth/logout')">
              <q-item-section avatar>
                <q-avatar icon="logout"/>
              </q-item-section>
              <q-item-section>Sign Out</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
          <q-btn no-caps outline label="Sign in" icon="login" v-if="!user" class="q-mr-md" to="/login"/>
          <q-btn no-caps color="white" text-color="primary" label="Register" icon="person_add" v-if="!user" to="/register"/>
      </q-toolbar>
    </q-header>

    <q-page-container container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>
<script>

export default  {
  computed:{
    user(){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.$store.state.auth.user
    }
  }
}
</script>
