/**
 * JavaScript document
 */
var ContactDAO = {

	STORAGE_KEY: 'contacts',
	contacts: [], //similar as ArrayList on Java
	
	add: function(contact) {
		contact.id = ContactDAO.generateId();
		ContactDAO.contacts.push(contact);
	},
	
	generateId: function() {
		var id = (new Date()).getTime();
		return id;
	},
	
	get: function(contactId) {
		var contactIndex = ContactDAO.getContactIndex(contactId),
		    contact = null;
		
		if(contactIndex > -1) {
			contact = ContactDAO.contacts[contactIndex];
		}		
		
		return contact;
	},
	
	
	getContactIndex: function(contactId) {
		var contacts = ContactDAO.contacts,
		    contact = null,
			contactIndex = contacts.length;
		
		while(contactIndex--) {
			contact = contacts[contactIndex];
			if(contact.id == contactId) {
				return contactIndex;
			}
		}
		
		return null;
	},
	
	load: function() {
		var contactsStr = localStorage.getItem(ContactDAO.STORAGE_KEY);
		ContactDAO.contacts = JSON.parse(contactsStr);
		if(ContactDAO.contacts) {
			return true;
		}
		ContactDAO.contacts = [];
		return false;
	},
	
	getList: function() {
		return ContactDAO.contacts;
	},
	
	remove: function(contactId) {
		var contacts = ContactDAO.contacts,
			contactIndex = ContactDAO.getContactIndex(contactId);
		
		if(contactIndex > -1) {
			contacts.splice(contactIndex,1);
			return true;
		}
		
		return false;
	},
	
	save: function() {
		var contacts = ContactDAO.contacts;
		// for understand JSON go to www.json.org
		localStorage.setItem(ContactDAO.STORAGE_KEY, JSON.stringify(contacts));
	},
	
	update: function(contact) {
		var contactIndex = ContactDAO.getContactIndex(contact.id);
		if(contactIndex > -1) {
			ContactDAO.contacts[contactIndex] = contact;
			return true;
		}
		return false;
	}
	
};
