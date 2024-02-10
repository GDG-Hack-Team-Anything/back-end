const axios = require('axios');

require('dotenv').config();

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

module.exports = { checkGitHubRepositoryAccessibility, checkFigmaFileAccessibility };
