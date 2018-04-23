module.exports = {
  title: '头部区',
  type: 'object',
  properties: {
    title: {
      title: '头部标题',
      type: 'string',
      default: '头部标题',
    },
    src: {
      title: '头部图片',
      description: '试试输入新的图片URL: https://vuejs.org/images/logo.png',
      type: 'string',
      default: '头部图片'
    },
    link: {
      title: '头部图片点击跳转',
      type: 'string',
      format: 'url',
      default: '头部图片点击跳转',
    }
  }
};
