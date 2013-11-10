/*
*java script document
*
*/

var Index={

ENTRADAS:'entradas',
CONTAS:'contas',
total: parseFloat(0),
totalConta: parseFloat(0),
saldo: parseFloat(0),
totalContaPagas: parseFloat(0),
valoraSubtrair: parseFloat(0),
valoraSubtrairConta: parseFloat(0),


init: function(){
Index.setformEntradas();
Index.setformContas();
Index.setCalendar();
Index.setCalendarVencimento();
Index.setCalendarLancamento();
ControleDAO.load();
ContasDAO.load();
Index.showContacts();



},




setformEntradas: function(){

var formEntradas= document.getElementById(Index.ENTRADAS);
if(formEntradas){

formEntradas.salvarent.onclick = function(){

					
	var entradas = Index.getEntradasFromForm(formEntradas);
if(Index.validaFloat(entradas.valor)){
	Index.salveEntradas(entradas);
	
	formEntradas.reset();
    formEntradas.id.value = "";
	Index.changeText(entradas);
	var saldo=entradas.valor;
	Index.changesomaSaldo(saldo);
	
	}
	return false;
	    };
	}
},





setformContas: function(){

var formContas= document.getElementById(Index.CONTAS);
if(formContas){

formContas.salvarContas.onclick = function(){
	var contas = Index.getContasFromForm(formContas);
if(Index.validaFloat(contas.valorConta)){
	Index.salveContas(contas);
	Index.changeConta (contas);
	formContas.reset();
	
	
	
	}
	return false;
	

	    };
	}
},






validaFloat: function(numero){
if (!/^([0-9])*[.]?[0-9]*$/.test(numero) || numero=="" ){
alert("Esse valor " + numero + " não é um número!");
return false;
}

return true;
},






getEntradasFromForm: function(formEntradas){
var entradas={};
entradas.id=formEntradas.id.value;
entradas.descricao=formEntradas.descricao.value;
entradas.data=formEntradas.data.value;
entradas.valor=formEntradas.valor.value;
return entradas;
},

getContasFromForm: function(formContas){
var contas={};
contas.idConta=formContas.idConta.value;
contas.descricaoc=formContas.descricaoc.value;
contas.datalancamento=formContas.datalancamento.value;
contas.datavencimento=formContas.datavencimento.value;
contas.multaa=formContas.multa.value;
contas.jurosaodia=formContas.jurosaodia.value;
contas.valorConta=formContas.valorConta.value;
return contas;
},





salveEntradas: function(entradas){
if(entradas.id == "") {

ControleDAO.add(entradas);
Table.addNewRow(entradas);
}
else
{
ControleDAO.update(entradas);
			Table.reset();
			
					
					Index.chageSubraiTotalEntrada(Index.valoraSubtrair);
					Index.changesubtraiSaldo(Index.valoraSubtrair);
						
			Index.showContacts();
}



},

salveContas: function(contas){

if(contas.idConta==""){
ContasDAO.add(contas);
TableContas.addNewRowContas(contas);
}else
{
ContasDAO.update(contas);
			TableContas.reset();
			
			Index.chageSubraiTotalContas(Index.valoraSubtrairConta);
			Index.changesubtraiContasPagas(Index.valoraSubtrairConta);
		    Index.showContactsContas();
}
},

setCalendar: function() {
		Calendar.setup({
			inputField : "data",
			button     : "img-calendar",
			ifFormat   : "%d/%m/%Y"
		});
	},
	
	setCalendarVencimento: function() {
		Calendar.setup({
			inputField : "datavencimento",
			button     : "img-calendar2",
			ifFormat   : "%d/%m/%Y"
		});
	},
	
	setCalendarLancamento: function() {
		Calendar.setup({
			inputField : "datalancamento",
			button     : "img-calendar3",
			ifFormat   : "%d/%m/%Y"
		});
	},

setInputFocus: function() {
		var input = document.getElementById('name');
		if(input) {
			input.focus();
		}
	},







changeText :function (entrada){
Index.total += parseFloat(entrada.valor) ; 
document.getElementById('totalEntrada').innerHTML =Index.total;
},
chageSubraiTotalEntrada:function(valor){
Index.total -= parseFloat(valor)
document.getElementById('totalEntrada').innerHTML =Index.total;
},



changeConta :function (contas){
Index.totalConta += parseFloat(contas.valorConta) ;
document.getElementById('totalConta').innerHTML =Index.totalConta;
},
chageSubraiTotalContas:function(valor){
Index.totalConta -= parseFloat(valor)
document.getElementById('totalConta').innerHTML =Index.totalConta;
},

changesomaSaldo :function (saldo){
Index.saldo += parseFloat(saldo) ; 
document.getElementById('saldo').innerHTML =Index.saldo;
},
changesubtraisaldo :function (saldo){
Index.saldo -= parseFloat(saldo) ; 
document.getElementById('saldo').innerHTML =Index.saldo;
},


chageSomaTotalContasPagas:function(valor){
Index.totalContaPagas += parseFloat(valor);
document.getElementById('totalContapaga').innerHTML =Index.totalContaPagas;
},
changesubtraiContasPagas :function (saldo){
Index.saldo -= parseFloat(saldo) ; 
document.getElementById('totalContapaga').innerHTML =Index.totalContaPagas;
},




showContacts: function() {
		var entradas = ControleDAO.getList(),
		    controle = null;
		if(entradas) {
			for(var i=0, leng = entradas.length; i<leng; i++) {
				controle = entradas[i];
				Table.addNewRow(controle);
				
				
			}
			document.getElementById("id").value="";
		}		
	},
	showContactsContas: function() {
		var contas = ContasDAO.getList(),
		    cont = null;
		if(contas) {
			for(var i=0, leng = contas.length; i<leng; i++) {
				cont = contas[i];
				TableContas.addNewRowContas(cont);
				
				
			}
			document.getElementById("idConta").value="";
		}		
	}

};

Index.init();
window.onunload = function() {
	ControleDAO.save();
};