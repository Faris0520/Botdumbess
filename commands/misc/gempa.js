module.exports = {
  name: 'gempa',
  aliases: [],
  async execute({ MessageEmbed, message }) {
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
};
