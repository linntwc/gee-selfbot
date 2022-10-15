import { Client } from 'discord.js-selfbot-v13';
import { QuickDB } from 'quick.db';
const db = new QuickDB()
const self = new Client({checkUpdate: false});

import dotenv from 'dotenv';
dotenv.config();

self.on('ready', async () => {
    console.log(`Logged in ${self.user.username}`)
});

self.login(process.env.TOKEN);

self.on('messageCreate', async (message) => {
    let userDb = await db.get(`copiando_${message.author.id}`, 'true')
    if(userDb === 'false') return;

    if(userDb === 'true') {
      message.channel.send({ content: `${message.content}`})
    }

    if(message.author.id !== self.user.id) return;

    let prefixSelf = process.env.PREFIX;
    const argsCmd = message.content.slice(prefixSelf.length).trim().split(' ');
	  const cmdSelf = argsCmd.shift().toLowerCase();


    if(cmdSelf === 'info') {
      let userInfo = message.mentions.users.first() || self.users.cache.get(argsCmd[0]);
      let infosUser = await userInfo.getProfile()

      const flags = {
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
    };

      let tipoNitro = 'No nitro.';
      if(infosUser.nitroType === 'NITRO_BOOST') tipoNitro = 'Nitro Boost.';
      if(infosUser.nitroType === 'NITRO_CLASSIC') tipoNitro = 'Nitro Classic.';

      let tempoImpulso = 'No boost.'
      if(infosUser.premiumGuildSince !== 0) tempoImpulso = `<t:${~~(infosUser.premiumGuildSince / 1000)}:f>`

      await message.edit({ content: `<:wumpus_gripado:1025802071942893698> \`${userInfo.tag}\` informations ${userInfo.flags.toArray() .map((flag) => flags[flag]).join(' ')}\n> Created at: <t:${~~(userInfo.createdAt / 1000)}:f>.\n> Nitro: ${tipoNitro} Boost: ${tempoImpulso}\n> Mutual Guilds: \`${infosUser.mutualGuilds.size}\`\nOld nicknames: https://scrybabx.cc/u/${userInfo.id}`})
    }

    if(cmdSelf === 'copy') {
      let userCopy = message.mentions.users.first() || self.users.cache.get(argsCmd[0]);
      await db.set(`copiando_${userCopy.id}`, 'true')
      await message.edit({ content: `<:wumpus_gripado:1025802071942893698> Now i will copy \`${userCopy.tag}\` messages.`})
    }

    if(cmdSelf === 'scopy') {
      let userCopy = message.mentions.users.first() || self.users.cache.get(argsCmd[0]);
      await db.set(`copiando_${userCopy.id}`, 'false')
      await message.edit({ content: `<:wumpus_gripado:1025802071942893698> Stopped copying \`${userCopy.tag}\` messages.`})
    }

    if(cmdSelf === 'vavatar') {
      let userInfo = message.mentions.users.first() || self.users.cache.get(argsCmd[0]);
      await message.edit({ content: `${userInfo.avatarURL({ dynamyc: true})}`})
    }

    if(cmdSelf === 'sdiscrim') {
      await self.user.setDiscriminator(argsCmd[0], 'Account_Password');
      await message.edit({ content: `<:wumpus_gripado:1025802071942893698> Discriminator successfully changed to \`${argsCmd[0]}\`.`})
    }

    if(cmdSelf === 'ravatar') {
      let userInfo = message.mentions.users.first() || self.users.cache.get(argsCmd[0]);
      self.user.setAvatar(userInfo.displayAvatarURL({ dynamyc: true, size: 1024}))
      await message.edit({ content: `<:wumpus_gripado:1025802071942893698> Avatar successfully changed to \`${userInfo.tag}\` avatar.`})
    }

    if(cmdSelf === 'scry') {
      await message.edit({ content: `<:wumpus_gripado:1025802071942893698> https://scrybabx.cc/u/${message.mentions.users.first().id}`})
    }

    if(cmdSelf === 'savatar') {
      await self.user.setAvatar(message.attachments.first().url)
      await message.edit({ content: `<:wumpus_gripado:1025802071942893698> Avatar successfully changed.`, files: []})
    } 

    if(cmdSelf === 'cl') {
      await message.channel.messages.fetch({ limit: parseInt(argsCmd[0]) + 1 }).then(async (a) => {
        const msgF = a.filter(a => a.author.id === self.user.id)
        msgF.forEach(async (b) => {
          b.delete()
        })
      })
    } 
});
