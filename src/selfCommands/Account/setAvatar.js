module.exports = {
    name: "setavatar",
    aliases: ['savatar'],
  
    run: async (self, message, argsCmd) => {
      let avatarSet = message.attachments.first().url || argsCmd[0];

      await self.user.setAvatar(avatarSet).catch(e => console.log(e))
      await message.edit({ content: `${process.env.EMOJI} O avatar da conta foi alterado com sucesso.`, files: []})
    }
}