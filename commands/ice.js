exports.run = (client, message) => {
  message.channel.send('lissen dood')
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ice',
  description: 'what would ice say?',
  usage: 'ice'
};