const fetch = require("node-fetch");
const fs = require("fs");
const { prefix } = require('../config.json');
const { MessageEmbed } = require("discord.js");
const { PRIMARY_COLOR, SECONDARY_COLOR, KAUSER_COLOR, KADISCORD_COLOR } = require('../kacc_constants.json');

module.exports = {
  name: "profile",
  cooldown: 10,
  description: "View your stats on the server",
  usage: "{mention}",
  args: false,
  execute(msg) {

    let profileToSearch;
    let description;
    if (msg.mentions.members.size > 0) {
      let role = msg.guild.roles.cache.find(role => role.name === "Unverified");
      profileToSearch = msg.mentions.members.first();
      description = `Their Khan Academy profile isn't linked! They can set their profile with ${prefix}setprofile \`[Your username]\` command.`
    } else {
      profileToSearch = msg.author;
      description = `Your Khan Academy parofile isn't linked! Set your profile with ${prefix}setprofile \`[Your username]\` command.`;
    }


    let db = JSON.parse(fs.readFileSync("./storage/verified_users.json"));
    let match = db.verified.find(entry => entry.did == profileToSearch.id);
    if (!match) {// If profile not verified on the system
      let embed = new MessageEmbed({
        title: msg.author.username,
        description: description,
        color: KADISCORD_COLOR,
      });
      return msg.channel.send(embed);
    }

    const { commands } = msg.client;
    commands.get('lookup').execute(msg, [match.kaid]);
  }
};