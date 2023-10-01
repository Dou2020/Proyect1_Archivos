const modelDB = require('../model/index')

module.exports = (router,myCache) => {
    router.get('/inventario', (req,res)=>{
        const name = myCache.get('name') || '';
        const opcion = req.query.opcion || 1;

        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'inv' && name.estado == 1) {
            res.render('./Inven/invenIndex',{name:name, opcion:opcion});   
        }
    })

}