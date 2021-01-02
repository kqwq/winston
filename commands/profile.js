const fetch = require("node-fetch");
const fs = require("fs");

module.exports = {
  name: "profile",
  cooldown: 10,
  description: "View your stats on the server",
  args: false,
  execute(msg) {

    let db = JSON.parse(fs.readFileSync("./storage/verified_users.json"));
    let match = db.verified.find(entry => entry.did == msg.author.id);
    if (!match) {// If profile not verified on the system
      let embed = new MessageEmbed({
        title: msg.author.username,
        description: `Your Khan Academy profile isn't linked! Set your profile with ${prefix}setprofile \`[Your username]\` command.`,
        color: KADISCORD_COLOR,
      });
      return msg.channel.send(embed);
    }
/*
    let embed = new MessageEmbed({
      title: msg.author.username,
      description: `Your Khan Academy profile isn't linked! Set your profile with ${prefix}setprofile \`[Your username]\` command.`,
      color: KADISCORD_COLOR,
    });
    return msg.channel.send(embed);*/
  }
};