import { Alert, Button, Col, Input, Modal, ModalBody, ModalFooter, Row } from 'reactstrap';
import NumberFormat from 'react-number-format';
import React from 'react';

const colors = {
  blue: '#72B9FF',
  darkBlue: '#008CFF',
  green: '#3DC482',
  gray: '#8A8A8A',
  white: '#ffffff',
  black: '#000000',
  red: '#d73038',
};

// eslint-disable-next-line max-len
export const EMAIL_REG_EX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


class ContactForm extends React.Component {
  state = {
    error: {
      errorMessage: '',
      name: false,
      nick: false,
      email: false,
      phone: false,
      avatar: false,
    },
  };

  componentDidMount() {
    const { contact } = this.props;
    if (contact) {
      this.setState(prev => ({ ...contact, error: prev.error }));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { state } = this;
    const { error } = state;
    const editError = { ...error };
    delete editError.errorMessage;
    const errorNames = Object.keys(editError);
    errorNames.forEach((name) => {
      if (!state[name]) {
        editError[name] = true;
      } else {
        editError[name] = false;
      }
    });

    if (!Object.keys(editError).every(k => !editError[k])) {
      editError.errorMessage = 'Please fill all fields';
      this.setState({ error: editError });
      return null;
    }
    delete state.error;
    if (this.props.contact) {
      this.props.editContact(state);
    } else {
      this.props.addContact(state);
    }
    this.props.toggle();
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onChangeEmail = ({ target }) => {
    const { name, value } = target;
    const { error } = this.state;
    if (!EMAIL_REG_EX.test(value)) {
      error[name] = true;
    } else {
      error[name] = false;
    }
    this.setState({ [name]: value, error });
  }

  render() {
    const { name = '', email = '', nick = '', phone = '', avatar, error } = this.state;
    const { active, toggle, contact } = this.props;
    const { errorMessage } = error;
    return (
      <Modal isOpen={active} toggle={toggle} size="lg">
        <form onSubmit={this.handleSubmit}>
          <ModalBody className="p-5">
            <Row className="mb-3">
              <Col className="p-0" style={{
                flex: 0, flexBasis: '130px', alignSelf: 'center', fontSize: 14,
              }}
              >
                Name
              </Col>
              <Col style={{ flex: 1 }}>
                <Input
                  name="name"
                  className="form-control-sm"
                  value={name}
                  style={{ borderColor: error.name ? colors.red : colors.blue }}
                  type="text"
                  placeholder="Name"
                  onChange={this.onChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="p-0" style={{
                flex: 0, flexBasis: '130px', alignSelf: 'center', fontSize: 14,
              }}
              >
                Nick
              </Col>
              <Col style={{ flex: 1 }}>
                <Input
                  name="nick"
                  className="form-control-sm"
                  value={nick}
                  style={{ borderColor: error.nick ? colors.red : colors.blue }}
                  type="text"
                  placeholder="Nickname"
                  onChange={this.onChange}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col className="p-0" style={{
                flex: 0, flexBasis: '130px', alignSelf: 'center', fontSize: '14px',
              }}
              >
                email
              </Col>
              <Col style={{ flex: 1 }}>
                <Input
                  name="email"
                  value={email}
                  type="text"
                  placeholder="email"
                  className="form-control-sm"
                  style={{ borderColor: error.email ? colors.red : colors.blue }}
                  onChange={this.onChangeEmail}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="p-0" style={{
                flex: 0, alignSelf: 'center', flexBasis: '130px', fontSize: 14,
              }}
              >
                Phone
              </Col>
              <Col>
                <NumberFormat
                  style={{ borderColor: error.phone ? colors.red : colors.blue }}
                  className="form-control-sm form-control"
                  placeholder="Phone number"
                  onChange={this.onChange}
                  value={phone}
                  name="phone"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="p-0" style={{
                flex: 0, flexBasis: '130px', alignSelf: 'center', fontSize: '14px',
              }}
              >
                Avatar
              </Col>
              <Col style={{ flex: 1 }}>
                <Input
                  type="text"
                  name="avatar"
                  value={avatar}
                  placeholder="http://external-link..."
                  className="form-control-sm"
                  style={{ borderColor: error.avatar ? colors.red : colors.blue }}
                  onChange={this.onChange}
                />
              </Col>
            </Row>
            {errorMessage && (
              <Alert style={{ height: '50px' }} color="danger">
                {errorMessage}
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              className="btn-round"
              onClick={() => {
                toggle();
              }}
            >
              Close
            </Button>
            <Button type="submit" className="btn-round" color="info">
              {(contact && 'Save') || 'Create' }
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default ContactForm;
