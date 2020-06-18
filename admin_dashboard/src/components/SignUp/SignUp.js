import React, { useState, useEffect } from 'react';
import { Form, Row } from 'antd';
import FormWrapper from '../Styles/FormWrapper';
import { FirstName, LastName, Password, ConfirmPassword, FormButton } from '../Antd/Form';

export default function SignUp(props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = formProps => {
    setLoading(true)
    props.handleRegistration(formProps)
  }

  useEffect(() => {
    if (props.error) setLoading(false)
  }, [props.error])

  return (
    <FormWrapper onFinish={handleSubmit}>
      <FirstName />
      <LastName />
      <Password validatePassword={props.validatePassword} />
      <ConfirmPassword />
      <Form.Item className="text-center">
        <Row>
          <FormButton loading={loading} name="Register" />
        </Row>
      </Form.Item>
    </FormWrapper>
  )
}

