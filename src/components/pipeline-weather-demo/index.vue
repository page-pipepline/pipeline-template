<template>
<div class="weather-container">
  <div class="weather-container__title">查询天气(动态接口示例)</div>
  <div class="weather__title">
    {{config.city}}
  </div>
  <ul class="weather__info">
    <li>
      <label class="weather-info__label">温度</label>
      <span class="weather-info__value">{{weather.temperature}}℃ / {{weather.humidity}}℉</span>
    </li>
    <li>
      <label class="weather-info__label">气象</label>
      <span class="weather-info__value">{{weather.weather}}</span>
    </li>
    <li>
      <label class="weather-info__label">风向</label>
      <span class="weather-info__value">{{weather.winddirection}}</span>
    </li>
  </ul>
</div>
</template>

<script>
// 使用高德地图查询接口
const weatherAPI = 'https://restapi.amap.com/v3/weather/weatherInfo';
const weatherKey = '923d9762b87a6c7317a741b0bfe6e2d8';

export default {
  props: {
    config: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      weatherInfo: {},
    };
  },
  async mounted() {
    this.weatherInfo = await this.queryWeatherInfo();
  },
  methods: {
    async queryWeatherInfo() {
      return fetch(`${weatherAPI}?key=${weatherKey}&city=${this.config.city}`)
        .then(res => res.json())
        .catch(e => console.log('查询天气接口报错:', e)); // eslint-disable-line no-console
    }
  },
  computed: {
    weather() {
      if (this.weatherInfo && this.weatherInfo.lives && this.weatherInfo.lives.length > 0) {
        return this.weatherInfo.lives[0];
      }
      return {};
    }
  }
};
</script>

<style lang="less" scoped>
.weather-container {
  font-family: "Lato","Helvetica Neue",Helvetica,Arial,sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    margin: 20px 0 10px;
    font-size: 18px;
  }
}

.weather {
 &__title {
   font-size: 28px;
   margin: 5px;
   font-weight: bold;
 }
 &__info {
  list-style: none;
 }
}

.weather-info {
  &__label {
    font-size: 18px;
    padding: 0 10px 0 0;
  }
  &__value {
    font-size: 18px;
    color: lightskyblue;
  }
}

</style>
