const { prefix } = require('../config.json');
const { MessageEmbed } = require("discord.js");
const { PRIMARY_COLOR } = require('../kacc_constants.json');

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['info'],
  args: true,
  execute(msg, args) {
    const { commands } = msg.client;

    if (args.length) { 
      commands.get('commands').execute(msg, args);
    } else {
      let embed = new MessageEmbed({
        title: "Help",
        description: "Type ",
        color: PRIMARY_COLOR,
      });
      return msg.channel.send(embed);
    }
  },
};