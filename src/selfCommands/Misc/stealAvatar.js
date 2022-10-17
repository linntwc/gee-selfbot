module.exports = {
    name: "stealavatar",
    aliases: ['ravatar'],
  
    run: async (self, message, argsCmd) => {
      let userAvatar = message.mentions.users.first() || self.users.cache.get(argsCmd[0]);
      const fetchUser = await userAvatar.getProfile()

      let urlAvatar = fetchUser.avatar.startsWith("a_")? ".gif?size=4096": ".png?size=4096";
      urlAvatar = `https://cdn.discordapp.com/avatars/${userAvatar.id}/${userProfil.avatar}${Url}`;


      await self.user.setAvatar(urlAvatar).catch(e => console.log(e))
      await message.edit({ content: `${process.env.EMOJI} O avatar da conta foi alterado com sucesso para o avatar de \`${userAvatar.tag}\`.`, files: []})
    }
}