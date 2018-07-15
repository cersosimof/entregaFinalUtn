function eliminar(id, nroExp) {
   if(confirm("Desea eliminar este registro?")){
    location.href="/eliminar/"+nroExp+"/"+id;
   }
}

function validarExp() {
  alert("tu mama")}


// function isLogged(usuario) {
//     if(usuario) {
//         console.log("usuario existe")
//     } else {
//         $('#myModal').modal('show');
//     }
// }

$( function() {
  $( document ).ready(function() {
    var ramosEmpresas = [];
    var nombresEmpresas = [];

  $.ajax({
      method: "POST",
      url: "/buscarRamo",  
      success: function(data) {
        var ramos = JSON.parse(data);
        for(var i = 0; i < ramos.length; i++ ) {
          ramosEmpresas.push(ramos[i].ramo)
        }
      }
   });

   $.ajax({
    method: "POST",
    url: "/buscarEmpresas",  
    success: function(data) {
      var empresas = JSON.parse(data);
      for(var i = 0; i < empresas.length; i++ ) {
        nombresEmpresas.push(empresas[i].nombre)
        console.log(nombresEmpresas)
      }
    }
 });

    $( "#tags, #ramo" ).autocomplete({
      source: ramosEmpresas,
      select: function(event, ui) {   
          location.href="/ver/" + ui.item.value;
      }
    });

    $( "#agregaEmpresa, #buscadorModif" ).autocomplete({
      source: nombresEmpresas
    });

    });
  });

