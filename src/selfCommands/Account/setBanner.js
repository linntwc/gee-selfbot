module.exports = {
    name: "setbanner",
    aliases: ['sbanner'],
  
    run: async (self, message, argsCmd) => {
      let bannerSet = message.attachments.first().url || argsCmd[0];

      await self.user.setBanner(bannerSet).catch(e => console.log(e))
      await message.edit({ content: `${process.env.EMOJI} O banner da conta foi alterado com sucesso.`, files: []})
    }
}