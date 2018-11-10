$(document).ready(function() {
    //Requisitar os dados
    $.ajax({
        type: "GET",
        url: "credit_data.csv",
        dataType: "text",
        success: function(data) {
            processData(data);
            //Trasnformar csv em um array de objetos
            data = $.csv.toObjects(data);
            console.log(data);

        }
     });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    //colunas
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        //add verificação de atributo vazio
        if (data.length == headers.length) {
            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
        }
    }
    //alert(lines);
}