module.exports = {
  name: 'wdel',
  aliases: [],
  async execute({ message }) {
    message.channel.fetchWebhooks()
      .then((webhooks) => {
        let p = webhooks.filter((webhook) => webhook.name !== "MEE6 Webhooks");
        for (let [name, webhook] of p)
          webhook.delete(`Requested by ${message.author.tag}`);
        message.channel.send("done");
      })
      .catch(console.error);
  }
};
