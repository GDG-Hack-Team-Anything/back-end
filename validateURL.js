require('dotenv').config();
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
    'https://github.com/GDG-Hack-Team-Anything',
    'https://github.com/bouzenaali/bouzenaali',
    'https://github.com/bouzenaali/cookiecutter-django',
    'https://github.com/bouzenaali/git-github-gdsc-meetup'
];

githubUrls.forEach(async (url) => {
    const isPublic = await checkGitHubRepositoryAccessibility(url);
    console.log(`${url}: ${isPublic ? 'Public' : 'Private or Invalid'}`);
});


async function checkFigmaFileAccessibility(url) {
    try {
        const [, fileKey] = url.match(/figma\.com\/file\/([^/]+)/i);

        const response = await axios.get(`https://api.figma.com/v1/files/${fileKey}`, {
            headers: {
                'X-Figma-Token': process.env.FIGMA_API_TOKEN 
            }
        });

        const isPublic = response.data.document.public;

        return isPublic;
    } catch (error) {
        console.error(`${url}: ${error}`);
        return false;
    }
}

// Test Figma URLs
const figmaUrls = [
    'https://www.figma.com/file/YoSuZ1tqQAQX5TkjXkUStL/GDG-Hack?type=design&node-id=0-1&mode=design',
    'https://www.figma.com/file/efgh456/Another-File'
];

figmaUrls.forEach(async (url) => {
    const isPublic = await checkFigmaFileAccessibility(url);
    console.log(`${url}: ${isPublic ? 'Public' : 'Private or Invalid'}`);
});