function buildNeural(data) {
	const config = {
		binaryThresh: 0.5,
    	hiddenLayers: [3],     // array of ints for the sizes of the hidden layers in the network
    	outputSize: 4,
    	activation: 'sigmoid'  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
	};

	// create a simple feed forward neural network with backpropagation
	const net = new brain.NeuralNetwork(config);

	var trainingSet = [], caso = {};
	//separar os dados(input) dos rótulos(output)
	for (var i =0; i < data.length ; i++) {
		var object = {
				// input: [data[i].salario,data[i].idade,data[i].emprestimo],
				// output: [data[i].rotulo]
				input: {salario: data[i].salario, idade: data[i].idade, emprestimo: data[i].emprestimo},
				output: {rotulo: data[i].rotulo}
				
			}
			trainingSet[i] = object;
		}

		net.train(trainingSet, {learningRate: 0.01,iterations: 15000,log: false});
		// matriz(net.test(trainingSet));
	$('#verificar').on('click',function () {
		caso = {salario: parseInt($('#salario').val()), idade: parseInt($('#idade').val()), emprestimo: parseInt($('#emprestimo').val())};
		var output = net.run(caso);
		console.log(net);
		console.log(output);
		document.getElementById('neuralPrediction').innerHTML = "Probabilidade de reprovação: "+(output.rotulo*100).toFixed(2)+"%"; 	
	});	

}
//Recebe informações do treino da rede
function matriz(log){
	/*
	log.error
	log.accuracy
	log.falseNeg
	log.falsePos
	log.trueNeg
	log.truePos
	log.total
	*/
	console.log(log);
	document.getElementById('tabela').innerHTML = '<table class="table"><thead>'+
		'<td> - </td><td>Predicted yes</td><td>Predicted no</td></thead>'+
		'<tbody><tr><td>Actual yes</td><td>'+log.truePos+'</td><td>'+log.falseNeg+'</td></tr>'+
		'<tr><td>Actual no</td><td>'+log.falsePos+'</td><td>'+log.trueNeg+'</td></tr></tbody>'+
		'<small>Acuracia: '+(log.accuracy*100).toFixed(2)+"%</small"+'</table>';

}