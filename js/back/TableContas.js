var TableContas = {

ID:'tableContas',

	addNewRowContas: function(contas) {
		var table = document.getElementById('tableContas'),
		    tbody = table.tBodies[0] || document.createElement('tbody'),
				trow = document.createElement('tr'),
				tddescricao= document.createElement('td'),
				tdDataLancamento = tddescricao.cloneNode(false),
				tdDataVencimento = tddescricao.cloneNode(false),
				tdMulta = tddescricao.cloneNode(false),
				tdJurosaodia = tddescricao.cloneNode(false),
				tdValor = tddescricao.cloneNode(false),
				tdActions = tddescricao.cloneNode(false);
		

	            tddescricao.innerHTML= contas.descricaoc;
				tdDataLancamento.innerHTML = contas.datalancamento;
				tdDataVencimento.innerHTML = contas.datavencimento;
				tdMulta.innerHTML = contas.multaa;
				tdJurosaodia.innerHTML = contas.jurosaodia;
				tdValor.innerHTML = contas.valorConta;
				tdActions.className = "actions";
				TableContas.createAction(tdActions,contas);
				
				trow.appendChild(tdActions);
				trow.appendChild(tddescricao);
				trow.appendChild(tdDataLancamento);
				trow.appendChild(tdDataVencimento);
				trow.appendChild(tdMulta);
				trow.appendChild(tdJurosaodia);
				trow.appendChild(tdValor);
				trow.appendChild(tdActions);
	
		
		tbody.appendChild(trow);
		table.appendChild(tbody);
	},
	
	reset: function() {
		var tableContas = document.getElementById(TableContas.ID),
		    tbody = tableContas.tBodies[0];
		tableContas.removeChild(tbody);
	},
	
	createAction: function(tdAction, contas) {
		var imageDelete = new Image(),
		    imageEdit = new Image(),
			imgaePay = new Image();
		
		imageDelete.src = 'images/delete2.png';
		imageDelete.alt = contas.idConta;
		
		imageEdit.src = 'images/edit2.png';
		imageEdit.alt = contas.idConta;
		
		imgaePay.src = 'images/pay2.gif';
		imgaePay.alt = contas.idConta;
		
		
		TableContas.setEditAction(imageEdit);
		TableContas.setDeleteAction(imageDelete);
		TableContas.setPayAction(imgaePay);
		
		tdAction.appendChild(imageEdit);
		tdAction.appendChild(imageDelete);
		tdAction.appendChild(imgaePay);
	},
	
	setDeleteAction: function(imageDelete) {
		imageDelete.onclick = function() {
			if(confirm("Deseja excluir essa conta?")) {
				var contasId = this.alt,
					tr = this.parentNode.parentNode,
					tbody = tr.parentNode,
					contas = ContasDAO.get(contasId),
			        input = null,
					property = null;
					ContasDAO.remove(contasId);
					Index.chageSubraiTotalContas(contas.valorConta);
					Index.changesubtraiContasPagas(contas.valorConta);
					
				for(property in contas) {
				document.getElementById("idConta").value=contas.idConta;
					input = document.getElementById(property);
					if(input && input.nodeName == 'INPUT') {
						input.value = contas[property];
						
						
								
					}
				}
				tbody.removeChild(tr);
				
			}
		};
	},	setEditAction: function(imageEdit) {
		imageEdit.onclick = function() {
			if(confirm("Deseja alterar essa conta?")) {
			
				var contasId = this.alt,
				contas = ContasDAO.get(contasId),
			    input = null,
				property = null;
				
				Index.valoraSubtrairConta=contas.valorConta;
				
			    
				for(property in contas) {
			       document.getElementById("idConta").value=contas.idConta;
					input = document.getElementById(property);
					if(input && input.nodeName == 'INPUT') {
						input.value = contas[property];
						
					}
					
					
				}
				
				
				
			}
		};
	},
	
	
	setPayAction: function(imgaePay) {
		imgaePay.onclick = function() {
		
		
			if(confirm("Deseja efetuar o pagamento?")){
			
				var contasId = this.alt,
				contas = ContasDAO.get(contasId),
				input = null,
				property = null;
			
					
					Index.changesubtraisaldo(contas.valorConta);
                    Index.chageSomaTotalContasPagas(contas.valorConta);
					alert("Pagamento efetuado");
				
				
			}
		};
	}
	

	

	
}