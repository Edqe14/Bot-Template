module.exports = exports = {
  name: 'example',
  description: 'example command',
  cooldown: 10,
  permissions: null,
  aliases: [],
  usage: '',
  run (_, message) {
    message.channel.send('test')
  }
}
