// ---
//
// command: help(client, message, args)
//
// Allows documentation for commands.
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
//  => a!help
//
// ---

exports.run = async (client, message, args) => {

 // check if the author has *not* supplied a command to
 // docuement. if not, we print each command available and
 // it's respected category.
 if (!(args[0])) {

  // initialize an array to hold each categories
  // and all of the commands
  const fields = [];

  // iterate through each category and push each categories' name and commands that lie within
  Object.keys(client.commands.categories).forEach((category) => fields.push( {name: category, value: client.commands.categories[category].join(", ")}));
  // then send an embeded message with each category and each command
  message.channel.send({embed: { color: 3447003, title: `Commands`, fields: fields}});
  message.channel.send("Use `a!help (command)` to get more specific information about a command, for example: `a!help ping`");

  // then break out of this command
  return;

 }


 // we store the command into a variable
 const command = client.commands.get(args[0]);
 // then, we check the validity of the command. if the
 // command isn't validd, we inform the author
 if (!(command)) return message.channel.send({embed: { color: 0xff0000, title: 'ERROR', description: `please provide a valid command to document. All of the available commands are: ${client.commands.keyArray().join(', ')}.` }});

 // if the author has provided a valid command,
 // we send an embeded message to the channel
 // containing properties from the command

 // initialize a new array to hold properties
 const fields = [];

 // iterate through the command's help and config properties and store each value
 Object.entries(command.help).forEach((property) => fields.push({name: property[0], value: property[1]}));
 Object.entries(command.config).forEach((property) => fields.push({name: property[0], value: property[1]}));

 // then, send the embeded message
 message.channel.send({embed: { color: 3447003, title: `command: ${command.help.name}`, fields: fields}});

}

// Provides useful information about this command.
exports.help = {
 name: 'help',
 category: 'core',
 description: 'Documentates a certain command.',
 usage: "a!help | a!help (command)"
};

// Provides configeration use for
// this commands, like properties such
// as permission levels.
exports.config = {
 permissionLevel: 0,
 requiredRole: "Guests",
 guildOnly: false
};
