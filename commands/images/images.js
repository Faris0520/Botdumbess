module.exports = {
  name: 'images',
  aliases: ['photos', 'image'],
  async execute({ message, input, MessageEmbed }) {
    const got = (await import("got")).default;
    if (input === "raw") {
      const url = `https://api.unsplash.com/photos/random/?client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`;
      let dat = await got(url).then((res) => JSON.parse(res.body));
      message.channel.send(dat.urls.raw);
    } else if (input === "regular") {
      const url = `https://api.unsplash.com/photos/random/?client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`;
      let dat = await got(url).then((res) => JSON.parse(res.body));
      message.channel.send(dat.urls.regular);
    } else if (input === "full") {
      const url = `https://api.unsplash.com/photos/random/?client_id=Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE`;
      let dat = await got(url).then((res) => JSON.parse(res.body));
      message.channel.send(dat.urls.full);
    } else if (input !== "full" || input !== "raw" || input !== "regular") {
      if (!input)
        return message.channel.send(
          "Gambar apa yang ingin kamu cari?\nSearch    : `h.images [Gambar]`\nRandom : `h.images full | raw | regular` "
        );
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
};
