module.exports = {
  name: 'wallpaper',
  aliases: [],
  async execute({ message, input, MessageEmbed }) {
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
};
