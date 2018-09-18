const answers = [
  'Signs point to yes.',
  'Yes.',
  'Reply hazy, try again.',
  'Without a doubt.',
  'My sources say no.',
  'As I see it, yes.',
  'You may rely on it.',
  'Concentrate and ask again.',
  'Outlook not so good.',
  'It is decidedly so.',
  'Better not tell you now.',
  'Very doubtful.',
  'Yes - definitely.',
  'It is certain.',
  'Cannot predict now.',
  'Most likely.',
  'Ask again later.',
  'My reply is no.',
  'Outlook good.',
  'Don\'t count on it.',
  'Who cares?',
  'Never, ever, ever.',
  'Possibly.',
  'There is a small chance.'
]

exports.run = (client, message) => {
  message.channel.send('The Magic 8 Ball says:\n```' + answers[Math.floor(Math.random() * answers.length)] + '```')
    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['8ball'],
  permLevel: 0
};

exports.help = {
  name: 'magic8ball',
  description: 'Give it a shake!',
  usage: '8ball'
}