const express = require('express');
const app = express();
const router = express.Router();
exports.router = router;
const modelDB = require('./../model/index')
//export route of user
const cajero = require('./cajeroRoute')
const admin = require('./adminRoute')
const inven = require('./InvenRoute')
const bodega = require('./bodegaRoute')

const NodeCache = require('node-cache');
const myCache = new NodeCache();

// Iniciar sesion en los diferentes usuarios
router.get('/', (req, res) => {
  res.render('index', { title: 'Iniciar Sesion' });

});

//validar credenciales de los usuarios al momento de logiarse
router.post('/Proceder', async (req, res) => {
  
  const nombre = req.body.user || '';
  const password = req.body.password || '';
  
const nam = await modelDB.obtenerUser(nombre)
const user = nam[0]
if (user == undefined) {
  await res.redirect('/')
}
myCache.set('name',nam[0]);

switch (user.rol) {
  case 'caj':
    res.redirect('/cajero');  
    break;
  case 'adm':
    res.redirect('/admin')
    break;
  case 'bod':
    res.redirect('/bodega')
    break;
  case 'inv':
    res.redirect('/inventario')
    break;
  default:
    res.redirect('/')
    break;
}

})

router.get('/cerrarSesion',(req,res) => {
  myCache.flushAll();
  res.redirect('/');
})

// routes of cajero
cajero(router,myCache);

//routes of admin
admin(router,myCache);

//routes of bodega
bodega(router,myCache);

//routes of inventario
inven(router,myCache);

module.exports = router;