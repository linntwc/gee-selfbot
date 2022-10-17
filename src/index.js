const { Client, Collection } = require('discord.js-selfbot-v13');
const { QuickDB } = require('quick.db');

const self = new Client({checkUpdate: false});
const db = new QuickDB()

const fs = require('fs');

self.db = db;

const dotenv = require('dotenv');
dotenv.config();

self.commands = new Collection();
self.aliases = new Collection();

fs.readdirSync("./src/selfCommands/").forEach((l) => {
  const selfCmds = fs.readdirSync(`./src/selfCommands/${l}`).filter((a) => a.endsWith(".js"));

  for (let file of selfCmds) {
    let cmdS = require(`./selfCommands/${l}/${file}`);
    if (cmdS.name) {
      self.commands.set(cmdS.name, cmdS);
    }

    if (cmdS.aliases && Array.isArray(cmdS.aliases))
    cmdS.aliases.forEach((x) => self.aliases.set(x, cmdS.name));
    console.log(`- [👑] Comando carregado: ${cmdS.name}`)
  }
});

fs.readdir("./src/selfEvents/", (_err, files) => {
  files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      const eventoSelf = require(`./selfEvents/${file}`);
      let nomeEvento = file.split(".")[0];
      console.log(`- [🎉] Evento carregado: ${nomeEvento}`);

      self.on(nomeEvento, (...args) => {
        eventoSelf(self, ...args);
      });
  });
});

self.login(process.env.TOKEN);

module.exports = self;
module.exports = self.db;