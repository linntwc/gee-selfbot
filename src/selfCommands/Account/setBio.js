module.exports = {
    name: "setbio",
    aliases: ['sbio'],
  
    run: async (self, message, argsCmd) => {
      let bioSet = argsCmd.join(" ")

      if(bioSet.length > 190) {
        await message.edit({ content: `${process.env.EMOJI} O sobre-mim não pode possuir mais de 190 caracteres.`})
      } else {
        await self.user.setAboutMe(`${bioSet}`);
        await message.edit({ content: `${process.env.EMOJI} O sobre-mim da conta foi alterado com sucesso para: \`\`\`${bioSet}\`\`\``})
      }
    }
}