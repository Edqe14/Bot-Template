module.exports = exports = {
  name: 'example',
  description: 'example command',
  args: null,
  cooldown: 10,
  permissions: null,
  aliases: [],
  usage: '',
  nsfw: false,
  run (_, message) {
    message.channel.send('test')
  }
}
