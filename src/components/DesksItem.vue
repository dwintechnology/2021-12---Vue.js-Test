<template>
  <div class="desk-item">
    <div>
      <span class="label">Number</span>
      <span class="value">{{ desk.text }}</span>
    </div>
    <img :src="desk.imgUrl" width="50" />
    <div>
      <span class="label">Width</span>
      <span class="value">{{ Math.round(desk.width) }}</span>
    </div>
    <div>
      <span class="label">Height</span>
      <span class="value">{{ Math.round(desk.height) }}</span>
    </div>
    <div>
      <span class="label">Del</span>
      <span class="delete" @click="() => onDelete(desk)">
        <trash-svg width="20" height="20" />
      </span>
    </div>
  </div>
</template>

<script>
import TrashSvg from '../assets/icons/TrashSvg';

export default {
  name: 'DesksItem',
  components: {
    TrashSvg,
  },
  props: {
    desk: { type: Object, default: Object },
  },
  data() {
    return {
      selected: [],
    };
  },
  methods: {
    onDelete(desk) {
      this.$emit('onDelete', desk);
    },
  },
};
</script>

<style lang="scss">
.desk-item {
  display: flex;
  justify-content: space-between;
  border: 1px solid #dadada;
  border-radius: 5px;
  margin: 4px 15px;
  padding: 5px 15px;
  text-align: center;
  & > div {
    display: flex;
    flex-direction: column;
    .label {
      font-weight: 600;
      font-size: 16px;
    }
    .value {
      font-weight: 400;
      font-size: 14px;
    }
    .delete {
      &:hover {
        cursor: pointer;
        svg {
          fill: rgb(255, 96, 96);
        }
      }
    }
  }
}
</style>
