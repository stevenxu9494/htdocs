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
      <p style="font-weight:bold;color:#FFFFFF;">官方微信二维码</p>
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