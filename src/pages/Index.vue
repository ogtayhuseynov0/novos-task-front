<template>
  <q-page class="q-pa-lg">
    <div class="row q-gutter-md">
      <div class="col ">
        <q-card flat bordered  class="my-card">
        <q-card-section>
          <div class="row justify-between items-center ">
            <div class="text-h6 text-center">My Training Plan</div>
            <q-btn  label="Reset" color="primary"  icon="clear" @click="clearPlan" />
          </div>
        </q-card-section>
          <TrainingBucket />

          <q-inner-loading :showing="$store.state.session.sessionsLoading">
          </q-inner-loading>
      </q-card>
      </div>
      <div class="col">
        <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="row justify-between items-center ">
            <div class="text-h6 text-center">Training Sessions Bank </div>
            <q-btn  label="Create" color="primary"  icon="add" @click="createSession = true" />
          </div>
        </q-card-section>
        <SessionBank/>

        <q-inner-loading :showing="$store.state.session.sessionsLoading">
        </q-inner-loading>
      </q-card></div>

    </div>

    <q-dialog v-model="createSession">
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Create Training Session</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input  outlined clearable v-model="session.title" type="text" label="Title"  autofocus>
            <template v-slot:prepend>
              <q-icon name="title" />
            </template>
          </q-input>

        </q-card-section>
        <q-card-section>
          <q-input  outlined clearable v-model="session.description" type="textarea" label="Description"  >
            <template v-slot:prepend>
              <q-icon name="description" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="gray" v-close-popup />
          <q-btn  label="Save" color="primary"  icon="save" @click="saveSession" :disable="$store.state.session.sessionsLoading" :loading="$store.state.session.sessionsLoading"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import TrainingBucket from 'components/TrainingBucket.vue';
import SessionBank from '../components/SessionBank';
export default defineComponent({
  name: 'PageIndex',
  components: {SessionBank, TrainingBucket},
  data() {
    return {
      controlOnStart: true,
      createSession:false,
      session: {
        description: null,
        order: null,
        title: null,
        bank: true,
        isDone: false
      }
    };
  },
  mounted(){
    void this.$store.dispatch('session/getSessions')
  },
  computed: {
    sessions(){
      return this.$store.state.session.sessions
    }
  },
  methods: {
    clearPlan(){
      void this.$store.dispatch('session/clearPlan')
    },
    saveSession: function() {
       void this.$store.dispatch('session/saveSession', this.session).then(res => {
         this.session = {
           description: null,
           order: null,
           title: null,
           bank: true,
           isDone: false
         }
         console.log('res', res);
         this.createSession=false
         this.$q.notify({
           message: res.data.message,
           color: 'green'
         })
       })
    },
    log: function(evt) {
      window.console.log(evt);
    }
  }
});
</script>
