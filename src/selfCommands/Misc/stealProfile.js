module.exports = {
    name: "stealprofile",
    aliases: ['rperfil'],
  
    run: async (self, message, argsCmd) => {
      let userSteal = message.mentions.users.first() || self.users.cache.get(argsCmd[0]);
      const fetchUser = await userSteal.getProfile()
      console.log(userSteal.tag.split('#')[2])

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
            await self.user.setDiscriminator(`${userSteal.tag.split('#')[1].slice(0, 2)}24`, process.env.SENHA);
            await message.edit({ content: `${process.env.EMOJI} Tag alterada para o discriminator de \`${userSteal.tag}\`.`})
          }, 2800)

          setTimeout(async() => {
            await message.edit({ content: `${process.env.EMOJI} Perfil de \`${userSteal.tag}\` completo copiado com sucesso!`})
          }, 3300)
            
      })
      
    }
}
