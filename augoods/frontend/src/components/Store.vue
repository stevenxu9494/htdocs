<style type="text/css">
  * {
    margin: 0;
    padding: 0;
  }

  .modal-overlay {
    position: absolute;
    display: inline-block;
    max-width: 100%;
    height: auto;
    padding: 5px;
    display: flex;
    min-height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    
    width: 100%;
    max-width: 400px;
    background-color: #FFF;
    border-radius: 16px;
    
    padding: 25px;
  }
  .modal-body{
    text-align: center;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: transform .5s;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translateY(-50%) translateX(100vw);
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

    <!-- 显示隐藏详情 -->
    <div id="application">
      <div class="modal-overlay" v-if="showHideDetail" v-on:click="hideModal();">
        <div class="modal-body" ref="modal1">
          <!-- <img id="detail" v-bind:src="currentProduct.imageUrl"> -->
          <div v-if="currentProduct.detailUrl.length > 0">
            <div v-for="url in currentProduct.detailUrl" :key="url">
              <img id="detail" v-bind:src="url" style="max-width:300px">
            </div>
          </div>
          <div v-else>
            <img id="detail" v-bind:src="currentProduct.imageUrl" style="max-width:300px">
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
import Search from "./Search";
export default {
  components: { ProductList, CategoryControls, CartSummary, Search },
  computed: {
    ...mapState({ showHideDetail: "showHideDetail"}),
    ...mapState({ currentProduct: "currentProduct"})
  },
  methods: {
    ...mapMutations(["setShowSearch","setShowHideDetail"]),
    hideModal() {
      this.setShowHideDetail(false);
    }
  },

  //   var curHeight = this.setHeight(window.getComputedStyle(this.$refs.modal1).height)
}
</script>