module.exports = async (self, message) => {
  let userDb = await self.db.get(`copiando_${message.author.id}`)

  if(userDb === 'true') {
    if(message.attachments.size > 0) {
      message.channel.send({ files: [{attachment: `${message.attachments.first().url}`}]})
    } else {
      message.channel.send({ content: `${message.content}`})
    }
  }

  if(message.author.id !== self.user.id) return;
  const selfPrefix = process.env.PREFIX;

  if (!message.content.toLowerCase().startsWith(selfPrefix.toLowerCase())) return;

  const argsCmd = message.content.slice(selfPrefix.length).trim().split(/ +/g);

  let cmdSelf = argsCmd.shift().toLowerCase();
  if (cmdSelf.length === 0) return;
  let cmdRun = self.commands.get(cmdSelf);
  if (!cmdRun) cmdRun = self.commands.get(self.aliases.get(cmdSelf));

  try {
  cmdRun.run(self, message, argsCmd);
  } catch (err) {
  console.error(err);
  }
}
