// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform you.
if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');

// Load up the discord.js library.
const Discord = require('discord.js');
// We also load the rest of the things we need in this file.
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config file that contains our token and our prefix values.
client.config = require('./data/config.js');
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Require our logger.
client.logger = require('./modules/Logger');

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require('./modules/functions.js')(client);

// Commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();

// Now we integrate the use of Evie's awesome Enhanced Map module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.settings = new Enmap();

// We set a property to contain command's categoris
client.commands.categories = {};



// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.
const init = async () => {


 // Here, we load all of our commands into memory, as a collection,
 // so that every command and their configuration is accessible anywhere.
 const commands = await readdir('./commands/');
 client.logger.log(`Loading a total of ${commands.length} command(s).`);

 commands.forEach(name => {

  // Just as a 'rather to be safe than sorry', we first check if the file
  // doesn't end with a '.js', which means that somehow a non command file
  // got in the command directory. And we don't wanna load that stuff.
  if (!(name.endsWith('.js'))) return;

  // Load the command into 'memory.'. What we mean
  // by loading our command to 'memory', we mean that
  // we bind the command to an enmap thats binded to the client,
  // client.commands, which would could be accessed from anywhere.
  client.loadCommand(name);

 });


 // We then get a list of of the files in the events directory.
 // After we load all of the commands in memory, we then
 // load all of the events in memory.
 const events = await readdir('./events/');
 client.logger.log(`Loading a total of ${events.length} event(s).`)

 events.forEach(name => {

  // Just like above, we check if the file ends with a '.js'.
  // Which means that somehow a non .js file got in the events
  // directory, and we want to avoid that.
  if (!(name.endsWith('.js'))) return;

  // Get the name of the event and then require the event.
  const eventName = name.split('.')[0];
  const event = require(`./events/${name}`);

  // Once we initialize our event file, we then bind it to
  // our client.
  client.on(eventName, event.bind(null, client));

 })



 // here, we initialize a new property for client to hold references
 // to permission levels and their respected name
 client.levelCache = {};
 client.config.permissions.forEach((permission) => (client.levelCache[permission.level] = permission.name));


 // Here we login the client.
 client.login(process.env.TOKEN);

};

init();
