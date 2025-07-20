var jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const isUserAuthenticated = (request, response, next) => {    
    const bearerToken = request.get('Authorization');

    if (!bearerToken || !bearerToken.startsWith('Bearer ')){
        return response.status(401).send({ message: "Unauthorised" })
    }

    const [,token] = bearerToken.split(' ');

    try {
        var decoded = jwt.verify(token, jwtSecret);

        request.user = { "email": decoded.email };
        next();
    } catch(err) {
        
        return response.status(401).send({ message: "Unauthorised" })
    }
};

module.exports = {
    isUserAuthenticated
}