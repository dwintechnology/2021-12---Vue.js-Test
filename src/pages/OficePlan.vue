<template>
  <div>
    <div>
      <header-ofice-plan
        :desks="desks"
        :oficePlan="oficePlan"
        @setDesks="setDesks"
        @setOficePlan="setOficePlan"
      />
      <fabric-canvas
        :key="this.desks"
        :id="'oficePlan'"
        :height="platform.height"
        :width="platform.width"
        :style="{
          backgroundImage: 'url(' + oficePlan + ')',
          width: platform.width + 'px',
          height: platform.height + 'px',
        }"
        class="convas-ofice-plan"
      >
        <FabricImageFromUrl
          v-for="d in desks"
          :key="d.id"
          :id="d.id"
          :left="d.left"
          :top="d.top"
          :scaleX="+d.width / 170"
          :scaleY="+d.height / 170"
          :url="d.imgUrl"
          :text="d.text"
          @setDesk="setDesk"
        ></FabricImageFromUrl>
      </fabric-canvas>
    </div>
  </div>
</template>

<script>
import vueFabricWrapper from '../plugins/';
import FabricImageFromUrl from '../plugins/FabricImageFromURL';
import HeaderOficePlan from '../components/HeaderOficePlan';

export default {
  name: 'OficePlan',
  components: {
    FabricCanvas: vueFabricWrapper.FabricCanvas,
    FabricImageFromUrl,
    HeaderOficePlan,
  },
  data() {
    return {
      platform: {
        width: 1000,
        height: 1000,
      },
      desks: JSON.parse(localStorage?.desks || '[]') || [],
      oficePlan:
        localStorage.oficePlan ||
        'https://www.marcelleguilbeau.com/wp-content/uploads/2016/08/MedicalCenter-Colorado-7-thumb.jpg',
    };
  },
  methods: {
    setDesks(desks) {
      this.desks = [...desks];
    },
    setOficePlan(oficePlan) {
      this.oficePlan = oficePlan;
    },
    setDesk(data) {
      this.desks = this.desks.map(el => {
        if (el.id === data.id) {
          if (data.params.scaleX)
            return {
              ...el,
              width: data.params.scaleX * el.width,
              height: data.params.scaleY * el.height,
            };

          return { ...el, ...data.params };
        }
        return el;
      });
    },
  },
};
</script>

<style lang="scss">
.convas-ofice-plan {
  margin: 50px auto;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
