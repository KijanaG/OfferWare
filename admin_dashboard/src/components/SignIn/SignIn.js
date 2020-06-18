import React, { useState, useEffect } from 'react';
import { Form, Col, Row } from 'antd';
import FormWrapper from '../Styles/FormWrapper';
import { EmailInput, PlainPassword, FormButton } from '../Antd/Form';
import './SignIn.css';

export default function SignIn(props) {
  const [loading, setLoading] = useState(false);
  const [unfinished, setUnfinished] = useState(false)

  const handleSubmit = formProps => {
    setLoading(true)
    props.handleSignIn(formProps)
  }

  useEffect(() => {
    if (localStorage.getItem('stripe'))
      setUnfinished(true)
  }, [])

  useEffect(() => {
    if (props.error) setLoading(false)
  }, [props.error])

  return (
    <FormWrapper onFinish={handleSubmit} style={{ textAlign: 'center' }}>
      {unfinished &&
        <h2 className="FinishStripe" style={{ color: 'rgb(66,145,247)', fontWeight: 'bold', backgroundColor: 'rgb(243,255,50)' }}>
          Please Login To Finish Stripe Connection
      </h2>
      }
      <EmailInput />
      <PlainPassword validatePassword={props.validatePassword} />
      <Form.Item className="text-center">
        <Row type="flex" gutter={16}>
          <Col lg={24}>
            <a style={{ float: 'right' }} onClick={props.forgotPass} className="login-form-forgot">
              Forgot password
            </a>
          </Col>
          <FormButton loading={loading} name="Log In" />
        </Row>
      </Form.Item>
    </FormWrapper>
  )
}


