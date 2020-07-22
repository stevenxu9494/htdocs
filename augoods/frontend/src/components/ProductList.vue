<template>
  <div>
    <div v-if="pageCount==0">
      <h5 class="text-center">
        亲，暂时找不到您搜索的商品，请重新输入或联系客服~
      </h5>
    </div>
    <div v-for="p in products" v-bind:key="p.id" class="card m-1 p-1 bg-white" >
      <div v-on:click = "showModal();selectProduct(p);" style="cursor:pointer;">
        <div style="height:9vh;">
          <img v-bind:src="p.thumbUrl" style="float:left;max-width:40%;max-height:100%;"/>
          <h5>
            {{p.name}}
          </h5>
        </div>
        
        <br>
        <div class="card-text bg-light p-1" v-if="p.price!='0.00'">
          <span class="badge badge-pill badge-warning float-right">
            ￥{{ p.sellPrice}}
          </span>
          <p>品牌： {{ p.brand }}</p>
          <button class="btn btn-success btn-sm float-right" v-on:click="handleProductAdd(p)">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;&nbsp;加入购物车
          </button>
          <p>重量： {{ p.netWeight }}g</p>
        </div>
        <div class="card-text bg-white p-1" v-else>
          <span class="badge badge-pill badge-warning float-right">
            价格波动，请联系客服
          </span>
          <p>品牌： {{ p.brand }}</p>
          <p>重量： {{ p.netWeight }}g</p>
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
    ...mapGetters({ products: "processedProducts" }),
    ...mapGetters(["pageCount"])
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