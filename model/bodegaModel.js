const dbConnect = require('./../config/postgres')

module.exports = {
    async obtenerProductos(subcursal){
        let list
        await dbConnect.connect().query('SELECT * FROM almacen.producto INNER JOIN almacen.bodega ON almacen.producto.cod_producto = almacen.bodega.cod_producto WHERE almacen.bodega.subcursal = $1',[subcursal])
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
    async obtenerProducto(codProducto,subcursal){
        //console.log(codProducto,' ',subcursal)
        let list
        await dbConnect.connect().query('SELECT * FROM almacen.producto INNER JOIN almacen.bodega ON almacen.producto.cod_producto = almacen.bodega.cod_producto WHERE almacen.bodega.cod_producto = $1 AND almacen.bodega.subcursal = $2',[codProducto,subcursal])
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
    async updateProducto(producto){
        await dbConnect.connect().query('UPDATE almacen.producto SET name=$1, precio=$2 WHERE cod_producto=$3 ',[producto.name, producto.precio, producto.cod ])
        .then(response => {
            console.log(response.rows)
        })
        .catch(err => {
            console.log(err)
            return
        }).finally( () => {
            //console.log('cerrar conexion')
            dbConnect.connect().end()
        })
    },
    async updateBodega(producto,subcursal){
        await dbConnect.connect().query('UPDATE almacen.bodega SET cantidad=$1 WHERE cod_producto=$2 AND subcursal=$3',[producto.cantidad,  producto.cod,subcursal ])
        .then(response => {
            console.log(response.rows)
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
        //console.log(producto,' ',subcursal)
        await this.updateProducto(producto)
        await this.updateBodega(producto,subcursal)
        return await this.obtenerProductos(subcursal)
    },
    async producto(producto){
        let list
        await dbConnect.connect().query('SELECT * FROM almacen.producto WHERE cod_producto = $1',[producto.cod])
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
    async insertProducto(producto){
        await dbConnect.connect().query('INSERT INTO almacen.producto(cod_producto,name,precio) VALUES ($1,$2,$3)',[producto.cod, producto.name, producto.precio])
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
    async insertBodega(producto,subcursal){
        await dbConnect.connect().query('INSERT INTO almacen.bodega(cod_producto,cantidad,subcursal) VALUES ($1,$2,$3)',[producto.cod, producto.cantidad,subcursal])
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
    async insertarProducto(producto,subcursal){
        console.log(producto,' ',subcursal)

        const data = await this.obtenerProducto(producto.cod,subcursal)
        console.log(data[0])
        if (data[0] == undefined) {
            const prod = await this.producto(producto)
            console.log(prod)
            if (prod[0] == undefined) {
                await this.insertProducto(producto)
                await this.insertBodega(producto,subcursal)
            }else{
                await this.updateProducto(producto)
                await this.insertBodega(producto,subcursal)
            }
        }else{
            await this.updateProducto(producto)
            await this.updateBodega(producto,subcursal)
        }
        return await this.obtenerProductos(subcursal)
    }

    
}