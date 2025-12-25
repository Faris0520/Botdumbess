module.exports = {
  name: 'adzan',
  aliases: [],
  async execute({ message, input, args, MessageEmbed }) {
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
};
