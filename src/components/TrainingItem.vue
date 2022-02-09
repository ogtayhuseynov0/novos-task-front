<template>
    <q-card class="q-ma-xs q-pa-md " flat bordered :class="item.isDone?' bg-green-1' : ''">
      <div class="row ">
        <div class="col-1  row items-center  justify-around list-group-item">
          <q-avatar class="list-group-item"  icon="drag_handle">
          </q-avatar>
        </div>
        <div class="col-9 column ">
          <div>{{item.title}}</div>
          <div>{{item.description}}</div>
        </div>
        <div class="col-2 row items-center  justify-around">
          <q-btn flat  round :icon="!item.bank? 'task_alt': 'add'" @click="$emit(!item.bank? item.isDone? 'unDone':'doneTask':'addToBank' )" :color="item.isDone? 'green':''"/>
          <q-btn flat round icon="delete" @click="$emit('delete')"/>
        </div>
      </div>
    </q-card>
</template>

<script lang="ts">
import {TrainingSession} from 'components/models';

export default {
  props: {
    item: Object as unknown as TrainingSession
  },
  name: 'TrainingItem'
}
</script>

<style scoped>

</style>
