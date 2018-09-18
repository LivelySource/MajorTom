module.exports = member => {
  const guild = member.guild;
  guild.defaultChannel.send(`${member.user.username} was beamed up`);
};