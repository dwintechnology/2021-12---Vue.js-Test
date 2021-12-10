<template>
  <div class="header-desks">
    <div>
      <div class="pannel">
        <b-button variant="primary" v-b-modal.modal-1>Add desk</b-button>
        <b-button variant="success" v-b-toggle.sidebar-1>Show Desks List</b-button>
        <b-file class="upload-file" @change="previewFiles" plain></b-file>
        <b-button @click="saveData" variant="danger">Save Data</b-button>
      </div>
    </div>
    <div>
      <modal-desk :onOk="addNewDesk" id="modal-1" />
    </div>
    <b-sidebar id="sidebar-1" title="Desks List" right shadow>
      <desks-list :desks="this.desks" @setDesks="setDesks" />
    </b-sidebar>
  </div>
</template>

<script>
import ModalDesk from './modals/ModalDesk';
import DesksList from './DesksList';

export default {
  name: 'HeaderOficePlan',
  components: {
    ModalDesk,
    DesksList,
  },
  props: {
    desks: { type: Array },
    oficePlan: { type: String },
  },
  methods: {
    previewFiles(e) {
      const file = e.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.$emit('setOficePlan', reader.result);
      };
    },
    addNewDesk(desk) {
      this.$emit('setDesk', [
        ...this.desks,
        {
          ...desk,
          id: Math.random()
            .toString(36)
            .slice(2),
        },
      ]);
    },

    setDesks(desks) {
      this.$emit('setDesks', desks);
    },

    async saveData() {
      localStorage.oficePlan = this.oficePlan;
      const newDesks = this.desks.map(el => JSON.stringify(el));
      localStorage.desks = '[' + newDesks.toString() + ']';
    },
  },
};
</script>

<style lang="scss">
.header-desks {
  .upload-file {
    width: 250px !important;
  }
  .pannel {
    padding: 15px 40px;
    display: flex;
    align-content: center;
    box-shadow: 0px 0px 9px 0px #dadada;
    button {
      margin-right: 15px;
    }
  }
}
</style>
