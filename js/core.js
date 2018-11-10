$(document).ready(function() {
    //Requisitar os dados
    $.ajax({
        type: "GET",
        url: "credit_data.csv",
        dataType: "text",
        success: function(data) {
            //Trasnformar csv em um array de objetos
            data = $.csv.toObjects(data);
            processData(data);
            //console.log(data[0]);
            //data[0].emprestimo = parseFloat(data[0].emprestimo.replace(',','.'));
            console.log(data[0]);

        }
     });

});
function processData(data) {

    for (var i = 0; i < data.length; i++) {
        for (var propriedade in data[i]) {
            //data[i][propriedade].length == 0 || 
          if (data[i][propriedade]=== "" || parseFloat(data[i][propriedade].replace(',','.'))< 0) {

            console.log(data[i].cliente_id);
            console.log(propriedade);
            //remove dado da base
            data.splice(i,1);
            i=0;
            break;
          } else {
            var valor =  data[i][propriedade].replace(',','.');
            data[i][propriedade] = valor;
          }

        }
        //console.log(data[i]);
        //if(i == 30) {break}; 
    }
}