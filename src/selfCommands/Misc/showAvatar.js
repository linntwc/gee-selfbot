module.exports = {
    name: "showavatar",
    aliases: ['vavatar'],
  
    run: async (self, message, argsCmd) => {
      let userAvatar = message.mentions.users.first() || self.users.cache.get(argsCmd[0]);
      const fetchUser = await userAvatar.getProfile()

      let urlAvatar = fetchUser.avatar.startsWith("a_")? ".gif?size=4096": ".png?size=4096";
      urlAvatar = `https://cdn.discordapp.com/avatars/${userAvatar.id}/${fetchUser.avatar}${urlAvatar}`;

      await message.edit({ content: `${urlAvatar}`})
      
    }
}
