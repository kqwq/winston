module.exports = {
	name: 'reload',
	description: 'Reload a command.',
	aliases: ['r', 'load'],
	ownerOnly: true,
	usage: '[command]',
	args: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
		} catch (error) {
			console.log(error);
			return message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
		message.channel.send(`Command \`${command.name}\` was reloaded!`);
	},
};