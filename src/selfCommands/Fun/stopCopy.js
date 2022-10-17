module.exports = {
    name: "stopcopy",
    aliases: ['scopy'],
  
    run: async (self, message, argsCmd) => {
      let userCopy = message.mentions.users.first() || self.users.cache.get(argsCmd[0]);
  
      let userDb = await self.db.get(`copiando_${userCopy.id}`)
      if(userDb === 'false') {
        await message.edit({ content: `${process.env.EMOJI} Já não estou copiando as mensagens de \`${userCopy.tag}\`.`})
      } else {
        await self.db.set(`copiando_${userCopy.id}`, 'false')
        await message.edit({ content: `${process.env.EMOJI} Parei de copiar as mensagens enviadas por \`${userCopy.tag}\`.`})
      }
    }
  }