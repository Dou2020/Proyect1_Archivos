const modelDB = require('../model/bodegaModel')

module.exports = (router,myCache) => {
    router.get('/bodega', async (req,res)=>{
        const name = myCache.get('name') || '';
        const opcion = req.query.opcion || 1;
        let data = '';
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'bod' && name.estado == 1) {
            if (opcion == 4) {
                data = await modelDB.obtenerProductos(name.subcursal);
                //console.log(data)
            }
            res.render('./Bodega/bodegaIndex',{name:name, opcion:opcion, datas:data});   
        }
    })
    router.get('/editarProducto/:producto', async(req,res)=> {
        const name = myCache.get('name') || '';
        const opcion = req.query.opcion || 1;
        let data = '';
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'bod' && name.estado == 1) {
            if (opcion == 3) {
                const producto = req.params.producto
                //console.log(producto)
                data = await modelDB.obtenerProducto(producto, name.subcursal);
                //console.log(data)
            }
            res.render('./Bodega/bodegaIndex',{name:name, opcion:opcion, data:data[0]}); 
        }
    })
    router.post('/uploadProducto', async(req,res)=> {
        const name = myCache.get('name') || '';
        const opcion = 4;
        let data = '';
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'bod' && name.estado == 1) {
                const cod = req.body.codProducto;
                const nam = req.body.name
                const precio = req.body.precio
                const cantidad = req.body.cantidad
                const producto = [{cod: cod, name: nam, precio: precio, cantidad: cantidad}]
                console.log(producto)
                data = await modelDB.actualizarProducto(producto[0], name.subcursal);
                //console.log(data)
            res.render('./Bodega/bodegaIndex',{name:name, opcion:opcion, datas:data}); 
        }
    })
    router.post('/saveProducto', async(req,res)=> {
        const name = myCache.get('name') || '';
        const opcion = 4;
        let data = '';
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'bod' && name.estado == 1) {
                const cod = req.body.codProducto;
                const nam = req.body.name
                const precio = req.body.precio
                const cantidad = req.body.cantidad
                const producto = [{cod: cod, name: nam, precio: precio, cantidad: cantidad}]
                console.log(producto)
                data = await modelDB.insertarProducto(producto[0], name.subcursal);
                //console.log(data)
            res.render('./Bodega/bodegaIndex',{name:name, opcion:opcion, datas:data}); 
        }
    })

}