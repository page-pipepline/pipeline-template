<template>
<div class="gap-container"
  :style="styleObject">
  <p>{{config.text}}</p>
</div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true
    },
  },
  computed: {
    styleObject() {
      return {
        height: `${this.config.height}px`,
        color: this.config.textColor,
        backgroundColor: this.config.backgroundColor,
      };
    }
  }
};
</script>

<style lang="less" scoped>
.gap-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
