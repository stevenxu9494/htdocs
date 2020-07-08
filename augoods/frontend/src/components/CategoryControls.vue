<template>
  <div class="container-fluid">
    <div class="row my-2" v-for="c in categories" v-bind:key="c">
      <button class="btn btn-block"
        v-on:click="setCurrentCategory(c)"
        v-bind:class="c == currentCategory
          ? 'btn-primary' : 'btn-secondary'">
        {{ c }}
      </button>
    </div>
    <div class="m-1 text-center">
      <p style="font-weight:bold;">扫描二维码添加客服</p>
      <img style="max-width:100%; max-height:100%;" src="@/assets/wechatQR.jpg">
    </div>
    
  </div>
</template>
<script>
  import { mapState, mapGetters, mapActions } from "vuex";

  export default {
    computed: {
      ...mapState(["currentCategory"]),
      ...mapGetters(["categories"])
    },
    methods: {
      ...mapActions(["setCurrentCategory"])
    }
  }
</script>