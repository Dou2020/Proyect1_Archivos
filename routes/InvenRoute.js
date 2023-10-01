const modelDB = require('../model/inventModel')

module.exports = (router,myCache) => {
    router.get('/inventario', async (req,res)=>{
        const name = myCache.get('name') || '';
        const opcion = req.query.opcion || 1;
        let data
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'inv' && name.estado == 1) {
            if (opcion == 4) {
                data = await modelDB.obtenerProductos(name.subcursal);
                //console.log(data)
            }
            res.render('./Inven/invenIndex',{name:name, opcion:opcion, datas:data});   
        }
    })
    router.get('/editarEstante/:producto', async(req,res)=> {
        const name = myCache.get('name') || '';
        const opcion = req.query.opcion || 1;
        let data = '';
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'inv' && name.estado == 1) {
            if (opcion == 3) {
                const producto = req.params.producto
                //console.log(producto)
                data = await modelDB.obtenerProducto(producto, name.subcursal);
                //console.log(data)
            }
            res.render('./Inven/InvenIndex',{name:name, opcion:opcion, data:data[0]}); 
        }
    })
    router.post('/UploadEstante', async(req,res)=> {
        const name = myCache.get('name') || '';
        const opcion = 4;
        let data = '';
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'inv' && name.estado == 1) {
                const cod = req.body.codProducto
                const cantidadB = req.body.cantidadB
                const cantidad = req.body.cantidad
                const cantidadN = req.body.cantidadN
                
                const producto  = [ {cod: cod, cantB: Math.floor(cantidadB), cant: Math.floor(cantidad), cantN: Math.floor(cantidadN)} ]

                //console.log(producto)
                data = await modelDB.actualizarProducto(producto[0], name.subcursal) || ''
                //console.log(data)
            res.render('./Inven/InvenIndex',{name:name, opcion:opcion, datas:data}); 
        }
    })

}