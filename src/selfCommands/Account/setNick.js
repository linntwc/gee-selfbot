module.exports = {
    name: "setnick",
    aliases: ['snick'],
  
    run: async (self, message, argsCmd) => {
      let nickSet = argsCmd[0];

      if(nickSet.length > 32) {
        await message.edit({ content: `${process.env.EMOJI} O nick da conta não pode possuir mais de 32 caracteres.`})
      } else {
        await self.user.setUsername(nickSet, process.env.SENHA);
        await message.edit({ content: `${process.env.EMOJI} O nick da conta foi alterado com sucesso para \`#${nickSet}\`.`})
      }
    }
}