module.exports = {
  name: "copy",

  run: async (self, message, argsCmd) => {
    let userCopy = message.mentions.users.first() || self.users.cache.get(argsCmd[0]);

    let userDb = await self.db.get(`copiando_${userCopy.id}`)

    if(userCopy.id === self.user.id) {
      await message.edit({ content: `${process.env.EMOJI} Não é possível copiar as mensagens enviadas por si mesmo.`})
    } else
    if(userDb === 'true') {
      await message.edit({ content: `${process.env.EMOJI} Já estou copiando as mensagens de \`${userCopy.tag}\`.`})
    } else {
      await self.db.set(`copiando_${userCopy.id}`, 'true')
      await message.edit({ content: `${process.env.EMOJI} Agora estou copiando as mensagens enviadas por \`${userCopy.tag}\`.`})
    }
  }
}
