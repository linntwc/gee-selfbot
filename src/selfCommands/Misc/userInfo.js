module.exports = {
    name: "userinfo",
    aliases: ['info', 'uinfo'],
  
    run: async (self, message, argsCmd) => {
      let userInfo = message.mentions.users.first() || self.users.cache.get(argsCmd[0]);
      const infosUser = await userInfo.getProfile()

      const emojisBadge = {
        DISCORD_EMPLOYEE: '<:StaffBadge:1030941546343829574>',
        CERTIFIED_MODERATOR: '<:moderador_azul:1030941450227167242>',
        DISCORD_PARTNER: '<:dpartner:1030942931227525150>',
        BUGHUNTER_LEVEL_1: '<:SvBadgeBugHunter:1030941474952597544>',
        BUGHUNTER_LEVEL_2: '<:bhunter2:1030942788667326585>',
        HYPESQUAD_EVENTS: '<:hse:1030942207328391169>',
        HOUSE_BRAVERY: '<:hbravery:1030942383778578464>',
        HOUSE_BRILLIANCE: '<:hbriliance:1030942438203858984>',
        HOUSE_BALANCE: '<:hbalancc:1030942468264448211>',
        EARLY_SUPPORTER: '<:earlysup:1030941995415392337>',
        VERIFIED_BOT: '<:kat_bot2:963394767650177074><:kat_bot:963394727569424384>',
        EARLY_VERIFIED_BOT_DEVELOPER: '<:dev:1030941394317099088>',
    }; // Servidor com os emojis acima: https://discord.gg/wbsjcv6n

      let tipoNitro = 'Sem nitro.';
      if(infosUser.nitroType === 'NITRO_BOOST') tipoNitro = 'Nitro Boost.';
      if(infosUser.nitroType === 'NITRO_CLASSIC') tipoNitro = 'Nitro Classic.';

      let tempoImpulso = 'Sem impulso.'
      if(infosUser.premiumGuildSince !== 0) tempoImpulso = `<t:${~~(infosUser.premiumGuildSince / 1000)}:f>`

      await message.edit({ content: `${process.env.EMOJI} Informações de \`${userInfo.tag}\`.\n • Badges: ${infosUser.flags.bitfield === 0 ? 'Nenhuma badge.' : userInfo.flags.toArray().map((flag) => emojisBadge[flag]).join(' ')}\n • Criada em: <t:${~~(userInfo.createdAt / 1000)}:f>.\n • Nitro: ${tipoNitro} Impulso: ${tempoImpulso}\n • Servidores em Comum: \`${infosUser.mutualGuilds.size}\``})

    }
}