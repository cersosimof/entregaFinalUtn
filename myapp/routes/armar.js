var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proveedores'
});

router.get('/', function(req, res) {          
    if (req.session.user) {
        res.render('armar', {'usuario' : req.session.user})
    } else {
        res.redirect('/');  
    }
})

router.post('/', function(req, res) {
    //CAPTURA DE VARIABLES DE NROEXP - RAMO
    var nroExp = req.body.nroExp;
    var ramo = req.body.ramo;

    //SI ESTA LOGUEADO
    if (req.session.user) {
    //BUSCA LAS EMPRESAS QUE TENGAN EL RAMO BUSCADO    
    var buscar = "%"+ramo+"%";
    pool.query('SELECT idEmpresa FROM proveeores WHERE ramo LIKE ?',[buscar], (err, results) => {
    //ENVIO DE ERRORES
    if(err) throw err;                  
    //SI NO ENCUENTRA RESULTADOS
    if (results.length == 0){
        console.log('no hay empresas en este rubro')
    res.render("armar", { 'mensaje' : 'No hay empresas en ese ramo', 'usuario' : req.session.user})
    //SI ENCUENTRA RESULTADOS
    } else {
        //GUARDA LAS EMPRESAS EN EL EXPEDIENTE
        for (var i = 0; i < results.length; i++){
            var empresa = results[i].idEmpresa;
            pool.query('INSERT INTO listadoexpediente(nroExpediente, idEmpresa) VALUES (?, ?)', [nroExp, empresa], (err, results) => {
            if(err) throw err;
            console.log('Empresa Agregada')     
            })
        }
        res.redirect("/armar/"+nroExp)
    }

});
    } else {
        //SI NO ESTAS LOGUEADO
        res.redirect('/');  
    }
})

router.get('/:nroExp', function(req, res) {          
    if (req.session.user) {
        var nroExp = req.params.nroExp;
        pool.query('SELECT listadoexpediente.idListado, listadoexpediente.nroExpediente, proveeores.idEmpresa, proveeores.nombre, proveeores.correo, proveeores.telefono, proveeores.contacto, proveeores.cuit FROM listadoexpediente LEFT JOIN proveeores ON listadoexpediente.idEmpresa = proveeores.idEmpresa WHERE listadoexpediente.nroExpediente = ?',[nroExp], (err, results) => {
            if(err) throw err; 
            res.render('armado', { empresas : results, 'usuario' : req.session.user, 'nroExp' : nroExp})
        })         
    } else {
        res.redirect('/');  
    }
})
module.exports = router;


