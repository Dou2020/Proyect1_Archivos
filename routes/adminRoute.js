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
    router.get('/editarEmpleado/:empleado', async(req,res)=> {
        const name = myCache.get('name') || '';
        const opcion = req.query.opcion || 1;
        let data = '';
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'adm' && name.estado == 1) {
            if (opcion == 2) {
                const empleado = req.params.empleado
                data = await modelDB.obtenerEmpleado(empleado)
                console.log(data)
            }
            res.render('./Admin/adminIndex',{name:name, opcion:opcion, data:data[0]}); 
        }
    })
    router.post('/UploadEmpleado', async(req,res)=>{
        const name = myCache.get('name') || '';
        const opcion =  4;
        let data = '';
        if (name === undefined ) {    
            res.redirect('/')
        }
        if (name.rol == 'adm' && name.estado == 1) {
                const user = req.body.usuario
                const nam = req.body.name
                const rol = req.body.rol
                const sub = req.body.subcursal
                const password = req.body.password

                //console.log(password,'  ',adminnistrador);

                if ( user !== '' &&  nam !== '' && rol !== '' && sub !== '' && password !== '') {
                    const cliente = [{usuario:user,name:nam,rol:rol,subcursal:sub,password:password}]
                    data = await modelDB.actualizarEmpleado(cliente[0]);        
                }else{
                    data = await modelDB.obtenerClientes()
                }
                //console.log(producto)
            

            res.render('./Admin/adminIndex',{name:name, opcion:opcion, datas:data});  
        }
    })

}