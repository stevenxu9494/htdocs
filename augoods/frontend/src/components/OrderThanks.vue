<template>

  <div class="m-2 text-center">
    <h2>订单完成!</h2>
    <br>
    <p>感谢您完成订单，您的订单号码为 #{{ orderId }}。</p>

    <div v-for="o in orders" v-bind:key="o.id">
      <div v-if="o.id==orderId">
        <ul v-for="p in o.cartLines" v-bind:key="p.product" >
          {{ p.product.name }} : {{p.quantity}} * {{ p.product.sellPrice | currency}}
        </ul>
        <p>商品总价：{{total | currency}}</p>
      </div>
    </div>
    <p>扫描下方二维码付款完成订单，付款成功后联系客服，我们会尽快邮寄您的货物。</p>
    <div>
      <img style="max-width:30vw;max-height:30vh; margin:10px;" src=@/assets/wechatReceiveQR.png>
      <img style="max-width:30vw;max-height:30vh; margin:10px;" src=@/assets/AliReceiveQR.jpg>
    </div>
    <br>
    <p>官方客服微信号: sorrow_day 或扫描下方二维码</p>
    <div>
      <img style="max-width:50vw;max-height:50vh;" src=@/assets/wechatQR.jpg>
    </div>
    <br>
    <router-link to="/" class="btn btn-primary" v-on:click.native="hideModal();">返回商店</router-link>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    computed: {
      ...mapState({ orders: "orders"}),
      orderId() {
        return this.$route.params.id
      },
      total() {
        let total = 0
        var i;
        var j;
        for (i=0; i < this.orders.length; i++) {
          if(this.orders[i].id==this.$route.params.id){
            for (j=0; j< this.orders[i].cartLines.length; j++){
              total += this.orders[i].cartLines[j].product.sellPrice * this.orders[i].cartLines[j].quantity; 
            }            
          }
        }
        return total
        // totalPrice: state => state.lines.reduce((total, line) => total + (line.quantity * line.product.sellPrice), 0),
      }
    },
    methods: {
      ...mapMutations(["setShowHideDetail"]),
      ...mapActions({
        getOrder:"getOrder",
      }),
      hideModal() {
        this.setShowHideDetail(false);
      }
    },
    created() {
      this.getOrder();
    }
  }
</script>