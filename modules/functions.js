// This method is called and binds certain properties/functions to
// the bot so needed properties can be called anywhere.

module.exports = (client) => {


 // ---
 //
 // client.loadCommand(name)
 //
 // Here, we load commands into memory. Once we
 // load commands into memory, it can be accessed anywhere.
 //
 // --
 //
 // Parameters
 //
 // - name (String) : The name of the
 // command to load.
 //
 // ---

 client.loadCommand = (name) => {

  // first, we import the command
  const command = require(`../commands/${name}`);
  // and log it to the console
  client.logger.log(`Loading command: ${command.help.name}.`);

  // then we add it to the client's enmap, doing this allows
  // us to access any command anywhere in this project
  client.commands.set(command.help.name, command);


  // once we add it to memory, we put the command's name
  // and its category in a property for easy access


  // we check if the current category is already documented,
  // if so we simply push the current command's name
  if (command.help.category in client.commands.categories) client.commands.categories[command.help.category].push(command.help.name);
  // if it isn't wee set a new array representing this command's category
  else client.commands.categories[command.help.category] = [command.help.name];

 };



 // ---
 //
 // client.permissionLevel(message)
 //
 // A simple method to check the permission
 // level of a guild member.
 //
 // --
 //
 // Parameters
 //
 // - message (Message Object) : We use this message
 // for access to certain properties we need in
 // order to get the permission level for the author.
 //
 // --
 //
 // Returns
 //
 // - (Integer) : Returns an int representing the
 // message's author permission level.
 //
 // ---

 client.permissionLevel = (message) => {

  // order permission levels from highest to lowest
  const permissionOrder = client.config.permissions.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

  // A while loop to iterate through each permission level.
  while (permissionOrder.length) {

   // Get the current permission level, then delete the entry
   const currentLevel = permissionOrder.shift();

   // we use the method provided by the current level to check the
   // permission level of the author, if it returns true we return the level
   if (currentLevel.check(message)) return currentLevel.level;

  }

 };



 // ---
 //
 // client.awaitReply(message, question, limit)
 //
 // A simply way of getting a reply from a guild member, this
 // is a useful way of getting confirmation about an action.
 //
 // --
 //
 // Parameters
 //
 // - message (Message Object) : The message object
 // which holds properties we need.
 //
 // - question (String) : The question we ask the
 // message's author.
 //
 // - limit (Integer (miliseconds)) : How long we would
 // wait for a reply.
 //
 // --
 //
 // Returns
 //
 // - (String) : The author's reply.
 //
 // ---

 client.awaitReply = async (message, question, limit = 60000) => {

  // send the given question to the channel
  await message.channel.send(question);

  // this try - catch blocks trys to
  // wait for a reply from the muthor

  try {

   // listen to the message's channel for a new message by the orginial author
   const collected = await message.channel.awaitMessages(((response) => response.author.id === message.author.id), { max: 1, time: limit, errors: ["time"] });
   // once one is found, we get the first entry and return the author's reply
   return collected.first().content;

  // If an error occurred, then it means that the time has run out.
  } catch (e) { return "cancelled"; }

 };



 // ---
 //
 // client.getGuildSettings(guild)
 //
 // This function merges the default settings (from config.defaultSettings) with any
 // guild override you might have for particular guild. If no overrides are present,
 // the default settings are used.
 //
 // --
 //
 // Parameters
 //
 // - guild (Guild) : The guild to return
 // settings for.
 //
 // --
 //
 // Returns
 //
 // - (Object) : An Object containing settings
 // for the given guild.
 //
 // ---

 client.getGuildSettings = (guild) => {

  // First, we see if the paramter is valid. If not, then
  // that means a command has been called in the bot's DMs.
  // If it has, we return the default settings.
  if (!(guild)) return client.config.defaultSettings;


  // then, we try to get the guild's settings
  // if one is found we return it, if not we return the default settings
  return (client.settings.get(guild.id) || client.config.defaultSettings);

 };



 // Extending native types is bad practice, why? Because
 // later down the road if JavaScript adds this, this will
 // conflict with native code. Despite knowing this, the
 // following methods are very useful.


 // <String>.toPropercase()
 // Returns a proper-cased string such as:
 // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
 String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
 };

 // <Array>.random()
 // Returns a single random element from an array
 // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
 Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)]
 };

};
