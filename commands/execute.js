module.exports = {
    name: "execute",
    description: "Executes code",
    ownerOnly: true,
    args: true,
    aliases: ['e', 'exe'],
    usage: '[javascript code]',
    execute(msg, args) {
      try {
        msg.channel.send("`"+eval(msg.content.split(" ").splice(1).join(" ")).toString().slice(0, 1997)+"`");
      } catch (e) {
        msg.channel.send("There was an error executing the code. Check the console.");
        console.log(e);
      }
    }
  };
  