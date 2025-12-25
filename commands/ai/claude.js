module.exports = {
  name: 'claude',
  aliases: [],
  async execute({ message, input }) {
    const got = (await import('got')).default;
    if (!input) return message.channel.send('Please provide a question or message for AI.');
    try {
      const response = await got.post('https://api.anthropic.com/v1/messages', {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        json: {
          model: 'claude-3-7-sonnet-20250219',
          max_tokens: 1024,
          messages: [{ role: 'user', content: input }],
        },
      }).json();
      const responseText = response.content[0].text + '\n-# claude-3-7-sonnet-20250219';
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
      console.error('Error:', error);
      message.channel.send('Sorry, there was an error processing your request.');
    }
  }
};