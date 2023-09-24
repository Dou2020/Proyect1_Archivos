const bcrypt =  require('bcryptjs');

//funcion para encriptar el password
const encrypt = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain, 10);
    return hash;
};

// funcion para comparar el password en texto plano con la de la base de datos
const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}

module.exports = { encrypt, compare };