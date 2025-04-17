const { Client, Util, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client({
  ws: { properties: { $browser: "Discord iOS" } },
});
require("dotenv").config();
require("./server.js");

let owner = "OWNER";
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
    `with ${client.users.cache.size} dumbass`,
    `Mobile Legends`,
    `ROBLOX`,
    `GitHub`,
    `with you`,
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

require("dotenv").config();
const discordToken = process.env.TOKEN;
const myRL = require("serverline");

client.on("message", async (message) => {
  let meseg = message.content.toLowerCase();
  if (meseg === `<@${client.user.id}>` || meseg === `<@!${client.user.id}>`) {
    message.channel.send(`My Prefix = \`h.\``);
  }
  // eslint-disable-line
  let emoji = [
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
  let random = Math.floor(Math.random() * emoji.length);
  if (message.content === "test") {
    message.react(`${emoji[random]}`);
  }
  if (message.author.bot) return;

  const args = message.content.split(" ");
  const input = args.slice(1).join(" ");
  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(PREFIX.length);
  /*
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
        }, 60000);
      });
  }
*/
  if (!message.content.startsWith(PREFIX)) return;

  if (command === "clear") {
    // Bot Owner Only
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

    embed
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
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
  if (command === "userinfo2") {
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
        .setDescription(
          "Tekan <a:r_pressf:843389937139449856> untuk memberi respect."
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

        msg
          .awaitReactions({ filter, time: 30000 })
          .then((collected) => {
            const reaction = collected.get("843389937139449856");
            const count = reaction ? reaction.count - 1 : 0; // Subtract 1 to exclude the bot's own reaction
            message.channel.send(`**${count}** orang telah memberi respect 🫡`);
          })
          .catch((error) => {
            console.error("Failed to collect reactions:", error);
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
            console.error("Failed to collect reactions:", error);
          });
      });
    }
  }
  if (command == "gempa") {
    const url = `https://cuaca-gempa-rest-api.vercel.app/quake`;
    const got = (await import("got")).default;
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
    var dcping = client.ws.ping;
    if (ping || dcping > 500) p = "MF >:";
    if (ping || dcping < 500) p = "Nice! <:ndaktau:831494322901352498>";
    message.channel.send(
      `:mega: *${repl[result]}* - Bot Ping: **${ping}** ms, API Ping: **${dcping}** ms (${p})`
    );
  }

  if (command === "images" || command === "photos" || command === "image") {
    if (input === "raw") {
      const got = (await import("got")).default;
      const url = `https://api.unsplash.com/photos/random/?client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`;

      let dat = await got(url).then((res) => JSON.parse(res.body));
      const emb = new MessageEmbed();
      message.channel.send(dat.urls.raw);
    } else if (input === "regular") {
      const got = (await import("got")).default;
      const url = `https://api.unsplash.com/photos/random/?client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`;
      let dat = await got(url).then((res) => JSON.parse(res.body));
      message.channel.send(dat.urls.regular);
    } else if (input === "full") {
      const got = (await import("got")).default;
      const url = `https://api.unsplash.com/photos/random/?client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`;
      let dat = await got(url).then((res) => JSON.parse(res.body));
      message.channel.send(dat.urls.full);
    } else if (input !== "full" || input !== "raw" || input !== "regular") {
      if (!input)
        return message.channel.send(
          "Gambar apa yang ingin kamu cari?\nSearch    : `h.images [Gambar]`\nRandom : `h.images full | raw | regular` "
        );
      const got = (await import("got")).default;
      try {
        const url = `https://api.unsplash.com/search/photos?page=1&query=${input}&client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`;
        let r = Math.floor(Math.random() * 11);
        let dat = await got(url).then((res) => JSON.parse(res.body));
        message.channel.send(dat.results[r].urls.regular);
      } catch (error) {
        message.channel.send("Try Again!");
      }
    }
  }
  if (command === "ss") {
    if (!input) return message.channel.send("Masukkan url!");
    const axios = require("axios");
    const url = `https://api.screenshotmachine.com/?key=b3ce7b&url=${input}&dimension=1920x1080&delay=5000&cacheLimit=0`;
    let a = new Discord.MessageAttachment(url, `image.jpg`);
    message.channel.send(a);
  }
  if (command === "adzan") {
    let txt = args.join(" ");
    if (!input)
      return message.channel.send(
        `\`.adzan <city>\` (Hanya tersedia kota" di indonesia. Kota negara lain tdk tersedia)`
      );
    let nama = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    const url = `http://api.aladhan.com/v1/timingsByCity?city=${txt}&country=Indonesia&method=8`;
    const got = (await import("got")).default;
    let data = await got(url).then((res) => JSON.parse(res.body));
    var hmm = new MessageEmbed()
      .setAuthor(`Adzan Prayer Time | ${nama}`)
      .setDescription(`Today`)
      .addField(`Subuh`, data.data.timings.Fajr, false)
      .addField(`Dzuhur`, data.data.timings.Dhuhr, true)
      .addField(`Ashar`, data.data.timings.Asr, true)
      .addField(`Magrib`, data.data.timings.Maghrib, true)
      .addField(`Isha`, data.data.timings.Isha, true)
      .setFooter(`${nama}, Indonesia`, message.author.avatarURL)
      .setTimestamp()
      .setColor(`BLUE`);
    message.channel.send(hmm);
  }
  if (command === "ig") {
    input = args.slice(2).join(" ");
    const axios = require("axios");

    const url = `https://api.ryzendesu.vip/api/downloader/igdl?url=${args[1]}`;
    const member = message.author;
    let memer = member.nickname || member.username;

    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
        },
      });
      const data = response.data.data[0];

      if (!member) return message.reply("Error unexpected");
      message.delete();
      console.log(data);

      try {
        let fileSizeLimit = 8 * 1024 * 1024;
        let fileSize = await getFileSize(data.url);

        if (fileSize > fileSizeLimit) {
          let url = data.url;
          let modifiedUrl = url.replace("dl=1", "dl=0");
          message.channel.send(`[${input || "_"}](${modifiedUrl})`);
        } else {
          let ttc = new Discord.MessageAttachment(data.url, "instagram.mp4");
          await message.channel.send(`${input + "\n-# " + memer}`, ttc);
        }
      } catch (e) {
        if (e.code === 40005) {
          // Entity request too large
          let url = data.url;
          let modifiedUrl = url.replace("dl=1", "dl=0");
          msg.channel.send(`[${input} + "_"}](${modifiedUrl})`);
        } else {
          console.error(e);
          msg.channel.send(`Error, coba lagi!.`);
        }
      }
    } catch (e) {
      console.error(e);
      msg.channel.send(`Error, coba lagi!.`);
    }
  }

  // Fungsi untuk mendapatkan ukuran file sebelum diunggah
  async function getFileSize(url) {
    const axios = require("axios");
    try {
      let response = await axios.head(url);
      return parseInt(response.headers["content-length"], 10);
    } catch (error) {
      console.error("Gagal mendapatkan ukuran file:", error);
      return Infinity;
    }
  }
  if (command === "wallpaper") {
    if (!input) return message.channel.send(`wallpaper apa yg mau dicari?`);
    const url = `https://wallhaven.cc/api/v1/search?q=${input}`;
    const got = (await import("got")).default;
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
      .setFooter(`Wallhaven.cc`);
    message.channel.send(embed);
    if (data.meta.total === 0) {
      message.channel.send("Wallpaper tidak ditemukan!\n-#Source: Wallhaven");
    }
  }
  if (command === "say" && message.author.id == owner) {
    message.delete({ timeout: 100 });
    message.channel.send(input);
  } else if (command === "say" && message.author.id != owner) {
    if (!input)
      return message.channel.send(
        `mau ngomong ap, ${message.author.username}?`
      );
    message.channel.send(`${input} \n-# ${message.author.username}`);
  }
  if (command === "add-emoji") {
    message.guild.emojis.create(`${args[1]}`, `${args[2]}`).then((emoji) => {
      console.log(`Created new emoji with name ${emoji.name}!`);
      message.channel.send(`Created new emoji with name ${emoji.name}!`);
    });
  }
  if (command === "id") {
    const target = message.mentions.members.first().user.id;
    if (!target) return message.channel.send("Unkown member");
    message.channel.send(target);
  }
  if (command === "impersonate") {
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
        }, 60000);
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
  if (command === "wdel") {
    // Use this command responsibly! This will delete the channel webhook.
    message.channel
      .fetchWebhooks()
      .then((webhooks) => {
        let p = webhooks.filter((webhook) => webhook.name !== "MEE6 Webhooks");
        for (let [name, webhook] of p)
          webhook.delete(`Requested by ${message.author.tag}`);
        message.channel.send("done");
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
    // Need OpenAI APIKEY to operate this command.
    const OpenAI = require("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI,
    });

    if (!input)
      return message.channel.send(
        "Mohon berikan pertanyaan atau pesan untuk AI."
      );

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${input}` }],
      model: "gpt-4.1",
    });

    console.log(completion.choices[0]);
    const responseText = `${completion.choices[0].message.content}\n-# GPT-4.1`;

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
  if (command === "4o") {
    // Need OpenAI APIKEY to operate this command.
    const OpenAI = require("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI,
    });

    if (!input)
      return message.channel.send(
        "Mohon berikan pertanyaan atau pesan untuk AI."
      );

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${input}` }],
      model: "gpt-4o",
    });

    console.log(completion.choices[0]);
    const responseText = `${completion.choices[0].message.content}\n-# GPT-4o`;

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
  if (command === "o3") {
    // Need OpenAI APIKEY to operate this command.
    const OpenAI = require("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI,
    });

    if (!input)
      return message.channel.send(
        "Mohon berikan pertanyaan atau pesan untuk AI."
      );

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${input}` }],
      model: "o3-mini-2025-01-31",
    });

    console.log(input, completion.choices[0]);
    const responseText =
      completion.choices[0].message.content + "\n-# o3-mini-2025-01-31";

    if (responseText.length > 1999) {
      let partLength = 1999;
      for (let i = 0; i < responseText.length; i += partLength) {
        const part = responseText.substring(i, i + partLength);
        message.channel.send(part);
      }
    } else {
      message.channel.send(responseText);
    }
  }
  if (command === "o1") {
    // Need OpenAI APIKEY to operate this command.
    const OpenAI = require("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI,
    });

    if (!input)
      return message.channel.send(
        "Mohon berikan pertanyaan atau pesan untuk AI."
      );

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${input}` }],
      model: "o1-mini-2024-09-12",
    });

    console.log(input, completion.choices[0]);
    const responseText =
      completion.choices[0].message.content + "\n-# o1-mini-2024-09-12";

    if (responseText.length > 1999) {
      let partLength = 1999;
      for (let i = 0; i < responseText.length; i += partLength) {
        const part = responseText.substring(i, i + partLength);
        message.channel.send(part);
      }
    } else {
      message.channel.send(responseText);
    }
  }
  if (command === "r1") {
    // Need DeepInfra APIKEY to operate this command.
    const OpenAI = require("openai");
    const openai = new OpenAI({
      baseURL: "https://api.deepinfra.com/v1/openai",
      apiKey: process.env.DEEP,
    });

    function formatThinkBlockquote(text) {
      return text.replace(/<think>([\s\S]*?)<\/think>/g, (match, content) => {
        return content
          .split("\n")
          .map((line) => (line.trim() ? `-# ${line}` : ""))
          .join("\n");
      });
    }
    if (!input) {
      return message.channel.send(
        "Mohon berikan pertanyaan atau pesan untuk AI."
      );
    }

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input }],
        model: "deepseek-ai/DeepSeek-R1",
      });

      console.log(input, completion.choices[0]);
      let responseText =
        completion.choices[0].message.content + "\n-# DeepSeek-R1";
      responseText = formatThinkBlockquote(responseText);

      if (responseText.length > 1999) {
        let partLength = 1999;
        for (let i = 0; i < responseText.length; i += partLength) {
          const part = responseText.substring(i, i + partLength);
          message.channel.send(part);
        }
      } else {
        message.channel.send(`${responseText}`);
      }
    } catch (error) {
      console.error("Error saat mengakses AI:", error);
      message.channel.send("Terjadi kesalahan saat memproses permintaan AI.");
    }
    //-----------------------------------------------------------------//
    return;
  }
  if (command === "r1-70b") {
    // Need DeepInfra APIKEY to operate this command.
    const OpenAI = require("openai");
    const openai = new OpenAI({
      baseURL: "https://api.deepinfra.com/v1/openai",
      apiKey: process.env.DEEP,
    });

    function formatThinkBlockquote(text) {
      return text.replace(/<think>([\s\S]*?)<\/think>/g, (match, content) => {
        return content
          .split("\n")
          .map((line) => (line.trim() ? `-# ${line}` : ""))
          .join("\n");
      });
    }
    if (!input) {
      return message.channel.send(
        "Mohon berikan pertanyaan atau pesan untuk AI."
      );
    }

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input }],
        model: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
      });

      console.log(input, completion.choices[0]);
      let responseText =
        completion.choices[0].message.content +
        "\n-# deepseek-ai/DeepSeek-R1-Distill-Llama-70B";
      responseText = formatThinkBlockquote(responseText);

      if (responseText.length > 1999) {
        let partLength = 1999;
        for (let i = 0; i < responseText.length; i += partLength) {
          const part = responseText.substring(i, i + partLength);
          message.channel.send(part);
        }
      } else {
        message.channel.send(responseText);
      }
    } catch (error) {
      console.error("Error saat mengakses AI:", error);
      message.channel.send("Terjadi kesalahan saat memproses permintaan AI.");
    }
    return;
  }
  if (command === "claude") {
    // Need Anthropic APIKEY to operate this command.
    const got = (await import("got")).default;
    if (!input)
      return message.channel.send(
        "Please provide a question or message for AI."
      );

    try {
      const response = await got
        .post("https://api.anthropic.com/v1/messages", {
          headers: {
            "x-api-key": process.env.ANTHROPIC,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
          },
          json: {
            model: "claude-3-7-sonnet-20250219",
            max_tokens: 1024,
            messages: [{ role: "user", content: input }],
          },
        })
        .json();

      const responseText =
        response.content[0].text + "\n-# claude-3-7-sonnet-20250219";

      if (responseText.length > 1999) {
        let partLength = 1999;
        for (let i = 0; i < responseText.length; i += partLength) {
          const part = responseText.substring(i, i + partLength);
          await message.channel.send(part);
        }
      } else {
        await message.channel.send(`${responseText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      message.channel.send(
        "Sorry, there was an error processing your request."
      );
    }
  }
  if (command === "roast") {
    // Need OpenAI APIKEY to operate this command.
    const OpenAI = require("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI,
    });

    const url = `https://api.github.com/users/${input}`;
    const rep = `https://api.github.com/users/${input}/repos?sort=updated`;
    const got = (await import("got")).default;
    let profileResponse = await got(url).then((res) => JSON.parse(res.body));
    let repoResponse = await got(rep).then((res) => JSON.parse(res.body));

    if (!input) return message.channel.send("Masukkan username github.");

    data = {
      name: profileResponse.name,
      bio: profileResponse.bio,
      company: profileResponse.company,
      location: profileResponse.location,
      followers: profileResponse.followers,
      following: profileResponse.following,
      public_repos: profileResponse.public_repos,
      created_at: profileResponse.created_at,
      updated_at: profileResponse.updated_at,
      repositories: repoResponse
        .map((repo) => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          open_issues_count: repo.open_issues_count,
          license: repo.license,
          fork: repo.fork,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
        }))
        .slice(0, 50),
    };

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `berikan roasting singkat dengan kejam, menyindir, serta menyakitkan dalam bahasa gaul untuk profile github berikut : ${input}. Berikut detailnya: "${JSON.stringify(
            data
          )}". (berikan response dalam bahasa indonesia dan jangan berikan pujian atau saran)`,
        },
      ],
      model: "gpt-4o",
    });

    console.log(completion.choices[0]);
    const m = completion.choices[0].message.content;

    message.channel.send(`${m}`);
  }
  if (command === "dalle") {
    // Need OpenAI APIKEY to operate this command.
    const OpenAI = require("openai");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI,
    });

    if (!input)
      return message.channel.send(
        "Mohon berikan pertanyaan atau pesan untuk AI."
      );

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${input}`,
      n: 1,
      size: "1024x1024",
    });

    const image = new Discord.MessageAttachment(
      `${response.data[0].url}`,
      `${input}.png`
    );
    message.channel.send(image);
  }
  if (command === "wangy") {
    if (!input) return message.channel.send("Masukkan nama!");
    let idk = input.replace(input, String.call.bind(input.toUpperCase));
    message.channel.send(
      `${idk} WANGY WANGY WANGY\n\nWANGY WANGY WANGY HU HA HU HA HU HA, aaaah baunya ${idk} wangi aku mau nyiumin aroma wanginya ${idk} AAAAAAAAH - Rambutnya.. aaah rambutnya juga pengen aku elus-elus ~AAAAAH ${idk} manis banget AAAAAAAAH TATAPAN ${idk} BEGITU MENGGODAAAAAAAAA.. GUA RELA JADI BUDAK SIMP HANYA DEMI ${idk} TERDJINTA AAAAAAA apa ? ${idk} itu gak nyata ? Cuma karakter 2 dimensi katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA ! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ${idk} ngeliat gw ... ${idk} NGELIATIN GW! ${idk}... kamu percaya sama aku ? aaaaaaaaaaah syukur ${idk}\n\ngak malu memiliki aku aaaaaah YEAAAAAAAAAAAH GUA\n\n\nMASIH PUNYA ${idk}, ${idk} AKU SAYANG ${idk} AKU CINTA ${idk} AKU AKU INGIN ${idk} MENJADI BIDADARIKUUUUUUU!!!!!!!!!!!!!`
    );
  }

  if (command === "invite") {
    message.channel.send(
      `https://discord.com/oauth2/authorize?client_id=727354971707932702&permissions=8&scope=bot \nthx <3 <@${message.author.id}>`
    );
  }

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

 
Sebenarnya masih bnyk, tpi *Malas* nulis. Coba2 aja, atau tanya ke owner.
 `);
    helpembed.setThumbnail(
      "https://cdn.discordapp.com/avatars/727354971707932702/059bfc408f82dece8c540347bd17fa92.webp?size=1024"
    );
    helpembed.setFooter("bot", message.author.avatarURL);
    message.channel.send(helpembed).catch(console.error);
  }

  if (command === "ytmp3") {
    if (!input) return message.channel.send("Masukkan link youtube.`");
    const got = (await import("got")).default;
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
          `Hi`,
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
    const got = (await import("got")).default;
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
  /*
  if (command == "stock" || command == "stok" || command == "saham") {
    if (!input) return message.channel.send("Masukkan nama stok!");
    message.channel.send("Lagi error.")

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
*/
  if (command === "ytdl") {
    const urlPattern = /https?:\/\/\S+/;
    if (urlPattern.test(args[1])) {
      input = args.slice(2).join(" ");
      const axios = require("axios");

      const url = `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${args[1]}&quality=480`;
      const member = message.author;
      let memer = member.nickname || member.username;

      try {
        const response = await axios.get(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
          },
        });
        const data = response.data;

        if (!member) return msg.reply("Error unexpected");
        console.log(data);

        try {
          let fileSizeLimit = 8 * 1024 * 1024;
          let fileSize = await getFileSize(data.url);

          if (fileSize > fileSizeLimit) {
            let url = data.url;
            msg.channel.send(
              `# ${data.title}\n${data.author}\n\n-#${data.description}\n#-<${
                data.videoUrl
              }>\n\n[${"Download"}](${url})`,
              `${data.thumbnail}.jpg`
            );
          } else {
            let ttc = new Discord.MessageAttachment(data.url, "youtube.mp4");
            await msg.channel.send(
              `# ${data.title}\n${data.author}\n\n-#${data.description}\n-#<${data.videoUrl}>`,
              ttc
            );
          }
        } catch (e) {
          if (e.code === 40005) {
            // Entity request too large
            let url = data.url;
            msg.channel.send(
              `Judul	: ${data.title}\nAuthor	: ${data.author}\nDeskripsi	: ${
                data.description
              }\nURL	: ${data.videoUrl}\n\n[${"Download"}](${url})`,
              data.thumbnail
            );
          } else {
            console.error(e);
            msg.channel.send(`Error, ${e}`);
          }
        }
      } catch (e) {
        console.error(e);
        msg.channel.send(`Error, ${e}`);
      }
    }

    async function getFileSize(url) {
      const axios = require("axios");
      try {
        let response = await axios.head(url);
        return parseInt(response.headers["content-length"], 10);
      } catch (error) {
        console.error("Gagal mendapatkan ukuran file:", error);
        return Infinity;
      }
    }
  }
  if (command === "ip") {
    if (!input) return message.channel.send("Masukkan ip");
    const got = (await import("got")).default;
    const url = `http://ip-api.com/json/${input}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`;
    let dat = await got(url).then((res) => JSON.parse(res.body));
    message.channel.send(
      `\`\`\`json\nSearch Result for ${dat.query}\n------------------\nCountry    : ${dat.country} (${dat.countryCode})\nRegion   : ${dat.regionName} (${dat.region})\nCity : ${dat.city}\nLatitude : ${dat.lat}\nLongitude : ${dat.lon}\nTimezone : ${dat.timezone}\nISP : ${dat.isp}\nOrganization : ${dat.org}\nAS : ${dat.as}\n------------------\n\`\`\``
    );
  }
});
client.login(discordToken);

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
