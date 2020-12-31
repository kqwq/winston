module.exports = {
    name: "execute",
    description: "Executes code",
    ownerOnly: true,
    args: false,
    execute(msg, args) {
      try {
        eval(msg);
      } catch (e) {
        msg.channel.send("There was an error executing the code. Check the console.");
        console.log(e);
      }
    }
  };
  