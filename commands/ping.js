module.exports = {
    name: "ping",
    cooldown: 1,
    description: "Returns bot latency in milliseconds",
    args: false,
    execute(msg, args) {
      msg.channel
        .send("Pinging...")
        .then((m) => {
          let ping = m.createdTimestamp - msg.createdTimestamp;
          m.edit(`Latency: ${ping}ms`);
        })
        .catch((err) => console.log(err));
    }
  };
  