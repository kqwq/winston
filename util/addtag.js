const { KACC_GUILD_ID, PRIMARY_COLOR, SECONDARY_COLOR } = require('../kacc_constants.json');

module.exports = {
  execute(client, msg) {


    let embed = new MessageEmbed({
      title: `${msg.author.username}#${msg.author.discriminator}`,
      description: msg.content,
      color: PRIMARY_COLOR,
      timestamp: msg.createdTimestamp
    });
    let guild = client.guilds.cache.find(guild => guild.id == KACC_GUILD_ID);
    let channel = guild.channels.cache.find(ch => ch.name == 'modmail');
    channel.send(embed);
  }

};