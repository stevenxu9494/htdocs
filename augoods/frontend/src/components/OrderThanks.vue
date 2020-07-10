<template>

  <div class="m-2 text-center">
    <h2>订单完成!</h2>
    <br>
    <p>感谢您完成订单，您的订单号码为 #{{ orderId }}。</p>
    <p>扫描下方二维码付款完成订单，付款成功后联系客服，我们会尽快邮寄您的货物。</p>
    <div>
      <img style="height:30vh; margin:10px;" src=@/assets/wechatReceiveQR.png>
      <img style="height:30vh; margin:10px;" src=@/assets/AliReceiveQR.jpg>
    </div>
    <br>
    <router-link to="/" class="btn btn-primary" v-on:click.native="hideModal();">返回商店</router-link>
  </div>
</template>

<script>
  import { mapMutations } from "vuex";

  export default {
    computed: {
      orderId() {
        return this.$route.params.id
      }
    },
    methods: {
      ...mapMutations(["setShowHideDetail"]),
      hideModal() {
        this.setShowHideDetail(false);
      }
    }
  }
</script>