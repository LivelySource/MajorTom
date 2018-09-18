const facts = [
  'When Britney Spears books into hotels she uses the name *Allota Warmheart* so that nobody will recognize her."',
  'The human heart creates enough pressure to squirt blood 30 ft.',
  'Strawberries have more vitamin c than oranges.',
  'Burt Reynolds is a Cherokee Indian.',
  'The bagpipe was first made from the liver of a sheep.',
  'Rubberbands last longer when refrigerated.',
  'If a Lobster loses an eye, it will grow another one.',
  'An ounce of platinum can be stretched 10,000 feet.',
  'Male hospital patients fall out of bed twice as often as female hospital patients.',
  'Even Antarctica has an area code. It?s 672.',
  'Over 50% of lottery players go back to work after winning the jackpot.',
  '68 percent of a Hostess Twinkie is air!',
  'It takes 3,000 cows to supply the NFL with enough leather for a year\'s supply of footballs.',
  'Dandelion root can be roasted and ground as a coffee substitute.',
  'A person infected with the SARS virus, has a 95-98% chance of recovery.',
  'Justin Timberlake\'s half-eaten french toast sold for over $3,000 on eBay!',
  'Each year, more than 50,000 people are injured by jewelry in the U.S',
  'Of all the words in the English language, the word set has the most definitions!',
  'For every gallon of sea water, you get more than a quarter pound of salt.',
  'When your face blushes, the lining of your stomach turns red, too.',
  'A bird *chews* with its stomach.',
  'When a person dies, hearing is usually the last sense to go.',
  'It was once against the law to have a pet dog in a city in Iceland!',
  'Coffee drinkers have sex more frequently than non-coffee drinkers.',
  'Tell _Lively to add more Facts to the command'
]

exports.run = (client, message) => {
  message.channel.send('After a long search, a random fact has appeared\n```' + facts[Math.floor(Math.random() * facts.length)] + '```')
    };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'fact',
  description: 'Generates Random Facts',
  usage: 'fact'
};