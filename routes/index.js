const express = require('express');
const app = express();
const router = express.Router();
exports.router = router;
const modelDB = require('./../model/index')
const cajero = require('./cajeroRoute')

app.locals.name = '';
// Iniciar sesion en los diferentes usuarios
router.get('/', (req, res) => {
  res.render('index', { title: 'Iniciar Sesion' });

});

//validar credenciales de los usuarios al momento de logiarse
router.post('/Proceder', async (req, res) => {
  
  const nombre = req.body.user || '';
  const password = req.body.password || '';
  console.log('date: ',nombre,' ', password)

  const name = await modelDB.obtenerUser(nombre)
  app.locals.name = name[0];
  console.log(app.locals.name)
  res.render('./Cajero/cajeroIndex', { name: app.locals.name });

})

// routes de cajero
cajero(router,app.locals.name);

module.exports = router;