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
    }
}