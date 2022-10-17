module.exports = {
    name: "setstatus",
    aliases: ['sstatus'],
  
    run: async (self, message, argsCmd) => {
      let statusText = argsCmd[1].slice(" ");
      let statusEmoji = argsCmd[0];

      if(statusText.length > 128) {
        await message.edit({ content: `${process.env.EMOJI} O status não pode possuir mais de 128 caracteres.`})
      } else {

        self.settings.setCustomStatus({
            status: self.settings.status,
            text: `${statusText}`, 
            emoji: statusEmoji.split(':')[2].slice(0, 18), 
            expires: null, 
          
        })
        await message.edit({ content: `${process.env.EMOJI} O status da conta foi alterado com sucesso para: \`\`\`${statusEmoji} ${statusText}\`\`\``})
      }
    }
}   