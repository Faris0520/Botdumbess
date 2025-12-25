module.exports = {
  name: 'roast',
  aliases: [],
  async execute({ message, input }) {
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const url = `https://api.github.com/users/${input}`;
    const rep = `https://api.github.com/users/${input}/repos?sort=updated`;
    const got = (await import('got')).default;
    let profileResponse = await got(url).then((res) => JSON.parse(res.body));
    let repoResponse = await got(rep).then((res) => JSON.parse(res.body));
    if (!input) return message.channel.send('Masukkan username github.');
    const data = {
      name: profileResponse.name,
      bio: profileResponse.bio,
      company: profileResponse.company,
      location: profileResponse.location,
      followers: profileResponse.followers,
      following: profileResponse.following,
      public_repos: profileResponse.public_repos,
      created_at: profileResponse.created_at,
      updated_at: profileResponse.updated_at,
      repositories: repoResponse.map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        open_issues_count: repo.open_issues_count,
        license: repo.license,
        fork: repo.fork,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
      })).slice(0, 50),
    };
    const completion = await openai.chat.completions.create({
      messages: [{
        role: 'user',
        content: `berikan roasting singkat dengan kejam, menyindir, serta menyakitkan dalam bahasa gaul untuk profile github berikut : ${input}. Berikut detailnya: "${JSON.stringify(data)}". (berikan response dalam bahasa indonesia dan jangan berikan pujian atau saran)`,
      }],
      model: 'gpt-4o',
    });
    const m = completion.choices[0].message.content;
    message.channel.send(`${m}`);
  }
};