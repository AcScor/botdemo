const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require("quick.db");
const request = require("request");
const ms = require("parse-ms");
const express = require("express");
const http = require("http");
const app = express();

require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



app.listen(process.env.PORT);
app.get("/", (request, response) => {
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 5000);




client.on('message', msg => {
  if (msg.content.toLowerCase() === '```diff -${text}```') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('\nBunu Kullanmana İznin Yok!'); 
		} else {
		msg.reply('\nBunu Kullanmana İznin Yok!');
		}
	}
});
////////////////////////
client.on('message', msg => {
  if (msg.content.toLowerCase() === '!') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('\nSadece **"!"** ile olmuyor lütfen bir komut giriniz.\n📃 **Örnek** : __!yardım__\n🔍 Hiç bir bilgin yok ise **"!yardım"** yaz.'); 
		} else {
		msg.reply('\nSadece **"!"** ile olmuyor lütfen bir komut giriniz.\n📃 **Örnek** : __!yardım__\n🔍 Hiç bir bilgin yok ise **"!yardım"** yaz.');
		}
	}
});
////////////////////////
const invites = {};

const wait = require('util').promisify(setTimeout);
client.on('ready', () => {

  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
    
  //davet verme
    
  member.guild.fetchInvites().then(guildInvites => {
    
    const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const davetçi = client.users.get(invite.inviter.id);
  db.set(`puan111_${member.guild.id}_${member.user.id}_${member.user.id}`, davetçi.id)
    
      const puan11111 = db.get(`davet_${member.guild.id}_${davetçi.id}`)
db.set(`davet_${member.guild.id}_${davetçi.id}`, 0 - puan11111)
    const davet1 = db.get(`davet_${member.guild.id}_${davetçi.id}`)
     const mesaj = db.get(`davetmesaj_${member.guild.id}`)
          const kanal = db.get(`davetkanal_${member.guild.id}`)
     
      db.set(`davet_${member.guild.id}_${davetçi.id}`, 1 - davet1)
 
                const puan111 = db.get(`davet_${member.guild.id}_${davetçi.id}`)
       
   db.set(`davetçi0_${member.guild.id}_${member.id}`, davetçi.username)
  
  const puan11 = db.get(`davet_${member.guild.id}_${davetçi.id}`)
          

       member.guild.channels.get( kanal || '630398640103358480').send(mesaj || `:inbox_tray: ${member.user} Adlı kullanıcı sunucuya katıldı, \`\`${davetçi.username}\`\` adlı kullanıcı davet etti. Toplam \`\`${puan11}\`\` daveti var.`)
  });
})  
///////////////////////////////////// 

  
client.on('guildMemberRemove', member => {
  member.guild.fetchInvites().then(guildInvites => {
    
    const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
   
   
   
   const davetçi = db.get(`puan111_${member.guild.id}_${member.user.id}_${member.user.id}`)
      const davetçi0 = db.get(`davetçi0_${member.guild.id}_${member.id}`)  
   const puan1111 = db.get(`davet_${member.guild.id}_${davetçi}`)  
  //davet eksiltme
 
      db.set(`davet_${member.guild.id}_${davetçi}`, `${puan1111 - 1}`)
            const puan11111 = db.get(`davet_${member.guild.id}_${davetçi}`)  
                 const mesaj = db.get(`davetmesaj_${member.guild.id}`)
          const kanal = db.get(`davetkanal_${member.guild.id}`)
if (davetçi0 == null) {
         member.guild.channels.get( kanal || '630398640103358480').send(`:outbox_tray: ${member.user} Adlı kullanıcı sunucudan ayrıldı. Üzgünüm kim tarafından çağırılmış tanımlayamadım. `) 
}
    else {
          member.guild.channels.get( kanal || '630398640103358480').send(mesaj || `:outbox_tray: ${member.user} Adlı kullanıcı sunucudan ayrıldı, \`\`${davetçi0}\`\` adlı kullanıcı davet etti. Toplam \`\`${puan11111 || "9999"}\`\` daveti var.`) 

    }
  });
          
});
////////////////////////
client.on("message", async msg => {
  const db = require('quick.db');
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;  
  
  if (msg.content.length > 7) {
    
    db.add(`puancik_${msg.author.id + msg.guild.id}`, 1)
};

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 150) {
    
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)
    msg.channel.send(`${client.emojis.get(client.emoji.levelup)}Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${db.fetch(`seviye_${msg.author.id + msg.guild.id}`)}** seviye oldun!`)
    db.delete(`puancik_${msg.author.id + msg.guild.id}`)};
 
  if (db.has(`roll_${msg.guild.id}`) === true) {
  if (db.has(`rollss_${msg.guild.id}`) === true) {
    
 var r = db.fetch(`roll_${msg.guild.id}`)
 var s = db.fetch(`rollss_${msg.guild.id}`)
  
  if (db.fetch(`seviye_${msg.author.id + msg.guild.id}`) == s) {
    if (msg.member.roles.has(msg.guild.roles.get(r).id) === false) {
    msg.channel.send(`<@${msg.author.id}> başarıyla **${db.fetch(`seviye_${msg.author.id + msg.guild.id}`) - 1 || 0}** seviyeyi geçtin ve **${msg.guild.roles.get(r).name}** rolünü aldın!`)
    msg.member.addRole(msg.guild.roles.get(r).id)
    }
  };
}};
});
///////////////////////

    client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});

////////////////////////





client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

////////////////////////
client.on("message", message => {
    const dmchannel = client.channels.find("name", "bot-özel-görme");
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        dmchannel.sendMessage("", {embed: {
                color: 3447003,
                title: `Yazan: ${message.author.tag} ID: ${message.author.id}`,
                description: `${message.content}`
              }})
    }
    if (message.channel.bot) return;
});
/////////////////////////////giriş çıkış1
client.on('guildMemberAdd', member => {

  const channel = member.guild.channels.find('name', 'gelen-giden');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('0x00cc44')
  .setAuthor(client.user.username, client.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle(`:inbox_tray: ${member.user.username} Sunucuya katıldı.`)
  .setDescription(`**${member.guild.memberCount}** üye Olduk!`)
  .setTimestamp()
  channel.sendEmbed(embed);
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'gelen-giden');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('0xff1a1a')
  .setAuthor(client.user.username, client.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle(`:outbox_tray: ${member.user.username} Sunucudan ayrıldı.`)
  .setDescription(`**${member.guild.memberCount}** Üye Kaldık!`)
  .setTimestamp()
  channel.sendEmbed(embed);
});

////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
 if (message.content.toLowerCase() === '<@317928269922041856>') {
 message.delete();
 message.reply('Sahibim şuan meşgul, lütfen daha sonra ona ulaş.');
}
 });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('guildDelete', guild => {

let rrrsembed = new Discord.RichEmbed()

.setColor("RED")
.setTitle("❌ | Botumuzu Sunucudan Çıkardı. | ❌ ")
.addField("▪️ Bot Adı:", "Satış Platform")
.addField("▪️ Sunucu Adı:", guild.name)
.addField("▪️  Sunucu sahibi", guild.owner)
.addField("▪️  Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("▪️  Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("▪️  Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.get('628882451162464277').send(rrrsembed);
  
});

client.on('guildCreate', guild => {

let rrrsembed = new Discord.RichEmbed()

.setColor("RED")
.setTitle("✔️  | Botumuzu Sunucusuna Ekledi. | ✔️ ")
.addField("▪️ Bot Adı:", "Satış Platform")
.addField("▪️ Sunucu Adı:", guild.name)
.addField("▪️ Sunucu sahibi", guild.owner)
.addField("▪️ Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("▪️ Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("▪️ Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.get('628882451162464277').send(rrrsembed);
  
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", message => {
    const dmchannel = client.channels.find("name", "dm-log");
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        dmchannel.sendMessage("", {embed: {
            color: 3447003,
            title: `Gönderen: ${message.author.tag}`,
            description: `Bota Özelden Gönderilen DM: ${message.content}`
        }})
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////OTO ROL////////////////////
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./jsonlar/otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./jsonlar/otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./jsonlar/otorol.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('Otorol Sistemi')
    .setDescription(`:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Verildi `)
.setColor("GREEN")
    .setFooter("Gnarge", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: **${member.user.tag}** Rolün Başarıyla Verildi.`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./jsonlar/otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('guildMemberAdd',async member => {
  let user = client.users.get(member.id);
  let kanal = client.channels.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/597433546868654106/627428441695977497/gvnlk-spheli.png')
    const resim2 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/597433546868654106/627427731407241226/gvnlk-gvnli.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1

       const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/597433546868654106/627425996454232064/gvnlk-arka.png');
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   
       const attachment = new Discord.Attachment(canvas.toBuffer(), 'güvenlik.png');
    kanal.send(attachment)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////KANAL İSMİ DEĞİŞKEN///////////////////////////////////////////////////////////////////
function cpanel1() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`631525628805644308`).setName(`𝕶𝖎𝖞𝖆𝖙𝖎 𝕹𝖊𝖙w𝖔𝖗𝖐`);
            cpanel2();
        }, 10000);
      });
}
  function cpanel2() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`631525628805644308`).setName(`KEYİFLİ SOHBETLER`);
            cpanel3();
        }, 10000);
      });
  }
  function cpanel3() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`632252075069145109`).setName(`TARİH : ${moment().format('DD-MM-YYYY')}`);
            cpanel1();
        }, 10000);
      });
  }

 client.on('ready', async message => {
   cpanel1();
 })
///////////////////////////////////
////////////////////////
////////////////////////
client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`reklamFiltre_${msg.guild.id}`)  
          if (i == 'acik') {
              const reklam = ["discord.app", "discord.gg", "invite","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    msg.delete();                    
                    let embed = new Discord.RichEmbed()
                    .setColor(0xffa300)
                    .setFooter('SatışPlatform Reklam engellendi.', client.user.avatarURL)
                    .setAuthor(msg.guild.owner.user.username, msg.guild.owner.user.avatarURL)
                    .setDescription("SatışPlatform Reklam sistemi, " + `***${msg.guild.name}***` + " adlı sunucunuzda reklam yakaladım.")
                    .addField('Reklamı yapan kişi', 'Kullanıcı: '+ msg.author.tag +'\nID: '+ msg.author.id, true)
                    .addField('Engellenen mesaj', msg.content, true)
                    .setTimestamp()                   
                    msg.guild.owner.user.send(embed)                       
                    return msg.channel.send(`${msg.author.tag}, Reklam Yapmak Yasak Dostum!`).then(msg => msg.delete(25000));
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });    
////////////////////////

////////////////////////

////////////////////////
////////////////////////
client.on("message", message => {
    const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak"];
    if (kufur.some(word => message.content.includes(word)) ) {
        message.reply("Küfür Etme! :rage:")
        message.delete()
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('guildMemberAdd', async member => {
  
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('guildMemberAdd', member => {
let merhaba= new Discord.RichEmbed()
.setColor("RANDOM")
.setTitle("Merhaba sunucuya hoş geldin!\n ")
.setDescription('Bu sunucu <@419502601860677644> botunu kullanıyor.\n\n Eğer sende beni kullanmak istersen `!davet` yazarak davet edebilirsin.')
.setImage('https://media2.giphy.com/media/xUPGGDNsLvqsBOhuU0/giphy.gif')
.setFooter(`Satış Platform • 2019 `, client.user.avatarURL)
member.send(merhaba); 
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   

/////////////////////////////////////
const serverStats = {
  guildID: '625077206443360303',
  totalUsersID: '632326182141952021',
  memberCountID: '632326197044314140',
  botCountID: '632326212127293480'

};


client.on('guildMemberAdd', member => {

if (member.guild.id !== serverStats.guildID) return;

client.channels.get(serverStats.totalUsersID).setName(`Toplam Kullanıcı : ${member.guild.memberCount} `);
client.channels.get(serverStats.memberCountID).setName(`Üye Sayısı : ${member.guild.members.filter(m => !m.user.bot).size}`);
client.channels.get(serverStats.botCountID).setName(`Bot Sayısı : ${member.guild.members.filter(m => m.user.bot).size}`);


});

client.on('guildMemberRemove', member => {

if (member.guild.id !== serverStats.guildID) return;

client.channels.get(serverStats.totalUsersID).setName(`Toplam Kullanıcı : ${member.guild.memberCount} `);
client.channels.get(serverStats.memberCountID).setName(`Üye Sayısı : ${member.guild.members.filter(m => !m.user.bot).size}`);
client.channels.get(serverStats.botCountID).setName(`Bot Sayısı : ${member.guild.members.filter(m => m.user.bot).size}`);


});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', msg => {

if(client.ping > 550) {

            let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "saldırı-koruma")

           sChannel.send(`Sunucunun Pingi Yükseldiğinden Dolayı Bölge Değiştirildi ${yenibölge} `+ client.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log(" bölge:" + g.region))
           .then(g => msg.channel.send("bölge **"+ g.region  + " olarak değişti"))
           .then(msg.reply('bölge değişti')) 
           .catch(console.error);
}});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////sayaç
client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./jsonlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./jsonlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})
client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./jsonlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./jsonlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`●▬▬▬▬Satış Platform Sayaç Sistemi▬▬▬▬●\n➠ :loudspeaker: ${member.user.tag} Adlı Kullanıcı Ayrıldı.\n➠ \**${sayac[member.guild.id].sayi}\** Kişi Olmamıza **${sayac[member.guild.id].sayi - member.guild.memberCount}** Kişi Kaldı.\n➠ Sunucudan çıktığı için \**${member.guild.memberCount}**\ Kişi Kaldık! :outbox_tray:\n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./jsonlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./jsonlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("GREEN")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`●▬▬▬▬Satış Platform Sayaç Sistemi▬▬▬▬●\n➠ :loudspeaker: ${member.user.tag} Adlı Kullanıcı Sunucuya Katıldı.\n➠ \**${sayac[member.guild.id].sayi}\** Kişi Olmamıza **${sayac[member.guild.id].sayi - member.guild.memberCount}** Kişi Kaldı.\n➠ Seninle Beraber \**${member.guild.memberCount}**\ Kişi Olduk! :inbox_tray:\n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●` );
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////