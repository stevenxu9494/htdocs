<template>
  <div class="container-fluid">
    <div class="row my-0" v-for="c in categories" v-bind:key="c">
      <button class="btn btn-sm btn-block"
        v-on:click="setCurrentCategory(c)"
        v-bind:class="c == currentCategory
          ? 'btn-primary' : 'btn-secondary'">
        {{ c }}
      </button>
    </div>
    <div class="m-1 text-center">
      <h5 style="font-weight:bold;">微信客服</h5>
      <img style="max-width:100%; max-height:100%; cursor:pointer;" src="@/assets/wechatQR.jpg" v-on:click="showQRModal();">
    </div>
    
  </div>
</template>
<script>
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

  export default {
    computed: {
      ...mapState(["currentCategory"]),
      ...mapGetters(["categories"])
    },
    methods: {
      ...mapActions(["setCurrentCategory"]),
      ...mapMutations(["setShowHideQR"]),
      showQRModal() {
        this.setShowHideQR(true);
      }
    }
  }

</script>