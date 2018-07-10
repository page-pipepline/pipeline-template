module.exports = {
  type: 'object',
  title: '间隔区',
  properties: {
    backgroundColor: {
      title: '间隔区背景色',
      description: '试试修改间隔区背景色',
      type: 'string',
      default: '#FFFF00',
      format: 'color',
    },
    textColor: {
      title: '间隔区文本颜色',
      type: 'string',
      default: '#000000',
      format: 'color',
    },
    text: {
      title: '间隔区文本',
      type: 'string',
      default: '╮(＾ᴗ＾)╭'
    },
    height: {
      title: '间隔区高度',
      description: '试试修改间隔区高度',
      type: 'number',
      default: 40,
    }
  }
};
