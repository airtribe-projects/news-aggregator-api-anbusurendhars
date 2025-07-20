const axios = require('axios');
const { getUserByEmail } = require('../model/user');

const newsApiKey = process.env.NEWS_API_KEY;

const getPreferredNews = async (user) => {
    const userFound = await getUserByEmail(user.email);

    if (!userFound){
        const error = new Error(`Invalid user`);
        error.name = 'UNAUTHORIZED_ERROR';
        throw error;
    }

    if (userFound.preferences.length > 0) {

        const newsResults = await Promise.all(userFound.preferences.map(pref => axios.get(`https://newsapi.org/v2/top-headlines?apiKey=${newsApiKey}&category=${pref}`)));

        return newsResults.reduce((acc, news) => {
            acc = [...acc, ...news.data.articles];

            return acc;
        }, []);
        
    }    
};

module.exports = {
    getPreferredNews
};
