conversionApp.controller('ContasController', function($scope) {

	//initialization	
	$scope.entradas = true;
	$scope.contas=[];
	$scope.pgcontas=[];
	$scope.STORAGE_KEY=$scope.conta;
	$scope.STORAGEPGCONTA_KEY=$scope.pgcontas;
	$scope.valorTotal='';


//----------------------------------------------------------------------------------------------------
	$scope.addContas= function(){

		if(!$scope.conta.idEntrada){

				$scope.addListContas();
		        $scope.salveStorageContas();
				$scope.reset();
				$scope.load();
			}else{
				$scope.salveStorageContas();
				$scope.reset();
				$scope.load();

			}
    };



$scope.addContasPg= function(){

		if(!$scope.pgconta.idConta){

				$scope.addListContas();
		        salveStorageContas();
				$scope.reset();
				$scope.load();
			}else{
				salveStorageContas();
				$scope.reset();
				$scope.load();

			}
    };
	

//-----------------------------------------------------------------------------------------------------------------

	$scope.reset= function(){
		$scope.conta.descricao='',
		$scope.conta.vencimento='',
		$scope.conta.valor=''
		$scope.conta.idEntrada=''
	};


//-----------------------------------------------------------------------------------------------------------------------
	$scope.editarConta= function(contaAseralterada){
			
		$scope.setentradas();
		$scope.conta=contaAseralterada;
		$scope.index = $scope.contas.indexOf(contaAseralterada);
		$scope.contas[index] = $scope.conta;
	};

	$scope.editarContapg= function(contaAseralterada){
			
		$scope.setentradas();
		$scope.conta=contaAseralterada;
		$scope.index = $scope.contas.indexOf(contaAseralterada);
		$scope.contas[index] = $scope.conta;
	};





//-------------------------------------------------------------------------------------------------------	
	$scope.pagarConta=function(contaApg) {

		$scope.setpagar();
		$scope.pgconta=contaApg;
		

		//$scope.pgconta.valor=$scope.pgconta.multa+$scope.pgconta.valor;
		

    };


    $scope.calcularTotal=function() {
     
		
		 $socpe.valtemp='';
		 $socpe.valtempMulta='';
		 $socpe.valtemp=$scope.pgconta.valor;
		 $socpe.valtempMulta=$scope.pgconta.Multa;
		 $scope.pgconta.valor='';
         $scope.pgconta.valor=$socpe.valtempMulta+$socpe.valtemp;
         





    };







//-------------------------------------------------------------------------------------------------------------------
	$scope.addListContas= function() {

		$scope.contas.push({
		idEntrada:$scope.generateId(), 
		descricao:$scope.conta.descricao,
		vencimento:$scope.conta.vencimento,
		valor:$scope.conta.valor
					
		});
	};



		$scope.addListContasPg= function() {
		$scope.contaspg.push({
		idConta:$scope.generateId,	
		descricaocpg:$scope.pgconta.descricaocpg,
		datalancamento:$scope.pgconta.datalancamento,
		datavencimento:$scope.pgconta.datavencimento,
		multa:$scope.pgconta.multa,
		jurosaodia:$scope.pgconta.jurosaodia,
		valorConta:$scope.pgconta.valorConta
					
		});
	};



    $scope.salveStorageContas = function() {
		localStorage.setItem($scope.STORAGE_KEY, JSON.stringify($scope.contas));
		
		
	};


	 $scope.salveStorageContasPg = function() {
		localStorage.setItem($scope.STORAGEPGCONTA_KEY, JSON.stringify($scope.pgcontas));
		
		
	};



//--------------------------------------------------------------------------------------------------------------------	
    $scope.load=function() {
		var ContasStr = localStorage.getItem($scope.STORAGE_KEY);
		$scope.contas = JSON.parse(ContasStr);
		if($scope.contas) {
			return true;
		}
		$scope.contas = [];
		return false;
    };

	//--------------------------------------------------------------------------------------------------------------------	


	$scope.update= function(conta) {
		var index = $scope.contas.indexOf(conta);
					
		if(index > -1) {
			$scope.contas[index] = $scope.conta;
			return true;
		}
		return false;
	};
//---------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------

	$scope.removeConta=function(conta) {
		alert("exclui:"+conta.descricao);
		var index = $scope.contas.indexOf(conta);
		
		if(index > -1) {
			$scope.contas.splice(index,1);
			return true;
		}
		
		return false;
	};






//---------------------------------------------Gerar id--------------------------------------------------------------------------
	$scope.generateId= function() {
		var id = (new Date()).getTime();
		return id;
	};

	//--------------------------------------Set ----------------------------------------------------------------------------			
	$scope.setentradas = function() {
			
		$scope.relatorios =  false;
		$scope.entradas =  true;
		 $scope.pagar =  false;
	};
//--------------------------------------------------------------------------------------------------------------------		

	$scope.setpagar= function() {
		$scope.relatorios =  false;
		$scope.entradas =  false;
		$scope.pagar =  true;
	};
//------------------------------------------------------------------------------------------------------------------------

	$scope.setrelatorio= function() {
		$scope.relatorios =  true;
		$scope.entradas =  false;
		$scope.pagar =  false;
	};

	

	

});
