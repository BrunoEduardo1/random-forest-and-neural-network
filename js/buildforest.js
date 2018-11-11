function buildForest(data) {
	// Configuration
	var config = {
	    trainingSet: data, 
	    categoryAttr: 'rotulo', 
	    //ignoredAttributes: ['cliente_id']
	};

	// Building Decision Tree
	var decisionTree = new dt.DecisionTree(config);

	// Building Random Forest
	var numberOfTrees = 3;
	var randomForest = new dt.RandomForest(config, numberOfTrees);

	console.log(randomForest);

	// Testing Decision Tree and Random Forest
	var comic = {salario: 1000, idade: 20, emprestimo: 2900};

	var decisionTreePrediction = decisionTree.predict(comic);
	var randomForestPrediction = randomForest.predict(comic);


	// Displaying predictions
	document.getElementById('testingItem').innerHTML = JSON.stringify(comic, null, 0);
	document.getElementById('decisionTreePrediction').innerHTML = JSON.stringify(decisionTreePrediction, null, 0);
	document.getElementById('randomForestPrediction').innerHTML = JSON.stringify(randomForestPrediction, null, 0);

	// Displaying Decision Tree
	document.getElementById('displayTree').innerHTML = treeToHtml(decisionTree.root);


	// Recursive (DFS) function for displaying inner structure of decision tree
	function treeToHtml(tree) {
	    // only leafs containing category
	    if (tree.category) {
	        return  ['<ul>',
	                    '<li>',
	                        '<a href="#">',
	                            '<b>', tree.category, '</b>',
	                        '</a>',
	                    '</li>',
	                 '</ul>'].join('');
	    }
	    
	    return  ['<ul>',
	                '<li>',
	                    '<a href="#">',
	                        '<b>', tree.attribute, ' ', tree.predicateName, ' ', tree.pivot, ' ?</b>',
	                    '</a>',
	                    '<ul>',
	                        '<li>',
	                            '<a href="#">yes</a>',
	                            treeToHtml(tree.match),
	                        '</li>',
	                        '<li>', 
	                            '<a href="#">no</a>',
	                            treeToHtml(tree.notMatch),
	                        '</li>',
	                    '</ul>',
	                '</li>',
	             '</ul>'].join('');
	}
}