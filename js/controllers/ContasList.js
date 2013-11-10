conversionApp.controller('ContasController', function($scope) {

	//initialization

	$scope.contas=[];
	$scope.STORAGE_KEY=$scope.conta;

//------------------------------------------------------------------------------------------------------------		
		$scope.add= function(conta) {
		conta.idConta = $scope.generateId();
		$scope.contas.push(conta);
		
		
	}


//-----------------------------------------------------------------------------------------------------------------	
	
	$scope.getList= function() {
		return $scope.contas;
	}


//--------------------------------------------------------------------------------------------------------------------	
$scope.load=function() {
		var ContasStr = localStorage.getItem($scope.STORAGE_KEY);
		$scope.contas = JSON.parse(ContasStr);
		if($scope.contas) {
			return true;
		}
		ContasDAO.Contas = [];
		return false;
	}



)};