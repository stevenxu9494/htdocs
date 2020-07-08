<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col bg-dark text-white">
          <a class="nav-brand">澳驰</a>
        </div>
      </div>
    </div>
    <div class="m-2">
      <div class="form-group m-2">
        <label>姓名<span style="color: red;"> (必须与身份证一致)</span></label>
        <input v-model="$v.order.name.$model" class="form-control" />
        <validation-error v-bind:validation="$v.order.name" />
      </div>
    </div>

    <div class="m-2">
      <div class="form-group m-2">
        <label>电话</label>
        <input v-model="$v.order.mobile.$model" class="form-control" />
        <validation-error v-bind:validation="$v.order.mobile" />
      </div>
    </div>

    <div class="m-2">
      <div class="form-group m-2">
        <label>地址</label>
        <input v-model="$v.order.address.$model" class="form-control" />
        <validation-error v-bind:validation="$v.order.address" />
      </div>
    </div>

    <!-- <div class="m-2">
      <div class="form-group m-2">
        <label>姓名</label>
        <input v-model="$v.order.name.$model" class="form-control" />
        <validation-error v-bind:validation="$v.order.name" />
      </div>
    </div> -->
    <br>
    <div class="text-center">
      <router-link to="/cart" class="btn btn-secondary m-1">
        返回购物车
      </router-link>
      <button class="btn btn-primary m-1" @click="submitOrder">
        确认下单
      </button>
    </div>
  </div>
</template>

<script>


  import { required, numeric } from "vuelidate/lib/validators";
  import ValidationError from "./ValidationError";
  import { mapActions } from "vuex";

  export default {
    components: {ValidationError},
    data: function() {
      return {
        order: {
          name: null,
          mobile: null,
          address: null
        }        
      }
    },
    validations: {
      order: {
        name: {required},
        mobile: {required, numeric},
        address: {required}
      }
    },
    methods: {
      ...mapActions({
        "storeOrder": "storeOrder",
        "clearCart": "cart/clearCartData"
      }),
      async submitOrder() {
        this.$v.$touch();
        if(!this.$v.$invalid) {
          let order = await this.storeOrder(this.order);
          this.clearCart();
          this.$router.push({name: 'thanksPage', params: { id: order }});
        }
      }
    }
  }
</script>