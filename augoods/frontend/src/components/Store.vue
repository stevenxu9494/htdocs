<style type="text/css">
  .modal-overlay {
    position: fixed;
    display: inline-block;
    height: 100vh;
    width: 100%;
    overflow-y: auto;
    padding: 5px;
    display: flex;
    top: 3vh;
    left: 0;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .modal-body{
    text-align: center;
    margin-top: 1vh;
    min-width: 80%;
  }
  #pictures {
    max-width:100%;
  }

</style>
<template>
  <div class="container-fluid">
    <div class="row sticky-top">
      <div class="col bg-dark text-white">
        <a href="/" class="navbar-brand" style="color: inherit;text-decoration: none;"><img style="height:3vh;" src="@/assets/logo.png">澳驰</a>
        <cart-summary />
      </div>
    </div>
    <div class="row">
      <div class="col-3 bg-info p-2">
        <CategoryControls />
      </div>
      <div class="col-9 p-2">
        <Search />
        <product-list />
        {{showHideQR}}
        {{showHideDetail}}
      </div>
    </div>
    <!-- poducts detail modal -->
    <div>
      <div class="modal-overlay" v-if="showHideDetail" v-on:click="hideModal();">
        <div class="modal-body">
          <div v-if="currentProduct.detailUrl.length > 0">
            <div v-for="url in currentProduct.detailUrl" :key="url">
              <img id="pictures" v-bind:src="url">
            </div>
          </div>
          <div v-else>
            <img id="pictures" v-bind:src="currentProduct.imageUrl">
          </div>          
        </div>
      </div>     
    </div>
    <!-- Wechat QR modal -->
    <div>
      <div class="modal-overlay" v-if="showHideQR" v-on:click="hideQRModal();">
        <div class="modal-body">
          <img src="@/assets/wechatQR.jpg">
        </div>
      </div>     
    </div>

  </div>
</template>

<script>
import ProductList from "./ProductList";
import CategoryControls from "./CategoryControls";
import CartSummary from "./CartSummary";
import { mapMutations, mapState} from "vuex";
import { vueWindowSizeMixin } from 'vue-window-size';

import Search from "./Search";

export default {
  mixins:[vueWindowSizeMixin],
  components: { ProductList, CategoryControls, CartSummary, Search },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapState({ showHideDetail: "showHideDetail"}),
    ...mapState({ showHideQR: "showHideQR"}),    
    ...mapState({ currentProduct: "currentProduct"}),
    ...mapState({ curPosition: "curPosition"})
  },
  methods: {
    ...mapMutations(["setShowSearch","setShowHideDetail","setCurPosition","setShowHideQR"]),
    hideModal() {
      this.setShowHideDetail(false);
    },
    hideQRModal() {
      this.setShowHideQR(false);
    },
    handleScroll(){
      this.setCurPosition(document.documentElement.scrollTop)
    }
  }
}
</script>