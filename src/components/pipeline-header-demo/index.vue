<template>
<div class="header-container">
  <div class="title">{{config.title}}</div>
  <div class="header">
    <img class="header__img"
    :src="config.src"
    @click="imgClick">
  </div>
</div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  methods: {
    imgClick() {
      window.location.href = this.config.link;
    }
  }
};
</script>

<style lang="less" scoped>
.header-container {
  margin: 0 0 16px 0;
}

.title {
  font-family: "Lato","Helvetica Neue",Helvetica,Arial,sans-serif;
  padding: 10px 0;
  font-size: 20px;
  color: white;
  text-align: center;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;

  &__img {
    border-radius: 8px;
    max-width: 240px;
    max-height: 240px;
    cursor: pointer;
  }
}
</style>
