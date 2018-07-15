var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/');
    },
    filename: function(req, file, cb) {
      cb(null, file.filename + '-' + Date.now() + '.png');
    }
  });
  
  var upload = multer({ storage: storage });
//--------------------------------------------
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proveedores'
});


router.get('/', function(req, res) {
    if(req.session.user){         
    res.render('alta', {'usuario' : req.session.user})
    } else {
      res.redirect('/')
    }
})

router.post('/', upload.single('imagen'), function(req, res, next) {

    var nombre = req.body.nombre;
    var correo = req.body.correo;
    var telefono = req.body.telefono;    
    var contacto = req.body.contacto;
    var ramo = req.body.ramo;
    var cuit = req.body.cuit;
    var imagen = 'noimagen.png'
    
    //si ingresa imagen reemplaza.
    if(req.file) {
    imagen = req.file.filename
    };

    pool.query('INSERT INTO proveeores (nombre, correo, telefono, contacto, ramo, cuit, imagen) VALUES ( ?, ?, ?, ?, ?, ?, ?)', [nombre, correo, telefono, contacto, ramo, cuit, imagen], function (error, results, fields) {
      if (error) throw error;
      res.render('alta', {'altaOk' : 'Proveedor ingresado en la base de datos', 'usuario' : req.session.user })
    });
})

module.exports = router;
