module.exports = {
    name: "stealprofile",
    aliases: ['rperfil'],
    // Não recomendo utilizar esse comando em pessoas que estejam utilizando gifs no perfil (envia muitas requests pro Discord).
  
    run: async (self, message, argsCmd) => {
      let userSteal = message.mentions.users.first() || self.users.cache.get(argsCmd[0]);
      const fetchUser = await userSteal.getProfile()

      let urlAvatar = fetchUser.avatar.startsWith("a_")? ".gif?size=4096": ".png?size=4096";
      urlAvatar = `https://cdn.discordapp.com/avatars/${userSteal.id}/${fetchUser.avatar}${urlAvatar}`;


      await self.user.setAvatar(urlAvatar).then(async (a) => {
        await message.edit({ content: `${process.env.EMOJI} Avatar alterado para o avatar de \`${userSteal.tag}\`.`})
        setTimeout(async (a) => {
            await self.user.setUsername(`${userSteal.username}`, process.env.SENHA)
            await message.edit({ content: `${process.env.EMOJI} Nome alterado para o nome de \`${userSteal.tag}\`.`})
        }, 2500)

        setTimeout(async() => {
            await self.user.setAboutMe(`${fetchUser.bio}`)
            await message.edit({ content: `${process.env.EMOJI} Bio alterada para o sobre-mim de \`${userSteal.tag}\`.`})
          }, 2600)

          setTimeout(async() => {
            await self.user.setDiscriminator(`${userSteal.tag.slice(0, 3)}7`, process.env.SENHA);
            await message.edit({ content: `${process.env.EMOJI} Tag alterada para o discriminator de \`${userSteal.tag}\`.`})
          }, 2800)

          setTimeout(async() => {
            await message.edit({ content: `${process.env.EMOJI} Perfil de \`${userSteal.tag}\` completo copiado com sucesso!`})
          }, 3300)
            
      })
      
    }
}