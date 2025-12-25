module.exports = {
  name: 'ytmp3',
  aliases: [],
  async execute({ message, input, Discord, MessageEmbed }) {
    if (!input) return message.channel.send("Masukkan link youtube.`");
    const got = (await import("got")).default;
    const url = `https://api.lolhuman.xyz/api/ytaudio?apikey=5119194f07cdf52d5c57d3d0&url=${input}`;
    let dat = await got(url).then((res) => JSON.parse(res.body));
    try {
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
      let ttc = new Discord.MessageAttachment(
        dat.result.link.link,
        `${dat.result.title}.mp3`
      );
      message.channel.send(ttc);
    } catch (e) {
      return message.channel.send(`Server error!`);
    }
  }
};
