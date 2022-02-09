<template>
  <div>
    <draggable class="draggable-list" v-model="sessions"   group="people" item-key="id" tag="transition-group"
               :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }" @start="drag = true"
               @change="log"
               @end="drag = false"
               v-bind="dragOptions">
      <template #item="{element}">
        <TrainingItem :item="element" @delete="$store.dispatch('session/removeFromPlan', element)" @doneTask="$store.dispatch('session/doneTask', element)"
                      @unDone="$store.dispatch('session/undoneTask', element)"></TrainingItem>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import TrainingItem from 'components/TrainingItem.vue';


export default {
  props: ['bank'],
  name: 'TrainingBucket',
  components: {TrainingItem, draggable},
  data() {
    return {
      drag: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      sessions: []
    }
  },
  methods:{
    log: function(evt) {
      if (evt.hasOwnProperty('added')){
        this.$store.dispatch('session/addToPlan', evt.added.element)
      }else if (evt.hasOwnProperty('removed')){
        this.$store.dispatch('session/removeFromPlan', evt.removed.element)
      } else if (evt.hasOwnProperty('moved')){
        console.log(this.sessions);
        this.$store.dispatch('session/movePlanTask', this.sessions)
      }
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };
    },
    stateSessions() {
      return this.$store.state.session.sessions.filter(a => !a.bank)
    }
  },
  watch: {
    stateSessions: function (val) {
      this.sessions = val.filter(a=> !a.bank).sort((a,b) => a.order-b.order>0?1:-1)
    }
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.8;
  background: #c8ebfb;
}
.list-group-item {
  cursor: move;
}
.draggable-list {
  min-height: 40px !important;
}
</style>
