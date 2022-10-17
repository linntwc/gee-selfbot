module.exports = {
    name: "clear",
    aliases: ['cl', 'clear-dm'],
  
    run: async (self, message, argsCmd) => {
      let quantiaDel = parseInt(argsCmd[0]) + 1;

      let fetchMsg = await message.channel.messages.fetch({ limit: quantiaDel })

      fetchMsg.forEach(async (m) => {
        if(m.author.id !== self.user.id) return;
        m.delete()
      })

    }}