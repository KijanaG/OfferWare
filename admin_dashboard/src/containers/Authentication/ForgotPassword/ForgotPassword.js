import React, { useState, useContext } from 'react';
import { Col } from 'antd';
import { AuthContext } from '../../../context/AuthProvider';
import FormWrapper from '../../../components/Styles/FormWrapper';
import { Password, ConfirmPassword, VerificationCode, FormButton, EmailInput } from '../../../components/Antd/Form';

export default function ForgotPassword(props) {
  const [loading, setLoading] = useState(false);
  const [resetPass, setResetPass] = useState(false);

  const { confirmEmail, changePass, setForgotPass, setLoggedIn } = useContext(AuthContext);

  const handleEmail = async value => {
    setLoading(true)
    if (await confirmEmail(value)) {
      setLoading(false)
      setResetPass(true)
    } else {
      setLoading(false)
    }
  }

  const handleReset = async values => {
    setLoading(true)
    if (await changePass(values)) {
      setForgotPass(false)
      setLoggedIn(true)
    } else {
      setLoading(false)
    }
  }

  if (!resetPass)
    return (<ConfirmEmailComponent handleEmail={handleEmail}
      loading={loading} setForgotPass={setForgotPass} />);
  else
    return (<ResetPassComponent handleReset={handleReset} loading={loading}
      setForgotPass={setForgotPass} validatePassword={props.validatePassword} />);
}

const ResetPassComponent = props => {
  return (
    <React.Fragment>
      <FormWrapper onFinish={props.handleReset}>
        <VerificationCode />
        <Password validatePassword={props.validatePassword} />
        <ConfirmPassword />
        <FormButton loading={props.loading} name="Reset Password" />
        <Col lg={24}> Or <a onClick={() => props.setForgotPass(false)}>Return to Login.</a> </Col>
      </FormWrapper>
    </React.Fragment>
  )
}

const ConfirmEmailComponent = props => {
  return (
    <React.Fragment>
      <FormWrapper onFinish={props.handleEmail}>
        <EmailInput />
        <FormButton loading={props.loading} name="Confirm Email" />
        <Col lg={24}> Or <a onClick={() => props.setForgotPass(false)}>Return to Login.</a> </Col>
      </FormWrapper>
    </React.Fragment>
  )
};
