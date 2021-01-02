
const { MessageEmbed } = require("discord.js");
const { KACC_GUILD_ID, PRIMARY_COLOR, SECONDARY_COLOR, KAUSER_COLOR } = require('../kacc_constants.json');

module.exports = {
  execute(msg, apiData) {

    let d = apiData;

    let embed = new MessageEmbed({
      title: d.title,
      description: ``,
      color: KAUSER_COLOR,
      thumbnail: {
        url: d.imageUrl
      },
      fields: [
        {
          name: "Type",
          value: d.userAuthoredContentType,
          inline: true
        },
        {
          name: "Lines of code",
          value: d.revision.code.split("\n").length,
          inline: true
        },
        {
          name: "Votes",
          value: d.sumVotesIncremented,
          inline: true
        },
        {
          name: "Position on hotlist",
          value: "Coming soon",
          inline: true
        },
        {
          name: "Spin-offs",
          value: d.spinoffCount,
          inline: true
        },
        {
          name: "API",
          value: `[API endoint](https://www.khanacademy.org/api/internal/scratchpads/${d.id}?format=pretty)`,
          inline: true
        },
      ],
      footer: {
        text: "Date created"
      },
      timestamp: d.created
    });

    msg.channel.send(embed);
  }
}
