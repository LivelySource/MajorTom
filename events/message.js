// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = (client, message) => {

 // It's good practice to ignore other bots. This also makes your bot ignore itself
 // and not get into a spam loop (we call that "botception").
 if (message.author.bot) return;

 // First, we get the settings for this server. If this guild doesn't
 // have it's own settings, we instead get the default settings. Once
 // retrieved, we also bind the settings to the message paramter.
 const settings = message.settings = client.getGuildSettings(message);

 // this checks if the bot was mentioned without having a message
 const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
 // if so, we simply return the bot's prefix in this guild. this is helpful if
 // one guild member has forgotten the prefix for this bot
 if (message.content.match(prefixMention)) return message.reply(`My prefix on this guild is \`${settings.prefix}\``);

 // Also good practice to ignore any message that does not start with our prefix,
 // which is set in the configuration file.
 if (message.content.indexOf(settings.prefix) !== 0) return;


 // Here we separate our "command" name, and our "arguments" for the command.
 // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
 // command = say
 // args = ["Is", "this", "the", "real", "life?"]
 const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
 const commandName = args.shift().toLowerCase();


 // Get the author's permission level.
 const authorsLevel = client.permissionLevel(message);

 // get the command from the client
 const command = client.commands.get(commandName);
 // Once we loaded the command, we first want to see if this
 // command is only allowed to be used in guilds and not in DMs.
 // So, we check if it's only allowed in guilds AND if this
 if (!command) return;

 // Once we loaded the command, we first want to see if this
 // command is only allowed to be used in guilds and not in DMs.
 // So, we check if it's only allowed in guilds AND if this
 // command is executed in a direct message.
 if ((command.config.guildOnly) && (!(message.guild))) return message.reply('This command is only allowed in guilds.');

 // Then, we check the author's permission and compare it with the needed permission level to run
 // this command. The reason why we use '>=' instead of '===' is because then everything is literal,
 // for example an admin (level 2) can't execute a command avaliable for everyone (level 0) which
 // doesn't make sense. Which is why we use '>=', if they're at a certain level then they can be able
 // to run commands that need permissions below them.
 if (authorsLevel < command.config.permissionLevel) {

  // We then check if 'systemNotice' is true, this means that if the
  // author isn't allowed to use this command due to not being the right
  // permission level we *tell* them instead of doing nothing.
  if (settings.systemNotice === "true") return message.channel.send(`You do not have permission to use this command. Your permission level is ${authorsLevel} (${client.getRole(authorsLevel)}) while this command requires a level ${command.config.permissionLevel}.`)

 }

 // to simplify things, we bind the author's level and
 // role name to the message
 message.author.permissionLevel = authorsLevel;
 message.author.role = client.levelCache[authorsLevel];

 // If the command exists, **AND** the user has permission, run it.
 client.logger.cmd(`[CMD] (${client.levelCache[authorsLevel]}) ${message.author.username} (${message.author.id}) ran command '${command.help.name}'.`);
 command.run(client, message, args);

};
