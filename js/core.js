$(document).ready(function() {
    //Requisitar os dados
    $.ajax({
        type: "GET",
        url: "credit_datas.csv",
        dataType: "text",
        success: function(data) {
            //Trasnformar csv em um array de objetos
            data = $.csv.toObjects(data);
            processData(data);
            allInt(data);
            // buildForest(data);
            buildNeural(data);

        }
     });
});
//remove a coluna id e verifica se os dados são válidos
function processData(data) {
    for (var i = 0; i < data.length; i++) {
        delete data[i].cliente_id;
        for (var propriedade in data[i]) {
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
   
    }//fim for todos os registros
}

function allInt(data) {
   
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