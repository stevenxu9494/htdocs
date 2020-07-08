<template>
  <div class="float-right">    
    <router-link to = "/cart" class="btn btn-sm bg-dark text-white" 
      v-bind:disabled="itemCount == 0">
      <i class="fa fa-shopping-cart"></i>
      <small>      
        购物车：
        <span v-if="itemCount >0">
          {{ itemCount }} 件商品
          共计 {{ totalPrice | currency }}
        </span>
        <span v-else>
          (空)
        </span>
      </small>     
    </router-link>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        itemCount:"cart/itemCount",
        totalPrice: "cart/totalPrice"
      })
    }
  }
</script>