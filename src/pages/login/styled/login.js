import styled, { css } from 'styled-components';
import { Form, Input as Inp, Button as Btn, Label as Lab } from 'reactstrap';

export const LoginForm = styled(Form)`
margin-top: 20px;
  width: 500px;
  min-height: 370px;
  background-color: white;
  padding: 40px 30px 30px 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  .warning-panel {
    color: #CF2C00;
    font-size: 18px;
    font-weight: 300;
    padding: 13px 10px 13px 10px;
    margin-top: 20px; 
    width: auto;
    border: none;
    height: 70px;
    background: rgba(207, 44, 0, 0.1);
    &-msg {
      margin-left: 35px;
      font-size: 12px;
      font-weight: 300;
      color: #CF2C00;
    }
  };
  .form-group {
    margin-top: 20px;
    margin-bottom: 0px;
  };
  .caption {
    float: right;
    color: #999999;
    font-size: 12px;
  }
`;

export const LoginContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const Label = styled(Lab)`
  ${props => (props.warn && css`
    color: #ff3f5e;
  `)};
  float: left;
  margin-bottom: 5px;
  font-weight: 300;
  font-size: 16px;
`;

export const Input = styled(Inp)`
  ${props => (props.warn && css`
    border-color: #ff3f5e;
  `)};
  transition: border-color .15s ease-in-out;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  outline: 0;
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: none;
  }
`;

export const Title = styled.h3`
  text-align: center;
  font-weight: 300;
  font-size: 24px;
`;

export const Button = styled(Btn)`
  ${props => (props.active ? css`
    background: linear-gradient(0deg, #C4C4C4, #C4C4C4), linear-gradient(180deg, #45A6FF 0%, #0055FB 100%);  
  ` : css`
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
    linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
  `)};
  border-radius: 5px;
  height: 40px;
  width: 110px;
  border: none;
  outline: none;
  .btn-primary:hover{
  border: 0px;
  }
  &:hover {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.15), 
                rgba(255, 255, 255, 0.15)), 
                linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
  }
`;
