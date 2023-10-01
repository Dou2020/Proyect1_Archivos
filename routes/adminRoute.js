const modelDB = require('../model/index')

module.exports = (router,myCache) => {
    router.get('/admin', (req,res)=>{
        const name = myCache.get('name') || '';
        const opcion = req.query.opcion || 1;

        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'adm' && name.estado == 1) {
            res.render('./Admin/adminIndex',{name:name, opcion:opcion});   
        }
    })

}