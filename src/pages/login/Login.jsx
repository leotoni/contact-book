import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormGroup, Alert } from 'reactstrap';
import { Logo } from 'src/components/logo/logo';
import { SmileIcon } from 'src/components/icons/smile';
import { bindActionCreators } from 'redux';
import { LoginForm, LoginContainer, Input, Title, Button, Label } from './styled/login';
import * as userActions from '../../store/actions/user';

class Login extends React.Component {
  state = {
    login: {
      value: '',
      warn: false,
    },
    password: {
      value: '',
      warn: false,
    },
    errorMsg: '',
  }

  handleChange = (name, e) => {
    this.setState({ [name]: { value: e.target.value, warn: false }, error: '' });
  }

  handleSubmit = (event) => {
    const { login, password } = this.state;
    event.preventDefault();
    if (this.isValidForm()) {
      const { actions, history } = this.props;
      if (login.value === 'admin' && password.value === 'admin') {
        // имитация авторизации
        actions.log()
          .then(() => history.push('/dashboard/contact-list'))
          .catch(error => console.error(error));
      }
    }
  }

  isWarning = name => (this.state[name].warn ? 'error' : '');

  isDisabledButton = () => {
    const { login, password } = this.state;
    return (!login.value || !password.value);
  }

  isValidForm = () => {
    let valid = true;
    const { login, password } = this.state;

    if (!login.value?.length) {
      this.setState({ login: { warn: true } });
      valid = false;
    }
    if (!password.value?.length) {
      this.setState({ password: { warn: true } });
      valid = false;
    }
    return valid;
  }

  isValidPass = (value) => {
    let passChecks = 0;
    passChecks += /[a-z]/.test(value) ? 1 : 0;
    passChecks += /[A-Z]/.test(value) ? 1 : 0;
    passChecks += /\d/.test(value) ? 1 : 0;
    passChecks += /[^\w\d\s]/.test(value) ? 1 : 0;
    return passChecks > 2;
  };

  render() {
    const {
      login,
      password,
      errorMsg = '',
    } = this.state;
    return (
      <LoginContainer>
        <Logo />
        <LoginForm>
          <Title>Login Form</Title>
          {errorMsg && (
            <Alert className="warn-panel">
              <SmileIcon />
              <p className="warn-panel-msg">{JSON.stringify(errorMsg)}</p>
            </Alert>
          )}
          <FormGroup>
            <Label warn={this.isWarning('login')}>
              Логин
            </Label>
            <Input
              autoFocus
              type="login"
              maxLength="32"
              value={login.value}
              warn={this.isWarning('login')}
              onChange={e => this.handleChange('login', e)}
            />
          </FormGroup>
          <FormGroup>
            <Label warn={this.isWarning('password')}>Пароль</Label>
            <Input
              value={password.value}
              warn={this.isWarning('password')}
              maxLength="32"
              onChange={e => this.handleChange('password', e)}
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Button
              type="submit"
              color="primary"
              active={this.isDisabledButton()}
              onClick={e => this.handleSubmit(e)}
            >
               Войти
            </Button>
          </FormGroup>
        </LoginForm>
      </LoginContainer>
    );
  }
}

export default withRouter(connect(
  state => ({ store: state }),
  dispatch => ({ actions: bindActionCreators({ ...userActions }, dispatch) }),
)(Login));
