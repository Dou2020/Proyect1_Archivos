const jwt = require('jsonwebtoken');

const tokenSign = async (user) => {
    return jwt.sign({

            _id: user.nombre,  // usuario
            role: user.rol //rol que va a tomar

          },'123456', { expiresIn: '1h' });
}
const verifyToken = async (token) => {
    
}
const decodeSing = async (token) => {
}

module.exports ={tokenSign, verifyToken, decodeSing};