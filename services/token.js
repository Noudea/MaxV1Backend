const jwt = require('jsonwebtoken')

const loginSecretKey = process.env.JWT_SECRET


const jwtOptions = {
    issuer: 'maxApp',
    audience: 'maxApp',
    algorithm: 'HS256',
    expiresIn: '30d',
}

const generateToken = async (userId) => {
    try {
        const token = await jwt.sign({ userId: userId }, loginSecretKey, jwtOptions)
        return token
    } catch(error) {
        return {error : error}
    }
}

const verifyToken = async (token) => {
    try {
        const verifyToken = await jwt.verify(token, loginSecretKey, jwtOptions)
        return true
    } catch (error) {
        console.log('decodeToken', error)
        return {error : error}
    }
}

const decodeToken = async (token) => {
    try {
        const decodedToken = await jwt.verify(token, loginSecretKey, jwtOptions)
        return decodedToken
    } catch (error) {
        return {error : error}
    }
}


// const jwtOptionsSession = {
//     issuer: 'maxApp',
//     audience: 'maxApp',
//     algorithm: 'HS256',
//     expiresIn: '60d',
// }


// const generateSessionToken = async (email) => {
//     const token = await jwt.sign({ userEmail: email }, loginSecretKey, jwtOptionsSession)
//     return token
// }


exports.verifyToken = verifyToken
exports.generateToken = generateToken
exports.decodeToken = decodeToken
