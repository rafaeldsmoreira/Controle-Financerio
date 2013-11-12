/**
 * JavaScript document
 */
var ContasDAO = {

	STORAGE_KEY: 'contas',
	contas: [], //similar as ArrayList on Java
	
	add: function(conta) {
		conta.idConta = ContasDAO.generateId();
		ContasDAO.contas.push(conta);
		
		
	},
	
	generateId: function() {
		var id = (new Date()).getTime();
		return id;
	},
	
	get: function(contaId) {
	
	
		var contaIndex = ContasDAO.getcontaIndex(contaId),
		    conta = null;
		
		if(contaIndex > -1) {
		conta = ContasDAO.contas[contaIndex];
		
		}		
		Index.show;
		
		return conta;
	},
	
	
	getcontaIndex: function(contaId) {
		var contas = ContasDAO.contas,
		    conta = null,
			contaIndex = contas.length;
		
		while(contaIndex--) {
			conta = contas[contaIndex];
			if(conta.idConta == contaId) {
		
				return contaIndex;
				
			}
		
		
		
		
		}
	
		return null;
	},
	
	
	
	
	
	load: function() {
		var ContasStr = localStorage.getItem(ContasDAO.STORAGE_KEY);
		ContasDAO.Contas = JSON.parse(ContasStr);
		if(ContasDAO.Contas) {
			return true;
		}
		ContasDAO.Contas = [];
		return false;
	},
	
	getList: function() {
		return ContasDAO.contas;
	},
	
	remove: function(contaId) {
		var contas = ContasDAO.contas,
			contaIndex = ContasDAO.getcontaIndex(contaId);
		
		if(contaIndex > -1) {
			contas.splice(contaIndex,1);
			return true;
		}
		
		return false;
	},
	
	save: function() {
		var contas = ContasDAO.contas;
		// for understand JSON go to www.json.org
		localStorage.setItem(ContasDAO.STORAGE_KEY, JSON.stringify(contas));
	},
	
	update: function(conta) {
		var contaIndex = ContasDAO.getcontaIndex(conta.idConta);
		if(contaIndex > -1) {
			ContasDAO.contas[contaIndex] = conta;
			return true;
		}
		return false;
	}
	
	
};
