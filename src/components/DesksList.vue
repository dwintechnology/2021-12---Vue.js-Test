<template>
  <div>
    <desks-item v-for="desk in desks" :key="desk.id" :desk="desk" @onDelete="deleteDesk" />
  </div>
</template>

<script>
import DesksItem from './DesksItem';

export default {
  name: 'DesksList',
  components: {
    DesksItem,
  },
  props: {
    desks: { type: Array, default: Array },
  },
  data() {
    return {
      selected: [],
    };
  },
  methods: {
    deleteDesk(desk) {
      this.$emit(
        'setDesks',
        this.desks.filter(el => el.id !== desk.id)
      );
    },
  },
};
</script>
