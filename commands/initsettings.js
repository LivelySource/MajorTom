// ---
//
// command: initsettings(client, message, args)
//
// Allows moderators/admins to initialize
// settings for a guild.
//
// --
//
// Parameters
//
// - client (Discord.Client()) : The main
// bot client, allows us to communicate
// with Discord's API.
//
// - message (Message) : Represents a message on Discord.
//
// - args (Array) : An array containing arguments
// called by the message's author.
//
// --
//
// Example
//
//  => a!initsettings
//
// ---

exports.run = async (client, message, args) => {

 // first, we see if this guild already has settings for it. we check
 //  to see if settings for this guild are already declared memory from the bot.
 const settings = client.settings.get(message.guild.id) || {};

 // check the validity of the variable, if it is true then that means that this
 // guild already has settings. if so, we send a reply to the channel.
 if (settings.settings) return message.channel.send("settings have already been initialized for this guild.");


 // set the settings for this guild to the default settings
 settings.settings = client.config.defaultSettings;
 // and save the changes
 client.settings.set(message.guild.id, settings);

 // then, inform the author
 message.channel.send({embed: {color: 0xff00, title: 'Success', description: 'Settings have been initialized.'}});

}

// Provides useful information about this command.
exports.help = {
 name: 'initsettings',
 category: 'core',
 description: 'Initialize settings for this guild.',
 usage: 'a!initsettings'
};

// Provides configeration use for
// this commands, like useful properties such
// as permission levels.
exports.config = {
 permissionLevel: 2,
 requiredRole: "Admins",
 guildOnly: true
};
