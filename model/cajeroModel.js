const dbConnect = require('./../config/postgres')

module.exports = {

    async obtenerClientes(){
        let list
        await dbConnect.connect().query('SELECT * FROM usuario.cliente ')
        .then(response => {
            //console.log(response.rows)
            list = response.rows
        })
        .catch(err => {
            console.log(err)
            return
        }).finally( () => {
            //console.log('cerrar conexion')
            dbConnect.connect().end()
        })
        return list
    },    

    async obtenerCliente(cliente){
        let list
        await dbConnect.connect().query('SELECT * FROM usuario.cliente WHERE nit = $1 ', [cliente] )
        .then(response => {
            //console.log(response.rows)
            list = response.rows
        })
        .catch(err => {
            console.log(err)
            return
        }).finally( () => {
            //console.log('cerrar conexion')
            dbConnect.connect().end()
        })
        return list
    },

    async actualizarCliente(cliente){
        let list
        await dbConnect.connect().query('UPDATE usuario.cliente SET nombre=$1 WHERE nit=$2', [cliente.name,cliente.nit] )
        .then(response => {
        })
        .catch(err => {
            console.log(err)
            return
        }).finally( () => {
            //console.log('cerrar conexion')
            dbConnect.connect().end()
        })
        return await this.obtenerClientes()
    },

    async ingresarCliente(cliente){
        console.log(cliente)
        await dbConnect.connect().query('INSERT INTO usuario.cliente(nit,nombre) VALUES ($1,$2)',[cliente.nit,cliente.nombre])
        .then(response => {
        })
        .catch(err => {
            console.log(err)
            return
        }).finally( () => {
            //console.log('cerrar conexion')
            dbConnect.connect().end()
        })
        return await this.obtenerClientes()
    },
    async uploadClienteTarjeta(card,cliente){
        await dbConnect.connect().query('UPDATE usuario.cliente SET no_card = $1 WHERE nit = $2 ',[card.noCard,cliente])
        .then(response => {
        })
        .catch(err => {
            console.log(err)
            return
        }).finally( () => {
            dbConnect.connect().end()
        })
    },
    async insertCard(card){
        await dbConnect.connect().query('INSERT INTO usuario.tarjeta(no_card,tipo,puntos,acumulado) VALUES ($1,$2,$3,$4)',[card.noCard,card.tipo,card.puntos,card.acumulado])
        .then(response => {
        })
        .catch(err => {
            console.log(err)
            return
        }).finally( () => {
            dbConnect.connect().end()
        })
    },
    async ingresarTarjeta(cliente,card){
        await this.insertCard(card)
        await this.uploadClienteTarjeta(card,cliente)

        return await this.obtenerClientes()
    },
    async admin(user,password){
        let list
        await dbConnect.connect().query('SELECT * FROM personal.empleado WHERE usuario=$1 AND password=$2',[user,password])
        .then(response => {
            list = response.rows
        })
        .catch(err => {
            console.log(err)
            return
        }).finally( () => {
            dbConnect.connect().end()
        })
        return list
    }
}