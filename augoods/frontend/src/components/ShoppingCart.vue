<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col bg-dark text-white">
        <a class="navbar-brand">澳驰</a>
      </div>
    </div>
    <div class="row">
      <div class="col mt-2">
        <h2 class="text-center">购物车</h2>
        <table class="table table-bordered table-striped p-2">
          <thead>
            <tr>
              <th>产品</th><th>单价</th>              
              <th class="text-right">数量</th>
              <th class="text-right">总价</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="lines.length==0">
              <td colspan="4" class="text-center">
                亲，您的购物车暂无商品~
              </td>
            </tr>
            <cart-line v-for="line in lines" v-bind:key="line.product.id" 
              v-bind:line="line" 
              v-on:quantity="handleQuantityChange(line,$event)" 
              v-on:remove="remove" />
          </tbody>
          <tfoot v-if="lines.length > 0">
            <tr>
              <td colspan="3" class="text-right">总计</td>
              <td class="text-right">
                {{ totalPrice | currency }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="text-center">
          <router-link to="/" class="btn btn-success m-1">
            继续购物
          </router-link>
          <router-link to="/checkout" class="btn btn-primary m-1"
            v-bind:diabled="lines.length==0">
            确认下单
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import CartLine from "./ShoppingCartLine";

export default {
  components: { CartLine },
  computed: {
    ...mapState({ lines: state => state.cart.lines}),
    ...mapGetters({ totalPrice: "cart/totalPrice"})
  },
  methods: {
    ...mapMutations({
      change: "cart/changeQuantity",
      remove: "cart/removeProduct"
    }),
    handleQuantityChange(line, $event) {
      this.change({ line, quantity:$event});
    }
  }
}
</script>