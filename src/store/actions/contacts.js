function loadContacts() {
  return dispatch => fetch('http://localhost:3001/contacts')
    .then(resp => resp.json())
    .then((json) => {
      dispatch({ type: 'ON_LOAD_CONTACTS', payload: json });
    })
    .catch(error => console.error(error));
}

function addContact(contact) {
  contact.id = Date.now();
  return dispatch => fetch('http://localhost:3001/contacts', {
    method: 'POST',
    body: JSON.stringify(contact),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
    .then((resp) => {
      dispatch({ type: 'ON_ADD_CONTACT', payload: contact });
    })
    .catch(error => console.error(error));
}

function deleteContact(id) {
  return dispatch => fetch(`http://localhost:3001/contacts/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      dispatch({ type: 'ON_DELETE_CONTACT', payload: id });
    })
    .catch(error => console.error(error));
}

function editContact(contact) {
  return dispatch => fetch(`http://localhost:3001/contacts/${contact.id}`, {
    method: 'PUT',
    body: JSON.stringify(contact),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
    .then((resp) => {
      dispatch({ type: 'ON_EDIT_CONTACT', payload: contact });
    })
    .catch(error => console.error(error));
}


export { loadContacts, addContact, deleteContact, editContact };
