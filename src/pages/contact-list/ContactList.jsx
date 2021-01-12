import { Button, Table } from 'reactstrap';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactForm from './ContactForm';
import * as ContactsActions from '../../store/actions/contacts';

class ContactList extends React.Component {
  state = {
    contact: null,
    showModalForm: false,
  };

  componentDidMount() {
    const { actions: { loadContacts } } = this.props;
    loadContacts();
  }

  addContact = (newContact) => {
    const { actions: { addContact } } = this.props;
    addContact(newContact);
  };

  deleteContact = (id) => {
    const { actions: { deleteContact } } = this.props;
    deleteContact(id);
  };

  editContact = (contact) => {
    const { editContact } = this.props.actions;
    editContact(contact);
  };

  modalEdit = (contact) => {
    this.setState({ contact });
    this.toggleModalForm();
  }

  modalAdd = () => {
    this.setState({ contact: null });
    this.toggleModalForm();
  }

  toggleModalForm = () => {
    this.setState(prevState => ({ showModalForm: !prevState.showModalForm }));
  };

  render() {
    const { showModalForm, contact } = this.state;
    const { store: { contacts }, history } = this.props;
    return (
      <div className="bg-white ">
        <Button onClick={this.modalAdd} className="btn-round float-right mr-5 mt-3 mb-2" color="info">
          Add New
        </Button>
        <div className="p-5">
          <Table className="" style={{ maxWidth: '100%' }}>
            <thead>
              <tr style={{ fontSize: '14px', fontWeight: '400' }}>
                <th>#</th>
                <th>Avatar</th>
                <th>Nick</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.sort((a, b) => a.id - b.id).map((e, i) => (
                <tr key={e.id}>
                  <th scope="row">{i}</th>
                  <td onClick={() => history.push(`/dashboard/contact/${e.id}`)}>
                    <img
                      src={e.avatar}
                      width={30}
                      height={50}
                    />
                  </td>
                  <td>{e.nick}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td style={{ fontSize: '12px' }}>
                    <Button onClick={() => this.deleteContact(e.id)} className="rounded-sm mr-2 ml-auto" color="danger">
                      delete
                    </Button>
                    <Button onClick={() => this.modalEdit(e)} className="rounded-sm mr-2 ml-auto" color="warning">
                      edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {showModalForm && (
          <ContactForm
            contact={contact}
            active={showModalForm}
            toggle={this.toggleModalForm}
            addContact={this.addContact}
            editContact={this.editContact}
          />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({ store: state }),
  dispatch => ({ actions: bindActionCreators({ ...ContactsActions }, dispatch) }),
)(ContactList);
