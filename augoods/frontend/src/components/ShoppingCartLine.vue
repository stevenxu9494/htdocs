<template>
  <tr>    
    <td>{{ line.product.name }}</td>
    <td>
      {{ line.product.sellPrice | currency }}
    </td>
    <td class="text-right">
      <input type="number" class="form-control-sm"
        style="width:5em"
        v-bind:value="qvalue"
        v-on:input="sendChangeEvent"/>
    </td>
    <td class="text-right">
      {{ (line.quantity * line.product.sellPrice) | currency }}
    </td>
    <td class="text-center">
      <button class="btn btn-sm btn-danger"
        @click = "sendRemoveEvent">
        <i class="fa fa-trash" aria-hidden="true"></i>&nbsp;&nbsp;
      </button>
    </td>
  </tr>
</template>
<script>
  export default {
    props: ["line"],
    data: function() {
      return {
        qvalue: this.line.quantity
      }
    },
    methods: {
      sendChangeEvent($event) {
        if ($event.target.value > 0) {
          this.$emit("quantity", Number($event.target.value));
          this.qvalue = $event.target.value;
        } else {
          this.$emit("quantity", 0);
          this.qvalue = "";
          $event.target.value = this.qvalue;
        }
      },
      sendRemoveEvent() {
        this.$emit("remove", this.line);
      }
    }
  }
</script>