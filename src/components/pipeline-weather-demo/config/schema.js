module.exports = {
  type: 'object',
  title: '天气查询示例',
  properties: {
    city: {
      title: '城市',
      description: '试试输入你所在的城市',
      type: 'string',
      default: '深圳',
    }
  }
};
