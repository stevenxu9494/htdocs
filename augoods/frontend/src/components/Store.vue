<style type="text/css">
  .modal-overlay {
    position: fixed;
    display: inline-block;
    max-height: 100vh;
    width: 100%;
    overflow-y: auto;
    padding: 5px;
    display: flex;
    top: 3vh;
    left: 0;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    width: 100%;
    max-width: 100%;
    background-color: #FFF;
    border-radius: 16px;
    padding: 25px;
  }
  .modal-body{
    text-align: center;
    margin-top: 1vh;
    min-width: 80%;
  }
  #detail {
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
      </div>
    </div>
    <!-- modal -->
    <div>
      <div class="modal-overlay" v-if="showHideDetail" v-on:click="hideModal();" style="margin-top:{{curPosition}}px">
        <div class="modal-body">
          <div v-if="currentProduct.detailUrl.length > 0">
            <div v-for="url in currentProduct.detailUrl" :key="url">
              <img id="detail" v-bind:src="url" style="max-width:{{windowWidth}}px">
            </div>
          </div>
          <div v-else>
            <img id="detail" v-bind:src="currentProduct.imageUrl" style="max-width:{{windowWidth}}px">
          </div>          
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
    ...mapState({ currentProduct: "currentProduct"}),
    ...mapState({ curPosition: "curPosition"})
  },
  methods: {
    ...mapMutations(["setShowSearch","setShowHideDetail","setCurPosition"]),
    hideModal() {
      this.setShowHideDetail(false);
    },
    handleScroll(){
      this.setCurPosition(document.documentElement.scrollTop)
      console.log(document.documentElement.scrollTop);
    }
  }
}
</script>