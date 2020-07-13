<template>
  <div>
    <div v-for="p in products" v-bind:key="p.id" class="card m-1 p-1 bg-light" >
      <div v-on:click = "showModal();selectProduct(p);" style="cursor:pointer;">
        <img v-bind:src="p.thumbUrl" style="float:left;width:30%;height:35%;"/>
        <h4>
          {{p.name}}
          <span class="badge badge-pill badge-primary float-right">
            {{ p.sellPrice | currency}}
          </span>
        </h4>
        <div class="card-text bg-white p-1">
          <p>品牌： {{ p.brand }}</p>
          <p>重量： {{ p.netWeight }}g</p>
          <p>销量： {{ p.sales }}</p>
          <button class="btn btn-success btn-sm float-right" v-on:click="handleProductAdd(p)">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;&nbsp;加入购物车
          </button>
        </div>
      </div>      
    </div>
    <page-controls />
  </div>
</template>

<script>

import { mapGetters, mapMutations } from "vuex";
import PageControls from "./PageControls";

export default {
  components: {PageControls},
  computed: {
    ...mapGetters({ products: "processedProducts" })
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat("zh-CN",
      { style: "currency", currency: "CNY"}).format(value);
    }
  },
  methods:{
    ...mapMutations(["setShowHideDetail"]), 
    ...mapMutations(["setCurrentProduct"]),
    ...mapMutations({ addProduct: "cart/addProduct" }),
    handleProductAdd(product) {
      this.addProduct(product);
      this.$router.push("/cart");
    },
    showModal() {
      this.setShowHideDetail(true);
    },
    selectProduct(product){
      this.setCurrentProduct(product);
    }
  }
}
</script>