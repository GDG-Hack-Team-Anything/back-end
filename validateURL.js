const axios = require('axios');

async function checkGitHubRepositoryAccessibility(url) {
    try {
        const [, owner, repo] = url.match(/github\.com\/([^/]+)\/([^/]+)/i);

        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);

        const isPublic = response.data.private === false;

        return isPublic;
    } catch (error) {
        return false;
    }
}

const githubUrls = [
    'https://github.com/bouzenaali/bouzenaali',
    'https://github.com/bouzenaali/cookiecutter-django',
    'https://github.com/bouzenaali/git-github-gdsc-meetup'
];

githubUrls.forEach(async (url) => {
    const isPublic = await checkGitHubRepositoryAccessibility(url);
    console.log(`${url}: ${isPublic ? 'Public' : 'Private'}`);
});
