const express = require('express');
const router = express.Router();
const lab = require('./laboratorista');
const { encrypt, compare } = require('./../extra/encriptar');
const { tokenSign, verifyToken, decodeSing } = require('./../extra/generateToken');
const conexion = require('.././extra/db');
// Iniciar sesion en los diferentes usuarios
const sqlTurno = 'SELECT * FROM turno';
const sqlResultados = 'SELECT * FROM reporte';
const sqlRealizar = 'SELECT * FROM examenRealizar ';
//Secretaria
router.get('/secretariaIndex', (req, res) => {
  res.render('./secretaria/secretariaIndex', { title: 'Inicio' });
});

router.get('/ingresarPaciente', (req, res) => {


  const connection = require('.././extra/db');
  const sql = 'SELECT * FROM paciente';

  let sqlPaciente = ''
  connection.query(sql, function (error, results) {
    if (error) throw error;
    else {
      res.render('./secretaria/ingresarPaciente', { results: results });
    }
  });
  //res.render('./secretaria/ingresarPaciente', { title: 'Registro' });

});

router.get('/resultadosSecretaria', (req, res) => {
  conexion.query(sqlResultados, (error, results) => {
    if (error) throw error;
    else {
      res.render('./secretaria/resultadosSecretaria', { results: results });
    }
  });
  console.log("Precondiciones");
  console.log("Deben haber resultados");
});
router.get('/registrosPaciente', (req, res) => {
  conexion.query(sqlRealizar, (error, results) => {
    if (error) throw error;
    else {
      res.render('./secretaria/examenesRegistrados', { results: results });
    }
  });
  console.log("Precondiciones");
  console.log("Deben haber resultados");
});
router.get('/horariosSecretaria', (req, res) => {
  conexion.query(sqlTurno, (error, results) => {
    if (error) throw error;
    else {
      res.render('./secretaria/horariosSecretaria', { results: results });
    }
  });
  console.log("Precondiciones");
  console.log("Deben haber horarios");

});


let nombre, tokenSession = '';
const sqlUsuario = 'SELECT * FROM usuario';
const sqlExamen = 'SELECT * FROM examen';
const sqlSubExamen = 'SELECT * FROM subExamen';
const sqlCompleto = 'SELECT * FROM subExamen ';
const sqlMacroOrina = 'SELECT * FROM subExamen WHERE tipo="Macroscopico" AND codigoExamen=101';
const sqlMicroOrina = 'SELECT * FROM subExamen WHERE tipo="Microscopico" AND codigoExamen=101';
const sqlMacroHeces = 'SELECT * FROM subExamen WHERE tipo="Macroscopico" AND codigoExamen=102';
const sqlMicroHeces = 'SELECT * FROM subExamen WHERE tipo="Microscopico" AND codigoExamen=102';
// Iniciar sesion en los diferentes usuarios
router.get('/', (req, res) => {
  res.render('index', { title: 'Iniciar Sesion' });

});

//validar credenciales de los usuarios al momento de logiarse
router.post('/Proceder', async (req, res) => {
  nombre = req.body.nombre || '';
  const password = req.body.password || '';


  conexion.query('SELECT * FROM usuario WHERE usuario = ?', [nombre], async (error, results, fields) => {
    if (error)
      throw error;

    if (results[0] != undefined) {
      if (results[0].estado == 1) {
        let tipo = results[0].tipoUsuario;
        let passwordd = results[0].passwordUsuario;
        console.log(results[0]);
        if (await compare(password, passwordd)) {
          if (tipo == 1) {
            await res.redirect('/administrador');

          } else if (tipo == 2) {
            await res.render('./secretaria/secretariaIndex');

          } else if (tipo == 3) {
            //tokenSession = await tokenSign(result);
            //console.log(tokenSession);
            res.redirect('/laboratorista');
            //res.send({data: user, tokenSession});

          } else { res.status(404).redirect('/'); }
        } else { res.status(404).redirect('/'); }
      } else { res.status(404).redirect('/'); }
    } else { res.status(404).redirect('/'); }
  });

});
//rutas de laboratorista
lab(router, nombre);



//router administrador
router.get('/administrador', (req, res) => {
  res.render('./administrador/administrador', { title: 'Iniciar Sesion Administrador' });
  console.log("Precondiciones");
  console.log("Necesita logearse como administrador");
});
router.get('/administrador/examenes', async (req, res) => {

  await conexion.query(sqlExamen, (error, results) => {
    if (error) throw error;
    else {
      res.render('./administrador/examenes', { results: results });
    }
  });
  console.log("Precondiciones");
  console.log("Deben existir examenes");

});

router.get('/administrador/subExamenes', (req, res) => {
  conexion.query(sqlSubExamen, (error, results) => {
    if (error) throw error;
    else {
      res.render('./administrador/subExamenes', { results: results });
    }
  });
  console.log("Precondiciones");
  console.log("Deben existir subExamenes");
});
router.get('/administrador/reportes', (req, res) => {
  res.render('./administrador/reportes', { title: 'Reportes Admin' });
  console.log("Precondiciones");
  console.log("Deben haber sido procesados los reportes");
});
router.get('/administrador/usuarios', (req, res) => {
  conexion.query(sqlUsuario, (error, results) => {
    if (error) throw error;
    else {
      conexion.query(sqlTurno, (error, results2) => {
        if (error) throw error;
        else {
          res.render('./administrador/usuarios', { results: results,results2:results2 });
        }
      });
    }
  });
  console.log("Precondiciones");
  console.log("Deben haber usuarios");
});
router.get('/administrador/corteMes', (req, res) => {
  res.render('./administrador/corteMes', { title: 'Corte del Mes' });
  console.log("Precondiciones");
  console.log("Haber procesado examenes");
  console.log("Ser fin de mes");
});
router.get('/administrador/roles', (req, res) => {
  res.render('./administrador/roles', { title: 'Roles' });
  console.log("Precondiciones");
  console.log("Sin precondiciones");
});

//CRUD USUARIO
const crud = require('../views/administrador/crud/crud');

router.get('/passwordUsuario', crud.passwordUsuario2);
router.post('/passwordUsuario', crud.passwordUsuario1);

router.get('/estadoUsuario', crud.estadoUsuario);
router.post('/saveUsuario', crud.saveUsuario);

router.get('/editarUsuario/:usuario', (req, res) => {
  const usuario = req.params.usuario;
  conexion.query('SELECT * FROM usuario WHERE usuario=?', [usuario], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      conexion.query(sqlTurno, (error, results2) => {
        if (error) {
          console.log(error);
        } else {
          res.render('./administrador/crud/editarUsuario', { usuario: results[0],results2:results2 });
        }
      })
    }
  })
})
router.post('/subirUsuario', crud.subirUsuario);
//crud examen
router.p

// CRUD SECRETARIA
//Agregar paciente
const crudPaciente = require('../views/secretaria/cruds/crudPacienteExamen');
router.post('/secretaria/ingresarPaciente', crudPaciente.savePaciente);

//Editar paciente
router.get('/editPaciente/:cui', (req, res) => {
  const cui = req.params.cui;
  conexion.query('SELECT * FROM paciente WHERE cui=?', [cui], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('./secretaria/cruds/editarPaciente', { user: results[0] });
    }
  });

});
router.post('/UploadPaciente', crudPaciente.editPaciente);

//Agregar Examen
router.get('/PacienteExamen/:cui', (req, res) => {
  const cui = req.params.cui;

  conexion.query('SELECT * FROM paciente WHERE cui=?', [cui], (error, results) => {
    if (error) {
      throw error;
    } else {
      conexion.query(sqlCompleto, (error, completo) => {
        if (error) {
          throw error;
        } else {
          conexion.query(sqlMacroOrina, (error, macroOrina) => {
            if (error) {
              throw error;
            }
            else {
              conexion.query(sqlMicroOrina, (error, microOrina) => {
                if (error) {
                  throw error;
                }
                else {
                  conexion.query(sqlMacroHeces, (error, macroHeces) => {
                    if (error) {
                      throw error;
                    }
                    else {
                      conexion.query(sqlMicroHeces, (error, microHeces) => {
                        if (error) {
                          throw error;
                        }
                        else {
                          const sqlExam = 'SELECT * FROM examen';
                          conexion.query(sqlExam, (error, results3) => {
                            if (error) {
                              throw error;
                            }
                            else {
                              res.render('./secretaria/cruds/realizarExamen', { user: results[0],microHeces:microHeces, macroHeces: macroHeces, microOrina: microOrina, macroOrina: macroOrina, completo: completo, examen: results3 });
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      });
    }
  });

});
router.post('/ExamenPaciente', crudPaciente.realizarExamen);

router.post('/subirUsuario', crud.subirUsuario);
//crud examen
router.post('/saveExamen', crud.saveExamen);
router.get('/editarExamen/:codigoExamen', (req, res) => {
  const examen = req.params.codigoExamen;
  conexion.query('SELECT * FROM examen WHERE codigoExamen=?', [examen], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.render('./administrador/crud/editarExamen', { examen: results[0] });
    }
  })
})

router.post('/subirExamen', crud.subirExamen);
//crud sub-examen
router.post('/saveSubExamen', crud.saveSubExamen);
//crud turno
const crud2 = require('../views/secretaria/cruds/crudPacienteExamen');
router.post('/saveTurno', crud2.saveTurno);
router.get('/editarTurno/:idTurno', (req, res) => {
  const turno = req.params.idTurno;
  conexion.query('SELECT * FROM turno WHERE idTurno=?', [turno], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.render('./secretaria/cruds/editarTurno', { turno: results[0] });
    }
  })
})
router.post('/subirTurno', crud2.subirTurno);

module.exports = router;