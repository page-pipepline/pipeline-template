<template>
<div class="info-container">
  <div class="title">{{config.title}}</div>
  <div v-for="(oneInfo, index) in config.infoList"
   :key="index"
   class="info">
    <div class="one-info">
      {{oneInfo.info}}
    </div>
  </div>
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
};
</script>

<style lang="less" scoped>
.info-container {
  font-family: "Lato","Helvetica Neue",Helvetica,Arial,sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: auto;
  background-color: #FFFFFF;
  color: #62ab17;
}

.title {
 padding: 10px;
 font-size: 28px;
 font-weight: bold;
}

.info {
  padding-bottom: 10px;
}

.one-info {
 font-size: 20px;
  display: flex;
}
</style>
