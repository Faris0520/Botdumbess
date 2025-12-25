module.exports = {
  name: 'ip',
  aliases: [],
  async execute({ message, input }) {
    if (!input) return message.channel.send("Masukkan ip");
    const got = (await import("got")).default;
    const url = `http://ip-api.com/json/${input}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`;
    let dat = await got(url).then((res) => JSON.parse(res.body));
    message.channel.send(
      `\json\nSearch Result for ${dat.query}\n------------------\nCountry    : ${dat.country} (${dat.countryCode})\nRegion   : ${dat.regionName} (${dat.region})\nCity : ${dat.city}\nLatitude : ${dat.lat}\nLongitude : ${dat.lon}\nTimezone : ${dat.timezone}\nISP : ${dat.isp}\nOrganization : ${dat.org}\nAS : ${dat.as}\n------------------\n\`
    );
  }
};
