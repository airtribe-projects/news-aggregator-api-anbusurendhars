const { getPreferredNews } = require('../service/news-service');

const getPreferredNewsController = async (request, response) => {

    try {
        const user = request.user;
        const result = await getPreferredNews(user);

        return response.send({ "news": result });
    } catch (error) {
        if (error.name == 'UNAUTHORIZED_ERROR'){
            return response.status(401).send({ message: error.message });
        }

        return response.status(500).send({ message: 'Something went wrong' });
    }
};


module.exports = {
    getPreferredNewsController
};