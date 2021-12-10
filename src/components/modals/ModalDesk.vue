<template>
  <div>
    <b-modal
      :id="this.id"
      title="Add New Desk"
      ok-title="Add Desk"
      @ok="() => this.onOk({ ...initialForm })"
    >
      <div>
        <b-form class="form">
          <div class="wh">
            <b-form-group id="input-group-1" label="Desk Width" label-for="input-1">
              <b-form-input
                v-model="initialForm.width"
                type="number"
                placeholder="Width"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Desk Height" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="initialForm.height"
                type="number"
                placeholder="Height"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Desk Number" label-for="input-4">
              <b-form-input
                id="input-4"
                v-model="initialForm.text"
                type="number"
                placeholder="Number"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div>
            <b-form-radio-group
              id="radio-group-3"
              v-model="initialForm.imgUrl"
              name="radio-sub-component"
              class="wh"
            >
              <b-form-radio
                v-for="type in deskTypes"
                posinset="bottom"
                :key="type.type"
                :value="type.img"
              >
                <img :src="type.img" width="50" />
              </b-form-radio>
            </b-form-radio-group>
          </div>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { DESK, DESK_TYPES } from '../../constants';

export default {
  name: 'ModalDesk',
  props: {
    onOk: { type: Function, required: true },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      initialForm: DESK,
      deskTypes: DESK_TYPES,
    };
  },
};
</script>

<style lang="scss">
.form {
  width: 300px;
  .wh {
    display: flex !important;
    justify-content: space-between;
    input {
      width: 94px;
    }
  }
  .custom-control {
    padding-left: 0rem;
    padding-bottom: 1.5rem;
  }
  .custom-control-inline {
    margin-right: 0rem;
  }
  .custom-control-label::before {
    position: absolute;
    top: 55px;
    left: 16px;
    display: block;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    content: '';
    background-color: #fff;
    border: #adb5bd solid 1px;
  }
  .custom-control-label::after {
    position: absolute;
    top: 55px;
    left: 16px;
    display: block;
    width: 1rem;
    height: 1rem;
    content: '';
    background: no-repeat 50% / 50% 50%;
  }
}
</style>
