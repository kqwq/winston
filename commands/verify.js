module.exports = {
  name: "verify",
  cooldown: 1,
  description: "Manually verifies a user",
  ownerOnly: "admin",
  usage: '[user]',
  args: true,
  execute(msg, args) {
    if (args === "VERIFY_AUTHOR") {// For auto-verification
      let role = msg.guild.roles.cache.find(role => role.name === "Verified");
      msg.member.roles.add(role);
      role = msg.guild.roles.cache.find(role => role.name === "Unverified");
      msg.member.roles.remove(role);
      msg.react("👍")
      .catch(console.error);
      return;
    };


    if (args.length > 1) {// Input: user and profile link
      msg.channel.send("This command only takes 1 argument: `user` (mention)")
      return;
    }
    if (msg.mentions.members.size < 1) {// Invalid input: no user
      msg.channel.send("Please specify a user");
      return;
    }

    // Input: user only
    let role = msg.guild.roles.cache.find(role => role.name === "Verified");
    msg.mentions.members.first().roles.add(role);
    role = msg.guild.roles.cache.find(role => role.name === "Unverified");
    msg.mentions.members.first().roles.remove(role);
    msg.react("👍")
    .catch(console.error);
  }
};