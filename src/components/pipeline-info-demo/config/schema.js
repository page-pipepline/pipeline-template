module.exports = {
  type: 'object',
  title: '信息区',
  properties: {
    title: {
      title: '信息标题',
      type: 'string',
      default: '信息标题',
    },
    infoList: {
      title: '信息列表',
      description: '试试删除或上下移动信息项',
      type: 'array',
      items: {
        type: 'object',
        title: '信息',
        properties: {
          info: {
            title: '信息文本',
            type: 'string',
            default: '信息文本',
          },
        }
      },
    }
  }
};
