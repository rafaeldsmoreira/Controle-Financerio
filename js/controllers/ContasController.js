conversionApp.controller('ContasController', function($scope) {

	//initialization	
	$scope.relatorios = true;
	$scope.contas=[];
	$scope.contasApg=[];
	
	$scope.STORAGE_KEY=$scope.conta;
	$scope.STORAGEPGCONTA_KEY=$scope.pgconta;
	$scope.valorTotal='';
	$scope.flag='';
	$scope.ContaAsPgfalse




//----------------------------------------------------------------------------------------------------
	$scope.addContas= function(){

		if(!$scope.conta.idEntrada){

				$scope.addListContas();
		        $scope.salveStorageContas();
				$scope.reset();
				$scope.load();
				$scope.setrelPagarconta();
			}else{
				$scope.salveStorageContas();
				$scope.reset();
				$scope.load();
				$scope.setrelPagarconta();

			}
    };



$scope.addContasPg= function(){


				$scope.removeConta($scope.ContaAsPg);
				$scope.addListContasPg();
		        $scope.salveStorageContasPg();
		        $scope.setrelatorio();
			
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
		$scope.pgconta.datalancamento=$scope.dataAtual();
		$scope.ContaAsPg=contaApg;



			

    };
    $scope.pagarContafinalizar=function(contaApg) {

		$scope.removeConta($scope.indexConta);
		$scope.contas.splice($scope.indexConta,1);
		
	};



    $scope.calcularTotal=function() {
     
		
		 $scope.valtemp='';
		 $scope.valtempMulta='';
		 $scope.valtemp=parseFloat($scope.pgconta.valor);
		 $scope.valtempMulta=parseFloat($scope.pgconta.multa);
		 $scope.valtempJuros=parseFloat($scope.pgconta.jurosaodia);
 		if(!$scope.pgconta.multa){$scope.valtempMulta=0; }

		 if(!$scope.pgconta.jurosaodia){$scope.juros=0; 
		  	}else
		  	 $scope.juros=parseFloat(($scope.valtemp*$scope.valtempJuros/100));
		$scope.pgconta.valorApg='';
		$scope.pgconta.valorApg=($scope.valtempMulta+$scope.valtemp+$scope.juros);

       };

//-------------------------------------------------------------------------------------------------------------------
	$scope.addListContas= function() {

		$scope.contas.push({
		idEntrada:$scope.generateId(), 
		descricao:$scope.conta.descricao,
		vencimento:$scope.conta.vencimento,
		valor:$scope.conta.valor,
		status:'Np'
					
		});
	};



		$scope.addListContasPg= function() {
		
		
		$scope.contasApg.push({
		
		
		idConta:$scope.generateId(), 
		descricao:$scope.pgconta.descricao,
		lancamento:$scope.pgconta.datalancamento,
		vencimento:$scope.pgconta.vencimento,
		multa:$scope.pgconta.multa,
		jurosaodia:$scope.pgconta.jurosaodia,
		valor:$scope.pgconta.valor,
		valorApg:$scope.pgconta.valorApg,
		status:'Pg'
		
						
		});
	};

//--------------------------------------------------------------------------------------------------

    $scope.salveStorageContas = function() {
		localStorage.setItem("Contas", JSON.stringify($scope.contas));
		
};

    $scope.salveStorageContasPg = function() {
		localStorage.setItem("ContasPg", JSON.stringify($scope.contasApg));
		
};






//--------------------------------------------------------------------------------------------------------------------	
    $scope.load=function() {
		var ContasStr = localStorage.getItem("Contas");

		
		$scope.contas = JSON.parse(ContasStr);
		$scope.loadPg();
		
		if($scope.contas) {
			return true;
		}
		$scope.contas = [];
		return false;
    };

    $scope.loadPg=function() {
		var ContasStrpg = localStorage.getItem("ContasPg");
		
		
		$scope.contasApg = JSON.parse(ContasStrpg);
		
		if($scope.contasApg) {
			return true;
		}
		$scope.contasApg = [];
		return false;
    };

      




//---------------------------------------------------------------------------------------------------------

	$scope.removeConta=function(conta) {
		
		
		var index = $scope.contas.indexOf(conta);

			
		if(index > -1) {
			$scope.contas.splice(index,1);
			localStorage.removeItem("Contas");
			$scope.salveStorageContas();
			return true;
			
		}


			
		
		return false;

		
	};




	$scope.estornarContaPg=function(conta) {
		
		
		var index = $scope.contasApg.indexOf(conta);
		$scope.conta=conta;
		$scope.addContas();
			
		if(index > -1) {
			$scope.contasApg.splice(index,1);
			localStorage.removeItem("ContasPg");
			$scope.salveStorageContasPg();
			return true;
			
		}


			
		
		return false;

		
	};



	$scope.dataAtual=function(){



		hoje = new Date()
dia = hoje.getDate()
mes = hoje.getMonth()
ano = hoje.getFullYear()
if (dia < 10)
dia = "0" + dia
if (ano < 2000)
ano = "19" + ano

//O mes começa em Zero, então soma-se 1
return(dia+"/"+(mes+1)+"/"+ano)
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
		 $scope.relatoriospagas=false;
		 $scope.contasPg=false;
	};
//--------------------------------------------------------------------------------------------------------------------		

	$scope.setpagar= function() {
		$scope.relatorios =  false;
		$scope.entradas =  false;
		$scope.pagar =  true;
		$scope.contasPg=false;
		$scope.relContasApagar=false;
		
	};


	$scope.setrelPagarconta= function() {
		$scope.relContasApagar=true;
		$scope.relatorios =  false;
		$scope.entradas =  false;
		$scope.pagar =  false;
		$scope.contasPg=false;
		
	};
//------------------------------------------------------------------------------------------------------------------------

	$scope.setrelatorio= function() {
		$scope.relatorios =  true;
		$scope.entradas =  false;
		$scope.pagar =  false;
		$scope.contasPg=false;
		$scope.relContasApagar=false;

	};

	
	$scope.setContasPagas= function() {
		$scope.relatorios =  false;
		$scope.entradas =  false;
		$scope.pagar =  false;
		$scope.contasPg=true;
		$scope.relContasApagar=false;
	};

	

});
