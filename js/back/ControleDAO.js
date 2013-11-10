/**
 * JavaScript document
 */
var ControleDAO = {

	STORAGE_KEY: 'entradas',
	entradas: [], //similar as ArrayList on Java
	
	add: function(contact) {
		contact.id = ControleDAO.generateId();
		ControleDAO.entradas.push(contact);
		
		
	},
	
	generateId: function() {
		var id = (new Date()).getTime();
		return id;
	},
	
	get: function(contactId) {
	
	
		var contactIndex = ControleDAO.getContactIndex(contactId),
		    contact = null;
		
		if(contactIndex > -1) {
		contact = ControleDAO.entradas[contactIndex];
		
		}		
		Index.show;
		
		return contact;
	},
	
	
	getContactIndex: function(contactId) {
		var entradas = ControleDAO.entradas,
		    contact = null,
			contactIndex = entradas.length;
		
		while(contactIndex--) {
			contact = entradas[contactIndex];
			if(contact.id == contactId) {
		
				return contactIndex;
				
			}
		
		
		
		
		}
	
		return null;
	},
	
	
	
	
	
	load: function() {
		var controlesStr = localStorage.getItem(ControleDAO.STORAGE_KEY);
		/*ControleDAO.controles = JSON.parse(controlesStr);*/
		if(ControleDAO.controles) {
			return true;
		}
		ControleDAO.controles = [];
		return false;
	},
	
	getList: function() {
		return ControleDAO.entradas;
	},
	
	remove: function(contactId) {
		var entradas = ControleDAO.entradas,
			contactIndex = ControleDAO.getContactIndex(contactId);
		
		if(contactIndex > -1) {
			entradas.splice(contactIndex,1);
			return true;
		}
		
		return false;
	},
	
	save: function() {
		var entradas = ControleDAO.entradas;
		// for understand JSON go to www.json.org
		localStorage.setItem(ControleDAO.STORAGE_KEY, JSON.stringify(entradas));
	},
	
	update: function(contact) {
		var contactIndex = ControleDAO.getContactIndex(contact.id);
		if(contactIndex > -1) {
			ControleDAO.entradas[contactIndex] = contact;
			return true;
		}
		return false;
	}
	
	
};
