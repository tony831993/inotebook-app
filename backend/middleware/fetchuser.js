const jwt = require("jsonwebtoken");
const JWT_SECRET = 'Thisisasample@JWTSecret';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({error: 'Unauthorize request.'});
    }
    try {
        const userData = jwt.verify(token, JWT_SECRET);
        req.user = userData.user;
        next();
    } catch (error) {
        console.error(`Auth error: ${error.message}`);
        res.status(401).send({error: 'Unauthorize request.'});
    }
   
}

module.exports = fetchuser;