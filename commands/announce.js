const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You clearly don\'t have permission for that");
  let botmessage = args.join(" ");
  message.delete().catch();
  message.channel.send(botmessage);
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ac'],
  permLevel: 2
}
module.exports.help = {
  name: 'announce',
  description: 'Make an announcement',
  usage: 'ac [message]'
}