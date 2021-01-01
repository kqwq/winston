const fetch = require("node-fetch");
module.exports = {
    name: "setprofile",
    cooldown: 1,
    description: "Sets profile of user",
    aliases: ['set', 'set_profile'],
    usage: '[profile link]',
    args: true,
    execute(msg, args) {
      
      msg.channel
        .send("Looking up...")
        .then((m) => {
          
        })
        .catch((err) => console.log(err));
    }
  };
  