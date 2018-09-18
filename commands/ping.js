exports.run = (client, message) => {
  message.channel.send('Looking for the ping...')
    .then(msg => {
      msg.edit(`*PING*: (took: ${msg.createdTimestamp - message.createdTimestamp}ms)`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Checks the Bot\'s connection.',
  usage: 'ping'
};