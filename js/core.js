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
            console.log(data[0].emprestimo +"é maior que "+'8107,22');
            console.log(data[0].emprestimo > 8107.22);
            allInt(data);
            // console.log(data);
            //subst(data);
            //console.log(data);
            buildForest(data);

        }
     });
});
function processData(data) {
    for (var i = 0; i < data.length; i++) {
        delete data[i].cliente_id;
        for (var propriedade in data[i]) {
            //data[i][propriedade].length == 0 || 
          if (data[i][propriedade]=== "" || parseFloat(data[i][propriedade].replace(',','.'))< 0) {

            // console.log(data[i].cliente_id);
            // console.log(propriedade);
            //remove dado da base
            data.splice(i,1);
            i=0;
            break;
          } else {
            //var valor =  data[i][propriedade].replace(',','.');
           // data[i][propriedade] = valor;
          }

        }//fim for propriedades

        //console.log(data[i]);
        // if(i == 30) {break}; 
   
    }//fim for todos os registros
}

function allInt(data) {
   
    // if (coluna == "rotulo") {break;}

    for (var i = 0; i < data.length; i++) {
        for (var propriedade in data[i]) {
            data[i][propriedade] = parseInt(data[i][propriedade]);
             //data[i][propriedade] = parseFloat(data[i][propriedade].replace(',','.')).toFixed(2);
        }
    // break;
    }
}

//fora de contexto
function subst(data) {
     var substituirValores = 0, valorAtual = 0;

    for(coluna in data[0]){
        substituirValores = 0;

        if (coluna == "rotulo") {break;}

        for (var i = 0; i < data.length; i++) {
            //--- Substituir valores
            valorAtual = data[i][coluna];

            data[i][coluna] = substituirValores;
            
            for (var h = 0; h < data.length; h++) {
                if ((valorAtual) === (data[h][coluna])) {
                    data[h][coluna] = substituirValores;
                }
            }

            substituirValores++;
            //--- Substituir valores
        }
        // break;
    }
}