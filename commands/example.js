module.exports = exports = {
  name: 'example',
  description: 'example command',
  args: null,
  cooldown: 10,
  permissions: null,
  aliases: [],
  usage: '',
  run (_, message) {
    message.channel.send('test')
  }
}
