// ---
//
// command: mylevel(client, message, args)
//
// This command informs guild members about
// their permission level.
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
//  => a!mylevel
//
// ---
exports.run = async (client, message, args) => {

 // reply with an embeded message containing their
 // permission level with their permission levwl name
 message.channel.send({embed: { color: 3447003, title: `Permissions for user: ${message.author.username}`, description: `Your permission level is ${message.author.permissionLevel}, which means you are apart of the '${message.author.role}' role.`}});

}

// Provides useful information about this command.
exports.help = {
 name: 'mylevel',
 category: 'info',
 description: 'Determine your permisssion level for this guild.',
 usage: 'a!mylevel'
};

// Provides configeration use for
// this commands, like useful properties such
// as permission levels.
exports.config = {
 permissionLevel: 0,
 requiredRole: "Guests",
 guildOnly: true
};
