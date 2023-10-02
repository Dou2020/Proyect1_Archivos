const dbConnect = require('./../config/postgres')

module.exports = {
    async obtenerEmpleados(){
        let list
        await dbConnect.connect().query('SELECT * FROM personal.empleado')
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
    async obtenerEmpleado(usuario){
        console.log(usuario)
        let list
        await dbConnect.connect().query('SELECT * FROM personal.empleado WHERE usuario = $1',[usuario])
        .then(response => {
            list = response.rows
            console.log(list)
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
    async actualizarEmpleado(empleado){
        console.log(empleado)
        await dbConnect.connect().query('UPDATE personal.empleado SET  password=$1, name=$2, rol=$3, subcursal=$4 WHERE usuario=$5 ',[empleado.password, empleado.name, empleado.rol, empleado.subcursal,empleado.usuario ])
        .then(response => {
            //sconsole.log(response.rows)
        })
        .catch(err => {
            console.log(err)
            return
        }).finally( () => {
            //console.log('cerrar conexion')
            dbConnect.connect().end()
        })
        return await this.obtenerEmpleados()
    }
}