<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  provide() {
    // 把表单实例作为参数传递下去，子代可以直接使用
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  }
};
</script>

<style scoped>
</style>