module.exports = {
    name: "setdiscrim",
    aliases: ['sdiscrim'],
  
    run: async (self, message, argsCmd) => {
      let discrimSet = argsCmd[0];

      if(discrimSet.length > 4) {
        await message.edit({ content: `${process.env.EMOJI} O discriminator da conta não pode possuir mais de 4 caracteres.`})
      } else {
        await self.user.setDiscriminator(discrimSet, process.env.SENHA);
        await message.edit({ content: `${process.env.EMOJI} O discriminator da conta foi alterado com sucesso para \`${discrimSet}\`.`})
      }
    }
}
