<template>
  <div v-if="show" class="text-danger">
    <div v-for="m in messages" v-bind:key="m">
      {{ m }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["validation"],
  computed: {
    show() {
      return this.validation.$dirty && this.validation.$invalid
    },
    messages() {
      let messages = [];
      if (this.validation.$dirty) {
        if (this.hasValidationError("required")) {
          messages.push("请输入真实信息，以便清关")
        } else if (this.hasValidationError("numeric")) {
          messages.push("请输入正确的手机号(仅支持数字)")
        }
      }
      return messages;
    }
  },
  methods: {
    hasValidationError(type) {
      // this.validation.$params.hasOwnProperty(type) &&         
      return !this.validation[type];
    }
  }
}

</script>