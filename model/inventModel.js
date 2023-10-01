const dbConnect = require('../config/postgres')

module.exports = {
    async obtenerProductos(subcursal){
        let list
        await dbConnect.connect().query('SELECT * FROM almacen.producto INNER JOIN almacen.estante ON almacen.producto.cod_producto = almacen.estante.cod_producto WHERE almacen.estante.subcursal = $1',[subcursal])
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
    async obtenerBodega(codProducto,subcursal){
        //console.log(codProducto,' ',subcursal)
        let list
        await dbConnect.connect().query('SELECT cantidad FROM almacen.bodega WHERE cod_producto = $1 AND subcursal = $2',[codProducto,subcursal])
        .then(response => {
            console.log(response.rows)
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
    async obtenerProducto(codProducto,subcursal){
        //console.log(codProducto,' ',subcursal)
        let list
        await dbConnect.connect().query('SELECT * FROM almacen.producto INNER JOIN almacen.estante ON almacen.producto.cod_producto = almacen.estante.cod_producto WHERE almacen.estante.cod_producto = $1 AND almacen.estante.subcursal = $2',[codProducto,subcursal])
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
        const cantidad = await this.obtenerBodega(codProducto,subcursal)
        list[0].bodega = cantidad[0].cantidad;
        return list
    },
    async uploadBodega(cod, cant, subcursal){
        await dbConnect.connect().query('UPDATE almacen.bodega SET cantidad=$1 WHERE cod_producto=$2 AND subcursal=$3',[cant,cod,subcursal])
        .then(response => {
            //console.log(response.rows)
            //list = response.rows
        })
        .catch(err => {
            console.log(err)
            return
        }).finally( () => {
            //console.log('cerrar conexion')
            dbConnect.connect().end()
        })
    },
    async uploadEstante(cod,cant,subcursal){
        await dbConnect.connect().query('UPDATE almacen.estante SET cantidad=$1 WHERE cod_producto=$2 AND subcursal=$3',[cant,cod,subcursal])
        .then(response => {
            //console.log(response.rows)
            //list = response.rows
        })
        .catch(err => {
            console.log(err)
            return
        }).finally( () => {
            //console.log('cerrar conexion')
            dbConnect.connect().end()
        })
    },
    async actualizarProducto(producto,subcursal){
        //console.log(producto)
        const total = producto.cantN - producto.cant
        console.log('total>:  ',total,' cantN ',producto.cantN)
        if (total == 0) {
            return await this.obtenerProductos(subcursal)
        }
        if (producto.cant < total) {
            return await this.obtenerProductos(subcursal)
        }
        if (total > 0) {
            const totalB = producto.cantB - total
            if (totalB < 0) {
                return await this.obtenerProductos(subcursal)    
            }
            await this.uploadBodega(producto.cod,totalB,subcursal)
            await this.uploadEstante(producto.cod,producto.cantN,subcursal)
            return await this.obtenerProductos(subcursal)
        }

    }
}