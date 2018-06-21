<template>
  <div class="vue-main">
    <component
      v-for="oneComponent in pipelineComponents"
      :key="oneComponent.id"
      :is="oneComponent.name"
      :data-component-id="oneComponent.id"
      :data-component-name="oneComponent.name"
      :config="oneComponent.data">
    </component>
  </div>
</template>

<script>
import 'static/css/app.less';
import mycomponents from './config/components';

export default {
  components: {
    'pipeline-header-demo': () => import('comp/pipeline-header-demo'),
    'pipeline-info-demo': () => import('comp/pipeline-info-demo'),
    'pipeline-gap-demo': () => import('comp/pipeline-gap-demo'),
    'pipeline-weather-demo': () => import('comp/pipeline-weather-demo'),
  },
  data() {
    const pipelineComponents = (typeof window !== 'undefined') ?
      window.INIT_DATA || mycomponents : mycomponents;
    return {
      pipelineComponents,
    };
  },
};
</script>

<style>
.vue-main {
  -webkit-overflow-scrolling: touch;
  height: 100%;
}

.vue-main-view {
  -webkit-overflow-scrolling: touch;
  height: 100%;
}
</style>
