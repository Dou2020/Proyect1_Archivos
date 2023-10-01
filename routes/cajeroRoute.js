const modelDB = require('../model/index')

module.exports = (router,myCache) => {

    router.get('/cajero', (req,res)=>{

        const op = req.query.opcion  || 1;
        const name = myCache.get('name');

        if(name == undefined){
            res.redirect('/')
        }
        if (name.rol == 'caj' && name.estado == 1) {
            res.render('./Cajero/cajeroIndex', { name: name, opcion: op });            
        }

    })

    router.get('/ingresarCliente', (req,res)=>{
        
        res.render('./Cajero/cajeroIndex', { });
    })
    
    router.get('/registroCompra', (req,res)=>{
        res.render('./Cajero/cajeroIndex', {});
    })

}