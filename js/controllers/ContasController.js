conversionApp.controller('ContasController', function($scope) {

	//initialization	
	$scope.entradas = true;
	$scope.load();
	alert('iniciando');
	
//----------------------------------------------------------------------------------------------------
	$scope.addContas= function(){
		if(!$scope.conta.idEntrada){

				$scope.contas.push({

					idEntrada:(new Date()).getTime(), 
					descricao:$scope.conta.descricao,
					vencimento:$scope.conta.vencimento,
					valor:$scope.conta.valor
					
				});
				$scope.salveStorage();

				
				}else{

					alert('Conta alterada com sucesso.');
					var indexEntrada = $scope.contas.indexOf($scope.conta);
					$scope.contas.descricao[indexEntrada]=$scope.conta.descricao;
					$scope.contas.vencimento[indexEntrada]=$scope.conta.vencimento;
					$scope.contas.valor[indexEntrada]=$scope.conta.valor;

				}
				


	};

//-----------------------------------------------------------------------------------------------------------------

	$scope.reset= function(){
						$scope.conta.descricao='',
						$scope.conta.vencimento='',
						$scope.conta.valor=''
						$scope.conta.idEntrada=''
						

			};

//------------------------------------------------------------------------------------------------------------------			
		$scope.setentradas = function() {
			
			$scope.relatorios =  false;
			$scope.entradas =  true;
		    $scope.pagar =  false;
			//alert('entradas');
			
		};
//--------------------------------------------------------------------------------------------------------------------		

		$scope.setpagar= function() {
			$scope.relatorios =  false;
			$scope.entradas =  false;
			$scope.pagar =  true;
			//alert('pagar');

			
		};
//------------------------------------------------------------------------------------------------------------------------

		$scope.setrelatorio= function() {
			$scope.relatorios =  true;
			$scope.entradas =  false;
			$scope.pagar =  false;
			//alert('relatorios');
			
		};
//-----------------------------------------------------------------------------------------------------------------------
		$scope.editar= function(contaAseralterada){
			
			$scope.relatorios =  false;
			$scope.entradas =  true;
		    $scope.pagar =  false;
		    $scope.conta=contaAseralterada;
		    $scope.index = $scope.contas.indexOf(contaAseralterada);
		   
		};




	

	

});
