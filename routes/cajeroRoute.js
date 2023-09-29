const modelDB = require('../model/index')

module.exports = (router,name) => {

    router.get('/cajeroIndex', (req,res)=>{
        console.log(name)
        res.render('./Cajero/cajeroIndex', { name: name });
    })
    router.get('/ingresarCliente', (req,res)=>{
        
        res.render('./Cajero/cajeroIndex', { name: name });
    })
    router.get('/registroCompra', (req,res)=>{
        res.render('./Cajero/cajeroIndex', { title: 'Iniciar Sesion Cajero' });
    })

}