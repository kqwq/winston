module.exports = {
  name: "verify",
  cooldown: 1,
  description: "Manually verifies a user",
  ownerOnly: "admin",
  usage: '[user] {profile link}',
  args: true,
  execute(msg, args) {
    if (args.length > 1) {
      commands.get('setprofile').execute(msg, args);
      return;
    }
    if (msg.mentions.members.size < 1) {
      msg.channel.send("Please specify a user");
      return;
    }
    let role = msg.guild.roles.cache.find(role => role.name === "Verified");
    msg.mentions.members.first().roles.add(role);
    role = msg.guild.roles.cache.find(role => role.name === "Unverified");
    msg.mentions.members.first().roles.remove(role);
  }
};