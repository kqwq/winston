// Imports
const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token, owner } = require("./config.json");
const { BOT_STATUS, UNVERIFIED_CHANNEL_ID, WELCOME_MESSAGE } = require("./kacc_constants.json");
const modmail = require("./util/modmail.js");

// Setup
const client = new Discord.Client();

// File setup
if (!fs.existsSync("./storage")) fs.mkdirSync("./storage");
if (!fs.existsSync("./storage/hot100")) fs.mkdirSync("./storage/hot100");
if (!fs.existsSync("./storage/verified_users.json")) {
  fs.writeFileSync(
    "./storage/verified_users.json",
    JSON.stringify({ banned:[], verified:[] }),
    "utf8"
  );
}



// Command/cooldown setup
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
const cooldowns = new Discord.Collection();

client.on("ready", () => {
  client.user.setActivity(BOT_STATUS);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
  let role = member.guild.roles.cache.find(role => role.name === 'Unverified');
  member.roles.add(role).catch(e => console.log(e));
  let channel = member.guild.channels.cache.find(ch => ch.name == 'unverified');
  /////////////////channel.send(`<@${member.id}>\n${WELCOME_MESSAGE}`);
  //////////////temp



  //
  /*console.log(UNVERIFIED_CHANNEL_ID);
  let channel = client.channels.cache.get(UNVERIFIED_CHANNEL_ID);
  console.log(channel);
  console.log("cheese", member);*/
  //.catch(console.error);
   // .then(chan => chan// Welcome message
   // );
  ////member.roles.add(role).catch(e => console.log(e));
  
});

client.on("roleUpdate", (oldRole, newRole) => {
  if (oldRole.name === "Chatting Champ" && newRole.name !== "Chatting Champ") {
    newRole.setName('Chatting Champ')
    .then(updated => console.log(`Updated role name to ${updated.name}`))
    .catch(console.error);
  }
});
client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (newMember.id == 365444992132448258) {
    let role = newMember.guild.roles.cache.find(role => role.name === "Chatting Champ");
    newMember.roles.add(role)
    .then(updated => console.log(`Gave role name to ${newMember.user.n}`))
    .catch(console.error);
  }
});

client.on("message", (message) => {
  if (message.author.bot) return;

  // For Modmail
  if (message.channel.type === "dm") {
    modmail.execute(client, message);
    return;
  }

  // Auto-verification
  if (message.channel.id == UNVERIFIED_CHANNEL_ID) {
    if (message.member.roles.cache.find(r => r.name === "Unverified")) {
      let found = message.content.match(/(khanacademy.org\/profile\/[^ ]+)/g);
      if (found) {
        let profileURL = found[0];
        client.commands.get('setprofile').execute(message, profileURL, message.author.id);// Verify user
      }
    }
  }
  
  // Command / args handling
  if (!message.content.startsWith(prefix)) return;
  if (message.channel.type !== "text") return;// Does not apply to special channel types like voice or news
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;
  if (command.ownerOnly && message.author.id.toString() !== owner.toString()) {
    console.log(message.author.id, owner);
    return message.reply("this command is reserved for the owner to use!");
  }
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  // Cooldown
  if (message.author.id.toString() !== owner.toString()) {
    // The owner is not subject to cooldowns
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${command.name}\` command.`
        );
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  // Execute command
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    console.log(`${message.author.tag} ran the command ${commandName}`);
    message.reply("there was an error trying to execute that command.");
  }
});

client.login(token);