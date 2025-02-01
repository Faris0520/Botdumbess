const fs = require("fs");
const { Client, Util, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client({
  ws: { properties: { $browser: "Discord iOS" } },
});
require("dotenv").config();
require("./server.js");
const axios = require("axios");
const fetch = require("node-fetch");
const morse = require("morse-node").create("ITU");
let owner = "695817459206324265";
const dF = require("dateformat");
var now = new Date();
let nw = dF(now, "DD-MM-YYYY");

//-----------HANDLER Boi ------------//
//----------------------------------//
const bot = new Client();
const PREFIX = "h.";
const queue = new Map();

bot.on("warn", console.warn);
bot.on("error", console.error);
client.on("ready", async () => {
  console.log(`[READY] ${client.user.tag} has been successfully booted up!`);
  let setatus = [
    `in ${client.guilds.cache.size} servers`,
    `on ${client.channels.cache.size} channels`,
    `with ${client.users.cache.size} users`,
  ];
  setInterval(() => {
    let index = Math.floor(Math.random() * (setatus.length - 1) + 1);
    client.user.setActivity(setatus[index], {
      type: "STREAMING",
      URL: "https://www.twitch.tv/chillhopmusic",
    });
  }, 20000);
});
bot.on("shardDisconnect", (event, id) =>
  console.log(
    `[SHARD] Shard ${id} disconnected (${event.code}) ${event}, trying to reconnect...`
  )
);
bot.on("shardReconnecting", (id) =>
  console.log(`[SHARD] Shard ${id} reconnecting...`)
);

// prevent force disconnect affecting to guild queue
bot.on("voiceStateUpdate", (mold, mnew) => {
  if (!mold.channelID) return;
  if (!mnew.channelID && bot.user.id == mold.id) {
    const serverQueue = queue.get(mold.guild.id);
    if (serverQueue) queue.delete(mold.guild.id);
  }
});

client.on("message", async (message) => {
  let meseg = message.content.toLowerCase();
  if (meseg === `<@${client.user.id}>` || meseg === `<@!${client.user.id}>`) {
    message.channel.send(`My Prefix = \`h.\``);
  }
  // eslint-disable-line
  let emgj = [
    "<:patk3:727906033061855232>",
    "<:eugh:831477683426295811>",
    "<:ndaktau:831494322901352498>",
    "<:heeeeeqqq:730722268107505725>",
    "<:pog:809959799361372202>",
    "<:Y_:734443758313144360>",
    "<:uh:829334002347278396>",
    "<:oh:734444160177799178>",
    "<:sudahkuduqa:831210009861423126>",
    "<:Yoi:745142694359334912>",
    "<a:790481697145225237:812973632799244318>",
    "<:thanos:826748195899703316>",
    "<:imsad:831776276163067986>",
  ];
  let ranem = Math.floor(Math.random() * emgj.length);
  if (message.content === "test") {
    message.react(`${emgj[ranem]}`);
  }
  if (message.author.bot) return;

  const args = message.content.split(" ");
  const input = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(message.guild.id);
  let color = "BLUE";
  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(PREFIX.length);

  const cops = require("./copas.json");
  function jawaa() {
    const randomIndex = Math.floor(Math.random() * cops.length);
    return cops[randomIndex].content;
  }

  if (
    message.content === "cct" ||
    message.content === "cps" ||
    message.content === "cops" ||
    message.content === "niga"
  ) {
    message.delete();
    message.channel
      .createWebhook(message.author.username, {
        avatar: message.author.displayAvatarURL({ dynamic: true }),
      })
      .then((webhook) => {
        webhook.send(jawaa());
        setTimeout(() => {
          webhook.delete();
        }, 600000);
      });
  }

  // ------------------- OTHER COMMANDS -----------------------//
  if (message.content.startsWith("lic")) {
    message.channel.send(`<a:lic:884363894519394304>${input}`);
  }

  if (!message.content.startsWith(PREFIX)) return;
  /////////////////////////////////////
  if (command === "clear") {
    if (message.author.id !== owner)
      return message.channel.send(`<@${ownerID}>`);
    if (!input) return message.channel.send("masukkan jumlah!");
    message
      .delete()
      .then(() => {
        message.channel.bulkDelete(input).then((messages) => {
          message.channel
            .send(`Cleared ${messages.size} message(s).`)
            .then((botMessage) => {
              setTimeout(function () {
                botMessage.delete();
              }, 3000);
            });
        });
      })
      .catch(console.error);
  }

  if (command === "serverinfo") {
    const d = new Date(message.guild.createdTimestamp);
    let day;
    let month;
    if (d.getDate() < 10) {
      day = `0${d.getDate()}`;
    } else {
      day = d.getDate();
    }
    if (d.getMonth() + 1 < 10) {
      month = `0${d.getMonth() + 1}`;
    } else {
      month = d.getMonth();
    }
    const guild = message.guild;
    const Embed = new MessageEmbed()
      .setTitle(message.guild.name)
      .setThumbnail(message.guild.iconURL())
      .setColor("BLUE")
      .addFields([
        { name: "Owner", value: `<@${guild.ownerID}>`, inline: true },
        { name: "Region", value: guild.region, inline: true },
        { name: "Members", value: guild.memberCount, inline: true },
        { name: "Highest Role", value: guild.roles.highest, inline: true },
      ])
      .setFooter(`Server Created = ${day}/${month}/${d.getFullYear()}`);
    message.channel.send(Embed);
  }

  if (command === "userinfo" || command === "ui") {
    var person = message.author;
    let memberinfo = message.guild.member(person);
    const { Client, MessageEmbed, GuildMember } = require("discord.js");
    let role = message.member.roles.hoist;
    const umser = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(`${person.username} Userinfo`)
      .setAuthor(person.tag, person.displayAvatarURL({ format: "png" }))
      .setThumbnail(person.displayAvatarURL({ format: "png" }))
      .addFields(
        { name: "Created at", value: `${person.createdAt}`, inline: true },
        { name: "ID", value: person.id, inline: true },
        { name: "Joined at", value: memberinfo.joinedAt, inline: true },
        { name: "Roles", value: role, inline: true }
      )
      .setTimestamp()
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ format: "png" })
      );
    const embed = await message.channel.send(umser);
    if (message.member.presence.activities[0].name === "Spotify") {
      embed.react("<:r_spotify:843373295046885386>");
      const spotify = new MessageEmbed()
      .setAuthor("Listening to Spotify")
      .setColor(`GREEN`)
      .setThumbnail(person.presence.activities[0].assets.largeImageURL())
      .setDescription(
        `${person.presence.activities[0].details}\nby ${person.presence.activities[0].state}\n**${person.presence.activities[0].assets.largeText}**`
      );
    message.channel.send(spotify);
    }

    const filter = (reaction, user) => {
      return (
        "<:r_spotify:843373295046885386>".includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };

    embed.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        const spotify = new MessageEmbed()
          .setAuthor(
            "Listening to Spotify",
            "https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png"
          )
          .setColor(`GREEN`)
          .setThumbnail(person.presence.activities[0].assets.largeImageURL())
          .setDescription(
            `${person.presence.activities[0].details}\nby ${person.presence.activities[0].state}\n**${person.presence.activities[0].assets.largeText}**`
          );
        message.channel.send(spotify);
      });
  }
  if (command === "ui2") {
    let person = message.mentions.members.first();

    if (person == undefined) {
      let nick = message.member.nickname;
      let role = message.member.roles.hoist;
      let roleColor = message.member.displayHexColor;

      if (roleColor == "#000000") roleColor = "#99aab5";

      let embed = new MessageEmbed()
        .setAuthor("User Info", message.author.avatarURL())
        .setColor("BLUE")
        .setThumbnail(message.author.avatarURL())
        .addField("Username", message.author.username, true);
      if (!(nick == null || nick == message.author.username)) {
        embed.addField("Nickname", nick, true);
      }
      embed.addField(
        "Joined at",
        message.member.joinedAt.toLocaleString(),
        true
      );
      embed.addField(
        "Created at",
        message.author.createdAt.toLocaleString(),
        true
      );
      if (message.member.presence.activities[0] != null) {
        embed.addField(
          "Game",
          message.member.presence.activities[0].name,
          false
        );
      }
      embed.addField("Status", message.member.presence.status, true);
      embed.addField("Highest Role", role, false);
      message.channel.send(embed).catch(console.error);
    } else {
      message.mentions.members.forEach((person) => {
        let nick = person.nickname;
        let role = person.roles.hoist;
        let roleColor = person.displayHexColor;

        if (roleColor == "#000000") roleColor = "#99aab5";

        let embed = new MessageEmbed()
          .setAuthor("User Info", person.user.avatarURL())
          .setColor("BLUE")
          .setThumbnail(person.user.avatarURL())
          .addField("Username", person.user.username, false);
        if (!(nick == null || nick == message.author.username)) {
          embed.addField("Nickname", nick, false);
        }
        if (person.presence.activity != null) {
          embed.addField("Game", person.presence.activity.name, false);
        }
        embed.addField("Status", message.member.presence.status, false);
        embed.addField("Joined Date", person.joinedAt.toLocaleString(), false);
        embed.addField(
          "Account Creation Date",
          person.user.createdAt.toLocaleString(),
          false
        );
        embed.addField("Highest Role", role, false);

        message.channel.send(embed).catch(console.error);
      });
    }
  }
  if (command === "respect" || command === "f") {
    if (!input) {
      let p = new MessageEmbed()
        .setDescription("Tekan <a:r_pressf:843389937139449856> untuk memberi respect.")
        .setColor("GREEN");
      return message.channel.send(p).then(async (msg) => {
        await msg.react("<a:r_pressf:843389937139449856>");

        const filter = async (reaction, user) => {
          const botReact = await user.bot;
          const userReact = await reaction.message.guild.members.cache.get(
            user.id
          );

          if (!botReact)
            message.channel.send(
              `**${userReact.user.username}** memberi respect.`
            );

          return reaction.emoji.id === "843389937139449856";
        };

        msg.awaitReactions({ filter, time: 30000 })
        .then((collected) => {
          const reaction = collected.get("843389937139449856");
          const count = reaction ? reaction.count - 1 : 0; // Subtract 1 to exclude the bot's own reaction
          message.channel.send(`**${count}** orang telah memberi respect 🫡`);
        })
        .catch((error) => {
          console.error('Failed to collect reactions:', error);
        });
      });
    } else {
      let reason = args.join(" ");
      let p = new MessageEmbed()
        .setDescription(
          `Tekan <a:r_pressf:843389937139449856> untuk memberi respect ke **${input}**`
        )
        .setColor("GREEN");
      return message.channel.send(p).then(async (msg) => {
        await msg.react("<a:r_pressf:843389937139449856>");

        const filter = async (reaction, user) => {
          const botReact = await user.bot;
          const userReact = await reaction.message.guild.members.cache.get(
            user.id
          );

          if (!botReact)
            message.channel.send(
              `**${userReact.user.username}** memberi respect.`
            );

          return reaction.emoji.id === "843389937139449856";
        };

        const reactions = msg
        .awaitReactions(filter, { time: 60000 })
        .then((collected) => {
          const reaction = msg.reactions.cache.get("843389937139449856");
          const count = reaction ? reaction.count - 1 : 0; // Subtract 1 to exclude the bot's own reaction
          message.channel.send(
            `**${count}** telah memberi respect ke **${input}** 🫡`
          );
        })
        .catch((error) => {
          console.error('Failed to collect reactions:', error);
        });
    });
  }}
  if (command == "gempa") {
    const url = `https://cuaca-gempa-rest-api.vercel.app/quake`;
    const got = (await import("got")).default;;
    let data = await got(url).then((res) => JSON.parse(res.body));
    let em = new MessageEmbed()
      .setTitle("Gempa terkini")
      .setColor("RED")
      .setImage(`${data.data.shakemap}`)
      .setDescription(`${data.data.wilayah}`)
      .addField("Tanggal", `${data.data.tanggal}`, true)
      .addField("Jam", `${data.data.jam}`, true)
      .addField("Magnitude", `${data.data.magnitude}`, false)
      .addField("Kedalaman", `${data.data.kedalaman}`, true)
      .addField("Dirasakan", `${data.data.dirasakan}`, false);
    message.channel.send(em);
  }
  if (command === "gantinama") {
    if (!message.author.id === owner)
      return message.channel.send("go away brrrrrr");
    bot.user
      .setUsername(`${input}`)
      .then((user) => {
        message.channel.send(
          `Username berhasil diubah. \nUsername: \`${user.username}\` `
        );
        console.log(`My new username is ${user.username}`);
      })
      .catch((error) => {
        message.channel.send(console.error);
        console.log(error);
      });
  }
  if (command === "echo") {
    let suggestmessage = args.join(" ").slice(29);
    let suggestchannel = message.mentions.channels.first();

    if (!suggestchannel) {
      return message.reply("Please mention a channel");
    }

    if (!suggestmessage) {
      return message.reply("Please give a valid message");
    }
    if (message.author.id === owner) {
      message.delete();
    }
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .addField(`${message.guild}`, `${suggestmessage}`)
      .setFooter(`Suggested By ${message.author.tag}`)
      .setTimestamp();
    /* suggestchannel.send({embed}).then(msg => {
        msg.react("👍").then(r => msg.react("👎")) 
    });*/
    suggestchannel.send(suggestmessage);
    //-----------------------------------------------------------------//
    let log = bot.channels.cache.get("840513794119434271");
    let m = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(`${message.guild}`, bot.user.avatarURL)
      .setThumbnail(
        `https://cdn.discordapp.com/emojis/831494322901352498.png?v=1`
      )
      .setDescription(
        `**Pesan : **\n${suggestmessage}\n\n**Dari :**\n<#${message.channel.id}>\n\n**Ke :**\n${suggestchannel}\n\n<@${message.author.id}>`
      )
      .setFooter(
        `Dari ${message.author.tag}, di channel ${suggestchannel.name}`
      );
    log.send(m);
    return;
  }
  if (command === "ecdel") {
    if (!input) return message.channel.send(`hmhm`);
    let pesan = args.join(" ").slice(29);
    let channel = message.mentions.channels.first();
    channel.bulkDelete(pesan);

    message.channel.send(`done. ${pesan} pesan di ${channel} dh diapus`);
  }

  if (
    command === "ping" ||
    (message.author.id === owner && message.content === "ping")
  ) {
    let repl = [
      "Pong!",
      "Pang.",
      "What are you doing?",
      "Peng",
      "U-Uh... h-hi",
      "W-Was I fast enough?",
    ];
    let result = Math.floor(Math.random() * repl.length);
    var ping = Date.now() - message.createdTimestamp;
    if (ping > 500) p = "MF >:";
    if (ping < 500) p = "Nice! <:ndaktau:831494322901352498>";
    message.channel.send(
      `:mega: *${repl[result]}* - My ping: **${ping}** ms (${p})`
    );
  }

  if (command === "images" || command === "photos" || command === "image") {
    /*   if (!input){
        const got = require('got')
        const url = `https://api.unsplash.com/photos/random/?client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`
       
        let dat = await got(url).then(res => JSON.parse(res.body))
        message.channel.send(dat.urls.regular)
       } else */
    if (input === "raw") {
      const got = (await import("got")).default;;
      const url = `https://api.unsplash.com/photos/random/?client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`;

      let dat = await got(url).then((res) => JSON.parse(res.body));
      const emb = new MessageEmbed();
      /*  .setColor(dat.color)
        .setTitle(dat.alt_description)
        .setDescription(`__**Info**__\n${dat.exif.make}\n${dat.exif.model} ${dat.exif.exposure_time}\nISO ${dat.exif.iso} \n\n[**Source**](${dat.links.html})`)
        .setImage(dat.urls.regular)
        .setFooter('Unsplash Image')
    message.channel.send(emb) */
      message.channel.send(dat.urls.raw);
    } else if (input === "regular") {
      const got = (await import("got")).default;;
      const url = `https://api.unsplash.com/photos/random/?client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`;

      let dat = await got(url).then((res) => JSON.parse(res.body));
      message.channel.send(dat.urls.regular);
    } else if (input === "full") {
      const got = (await import("got")).default;;
      const url = `https://api.unsplash.com/photos/random/?client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`;

      let dat = await got(url).then((res) => JSON.parse(res.body));
      message.channel.send(dat.urls.full);
    } else if (
      input !== "full" ||
      input !== "raw" ||
      input !== "regular"
    ) {
      if (!input)
        return message.channel.send(
          "Gambar apa yang ingin kamu cari?\nSearch    : `h.images [Gambar]`\nRandom : `h.images full | raw | regular` "
        );
      const got = (await import("got")).default;;
      try {
        const url = `https://api.unsplash.com/search/photos?page=1&query=${input}&client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`;
        let r = Math.floor(Math.random() * 7);
        let dat = await got(url).then((res) => JSON.parse(res.body));
        message.channel.send(dat.results[r].urls.regular);
      } catch (error) {
        message.channel.send("Try Again!");
      }
    }
  } /*
  if (command === "anime") {
    const Kitsu = require("kitsu.js");
    const kitsu = new Kitsu();
    var search = message.content
      .split(/\s+/g)
      .slice(1)
      .join(" ");

    if (!search) {
      return message.channel.send(
        `Baka! You need to specify an anime to search!\nTry: \`.anime [Anime]\``
      );
    } else {
      var search = message.content
        .split(/\s+/g)
        .slice(1)
        .join(" ");

      kitsu
        .searchAnime(search)
        .then(result => {
          if (result.length === 0) {
            return message.channel.send(`No results found for **${search}**!`);
          }

          var anime = result[0];

          var embed = new MessageEmbed()
            .setColor("#36393F")
            .setAuthor(
              `${anime.titles.english ? anime.titles.english : search} | ${
              anime.showType
              }`,
              anime.posterImage.original
            )
            .setDescription(
              anime.synopsis.replace(/<[^>]*>/g, "").split("\n")[0]
            )
            .addField(
              "❯\u2000Information",
              `•\u2000\**Japanese Name:** ${
              anime.titles.romaji
              }\n\•\u2000\**Age Rating:** ${
              anime.ageRating
              }\n\•\u2000\**NSFW:** ${anime.nsfw ? "Yes" : "No"}`,
              true
            )
            .addField(
              "❯\u2000Stats",
              `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`,
              true
            )
            .addField(
              "❯\u2000Status",
              `•\u2000\**Episodes:** ${
              anime.episodeCount ? anime.episodeCount : "N/A"
              }\n\•\u2000\**Start Date:** ${
              anime.startDate
              }\n\•\u2000\**End Date:** ${
              anime.endDate ? anime.endDate : "Still airing"
              }`,
              true
            )
            .setImage(anime.posterImage.original);
          return message.channel.send({ embed });
        })
        .catch(err => {
          console.log(err);
          return message.channel.send(
            `No results found for **${search}**! or try again!`
          );
        });
    }
  }*/
  if (command === "gantipp") {
    if (message.author.id !== owner)
      return message.channel.send(`khusus owner! <@${owner}> `);
    if (!input) return message.channel.send("masukkan gambar");
    if (message.author.id == owner) {
      client.user
        .setAvatar(input)
        .then((user) =>
          message.channel
            .send("Avatar berhasil diubah!")
            .catch(message.channel.send(console.error))
        );
    }
  }
  if (command === "search") {
    if (!input)
      return message.channel.send(
        "Cari Gambar di Unsplash. ||sbnrny mirip h.images 😅||\n`h.search [query]`"
      );
    const got = (await import("got")).default;;
    const url = `https://api.unsplash.com/search/photos?page=1&query=${input}&client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`;
    let r = Math.floor(Math.random() * 11);
    let dat = await got(url).then((res) => JSON.parse(res.body));
    message.channel.send(dat.results[r].urls.regular);
  }
/*  if (command === "ss") {
    if (!input) return message.channel.send("Masukkan url!");
    const axios = require("axios");
    const url = `https://shot.screenshotapi.net/screenshot?&url=${input}&fresh=true&output=json&file_type=png&wait_for_event=load`;
    const got = (await import("got")).default;;
    let data = await got(url).then((res) => JSON.parse(res.body));
    let w = new MessageEmbed()
      .setAuthor(data.url)
      .setImage(data.screenshot)
      .setColor("BLUE")
      .setFooter("Web Screenshot");
    message.channel.send(w);
  }
*/    
  if (command === "adzan") {
    let txt = args.join(" ");
    if (!input)
      return message.channel.send(
        `\`.adzan <city>\` (Hanya tersedia kota" di indonesia. Kota negara lain tdk tersedia)`
      );
    let nama = input.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    const url = `http://api.aladhan.com/v1/timingsByCity?city=${txt}&country=Indonesia&method=8`;
    const got = (await import("got")).default;;
    let data = await got(url).then((res) => JSON.parse(res.body));
    var hmm = new MessageEmbed()
      .setAuthor(`Adzan Prayer Time | ${nama}`)
      .setDescription(`Today`)
      .addField(`Subuh`, data.data.timings.Fajr, false)
      .addField(`Dzuhur`, data.data.timings.Dhuhr, false)
      .addField(`Ashar`, data.data.timings.Asr, true)
      .addField(`Magrib`, data.data.timings.Maghrib, true)
      .addField(`Isha`, data.data.timings.Isha, true)
      .setFooter(`${nama}, Indonesia`, message.author.avatarURL)
      .setTimestamp()
      .setColor(`BLUE`);
    message.channel.send(hmm);
  }
  if (command === "morse") {
    message.channel.send(
      "Morse Translator.\nText -> Morse = `h.morsee`\nMorse -> Text = `h.morsed`"
    );
  }
  if (command === "igdl" || command === "ig") {
    if (!input) return message.channel.send("masukkan link");
    const url = `https://api.lolhuman.xyz/api/instagram?apikey=3f342f50d0fb2f0cbfdc7848&url=${args[1]}`;
    const got = (await import("got")).default;;
    let data = await got(url).then((res) => JSON.parse(res.body));

    try {
      let ttc = new Discord.MessageAttachment(data.result[0], `instagram.mp4`);
      let ttc2 = new Discord.MessageAttachment(data.result[1], `instagram.mp4`);
      let ttc3 = new Discord.MessageAttachment(data.result[2], `instagram.mp4`);
      let ttc4 = new Discord.MessageAttachment(data.result[3], `instagram.mp4`);
      let ttc5 = new Discord.MessageAttachment(data.result[4], `instagram.mp4`);

      const member = message.author;
      if (!member) return message.reply("error unexpected");
      let memer = member.nickname || member.username;
      message.delete();
      message.channel
        .createWebhook(memer, {
          avatar: member.displayAvatarURL({ dynamic: true }),
        })
        .then((webhook) => {
          webhook.send(`${args[2] || "  "}`, ttc);
          setTimeout(() => {
            webhook.delete();
          }, 600000); 
        });
    } catch (e) {
      message.channel.send(`Error, coba lagi!. ||<@${owner}>||`);
    }
  }
  if (command === "igdl" || command === "ig2") {
    if (!input) return message.channel.send("masukkan link");
    const url = `https://api.lolhuman.xyz/api/instagram?apikey=854755d0039999bbaeee450c&url=${args[1]}`;
    const got = (await import("got")).default;;
    let data = await got(url).then((res) => JSON.parse(res.body));

    try {
      let ttc = new Discord.MessageAttachment(data.result[0], `instagram.mp4`);
      let ttc2 = new Discord.MessageAttachment(data.result[1], `instagram.mp4`);
      let ttc3 = new Discord.MessageAttachment(data.result[2], `instagram.mp4`);
      let ttc4 = new Discord.MessageAttachment(data.result[3], `instagram.mp4`);
      let ttc5 = new Discord.MessageAttachment(data.result[4], `instagram.mp4`);

      const member = message.author;
      if (!member) return message.reply("error unexpected");
      let memer = member.nickname || member.username;
      message.delete();
      message.channel
        .createWebhook(memer, {
          avatar: member.displayAvatarURL({ dynamic: true }),
        })
        .then((webhook) => {
          webhook.send(`${args[2] || "  "}`, ttc, `${ttc2 || undefined}`);
          setTimeout(() => {
            webhook.delete();
          }, 600000);
        });
    } catch (e) {
      message.channel.send(`Error, coba lagi!. ||<@${owner}>||`);
    }
  }
  if (command === "api") {
    const url = `https://api.lolhuman.xyz/api/checkapikey?apikey=3f342f50d0fb2f0cbfdc7848`;
    const got = (await import("got")).default;;
    let data = await got(url).then((res) => JSON.parse(res.body));

    message.channel.send(`Today: ${data.result.today}`);
  }
  if (command === "api2") {
    const url = `https://api.lolhuman.xyz/api/checkapikey?apikey=854755d0039999bbaeee450c`;
    const got = (await import("got")).default;;
    let data = await got(url).then((res) => JSON.parse(res.body));

    message.channel.send(`Today: ${data.result.today}`);
    /* message.channel.send(`\`\`\`json\n{
    "status": ${data.status},
    "message": "${data.message}",
    "result": {
        "requests": ${data.result.requests},
        "today": ${data.result.today}
    }
}\`\`\` `)*/
  }
  if (command === "wallpaper") {
    if (!input)
      return message.channel.send(`wallpaper apa yg mau dicari?`);
    const url = `https://wallhaven.cc/api/v1/search?q=${input}`;
    const got = (await import("got")).default;;
    let data = await got(url).then((res) => JSON.parse(res.body));
    let r = Math.floor(Math.random() * 15);
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(`${input}`)
      .setURL(data.data[r].url)
      .addField(`Category :`, `${data.data[r].category}`, true)
      .addField(`Views :`, `${data.data[r].views}`, true)
      .addField(`Created at :`, `${data.data[r].created_at}`, true)
      .addField(`Purity :`, `${data.data[r].purity}`, true)
      .addField(`Resolution :`, `${data.data[r].resolution}`, false)
      .addField(`File Size :`, `${data.data[r].file_size} KB`, false)
      .setDescription(`[**Download Image**](${data.data[r].path}) `)
      .setImage(`${data.data[r].thumbs.large}`)
      .setFooter(`gbt`);
    message.channel.send(embed);
    if (data.meta.total === 0){
      message.channel.send("Wallpaper tidak ditemukan!\n-#Source: Wallhaven");
    }
  }
  if (command === "morsee" || input[0] === "encode") {
    if (!input[1])
      return message.channel.send(
        "Mengubah Teks ke Kode Morse.\nKetik `h.morsee [Teks]` tanpa `[]`."
      );
    const translate = morse.encode(input);
    const embed = new MessageEmbed()
      .setTitle("Morse Encode (Teks - Morse)")
      .setColor("BLUE")
      .addField("Teks", input, false)
      .addField("Morse", `\`${translate}\``, false)
      .setFooter(
        `Hi ${message.author.username} | Alternatif : \`h.morsee\``,
        message.author.avatarURL()
      );
    message.channel.send(embed);
    message.channel.send(`\`${translate}\``);
  } else if (command === "morse-decode" || command === "morsed") {
    if (!input)
      return message.channel.send(
        "Mengubah Kode morse ke Teks.\nKetik `h.morsed [Morse]` tanpa `[]`."
      );
    const translate = morse.decode(input);
    const embed = new MessageEmbed()
      .setTitle("Morse Decode (Morse - Teks)")
      .setColor("BLUE")
      .addField("Morse", input, false)
      .addField("Text", translate, false)
      .setFooter(
        `Hi ${message.author.username} | Alternatif : \`h.morsed\``,
        message.author.avatarURL()
      );
    message.channel.send(embed);
  }
  if (command === "project") {
    message.channel.send(
      "https://github.com/faris0520/soumoe jangan lupa star ya!"
    );
  }
  if (command === "say" && message.author.id == owner) {
    message.delete({ timeout: 100 });
    message.channel.send(input);
  } else if (command === "say" && message.author.id != owner) {
    if (!input)
      return message.channel.send(
        `mau ngomong ap, ${message.author.username}?`
      );
    message.channel.send(`${input} \n\n- **${message.author.tag}**`);
  }

  let user = message.mentions.users.first();
  if (command === "spam" && user == owner) {
    if (!input)
      return message.channel.send(
        `lu mau w spam apaan bro? ${message.author.username}`
      );
    message.channel.send(`bacot lu. ${message.author.username} nak harom`);
  } else if (
    command === "spam" &&
    message.channel.id !== "730666270139088918" &&
    message.author.id !== owner
  ) {
    message.delete({ timeout: 100 });
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`huh. <@${message.author.id}>`);
  } else if (
    command === "spam" &&
    message.channel.id === "730666270139088918"
  ) {
    message.channel.send("dont spam in general dud");
  } else if (command === "spam" && message.author.id === owner) {
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
  }
  if (command === "yt") {
    const url = `https://api.lolhuman.xyz/api/ytreels?apikey=3f342f50d0fb2f0cbfdc7848&url=${input}`;
    const got = (await import("got")).default;;
    let data = await got(url).then((res) => JSON.parse(res.body));
  }

  /*
  if (command == "redid" || command === "reddit") {
    const url = `https://www.reddit.com/r/${input}.json`
    const got = (await import("got")).default;;
    let data = await got(url).then(res => JSON.parse(res.body));
    let r = Math.floor(Math.random() * 31);
    if (!input[0])
      return message.reply("**Please provide a subreddit.**");
    const color = message.guild.me.displayHexColor;
    var dat = data.data.children[r].data;

    const reddit = new MessageEmbed()
    reddit.setAuthor(dat.subreddit_name_prefixed)
    reddit.setTitle(dat.title)
    if (dat.domain === "i.redd.it" || dat.domain === "reddit.com") {
      reddit.setURL(dat.url_overridden_by_dest)
      reddit.setImage(dat.url)
      reddit.setDescription(
        `👍 **${dat.ups}**`
      )
    }
    if (dat.domain !== "i.redd.it" || dat.domain !== "reddit.com") {
      reddit.setDescription(`${dat.selftext}\n--------------\n👍 **${dat.ups}**`)
    }
    reddit.setAuthor(
      `r/${dat.subreddit}`,
      "https://cdn.discordapp.com/attachments/799226474640048149/799273472990642196/2018_social_media_popular_app_logo_reddit-512.png",
      dat.url_overridden_by_dest
    )
    reddit.setColor(color)
    reddit.setFooter(
      `If the image didn't load click the title.`,
      message.guild.iconURL({ dynamic: true })
    );
    message.channel.send(reddit);
  } */
  if (command === "reddid" || command === "reddit" || command === "redid") {
    const got = (await import("got")).default;;
    const url = `https://www.reddit.com/r/${input}/top/.json?sort=top&t=week&limit=60`;
    let data = await got(url).then((res) => JSON.parse(res.body));
    if (!input[0]) return message.channel.send("Subreddit?");
    var index = data.data.children[Math.floor(Math.random() * 50) + 1].data;

    var image = index.preview.images[0].source.url.replace("&amp;", "&");
    var title = index.title;
    var link = "https://reddit.com" + index.permalink;
    var subRedditName = index.subreddit_name_prefixed;
    /*      if (index.post_hint !== 'image') {

                    var text = index.selftext
                    const textembed = new MessageEmbed()
                        .setTitle(subRedditName)
                        .setColor(9384170)
                        .setDescription(`${text}`)
                        .setTitle(`${title}`)
                        .setURL(`https://reddit.com/${subRedditName}`)

                    message.channel.send(textembed)
                }*/
    if (index.post_hint === "hosted:video") {
      let att = new Discord.MessageAttachment(
        index.media.reddit_video.fallback_url,
        "reddit.mp4"
      );
      message.channel.send(`${title}`, att);
    }
    if (index.post_hint === "image") {
      var image = index.preview.images[0].source.url
        .replace("&amp;", "&")
        .replace("&amp;", "&");
      var title = index.title;
      var link = "https://reddit.com" + index.permalink;
      var subRedditName = index.subreddit_name_prefixed;

      const imageembed = new MessageEmbed()

        .setImage(image)
        .setColor(9384170)
        .setTitle(`${title}`)
        .setDescription(`[_Link_](${link})`);
      message.channel.send(imageembed);
    }
  }
  if (command === "meme") {
    const url = [
      `https://www.reddit.com/r/memes/hot/.json?limit=100`,
      `https://reddit.com/r/dankmemes/hot/.json?limit-100`,
    ];
    const rnd = Math.floor(Math.random() * url.length);
    let hu = url[rnd];
    const got = (await import("got")).default;;
    let data = await got(hu).then((res) => JSON.parse(res.body));
    let r = Math.floor(Math.random() * 99);
    const color = message.guild.me.displayHexColor;
    var dat = data.data.children[r].data;
    if (dat.domain === "v.redd.it") {
      let att = new Discord.MessageAttachment(dat.url, "reddit.mp4");
      message.channel.send(`_${dat.title}_`, att);
    }
    if (dat.domain !== "v.redd.it") {
      const att = new Discord.MessageAttachment(dat.url, "reddit.jpg");
      message.channel.send(`_${dat.title}_`, att);
    }
  }
  if (command === "indonesia" || command === "indo") {
    const hu = `https://reddit.com/r/indonesia/hot/.json?limit=100`;
    const got = (await import("got")).default;;
    let data = await got(hu).then((res) => JSON.parse(res.body));
    let r = Math.floor(Math.random() * 99);
    const color = message.guild.me.displayHexColor;
    var dat = data.data.children[r].data;
    if (dat.domain === "v.redd.it") {
      let att = new Discord.MessageAttachment(dat.url, "reddit.mp4");
      message.channel.send(`_${dat.title}_`, att);
    }
    if (dat.domain !== "v.redd.it") {
      const att = new Discord.MessageAttachment(dat.url, "reddit.jpg");
      message.channel.send(`_${dat.title}_`, att);
    }
    if (dat.is_gallery === true) {
      message.channel.send(
        'Coba lagi! ||(bukan error, tpi sy tidak bisa menampilkan "Reddit Gallery")||'
      );
    }
  }
  if (command === "add") {
    const ar = message.content.split(" ").slice(1);
    const name = args.slice(1).join(" ");
    message.guild.emojis.create(`${args[1]}`, `${args[2]}`).then((emoji) => {
      console.log(`Created new emoji with name ${emoji.name}!`);
      message.channel.send(`Created new emoji with name ${emoji.name}!`);
    });
  }
  if (command === "id") {
    const target = message.mentions.members.first().user.id;
    if (!target) return message.channel.send("Unkown member");

    const guildMember = message.guild.members.cache.get(target.id);
    message.channel.send(target);
  }
  if (command === "sudo") {
    if (!input) return message.channel.send("||ndak tau udah||");
    const member =
      message.mentions.members.first() || client.users.fetch(args[1]);
    if (!member) return message.reply("Can't find this user");
    let memer = member.user.nickname || member.user.username;
    message.delete();
    message.channel
      .createWebhook(memer, {
        avatar: member.user.displayAvatarURL({ dynamic: true }),
      })
      .then((webhook) => {
        webhook.send(args.join(" ").slice(29));
        setTimeout(() => {
          webhook.delete();
        }, 600000);
      });
    let log = bot.channels.cache.get("840513794119434271");
    let d = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor(
        "- Sudo Commands -",
        message.author.displayAvatarURL({ format: "png" })
      )
      .addFields(
        { name: "From", value: `<@${message.author.id}>` },
        { name: "Target", value: `<@${member.user.id}>` },
        { name: "Channel", value: `<#${message.channel.id}>` },
        { name: "Content", value: args.join(" ").slice(29) }
      )
      .setFooter(`si ${message.author.username} ngapus pesan`)
      .setTimestamp();
    log.send(d);
  }
  if (command === "webh") {
    message.channel
      .fetchWebhooks()
      .then((webhooks) => {
        let p = webhooks.filter((webhook) => webhook.name === "MEE6 Webhooks");
        message.channel.send(
          `${webhooks.map((webhook) => webhook.name).join(", ")}`
        );
        console.log(`Fetched ${webhooks.size} webhooks`);
      })
      .catch(message.channel.send(error));
  }
  if (command === "wdel") {
    message.channel
      .fetchWebhooks()
      .then((webhooks) => {
        let p = webhooks.filter((webhook) => webhook.name !== "MEE6 Webhooks");
        for (let [name, webhook] of p)
          webhook.delete(`Requested by ${message.author.tag}`);
        message.channel.send("||sudo webhook has reseted :thumbsup:||");
      })
      .catch(console.error);
  }
  if (command === "servers") {
    let p = new MessageEmbed()
      .setColor("GOLD")
      .setAuthor(`Servers im join. Thanks for inviting!`)
      .setDescription(
        client.guilds.cache.map((guild) => guild.name).join("*,\n*")
      )
      .setTimestamp()
      .setFooter(`Noob bot`);
    message.channel.send(p).catch(console.error);
  }
  if (command === "kbbi") {
    if (!input) return message.channel.send("mau cari ap ngab?");
    let web = `https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${input}`;
    const got = (await import("got")).default;;
    let data = await got(web)
      .then((res) => JSON.parse(res.body))
      .catch((e) => message.channel.send(e));
    let e = new MessageEmbed()
      .setTitle(data.lema)
      .setDescription(data.arti)
      .setColor("BLUE");
    message.channel.send(e).catch(console.error);
  }
  if (command === "test") {
    message.channel.send(
      `${input[0]} | ${input[1]} | ${input[2]} | ${input}`
    );
    message.channel.send(`${args[0]} | ${args[1]} | ${args[2] || " "} `);
    message.channel.send(`${message.author.tag} | ${message.author.username}`);
  }

  /*  if (command === "manga") { //eror
    if (!input) return message.channel.send("mau cari ap ngab?");
    if (args[1] === "recomm") {
      let web = `https://mangamint.kaedenoki.net/api/recommended`;
      const got = (await import("got")).default;;
      let data = await got(web)
        .then(res => JSON.parse(res.body))
        .catch(e => message.channel.send(e));
      let r = Math.floor(Math.random() * 11);
      let p = new MessageEmbed()
        .setTitle(data.manga_list[r].title)
        .setDescription(
          `Baca di [Komiku](https://komiku.id/manga/${data.manga_list[r].endpoint})`
        )
        .setImage(data.manga_list[r].thumb)
        .setColor("BLUE");
      const edid = await message.channel.send(p);
    }
    if (args[1] === "search") {
      let web = `https://mangamint.kaedenoki.net/api/search/${args
        .slice(20)
        .join(" ")}`;
      const got = (await import("got")).default;;
      let data = await got(web)
        .then(res => JSON.parse(res.body))
        .catch(e => message.channel.send(e));
      let poi = `https://mangamint.kaedenoki.net/api/manga/detail/${data.manga_list[1].endpoint}`;
      let ple = await got(poi).then(res => JSON.parse(res.body));
      let mb = new MessageEmbed()
        .setAuthor(`${ple.title}`)
        .setURL(`https://komiku.id/manga/${ple.manga_endpoint}`)
        .setDescription(
          `${ple.synopsis}\n\n**Type  :** ${ple.type}\n**Author :** ${ple.author}\n**Status :** ${ple.status}\n**Genre :** ${ple.genre_list[0].genre_name}, ${ple.genre_list[1].genre_name}\n**Chapter Terbaru :**\n- [${ple.chapter[0].chapter_title}](https://komiku.id/c/${ple.chapter[0].chapter_endpoint})`
        )
        .setImage(ple.thumb)
        .setColor("BLUE")
        .setFooter(
          "| Komiku.id",
          message.author.displayAvatarURL()
        );
      const haha = await message.channel.send(mb);
    }
  }*/
  if (command === "spams" && message.author.id == owner) {
    message.delete({ timeout: 100 });
    const spp = await message.channel.send(`${input}`);
    spp.channel.send(`${input}`);
    spp.delete({ timeout: 100 });
    spp.channel.send(`${input}`);
    spp.delete({ timeout: 100 });
    spp.channel.send(`${input}`);
    spp.delete({ timeout: 100 });
    spp.channel.send(`${input}`);
    spp.delete({ timeout: 100 });
    spp.channel.send(`${input}`);
    spp.delete({ timeout: 100 });
  }

  if (command === "spam100" && message.author.id == owner) {
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`${input}`);
    message.channel.send(`Tugas ku sudah selesai, bang <@${owner}> :thumbsup:`);
  } else if (command === "spam100" && message.author.id != owner) {
    message.channel.send("go away brrrrr");
  }

  /*  if (command === "ai" || command === "ask") {
    let p = new MessageEmbed().setDescription(
      "Lebih baik langsung di channelny ae :/\n\nGatau channelny?, tanya paris"
    );
    const url = `https://api.udit.gq/api/chatbot?message=${input}&gender=male&name=${message.author.username}`;
    let response, data;
    try {
      response = await axios.get(url);
      data = response.data;
    } catch (e) {
      return message.channel.send(`Error ngab`);
    }
    message.channel.send(data.message);
  }*/

  if (command === "avatar") {
    const user = message.mentions.users.first() || message.author;
    const em = new MessageEmbed()
      .setTitle(`${user.tag}`)
      .setImage(user.avatarURL({ size: 1024, dynamic: "GIF" }))
      .setColor(`BLUE`)
      .setFooter(`Requested by ${message.author.tag}`);
    message.channel.send(em);
  }

  if (command === "choose") {
    if (!args[0]) return message.channel.send("Please Give Me Text!");

    if (!input.toLowerCase().includes(" ")) {
      return message.channel.send("Please Give Me 2nd Choice. jgn lebih :/");
    }

    if (input.toLowerCase().endsWith(" ")) {
      return message.channel.send("Please Give Me 2nd Choice!. jgn lebih :/");
    }

    if (input.length > 500)
      return message.channel.send("wuh santai ngab | Limit : 500");

    let LowerCaseOr = input
      .replace("Or", "or")
      .replace("oR", "or")
      .replace("OR", "or");

    let Select = LowerCaseOr.split(` `);
    let Result = Select[Math.floor(Math.random() * Select.length)];
    message.channel.send(Result);
  }
  if (command === "ai") {
    const OpenAI = require("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI
    });
  
    if (!input)
      return message.channel.send("Mohon berikan pertanyaan atau pesan untuk AI.");
  
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${input}` }],
      model: "gpt-4o",
    });
  
    console.log(completion.choices[0]);
    const responseText = completion.choices[0].message.content;
  
    // Memeriksa panjang pesan dan membaginya jika lebih dari 1999 karakter
    if (responseText.length > 1999) {
      // Membagi pesan menjadi potongan-potongan
      let partLength = 1999;
      for (let i = 0; i < responseText.length; i += partLength) {
        const part = responseText.substring(i, i + partLength);
        message.channel.send(part);
      }
    } else {
      // Mengirim pesan jika kurang dari atau sama dengan 1999 karakter
      message.channel.send(responseText);
    }
  }
  if (command === "roast"){
    const OpenAI = require("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI
    });

    const url = `https://api.github.com/users/${input}`;
    const rep = `https://api.github.com/users/${input}/repos?sort=updated`;
    const got = (await import("got")).default;;
    let profileResponse = await got(url).then((res) => JSON.parse(res.body));
    let repoResponse = await got(rep).then((res) => JSON.parse(res.body));

    if (!input)
      return message.channel.send("Masukkan username github.");
  
    data = {
      "name": profileResponse.name,
      "bio": profileResponse.bio,
      "company": profileResponse.company,
      "location": profileResponse.location,
      "followers": profileResponse.followers,
      "following": profileResponse.following,
      "public_repos": profileResponse.public_repos,
      "created_at": profileResponse.created_at,
      "updated_at": profileResponse.updated_at,
      "repositories": repoResponse.map(repo => ({
                    "name": repo.name,
                    "description": repo.description,
                    "language": repo.language,
                    "stargazers_count": repo.stargazers_count,
                    "open_issues_count": repo.open_issues_count,
                    "license": repo.license,
                    "fork": repo.fork,
                    "created_at": repo.created_at,
                    "updated_at": repo.updated_at
                })).slice(0, 50)}

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `berikan roasting singkat dengan kejam, menyindir, serta menyakitkan dalam bahasa gaul untuk profile github berikut : ${input}. Berikut detailnya: "${JSON.stringify(data)}". (berikan response dalam bahasa indonesia dan jangan berikan pujian atau saran)` }],
      model: "gpt-4o",
    });
  
    console.log(completion.choices[0]);
    const m = completion.choices[0].message.content;
  
    message.channel.send(`${m}`)
  }
  if (command === "aimage") {
    /*const OpenAI = require("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI
    });
  
    if (!input)
      return message.channel.send("Mohon berikan pertanyaan atau pesan untuk AI.");
  
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${input}`,
      n: 1,
      size: "1024x1024",
    });

    const image = new Discord.MessageAttachment(`${response.data[0].url}`, `${input}.png`);
    message.channel.send(image);
    */
    message.channel.send("Command ini telah dinonaktifkan.");
  }
  if (command === "wangy") {
    if (!input) return message.channel.send("Masukkan nama!");
    let idk = input.replace(
      input,
      String.call.bind(input.toUpperCase)
    );
    message.channel.send(
      `${idk} WANGY WANGY WANGY\n\nWANGY WANGY WANGY HU HA HU HA HU HA, aaaah baunya ${idk} wangi aku mau nyiumin aroma wanginya ${idk} AAAAAAAAH - Rambutnya.. aaah rambutnya juga pengen aku elus-elus ~AAAAAH ${idk} manis banget AAAAAAAAH TATAPAN ${idk} BEGITU MENGGODAAAAAAAAA.. GUA RELA JADI BUDAK SIMP HANYA DEMI ${idk} TERDJINTA AAAAAAA apa ? ${idk} itu gak nyata ? Cuma karakter 2 dimensi katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA ! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ${idk} ngeliat gw ... ${idk} NGELIATIN GW! ${idk}... kamu percaya sama aku ? aaaaaaaaaaah syukur ${idk}\n\ngak malu memiliki aku aaaaaah YEAAAAAAAAAAAH GUA\n\n\nMASIH PUNYA ${idk}, ${idk} AKU SAYANG ${idk} AKU CINTA ${idk} AKU AKU INGIN ${idk} MENJADI BIDADARIKUUUUUUU!!!!!!!!!!!!!`
    );
  }

  if (command === "wikihow") {
    const url = `https://kagchi-api.glitch.me/wikihow`;
    const got = (await import("got")).default;;
    let data = await got(url).then((res) => JSON.parse(res.body));
    var o = new MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle(data.title)
      .setImage(data.url)
      .setDescription(`[**WikiHow Source**](${data.article_url})`)
      .setFooter("hmm", message.author.avatarURL())
      .setColor("GREEN");
    message.channel.send(o);
  }

  if (command === "invite") {
    message.channel.send(
      `https://discord.com/oauth2/authorize?client_id=727354971707932702&permissions=8&scope=bot \n\nthx <3 <@${message.author.id}>`
    );
  }

  if (command === "afk") {
    const db = require("quick.db");
    try {
      let reason = input;
      if (reason.toLowerCase().includes(`discord.gg`)) {
        return message.reply(`You can\'t have links in your reason`);
      }
      let afkcheck = db.fetch(`afk_${message.guild.id}_${message.author.id}`);
      if (!input) {
        reason = "AFK";
      }
      if (afkcheck == null) {
        await db.set(`afk_${message.guild.id}_${message.author.id}`, {
          tag: message.author.username,
          reason: reason,
        });
        message.channel.send(`I have set your AFK with reason: **${reason}**`);
        await message.react("👍");
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

/*  if (command === "tk" || command === "daily") {
    message.delete();
    const url = `https://cinnabar.icaksh.my.id/public/daily/tawiki`;
    const got = (await import("got")).default;;
    let data = await got(url).then((res) => JSON.parse(res.body));
    let r = Math.floor(Math.random() * 4);
    message.channel.send(
      `## Tahukah Kamu\n\n${data.data.info[r].tahukah_anda}`
    );
  }
    */
  //------------ M U S I C . C O M M A N D S -----------------//
  if (command === "help") {
    const helpembed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(
        "Botdumbess",
        "https://cdn.discordapp.com/avatars/727354971707932702/059bfc408f82dece8c540347bd17fa92.webp?size=1024"
      )
      .setTitle("Command List").setDescription(`
_**==> New Command**_
 \`h.ig\` \`h.ytdl\` \`h.ytmp3\` 
 \` (This command have limitation)\`

**Images**
 \`h.search\` \`h.ss\` \`h.reddit\`
 \`h.images\` \`h.avatar\` \`h.wikihow\`

**Misc**
 \`h.ask\` \`h.morse\` \`h.wink\`
 \`h.adzan\` \`h.choose\` \`h.wangy\` 
 \`h.anime\` \`h.respect\` \`h.kbbi\`

**Tools**
 \`h.ping\` \`h.invite\` \`h.userinfo\`
 \`h.say\` \`h.echo\` \`h.sudo\`

 
Sebenarnya masih bnyk, tpi *Malas* nulis. Coba2 aja, atau tanya.
 ~ parris
 `);
    if (message.author.id === owner) {
      helpembed.addField(
        `only for pares <a:watdadog:877318619556630578>`,
        `\`h.webh\`  \`h.wdel\``
      );
    }
    helpembed.setThumbnail(
      "https://cdn.discordapp.com/avatars/727354971707932702/059bfc408f82dece8c540347bd17fa92.webp?size=1024"
    );
    helpembed.setFooter("bot paris", message.author.avatarURL);
    message.channel.send(helpembed).catch(console.error);
  }

  if (command === "ytmp3") {
    if (!input) return message.channel.send("Masukkan link youtube.`");
    const got = (await import("got")).default;;
    const url = `https://api.lolhuman.xyz/api/ytaudio?apikey=5119194f07cdf52d5c57d3d0&url=${input}`;
    let dat = await got(url).then((res) => JSON.parse(res.body));
    try {
      let ytm = message.channel;
      let att = new MessageEmbed()
        .setTitle(dat.result.title)
        .setThumbnail(`${dat.result.thumbnail}`)
        .setURL(`${dat.result.link.link}`)
        .setDescription(
          `File akan segera dikirim....\n\n------------------------------------\nSize : ${dat.result.link.size} \n **_kalo lagu ny belum terkirim, lu bisa [Klik ini!](${dat.result.link.link})_**`
        )
        .setFooter(
          `pembajakan but, no one care `,
          `https://cdn.discordapp.com/emojis/830015051833278505.png?v=1`
        )
        .setColor("#2F3136");
      message.channel.send(att);
      ttc = new Discord.MessageAttachment(
        dat.result.link.link,
        `${dat.result.title}.mp3`
      );
      message.channel.send(ttc);
    } catch (e) {
      return message.channel.send(`Server error!`);
    }
  }
  if (command === "google" || command === "gugel") {
    if (!input)
      return message.channel.send(
        "mau cari afh? <:hmm:959422267236945970> || jangan sring dipake, ad limitny perhari ||"
      );
    const got = (await import("got")).default;;
    const url = `https://api.lolhuman.xyz/api/gsearch?apikey=3f342f50d0fb2f0cbfdc7848&query=${input}`;
    let data = await got(url).then((res) => JSON.parse(res.body));

    let p = new MessageEmbed()
      .setAuthor(
        "Google Search",
        "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
      )
      .setTitle(`${input}`)
      .setDescription(
        `**[${data.result[0].title}](${data.result[0].link})**\n\`${data.result[0].link}\`\n${data.result[0].desc}\n\n**[${data.result[1].title}](${data.result[1].link})**\n\`${data.result[1].link}\`\n${data.result[1].desc}\n\n**[${data.result[2].title}](${data.result[2].link})**\n\`${data.result[2].link}\`\n${data.result[2].desc}\n\n**[${data.result[3].title}](${data.result[3].link})**\n\`${data.result[3].link}\`\n${data.result[3].desc}\n\n**[${data.result[4].title}](${data.result[4].link})**\n\`${data.result[4].link}\`\n${data.result[4].desc}`
      )
      .setColor("#36393F");
    message.channel.send(p);
  }

  if (command == "stock" || command == "stok" || command == "saham") {
    if (!input) return message.channel.send("Masukkan nama stok!");

    let stok = `${input.toUpperCase()}`;
    let link = `https://api.chart-img.com/v1/tradingview/advanced-chart?key=eU0wk2N1a24X4WutKduR19QiOYs1oSvm3dDHNhUD&symbol=nasdaq:${stok}&interval=5m&style=line`;
    let link2 = `http://api.marketstack.com/v1/tickers/${stok}/intraday?access_key=891320bd915705bf7d49ca0af19abfc4`;
    let link3 = `https://api.polygon.io/v3/reference/tickers/${stok}?apiKey=JbQ9qI1RzLjAQDDVQ9KUdfxHxiopBhpO`;

    const got = (await import("got")).default;;
    let price = await got(link2).then((res) => JSON.parse(res.body));
    let data = await got(link3).then((res) => JSON.parse(res.body));

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `${data.results.ticker} (${data.results.name})`,
        `${
          data.results.branding.icon_url +
          "?apiKey=JbQ9qI1RzLjAQDDVQ9KUdfxHxiopBhpO"
        }`
      )
      .addField(`Volume`, `$${price.data.intraday[0].volume}`, true)
      .addField(`Open`, `$${price.data.intraday[0].open}`, true)
      .addField(`Close`, `$${price.data.intraday[0].close}`, true)
      .addField(`Now`, `$${price.data.intraday[0].last}`, false)
      .setImage(link)
      .setColor("#5dbdd2")
      .setTimestamp()
      .setFooter(`Data fetched from tradingview.com`);
    message.channel.send(embed);
    return;
  }

  if (command === "ytdl") {
    if (!input) return message.channel.send("Masukkan link youtube.");
    const got = (await import("got")).default;;
    const url = `https://api.lolhuman.xyz/api/ytreels?apikey=3f342f50d0fb2f0cbfdc7848&url=${input}`;
    let dat = await got(url).then((res) => JSON.parse(res.body));
    message.channel.send("loading... if stuck, error.");
    try {
      let att = await new MessageEmbed()
        .setTitle(dat.result.title)
        .setThumbnail(`${dat.result.thumbnail}`)
        .setURL(`${dat.result.link}`)
        .setDescription(
          `File akan segera dikirim....\n\n------------------------------------\n**_kalo video ny belum terkirim, kamu bisa [Klik ini!](${dat.result.link})_**`
        )
        .setFooter(
          `pembajakan but, no one care `,
          `https://cdn.discordapp.com/emojis/830015051833278505.png?v=1`
        )
        .setColor("#2F3136");
      message.channel.send(att);

      ttd = new Discord.MessageAttachment(
        dat.result.link,
        `${dat.result.title}.mp4`
      );
      message.channel.send(ttd);
      if (ttd.size > "8388608") {
        message.channel.send(`${dat.result.link}`);
      }
    } catch (e) {
      return message.channel.send(`Error! \n \`\`\`bash\n${e}\n\`\`\``);
    }
  }
  if (command === "tt") {
    if (!input) return message.channel.send("Masukkan link Tiktok!");
    const got = (await import("got")).default;;
    const url = `https://api.lolhuman.xyz/api/tiktokwm?apikey=3f342f50d0fb2f0cbfdc7848&url=${input}`;
    let dat = await got(url).then((res) => JSON.parse(res.body));
    message.channel.send("loading... if this stuck, ok error.");
    try {
      ttd = new Discord.MessageAttachment(
        dat.result.link,
        `${dat.result.title}.mp4`
      );
      message.channel.send(ttd);
      console.log(dat);
    } catch (e) {
      return message.channel.send(`Error! \n \`\`\`bash\n${e}\n\`\`\``);
    }
  }

  if (command === "ip") {
    if (!input)
      return message.channel.send("masukkan ip\ngtw ip? yaudah");
    const got = (await import("got")).default;;
    const url = `http://ip-api.com/json/${input}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`;
    let dat = await got(url).then((res) => JSON.parse(res.body));
    message.channel.send(
      `\`\`\`json\nSearch Result for ${dat.query}\n------------------\nCountry    : ${dat.country} (${dat.countryCode})\nRegion   : ${dat.regionName} (${dat.region})\nCity : ${dat.city}\nLatitude : ${dat.lat}\nLongitude : ${dat.lon}\nTimezone : ${dat.timezone}\nISP : ${dat.isp}\nOrganization : ${dat.org}\nAS : ${dat.as}\n------------------\n\`\`\``
    );
  }
/*  if (command === "lyrics" || command === "l") {
    var api = `https://some-random-api.ml/lyrics?title=${input}`;
    let response, data;
    try {
      response = await axios.get(api);
      data = response.data;
    } catch (e) {
      return message.channel.send(`Error ngab`);
    }
    let p = new MessageEmbed()
      .setAuthor(data.title, bot.user.avatarURL())
      .setThumbnail(data.thumbnail.genius)
      .setDescription(`${data.lyrics}\n\n[𝗦𝗼𝘂𝗿𝗰𝗲](${data.links.genius})`)
      .setColor("BLUE")
      .setFooter(data.author, message.author.avatarURL());
    message.channel.send(p);
    message.channel.send(
      `Kalo g muncul, mungkin lirikny lbih dri 2000kata.\nCoba ketik \`h.lyricst [Lagu]\`. Mungkin bisa.`
    );
  }
*/
  if (command === "r" || command === "recent") {
    if (message.guild.id === 875388139148017715)
      return message.channel.send("khusus server gamew");
    const got = (await import("got")).default;;
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Faris0520&api_key=632b8cddfcbbb1e846cd1bbb8b88c01c&format=json`;
    let dat = await got(url).then((res) => JSON.parse(res.body));
    let data = dat.recenttracks;

    if (input === "embed") {
      let embed = new MessageEmbed()
        .setAuthor(
          "farrs",
          "https://cdn.discordapp.com/avatars/631853272944345098/63385d5e98e8800a1eb2155db1e638ff.webp"
        )
        .setTitle("Recent Tracks")
        .setDescription(
          `**1. [${data.track[0].name} - ${data.track[0].artist["#text"]}](${data.track[0].url})**\n  ${data.track[0].album["#text"]}\n**2. [${data.track[1].name} - ${data.track[1].artist["#text"]}](${data.track[1].url})**\n  ${data.track[1].album["#text"]}\n**3. [${data.track[2].name} - ${data.track[2].artist["#text"]}](${data.track[2].url})**\n  ${data.track[2].album["#text"]}\n**4. [${data.track[3].name} - ${data.track[3].artist["#text"]}](${data.track[3].url})**\n  ${data.track[3].album["#text"]}\n**5. [${data.track[4].name} - ${data.track[4].artist["#text"]}](${data.track[4].url})**\n  ${data.track[4].album["#text"]}\n`
        )
        .setThumbnail(`${data.track[0].image[3]["#text"]}`)
        .setColor("GREEN")
        .setFooter("afa iyh bnh");
      message.channel.send(embed);
    } else
      message.channel.send(
        `_**Recent Tracks**_\n**1. ${data.track[0].name} - ${data.track[0].artist["#text"]}**\n  ${data.track[0].album["#text"]}\n**2. ${data.track[1].name} - ${data.track[1].artist["#text"]}**\n  ${data.track[1].album["#text"]}\n**3. ${data.track[2].name} - ${data.track[2].artist["#text"]}**\n  ${data.track[2].album["#text"]}\n**4. ${data.track[3].name} - ${data.track[3].artist["#text"]}**\n  ${data.track[3].album["#text"]}\n**5. ${data.track[4].name} - ${data.track[4].artist["#text"]}**\n  ${data.track[4].album["#text"]}`
      );
  }
/*  if (command === "fb") {
    if (!input)
      return message.channel.send("masukan link fb (Video Only!)");
    const got = (await import("got")).default;;
    const url = `https://api.lolhuman.xyz/api/facebook?apikey=3f342f50d0fb2f0cbfdc7848&url=${input}`;
    let dat = await got(url).then((res) => JSON.parse(res.body));

    ttd = new Discord.MessageAttachment(dat.result, `facebook-botdumbes.mp4`);
    message.channel.send(ttd);
    console.log(dat.result);
  }
  if (command === "epbi") {
    const { facebook } = require("./fb.js");
    if (!input)
      return message.channel.send(
        `uhm.. url nya mana?\n\ncontoh:\nh.fb https://www.facebook.com/alanwalkermusic/videos/277641643524720`
      );
    if (!input.match(/https:\/\/.*(facebook.com|fb.watch)/gi))
      return message.channel.send(`url salah`);
    facebook(input).then(async (res) => {
      let fb = JSON.stringify(res);
      let json = JSON.parse(fb);
      // m.reply(require('util').format(json))
      if (!json.status) return json;
      message.channel.send(`${json.data[0].url}`);
    });
  }
*/
  if (command === "play" || command === "p") {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send({
        embed: {
          color: "RED",
          description:
            "I'm sorry, but you need to be in a voice channel to play a music!",
        },
      });
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) {
      return message.channel.send({
        embed: {
          color: "RED",
          description:
            "Sorry, but I need a **`CONNECT`** permission to proceed!",
        },
      });
    }
    if (!permissions.has("SPEAK")) {
      return message.channel.send({
        embed: {
          color: "RED",
          description: "Sorry, but I need a **`SPEAK`** permission to proceed!",
        },
      });
    }
    if (!url || !input)
      return message.channel.send({
        embed: {
          color: "RED",
          description: "Please input link/title to play music",
        },
      });
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: `✅  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue`,
        },
      });
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(input, 10);
          var video = await youtube.getVideoByID(videos[0].id);
          if (!video)
            return message.channel.send({
              embed: {
                color: "RED",
                description: "🆘  **|**  I could not obtain any search results",
              },
            });
        } catch (err) {
          console.error(err);
          return message.channel.send({
            embed: {
              color: "RED",
              description: "🆘  **|**  I could not obtain any search results",
            },
          });
        }
      }
      return handleVideo(video, message, voiceChannel);
    }
  }
  if (command === "search" || command === "sc") {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send({
        embed: {
          color: "RED",
          description:
            "I'm sorry, but you need to be in a voice channel to play a music!",
        },
      });
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) {
      return message.channel.send({
        embed: {
          color: "RED",
          description:
            "Sorry, but I need a **`CONNECT`** permission to proceed!",
        },
      });
    }
    if (!permissions.has("SPEAK")) {
      return message.channel.send({
        embed: {
          color: "RED",
          description: "Sorry, but I need a **`SPEAK`** permission to proceed!",
        },
      });
    }
    if (!url || !input)
      return message.channel.send({
        embed: {
          color: "RED",
          description: "Please input link/title to search music",
        },
      });
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: `✅  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue`,
        },
      });
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(input, 10);
          let index = 0;
          let embedPlay = new MessageEmbed()
            .setColor("BLUE")
            .setAuthor("Search results", message.author.displayAvatarURL())
            .setDescription(
              `${videos
                .map((video2) => `**\`${++index}\`  |**  ${video2.title}`)
                .join("\n")}`
            )
            .setFooter(
              "Please choose one of the following 10 results, this embed will auto-deleted in 15 seconds"
            );
          // eslint-disable-next-line max-depth
          message.channel.send(embedPlay).then((m) =>
            m.delete({
              timeout: 15000,
            })
          );
          try {
            var response = await message.channel.awaitMessages(
              (message2) => message2.content > 0 && message2.content < 11,
              {
                max: 1,
                time: 15000,
                errors: ["time"],
              }
            );
          } catch (err) {
            console.error(err);
            return message.channel.send({
              embed: {
                color: "RED",
                description:
                  "The song selection time has expired in 15 seconds, the request has been canceled.",
              },
            });
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return message.channel.send({
            embed: {
              color: "RED",
              description: "🆘  **|**  I could not obtain any search results",
            },
          });
        }
      }
      response.delete();
      return handleVideo(video, message, voiceChannel);
    }
  } else if (command === "skip") {
    if (!message.member.voice.channel)
      return message.channel.send({
        embed: {
          color: "RED",
          description:
            "I'm sorry, but you need to be in a voice channel to skip a music!",
        },
      });
    if (!serverQueue)
      return message.channel.send({
        embed: {
          color: "RED",
          description: "There is nothing playing that I could skip for you",
        },
      });
    serverQueue.connection.dispatcher.end(
      "[runCmd] Skip command has been used"
    );
    return message.channel.send({
      embed: {
        color: "GREEN",
        description: "⏭️  **|**  I skipped the song for you",
      },
    });
  } else if (command === "stop") {
    if (!message.member.voice.channel)
      return message.channel.send({
        embed: {
          color: "RED",
          description:
            "I'm sorry but you need to be in a voice channel to play music!",
        },
      });
    if (!serverQueue)
      return message.channel.send({
        embed: {
          color: "RED",
          description: "There is nothing playing that I could stop for you",
        },
      });
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end(
      "[runCmd] Stop command has been used"
    );
    return message.channel.send({
      embed: {
        color: "GREEN",
        description: "⏹️  **|**  Deleting queues and leaving voice channel...",
      },
    });
  } else if (command === "volume" || command === "vol") {
    if (!message.member.voice.channel)
      return message.channel.send({
        embed: {
          color: "RED",
          description:
            "I'm sorry, but you need to be in a voice channel to set a volume!",
        },
      });
    if (!serverQueue)
      return message.channel.send({
        embed: {
          color: "RED",
          description: "There is nothing playing",
        },
      });
    if (!args[1])
      return message.channel.send({
        embed: {
          color: "BLUE",
          description: `The current volume is: **\`${serverQueue.volume}%\`**`,
        },
      });
    if (isNaN(args[1]) || args[1] > 100)
      return message.channel.send({
        embed: {
          color: "RED",
          description:
            "Volume only can be set in a range of **`1`** - **`100`**",
        },
      });
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolume(args[1] / 100);
    return message.channel.send({
      embed: {
        color: "GREEN",
        description: `I set the volume to: **\`${args[1]}%\`**`,
      },
    });
  } else if (command === "nowplaying" || command === "np") {
    if (!serverQueue)
      return message.channel.send({
        embed: {
          color: "RED",
          description: "There is nothing playing",
        },
      });
    return message.channel.send({
      embed: {
        color: "BLUE",
        description: `🎶  **|**  Now Playing: **\`${serverQueue.songs[0].title}\`**`,
      },
    });
  } else if (command === "queue" || command === "q") {
    let songsss = serverQueue.songs.slice(1);

    let number = songsss.map((x, i) => `${i + 1} - ${x.title}`);
    number = chunk(number, 5);

    let index = 0;
    if (!serverQueue)
      return message.channel.send({
        embed: {
          color: "RED",
          description: "There is nothing playing",
        },
      });
    let embedQueue = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor("Song queue", message.author.displayAvatarURL())
      .setDescription(number[index].join("\n"))
      .setFooter(
        `• Now Playing: ${serverQueue.songs[0].title} | Page ${index + 1} of ${
          number.length
        }`
      );
    const m = await message.channel.send(embedQueue);

    if (number.length !== 1) {
      await m.react("⬅");
      await m.react("🛑");
      await m.react("➡");
      async function awaitReaction() {
        const filter = (rect, usr) =>
          ["⬅", "🛑", "➡"].includes(rect.emoji.name) &&
          usr.id === message.author.id;
        const response = await m.awaitReactions(filter, {
          max: 1,
          time: 30000,
        });
        if (!response.size) {
          return undefined;
        }
        const emoji = response.first().emoji.name;
        if (emoji === "⬅") index--;
        if (emoji === "🛑") m.delete();
        if (emoji === "➡") index++;

        if (emoji !== "🛑") {
          index = ((index % number.length) + number.length) % number.length;
          embedQueue.setDescription(number[index].join("\n"));
          embedQueue.setFooter(`Page ${index + 1} of ${number.length}`);
          await m.edit(embedQueue);
          return awaitReaction();
        }
      }
      return awaitReaction();
    }
  } else if (command === "pause") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: "⏸  **|**  Paused the music for you",
        },
      });
    }
    return message.channel.send({
      embed: {
        color: "RED",
        description: "There is nothing playing",
      },
    });
  } else if (command === "resume") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: "▶  **|**  Resumed the music for you",
        },
      });
    }
    return message.channel.send({
      embed: {
        color: "RED",
        description: "There is nothing playing",
      },
    });
  } else if (command === "loop") {
    if (serverQueue) {
      serverQueue.loop = !serverQueue.loop;
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: `🔁  **|**  Loop is **\`${
            serverQueue.loop === true ? "enabled" : "disabled"
          }\`**`,
        },
      });
    }
    return message.channel.send({
      embed: {
        color: "RED",
        description: "There is nothing playing",
      },
    });
  }
});

async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`,
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true,
      loop: false,
    };
    queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(
        `[ERROR] I could not join the voice channel, because: ${error}`
      );
      queue.delete(message.guild.id);
      return message.channel.send({
        embed: {
          color: "RED",
          description: `I could not join the voice channel, because: **\`${error}\`**`,
        },
      });
    }
  } else {
    serverQueue.songs.push(song);
    if (playlist) return;
    else
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: `✅  **|**  **\`${song.title}\`** has been added to the queue`,
        },
      });
  }
  return;
}

function chunk(array, chunkSize) {
  const temp = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    temp.push(array.slice(i, i + chunkSize));
  }
  return temp;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    return queue.delete(guild.id);
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      const shiffed = serverQueue.songs.shift();
      if (serverQueue.loop === true) {
        serverQueue.songs.push(shiffed);
      }
      play(guild, serverQueue.songs[0]);
    })
    .on("error", (error) => console.error(error));
  dispatcher.setVolume(serverQueue.volume / 100);

  serverQueue.textChannel.send({
    embed: {
      color: "BLUE",
      description: `🎶  **|**  Start Playing: **\`${song.title}\`**`,
    },
  });
}

client.login(process.env.BOT_TOKEN);

process.on("unhandledRejection", (reason, promise) => {
  try {
    console.error(
      "Unhandled Rejection at: ",
      promise,
      "reason: ",
      reason.stack || reason
    );
  } catch {
    console.error(reason);
  }
});

process.on("uncaughtException", (err) => {
  console.error(`Caught exception: ${err}`);
  process.exit(1);
});
/*
bot.user.setActivity("bit.ly/faris0520w", {
  type: "LISTENING",
  url: "https://bit.ly/faris0520w"
}); */
/*client.once("ready", async () => {
  const data = {
    name: "echo",
    description: "Replies with your input!",
    options: [
      {
        name: "input",
        type: "STRING",
        description: "The input which should be echoed back",
        required: true
      }
    ]
  };

  const command = await client.application.commands.create(data);
  console.log(command);
  const dat = {
    name: "ping",
    description: "Replies with Pong!"
  };

  const commamnd = await client.guilds.cache
    .get("695851369277685760")
    .commands.create(dat);
  console.log(commamnd);
});*/

client.on("messageDelete", (message) => {
  console.log(`${message.id} was deleted!`);
  // Partial messages do not contain any content so skip them
  if (!message.partial) {
    if (!message.content) return;
    console.log(
      `It had content: "${message.content}" || from ${message.author.username}`
    );
    let log = client.channels.cache.get("840513794119434271");
    let d = new MessageEmbed()
      .setColor("RED")
      .setAuthor(
        "- Deleted Messages -",
        message.author.displayAvatarURL({ format: "png" })
      )
      .addFields(
        /*{ name: "test", value: `${message.content.image}` },*/
        { name: "From", value: `<@${message.author.id}>` },
        { name: "Channel", value: `<#${message.channel.id}>` },
        { name: "Content", value: message.content }
      )
      .setImage(message.content.image)
      .setFooter(`si ${message.author.username} ngapus pesan`)
      .setTimestamp();
    log.send(d);
    if (message.guild.id === "619425471733432320") {
      let logp = client.channels.cache.get("732052682638098503");
      let pd = new MessageEmbed()
        .setColor("RED")
        .setAuthor(
          "- Deleted Messages -",
          message.author.displayAvatarURL({ format: "png" })
        )
        .addFields(
          /*{ name: "test", value: `${message.content.image}` },*/
          { name: "From", value: `<@${message.author.id}>` },
          { name: "Channel", value: `<#${message.channel.id}>` },
          { name: "Content", value: message.content }
        )
        .setFooter(`si ${message.author.username} ngapus pesan`)
        .setTimestamp();
      logp.send(pd);
    }

    if (message.guild.id === "875388139148017715") {
      let logl = client.channels.cache.get("877382895239589909");
      let pd = new MessageEmbed()
        .setColor("RED")
        .setAuthor(
          "- Deleted Messages -",
          message.author.displayAvatarURL({ format: "png" })
        )
        .addFields(
          /*{ name: "test", value: `${message.content.image}` },*/
          { name: "From", value: `<@${message.author.id}>` },
          { name: "Channel", value: `<#${message.channel.id}>` },
          { name: "Content", value: message.content }
        )
        .setFooter(`si ${message.author.username} ngapus pesan`)
        .setTimestamp();
      logl.send(pd);
    }
    return;
  }
});

client.on("messageUpdate", async (message, newEditedMessage) => {
  if (message.content === newEditedMessage.content) {
    return;
  }
  if (message.author.bot === true) {
    return;
  }

  let logEditedMessageEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setDescription("Message edited")
    .addField("Before", message.content, true)
    .addField("After", newEditedMessage.content, true)
    .addField("Channel", `<#${message.channel.id}>`)
    .setFooter(`si ${message.author.username} ngedit!`)
    .setTimestamp()
    .setColor("GREEN");

  let loggingChannel = client.channels.cache.get("885042371924992000");
  if (!loggingChannel) return message.channel.send("Not Found");

  loggingChannel.send(logEditedMessageEmbed);
});
client.on("messageUpdate", async (message, newEditedMessage) => {
  if (message.content === newEditedMessage.content) {
    return;
  }
  if (message.author.bot === true) {
    return;
  }

  let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setDescription("Message edited")
    .addField("Before", message.content, true)
    .addField("After", newEditedMessage.content, false)
    .addField("Channel", `<#${message.channel.id}>`)
    .setFooter(`si ${message.author.username} ngedit!`)
    .setTimestamp()
    .setColor("GREEN");

  let loggingChannel = client.channels.cache.get("941939319814377543");
  if (!loggingChannel) return message.channel.send("Not Found");

  let pesan = `${message.author.username} ngedit pesan! \nBefore :\n${message.content}\nAfter:\n${newEditedMessage.content}`;
  loggingChannel.send(embed);
});
