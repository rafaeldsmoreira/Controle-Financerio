
conversionApp.controller('ContasController', function($scope) {

	//initialization

	$scope.contas=[];
	$scope.STORAGE_KEY=$scope.conta;
	

//-----------------------------------------------------------------------------------------------------------		
	
	$scope.salveStorage = function() {
		localStorage.setItem($scope.STORAGE_KEY, JSON.stringify($scope.contas));
		
	};


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