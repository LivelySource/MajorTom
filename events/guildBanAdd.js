module.exports = (guild, user) => {
  guild.defaultChannel.send(`${user.username} was banished!`);
};