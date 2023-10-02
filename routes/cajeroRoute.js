const modelDB = require('../model/cajeroModel')

module.exports = (router,myCache) => {

    router.get('/cajero', async (req,res)=>{

        const op = req.query.opcion  || 1;
        const name = myCache.get('name');
        let data
        if(name == undefined){
            res.redirect('/')
        }
        if (name.rol == 'caj' && name.estado == 1) {
            if (op == 4) {
                data = await modelDB.obtenerClientes()                
            }
            res.render('./Cajero/cajeroIndex', { name: name, opcion: op,datas: data });            
        }
    })

    router.post('/saveCliente', async (req,res)=>{

        const name = myCache.get('name');
        const op = 4;
        let data

        if (name.rol == 'caj' && name.estado == 1) {
            const nit = req.body.nit
            const nam = req.body.name
            if (nit != '' && nam != '') {
                const cliente = [{nit:nit, nombre:nam}]
                data = await modelDB.ingresarCliente(cliente[0])
            }
            res.render('./Cajero/cajeroIndex', {datas: data, opcion:op, name:name });
        }
    })
    
    router.get('/registroCompra', (req,res)=>{
        res.render('./Cajero/cajeroIndex', {});
    })
    router.get('/editarCliente/:cliente', async(req,res)=> {
        const name = myCache.get('name') || '';
        const opcion = req.query.opcion || 1;
        let data = '';
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'caj' && name.estado == 1) {
            if (opcion == 3) {
                const cliente = req.params.cliente
                //console.log(producto)
                data = await modelDB.obtenerCliente(cliente);
                //console.log(data)
            }
            res.render('./Cajero/cajeroIndex',{name:name, opcion:opcion, data:data[0]}); 
        }
    })
    router.post('/UploadCliente', async(req,res)=>{
        const name = myCache.get('name') || '';
        const opcion =  4;
        let data = '';
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'caj' && name.estado == 1) {
                const nit = req.body.nit
                const name = req.body.name
                const admin = req.body.admin
                const password = req.body.password
                const adminnistrador = await modelDB.admin(admin,password)
                console.log(password,'  ',adminnistrador);
                if ( name !== '' &&  adminnistrador[0] != undefined) {
                    const cliente = [{nit:nit,name:name}]
                    data = await modelDB.actualizarCliente(cliente[0]);        
                }else{
                    data = await modelDB.obtenerClientes()
                }
                //console.log(producto)
            

            res.render('./Cajero/cajeroIndex',{name:name, opcion:opcion, datas:data});  
        }
    })
    router.get('/tarjetaCliente/:cliente', async(req,res)=> {
        const name = myCache.get('name') || '';
        const opcion = req.query.opcion || 1;
        let data = '';
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'caj' && name.estado == 1) {
            if (opcion == 2) {
                data = req.params.cliente
            }
            res.render('./Cajero/cajeroIndex',{name:name, opcion:opcion, data:data}); 
        }
    })

    router.post('/addTarjeta', async(req,res)=> {
        const name = myCache.get('name') || '';
        const opcion = 4;
        let data ;
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'caj' && name.estado == 1) {
                const nit = req.body.nit
                const noCard = req.body.noTarjeta
                if (nit != '' && noCard != '') {
                    const card = [{noCard:noCard,tipo:'1',puntos:0,acumulado:0}]
                    data = await modelDB.ingresarTarjeta(nit,card[0])
                    //console.log(data)
                }

            res.render('./Cajero/cajeroIndex',{name:name, opcion:opcion, datas:data}); 
        }
    })

}