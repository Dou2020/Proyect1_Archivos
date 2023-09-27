const modelDB = require('../model/index')

module.exports = (router) => {

    router.get('/cajeroIndex', (req,res)=>{
        res.render('./Cajero/cajeroIndex', { title: 'Iniciar Sesion Cajero' });
    })

}