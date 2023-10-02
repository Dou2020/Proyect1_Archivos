const modelDB = require('../model/adminModel')

module.exports = (router,myCache) => {
    router.get('/admin', async (req,res)=>{
        const name = myCache.get('name') || '';
        const opcion = req.query.opcion || 1;
        let data
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'adm' && name.estado == 1) {
            if (opcion == 3) {
                data = await modelDB.obtenerEmpleados()
            }
            res.render('./Admin/adminIndex',{name:name, opcion:opcion, datas:data});   
        }
    })

}