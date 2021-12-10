import Vue from 'vue';

import FabricCanvas from './FabricCanvas.vue';
import FabricImageFromURL from './FabricImageFromURL.vue';

const VueFabricWrapper = {
  FabricCanvas,
  FabricImageFromURL,
};

Object.keys(VueFabricWrapper).forEach(name => {
  Vue.component(name, VueFabricWrapper[name]);
});

export default VueFabricWrapper;
export { FabricCanvas, FabricImageFromURL };
