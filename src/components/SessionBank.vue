<template>
  <div>
    <draggable class="draggable-list" :list="sessions"          :group="{ name: 'people', pull: 'clone', put: false }"
               :clone="cloneSession"
                 item-key="order" tag="transition-group"
               :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }" @start="drag = true"
               @end="drag = false"
               v-bind="dragOptions">
      <template #item="{element}">
        <TrainingItem :item="element" @delete="deleteItem(element)" @addToBank="$store.dispatch('session/addToPlan', element)"></TrainingItem>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import TrainingItem from 'components/TrainingItem.vue';


export default {
  name: 'SessionBank',
  components: {TrainingItem, draggable},
  data() {
    return {
      drag: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      sessions: this.stateSessions
    }
  },
  methods: {
    cloneSession(item) {
      return {
        ...item, bank:false
      };
    },
    deleteItem(element){
      this.$store.dispatch('session/deleteSession', element.id)
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
      return this.$store.state.session.sessions.filter(a => a.bank)
    }
  },
  watch: {
    stateSessions: function (val) {
      this.sessions = val.filter(a=> a.bank === true)
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
