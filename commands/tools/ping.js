module.exports = {
  name: 'ping',
  aliases: [],
  async execute({ message, client }) {
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
    let p = (ping || dcping > 500) ? "MF >:" : "Nice! <:ndaktau:831494322901352498>";
    message.channel.send(`:mega: *${repl[result]}* - Bot Ping: **${ping}** ms, API Ping: **${dcping}** ms (${p})`);
  }
};
