var Table = {
    
	ID:'tableEntrada',

	addNewRow: function(entradas) {
	var entrada=entradas;
	
	
		var table = document.getElementById('tableEntrada'),
		    tbody = table.tBodies[0] || document.createElement('tbody'),
				trow = document.createElement('tr'),
				tddescricaoo= document.createElement('td'),
				tddata = tddescricaoo.cloneNode(false),
				tdvalor = tddescricaoo.cloneNode(false),
				tdActions = tddescricaoo.cloneNode(false);
				
		tddescricaoo.innerHTML = entradas.descricao;
		tddata.innerHTML = entradas.data;
		tdActions.className = "actions";
		Table.createAction(tdActions, entradas);
		tdvalor.innerHTML = entradas.valor;
		
		
		trow.appendChild(tddescricaoo);
		trow.appendChild(tddata);
		trow.appendChild(tdvalor);
		trow.appendChild(tdActions);
		
		tbody.appendChild(trow);
		table.appendChild(tbody);
		
		
	},
	
	reset: function() {
		var table = document.getElementById(Table.ID),
		    tbody = table.tBodies[0];
		table.removeChild(tbody);
	},
	
	createAction: function(tdAction, entradas) {
		var imageDelete = new Image(),
		    imageEdit = new Image();
		
		imageDelete.src = 'images/delete.png';
		imageDelete.alt = entradas.id;
		
		imageEdit.src = 'images/edit.png';
		imageEdit.alt = entradas.id;
		
		Table.setEditAction(imageEdit);
		Table.setDeleteAction(imageDelete);
		
		tdAction.appendChild(imageEdit);
		tdAction.appendChild(imageDelete);
	},
	
	setDeleteAction: function(imageDelete) {
		imageDelete.onclick = function() {
			if(confirm("Deseja excluir essa entrada?")) {
				var entradasId = this.alt,
					tr = this.parentNode.parentNode,
					tbody = tr.parentNode,
					entradas = ControleDAO.get(entradasId);
				ControleDAO.remove(entradasId);
				Index.changesubtraiSaldo(entradas.valor);
				Index.chageSubraiTotalEntrada(entradas.valor);
				
				tbody.removeChild(tr);
			}
		};
	},
	
	setEditAction: function(imageEdit) {
		imageEdit.onclick = function() {
			if(confirm("Deseja alterar essa entrada?")) {
			
				var entradasId = this.alt,
				
				entradas = ControleDAO.get(entradasId),
			
				input = null,
				property = null;
				Index.valoraSubtrair=entradas.valor;
			document.getElementById("id").value=entradas.id;
				for(property in entradas) {
			      
					input = document.getElementById(property);
					if(input && input.nodeName == 'INPUT') {
						input.value = entradas[property];
						
					}
					
					
				}
				
				
				
			}
		};
	}
	
	

	
}