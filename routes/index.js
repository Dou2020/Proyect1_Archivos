const express = require('express');
const router = express.Router();
exports.router = router;
const modelDB = require('./../model/index')
const cajero = require('./cajeroRoute')

// Iniciar sesion en los diferentes usuarios
router.get('/', (req, res) => {
  res.render('index', { title: 'Iniciar Sesion' });

});

//validar credenciales de los usuarios al momento de logiarse
router.post('/Proceder', async (req, res) => {
  
  const nombre = req.body.user || '';
  const password = req.body.password || '';
  console.log('date: ',nombre,' ', password)

  const data = await modelDB.obtenerUser(nombre)

  console.log(data[0].nombre)
  res.render('./Cajero/cajeroIndex', { title: 'Iniciar Sesion Cajero' });

})

// routes de cajero
cajero(router);

module.exports = router;