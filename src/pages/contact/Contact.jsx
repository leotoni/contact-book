import React from 'react';
import { Button, Table } from 'reactstrap';
import { connect } from 'react-redux';
import Auth from 'src/servises/auth';
import { Contact, Avatar, Parametrs } from './styled/styled';

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactId: props.match.params.id,
      contact: '',
    };
  }

  componentDidMount() {
    const { contactId } = this.state;
    const { store: { contacts } } = this.props;
    let contact = null;

    if (contactId === '000') {
      contact = Auth.getUser();
    } else {
      contact = contacts.find(e => e.id === Number(contactId));
    }
    this.setState({ contact });
  }


  render() {
    const { contact = {} } = this.state;
    const { history } = this.props;
    return (
      <Contact>
        <Button
          onClick={() => history.push('/dashboard/contact-list')}
          className="btn-round float-right mr-5 mt-3 mb-2" color="info"
        >
          Back
        </Button>
        <Avatar>
          <img src={contact.avatar} width={130} height={200} />
        </Avatar>
        <Parametrs>
          <Table className="bg-white table-bordered rounded-lg">
            <thead>
              <tr style={{ fontSize: '14px', fontWeight: '400' }}>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nick</td>
                <td>{contact.nick}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{contact.name}</td>
              </tr>

              <tr>
                <td>Email</td>
                <td>{contact.email}</td>
              </tr>

              <tr>
                <td>Phone</td>
                <td>{contact.phone}</td>
              </tr>
            </tbody>
          </Table>
        </Parametrs>
      </Contact>
    );
  }
}

export default connect(
  state => ({ store: state }),
  null,
)(ContactPage);
