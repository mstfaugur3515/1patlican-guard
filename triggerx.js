const Discord = require("discord.js");
const triggerx = require("discord.js");
// const triggerx2 = require("discord.js");
// const triggerx3 = require("discord.js");

const client = new triggerx.Client();
// const client = new triggerx2.Client();
// const client = new triggerx3.Client();

const ayarlar = require('./ayarlar.json');
const config = require('./triggerx.json');
const keep_alive = require('./keep-alive.js')
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


client.on("guildBanAdd", async function(guild, user) {
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  const yetkili = await guild.members.cache.get(entry.executor.id);
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  guild.roles.cache.forEach(async function(triggerx) {
  if (triggerx.permissions.has("ADMINISTRATOR") || triggerx.permissions.has("BAN_MEMBERS") || triggerx.permissions.has("MANAGE_GUILD") || triggerx.permissions.has("KICK_MEMBERS") || triggerx.permissions.has("MANAGE_ROLES") || triggerx.permissions.has("MANAGE_CHANNELS")) {
    triggerx.setPermissions(0).catch(err =>{});}});     

  guild.members.ban(entry.executor.id, {reason: "Koruma Sistemi | İzinsiz kullanıcı yasaklama"}).catch(e => { })	

  let channel = client.channels.cache.get(ayarlar.defenderlog)
   if (!channel) return console.log('Ban Koruma Logu Yok!');

   const triggerx = new Discord.MessageEmbed()
   .setTimestamp()
   .setColor(ayarlar.color)
   .setFooter(ayarlar.footer)
   .setDescription(`**Sunucudan Bir Kullanıcı İzinsiz Yasaklandı!**\n\n**Yetkili Bilgisi**\n**${yetkili.user.tag}** **||** **${yetkili.id}**\n\n**Kullanıcı Bilgisi**\n**${user.tag}** **||** **${user.id}**\n\n**Yetkili sunucudan yasaklandı! Rollerdeki tüm yetkiler kapatıldı.**`)
  channel.send(`@everyone`, {embed: triggerx}).catch(e => { })	
return client.users.cache.get(ayarlar.sahip).send(`**Sunucudan Bir Kullanıcı İzinsiz Yasaklandı!** \n**Yasaklıyan Ve Yasaklanan Kişilerin Bilgileri** \n**Yetkilinin Adı :** \`\`${yetkili.user.tag}\`\` **Yetkilinin İdsi :** \`\`${yetkili.id}\`\`\n**Kullanıcın Adı :** \`\`${user.tag}\`\` **Kullanıcının İdsi :** \`\`${user.id}\`\``).catch(e => { })	
});

client.on("guildMemberRemove", async kickhammer => {
  const guild = kickhammer.guild;
  const entry = await guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry.action == `MEMBER_KICK`) {
  let yetkili = await guild.members.cache.get(entry.executor.id);
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  kickhammer.guild.roles.cache.forEach(async function(triggerx) {
  if (triggerx.permissions.has("ADMINISTRATOR") || triggerx.permissions.has("BAN_MEMBERS") || triggerx.permissions.has("MANAGE_GUILD") || triggerx.permissions.has("KICK_MEMBERS") || triggerx.permissions.has("MANAGE_ROLES") || triggerx.permissions.has("MANAGE_CHANNELS")) {
    triggerx.setPermissions(0).catch(err =>{});}});     

  kickhammer.guild.members.ban(yetkili.id, {reason: "Koruma Sistemi | izinsiz kullanıcı Kickleme!"}).catch(e => { })	

  let channel = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Kick Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**Sunucudan Bir Kullanıcı İzinsiz Kicklendi!**\n\n**Yetkili Bilgisi**\n**${yetkili.user.tag}** **||**  **${yetkili.id}**\n\n**Yetkili sunucudan yasaklandı! Rollerdeki tüm yetkiler kapatıldı.**`)
  channel.send(`@everyone`, {embed: triggerx}).catch(e => { })	
return client.users.cache.get(ayarlar.sahip).send(`**Sunucudan Bir Kullanıcı İzinsiz Kicklendi!** \n**Kickleyen Kişinin Bilgileri** \n**Yetkilinin Adı :** \`\`${yetkili.user.tag}\`\` **Yetkilinin İdsi :** \`\`${yetkili.id}\`\``).catch(e => { })	
}});

client.on("guildMemberAdd", async member => {
const entry = await member.guild
   .fetchAuditLogs({ type: "BOT_ADD" })
   .then(audit => audit.entries.first());
  const xd = entry.executor;
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  if (member.user.bot) {
  member.guild.roles.cache.forEach(async function(triggerx) {
  if (triggerx.permissions.has("ADMINISTRATOR") || triggerx.permissions.has("BAN_MEMBERS") || triggerx.permissions.has("MANAGE_GUILD") || triggerx.permissions.has("KICK_MEMBERS") || triggerx.permissions.has("MANAGE_ROLES") || triggerx.permissions.has("MANAGE_CHANNELS")) {
    triggerx.setPermissions(0).catch(err =>{});}});

  member.guild.members.ban(entry.executor.id, {reason: "Koruma Sistemi | İzinsiz Bot Ekleme!"}).catch(e => { })	
  member.guild.members.ban(member.id, {reason: "Koruma Sistemi | Bot Koruma Sistemi!"}).catch(e => { })	

  let channel = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Bot Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**Sunucuya İzinsiz Bot Eklendi!**\n\n**Yetkili Bilgisi**\n**${xd.tag}** **||** **${xd.id}**\n\n**Botun Bilgisi**\n**${member.user.tag}** **||** **${member.id}**\n\n**Yetkili sunucudan yasaklandı! Rollerdeki tüm yetkiler kapatıldı.**`)
  channel.send(`@everyone`, {embed: triggerx}).catch(e => { })	
return client.users.cache.get(ayarlar.sahip).send(`**Sunucuya Bir Bot Eklendi! Eklenen Botun Bilgileri Ve Ekliyen Kişinin Bilgileri :** \n**Botun Adı :** \`\`${member.user.tag}\`\` **Botun İdsi :** \`\`${member.id}\`\` \n**Kullanıcı Adı :** \`\`${xd.tag}\`\` **Kullanıcı İdsi :** \`\`${xd.id}\`\``).catch(e => { })	
}});

client.on('guildUpdate', async (oldGuild, newGuild) => {
  const request = require('request');
  const moment = require('moment');
  let entry = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
  if(!entry.executor || entry.executor.id === client.user.id || Date.now()-entry.createdTimestamp > 10000) return;

  moment.locale('tr');
  if(newGuild.vanityURLCode === null) return;
  if(oldGuild.vanityURLCode === newGuild.vanityURLCode) return;                                              
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  newGuild.roles.cache.forEach(async function(triggerx) {
  if (triggerx.permissions.has("ADMINISTRATOR") || triggerx.permissions.has("BAN_MEMBERS") || triggerx.permissions.has("MANAGE_GUILD") || triggerx.permissions.has("KICK_MEMBERS") || triggerx.permissions.has("MANAGE_ROLES") || triggerx.permissions.has("MANAGE_CHANNELS")) {
    triggerx.setPermissions(0).catch(err =>{});}});

  newGuild.members.ban(entry.executor.id, {reason: "Koruma Sistemi | URL Koruma Sistemi!"}).catch(e => { })	

  let channel = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('URL Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**Sunucu Ayarlarıyla Oynandı!**\n\n**Yetkili Bilgisi**\n**${entry.executor.tag}** **||** **${entry.executor.id}**\n\n**Yetkili sunucudan yasaklandı! Rollerdeki tüm yetkiler kapatıldı.**`)
  channel.send(`@everyone`, {embed: triggerx}).catch(e => { })	
  client.users.cache.get(ayarlar.sahip).send(`**Sunucu URL'si değiştirildi! Değiştiren kişinin bilgileri :**\n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdisi :** \`\`${entry.executor.id}\`\``).catch(e => { })	
  request({  
    method: 'PATCH',
  url: `https://discord.com/api/v8/guilds/${newGuild.id}/vanity-url`,
    body: {
      code: ayarlar.url
    },
    json: true,
    headers: {
      "Authorization": `Bot ${ayarlar.token}`
    }
  }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
  });
});

client.on("guildUpdate", async (oldGuild, newGuild) => {
  let entry = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  if(newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
  newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));

  newGuild.roles.cache.forEach(async function(triggerx) {
  if (triggerx.permissions.has("ADMINISTRATOR") || triggerx.permissions.has("BAN_MEMBERS") || triggerx.permissions.has("MANAGE_GUILD") || triggerx.permissions.has("KICK_MEMBERS") || triggerx.permissions.has("MANAGE_ROLES") || triggerx.permissions.has("MANAGE_CHANNELS")) {
    triggerx.setPermissions(0).catch(err =>{});}});

  newGuild.members.ban(entry.executor.id, { reason: `Koruma Sistemi | Sunucuyu izinsiz güncellemek.` }).catch(e => { })	
  const moment = require('moment');
  moment.locale('tr');

  let channel = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Sunucu Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**Sunucu Ayarlarıyla Oynandı!**\n\n**Yetkili Bilgisi**\n**${entry.executor.tag}** **||** **${entry.executor.id}**\n\n**Yetkili sunucudan yasaklandı! Rollerdeki tüm yetkiler kapatıldı.**`)
  channel.send(`@everyone`, {embed: triggerx}).catch(e => { })	
return client.users.cache.get(ayarlar.sahip).send(`**Sunucu ayarlarıyla Oynandı! Oynıyan Kişinin Bilgileri :**\n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdsi :** \`\`${entry.executor.id}\`\``).catch(e => { })	
});



client.on("roleDelete", async role => {
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  role.guild.roles.cache.forEach(async function(triggerx) {
  if(triggerx.permissions.has("ADMINISTRATOR") || triggerx.permissions.has("BAN_MEMBERS") || triggerx.permissions.has("MANAGE_GUILD") || triggerx.permissions.has("KICK_MEMBERS") || triggerx.permissions.has("MANAGE_ROLES") || triggerx.permissions.has("MANAGE_CHANNELS")) {
    triggerx.setPermissions(0).catch(err =>{});}});  

  role.guild.members.ban(entry.executor.id, { reason: `Koruma Sistemi | İzinsiz rol silme!` }).catch(e => { })	
  role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}, reason: 'Silinen Roller Tekrar Açıldı.'})  
  
  let channel = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Rol Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**Sunucuda Rol Silindi!**\n\n**Yetkili Bilgisi**\n**${entry.executor.tag}** **||** **${entry.executor.id}**\n\n**Rol Bilgisi**\n**${role.name}** **||** **${role.id}**\n\n**Yetkili sunucudan yasaklandı! Rollerdeki tüm yetkiler kapatıldı.**`)
  channel.send(`@everyone`, {embed: triggerx}).catch(e => { })	
return client.users.cache.get(ayarlar.sahip).send(`**Sunucuda rol silindi! silen kişinin bilgileri :** \n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdsi :** \`\`${entry.executor.id}\`\`\n**Rol Adı :** \`\`${role.name}\`\` **Rol İdsi :** \`\`${role.id}\`\``).catch(e => { })	
});


client.on("roleCreate", async role => {
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  role.guild.roles.cache.forEach(async function(triggerx) {
  if(triggerx.permissions.has("ADMINISTRATOR") || triggerx.permissions.has("BAN_MEMBERS") || triggerx.permissions.has("MANAGE_GUILD") || triggerx.permissions.has("KICK_MEMBERS") || triggerx.permissions.has("MANAGE_ROLES") || triggerx.permissions.has("MANAGE_CHANNELS")) {
    triggerx.setPermissions(0).catch(err =>{});}});  

  role.guild.members.ban(entry.executor.id, { reason: `Koruma Sistemi | İzinsiz rol oluşturma!` }).catch(e => { })	
  role.delete({ reason: "Koruma Sistemi | Rol Koruma Sistemi" }).catch(e => { })	

  let channel = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Rol Açma Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**Sunucuda Rol Açıldı!**\n\n**Yetkili Bilgisi**\n**${entry.executor.tag}** **||** **${entry.executor.id}**\n\n**Yetkili sunucudan yasaklandı! Rollerdeki tüm yetkiler kapatıldı.**`)
  channel.send(`@everyone`, {embed: triggerx}).catch(e => { })	
return client.users.cache.get(ayarlar.sahip).send(`**Sunucuda rol açıldı! açan kişinin bilgileri :** \n**Kullanıcı Adıı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdsi :** \`\`${entry.executor.id}\`\``).catch(e => { })	
});

client.on("roleUpdate", async (oldRole, newRole) => {
  let entry = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  if(yetkiPermleri.some(p => !oldRole.permissions.has(p) && newRole.permissions.has(p))) {
    newRole.setPermissions(oldRole.permissions);
    newRole.guild.roles.cache.filter(r => !r.managed && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_GUILD"))).forEach(r => r.setPermissions(36818497));
  };
  newRole.edit({
    name: oldRole.name,
    color: oldRole.hexColor,
    hoist: oldRole.hoist,
    permissions: oldRole.permissions,
    mentionable: oldRole.mentionable
  });

  newRole.guild.roles.cache.forEach(async function(triggerx) {
  if(triggerx.permissions.has("ADMINISTRATOR") || triggerx.permissions.has("BAN_MEMBERS") || triggerx.permissions.has("MANAGE_GUILD") || triggerx.permissions.has("KICK_MEMBERS") || triggerx.permissions.has("MANAGE_ROLES") || triggerx.permissions.has("MANAGE_CHANNELS")) {
    triggerx.setPermissions(0).catch(err =>{});}});  

  newRole.guild.members.ban(entry.executor.id, { reason: `Koruma Sistemi | İzinsiz Rol Güncelleme!` }).catch(e => { })	

  let channel = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Rol Günceleme Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**Sunucuda Rol Güncellendi!**\n\n**Yetkili Bilgisi**\n**${entry.executor.tag}** **||** **${entry.executor.id}**\n\n**Rol Bilgisi**\n**${oldRole.name}** **||** **${oldRole.id}**\n\n**Yetkili sunucudan yasaklandı! Rollerdeki tüm yetkiler kapatıldı.**`)
  channel.send(`@everyone`, {embed: triggerx}).catch(e => { })	
return client.users.cache.get(ayarlar.sahip).send(`**Sunucuda rol güncellendi! Günceliyen kişinin bilgileri :** \n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdsi :** \`\`${entry.executor.id}\`\`\n**Rol Adı :**\`\`${oldRole.name}\`\` **Rol İdsi :** \`\`${oldRole.id}\`\``).catch(e => { })	
});

const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (newMember.roles.cache.size > oldMember.roles.cache.size) {
  let entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  const uyecik = newMember.guild.members.cache.get(entry.executor.id);
  if(yetkiPermleri.some(p => !oldMember.hasPermission(p) && newMember.hasPermission(p))) {
  newMember.roles.set(oldMember.roles.cache.map(r => r.id));
  uyecik.roles.set([ayarlar.karantinarol]).catch(err => { })

  let channel = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Rol Verme Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**İzinsiz Yönetici Rolü Verildi!**\n\n**Yetkili Bilgisi**\n**${entry.executor.tag}** **||** **${entry.executor.id}**\n\n**Kullanıcı Bilgisi**\n**${newMember.user.tag}** **||** **${newMember.id}**\n\n**Yetkilinin yetkileri alınıp karantinaya atıldı!**`)
  channel.send(`@everyone`, {embed: triggerx}).catch(e => { })	
        };
      };
    });

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  let guild = newMember.guild;
  if(oldMember.nickname != newMember.nickname){
  let logs = await guild.fetchAuditLogs({limit: 5, type:"MEMBER_UPDATE"}).then(e => e.entries.sort((x, y) => y.createdTimestamp - x.createdTimestamp));
  let log = logs.find(e => ((Date.now() - e.createdTimestamp) / (1000)) < 5);
  if(!log) return;
  if(oldMember.user.id === log.executor.id) return
  if(config.bots.includes(log.executor.id)) return;
  if(config.owners.includes(log.executor.id)) return;
  if(config.guvenlid.includes(log.executor.id)) return;

  const uyecik = newMember.guild.members.cache.get(log.executor.id);
  uyecik.roles.set([ayarlar.karantinarol]).catch(err => {})
    
  let channel = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('İsim Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**İzinsiz İsim Güncellendi!**\n\n**Yetkili Bilgisi**\n**${log.executor.tag}** **||** **${log.executor.id}**\n\n**Kullanıcı Bilgisi**\n**${newMember.user.tag}** **||** **${newMember.id}**\n\n**İsim Bilgisi**\n**${oldMember.nickname}** **>** **${newMember.nickname}**\n\n**Yetkilinin yetkileri alınıp karantinaya atıldı!**`)
  channel.send(`@everyone`, {embed: triggerx}).catch(e => { })	
return;
      }
    });
    

client.on("channelDelete", async channel => {
  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  channel.guild.roles.cache.forEach(async function(triggerx) {
  if(triggerx.permissions.has("ADMINISTRATOR") || triggerx.permissions.has("BAN_MEMBERS") || triggerx.permissions.has("MANAGE_GUILD") || triggerx.permissions.has("KICK_MEMBERS") || triggerx.permissions.has("MANAGE_ROLES") || triggerx.permissions.has("MANAGE_CHANNELS")) {
    triggerx.setPermissions(0).catch(err =>{});}});

  channel.guild.members.ban(entry.executor.id, { reason: `Koruma Sistemi | İzinsiz Kanal Silme!` }).catch(e => { })	
  await channel.clone({ reason: "Koruma Sistemi | Kanal Korum Sistemi!" }).then(async kanal => {
  if(channel.parentID != null) await kanal.setParent(channel.parentID);
  await kanal.setPosition(channel.position);
  if(channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));});

  let channel2 = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel2) return console.log('Kanal Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**İzinsiz Kanal Oluşturuldu!**\n\n**Yetkili Bilgisi**\n**${entry.executor.tag}** **||** **${entry.executor.id}**\n\n**Kanal Bilgisi**\n**${channel.name}** **||** **${channel.id}**\n\n**Yetkili sunucudan yasaklandı! Rollerdeki tüm yetkiler kapatıldı.**`)
channel2.send(`@everyone`, {embed: triggerx}).catch(e => { })
return client.users.cache.get(ayarlar.sahip).send(`**Sunucuda kanal silindi! Silen kişinin bilgileri :** \n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdsi :** \`\`${entry.executor.id}\`\`\n**Kanal Adı :**\`\`${channel.name}\`\` **Kanal İdsi :** \`\`${channel.id}\`\``).catch(e => { })
});

client.on("channelCreate", async channel => {
  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  channel.guild.roles.cache.forEach(async function(triggerx) {
  if(triggerx.permissions.has("ADMINISTRATOR") || triggerx.permissions.has("BAN_MEMBERS") || triggerx.permissions.has("MANAGE_GUILD") || triggerx.permissions.has("KICK_MEMBERS") || triggerx.permissions.has("MANAGE_ROLES") || triggerx.permissions.has("MANAGE_CHANNELS")) {
    triggerx.setPermissions(0).catch(err =>{});}});
  
  channel.guild.members.ban(entry.executor.id, { reason: `Koruma Sistemi | İzinsiz Kanal Oluşturma!` }).catch(e => { })
  channel.delete({reason: "Koruma Sistemi | Kanal Koruma Sistemi!"}).catch(e => { })

  let channel2 = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel2) return console.log('Kanal Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**İzinsiz Kanal Oluşturuldu!**\n\n**Yetkili Bilgisi**\n**${entry.executor.tag}** **||** **${entry.executor.id}**\n\n**Yetkili sunucudan yasaklandı! Rollerdeki tüm yetkiler kapatıldı.**`)
channel2.send(`@everyone`, {embed: triggerx}).catch(e => { })
return client.users.cache.get(ayarlar.sahip).send(`**Sunucuda kanal oluşturuldu! oluşturan kişinin bilgileri :** \n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdsi :** \`\`${entry.executor.id}\`\``).catch(e => { })
});

client.on("channelUpdate", async (oldChannel, newChannel) => {
  let entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000 || !newChannel.guild.channels.cache.has(newChannel.id)) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  if(newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
  if(newChannel.type === "category") {
    newChannel.edit({ name: oldChannel.name,});
  } else if (newChannel.type === "text") {newChannel.edit({ name: oldChannel.name, topic: oldChannel.topic, nsfw: oldChannel.nsfw, rateLimitPerUser: oldChannel.rateLimitPerUser });
  } else if (newChannel.type === "voice") {newChannel.edit({ name: oldChannel.name, bitrate: oldChannel.bitrate, userLimit: oldChannel.userLimit, });};
  oldChannel.permissionOverwrites.forEach(perm => {let thisPermOverwrites = {}; perm.allow.toArray().forEach(p => { thisPermOverwrites[p] = true;}); perm.deny.toArray().forEach(p => {thisPermOverwrites[p] = false; });
  newChannel.createOverwrite(perm.id, thisPermOverwrites);});

  newChannel.guild.cache.roles.cache.forEach(async function(triggerx) {
  if(triggerx.permissions.has("ADMINISTRATOR") || triggerx.permissions.has("BAN_MEMBERS") || triggerx.permissions.has("MANAGE_GUILD") || triggerx.permissions.has("KICK_MEMBERS") || triggerx.permissions.has("MANAGE_ROLES") || triggerx.permissions.has("MANAGE_CHANNELS")) {
    triggerx.setPermissions(0).catch(err =>{});}});

  newChannel.guild.members.ban(entry.executor.id, { reason: `Koruma Sistemi | İzinsiz Kanal Güncellemek!` }).catch(e => { })

  let channel = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Kanal Günceleme Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**İzinsiz Kanal Güncellendi!**\n\n**Yetkili Bilgisi**\n**${entry.executor.tag}** **||** **${entry.executor.id}**\n\n**Kanal Bilgisi**\n**${oldChannel.name}** **||** **${oldChannel.id}***\n\n**Yetkili sunucudan yasaklandı! Rollerdeki tüm yetkiler kapatıldı.**`)
  channel.send(`@everyone`, {embed: triggerx}).catch(e => { })
return client.users.cache.get(ayarlar.sahip).send(`**Sunucuda kanal güncellendi! Güncelliyen kişinin bilgileri :** \n**Kullanıcı Adı :** \`\`${entry.executor.tag}\` **Kullanıcı idsi :** \`${entry.executor.id}\`\`\n**Kanal İdsi :** \`\`${oldChannel.name}\`\` **Kanal İdsi :** \`\`${oldChannel.id}\`\``).catch(e => { })
});

client.on("webhookUpdate", async (channel) => {
  const entry = await channel.guild.fetchAuditLogs({type: 'WEBHOOK_CREATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  const webhooks = await channel.fetchWebhooks();
  await webhooks.map(x => x.delete({reason: "Koruma Sistemi | Webhook Silindi!"})).catch(err => { });
  channel.guild.members.ban(entry.executor.id, {reason: "Koruma Sistemi | İzinsiz Webhook Açmak!"}).catch(err => { });

  channel.guild.roles.cache.forEach(async function(triggerx) {
  if(triggerx.permissions.has("ADMINISTRATOR") || triggerx.permissions.has("BAN_MEMBERS") || triggerx.permissions.has("MANAGE_GUILD") || triggerx.permissions.has("KICK_MEMBERS") || triggerx.permissions.has("MANAGE_ROLES") || triggerx.permissions.has("MANAGE_CHANNELS")) {
    triggerx.setPermissions(0).catch(err =>{});}});

  channel.guild.channels.cache.get(ayarlar.defenderlog).send(`${entry.executor} tarafından sunucuda izinsiz webhook açıldı, webhook silinip ve banlandı!`).catch(err => { });
  client.users.cache.get(ayarlar.sahip).send(`**${entry.executor} tarafından sunucuda izinsiz webhook açıldı, webhook silinip ve banlandı!`).catch(err => { });
return;
});


client.on("emojiDelete", async (emoji, message) => {
  const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);
  const uyecik = emoji.guild.members.cache.get(entry.executor.id);
  uyecik.roles.set([ayarlar.karantinarol]).catch(err => { })

  let channel = client.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Emoji Silme Koruma Logu Yok!');
  const triggerx = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`**İzinsiz Emoji Silindi!**\n\n**Yetkili Bilgisi**\n**${entry.executor.tag}** **||** **${entry.executor.id}**\n\n**Emoji Bilgisi**\n**${emoji.name}** **||** **${emoji.id}**\n\n**Emoji yeniden yüklendi yetkili jaile atıldı!**`)
  channel.send(`@everyone`, {embed: triggerx}).catch(err => { })
return;
});


client.on("ready", async () => {
console.log(`[TRIGGERX] ${client.user.username} ismi ile giriş yapıldı! Guard I Online`);
client.user.setPresence({ activity: { name: ayarlar.botdurum }, status: ayarlar.status });
});


client.login(process.env.token).catch(err => {
console.error('Guard I Giriş Yapamadı!')
console.error(err.message)
});



client.on('warn', m => console.log(`[WARN - 1] - ${m}`));
client.on('error', m => console.log(`[ERROR - 1] - ${m}`));
process.on('uncaughtException', error => console.log(`[ERROR] - ${error}`));
process.on('unhandledRejection', (err) => console.log(`[ERROR] - ${err}`));

