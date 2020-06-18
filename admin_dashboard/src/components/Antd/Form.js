import React from 'react';
import { Form, Input, Button, Popover, Spin, Col, Select } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined, AimOutlined, CompassOutlined } from '@ant-design/icons';
import PassPolicy from '../SignIn/PasswordPolicy';
const { TextArea } = Input;
export const Password = (props) => {
  return (
    <Popover placement="right" title={"Password Policy"} content={<PassPolicy />} trigger="focus">
      <Form.Item name="password" hasFeedback rules={[{ required: true, message: 'Please input your password.' },
      { validator: props.validatePassword }]}>
        <Input.Password name="password" size="large" prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="New Password" type="password" />
      </Form.Item>
    </Popover>
  )
}

export const PlainPassword = (props) => {
  return (
    <Form.Item name="password" hasFeedback rules={[{ required: true, message: 'Please input your password.' },
    { validator: props.validatePassword }]}>
      <Input.Password name="password" size="large" prefix={<LockOutlined className="site-form-item-icon" />}
        placeholder="Password" />
    </Form.Item>
  )
}

export const ConfirmPassword = () => {
  return (
    <Form.Item name="confirmPassword" hasFeedback dependencies={['password']}
      rules={[{ required: true, message: 'Please confirm your password.' },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue('password') === value)
            return Promise.resolve();
          return Promise.reject('The passwords must match.')
        }
      })
      ]}
    >
      <Input.Password name="confirmPassword" size="large" prefix={<LockOutlined className="site-form-item-icon" />}
        placeholder="Confirm Password" type="password" />
    </Form.Item>
  )
}

export const EmailInput = () => {
  return (
    <Form.Item name="email" hasFeedback rules={[{
      required: true, type: 'email',
      message: 'Please input your Email.'
    }]}>
      <Input name="email" size="large" prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Email" />
    </Form.Item>
  )
}

export const VerificationCode = () => {
  return (
    <Form.Item name="code" hasFeedback rules={[{
      required: true,
      message: 'Please input the verification code from email.'
    }]}>
      <Input name="code" size="large" prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Verification Code" />
    </Form.Item>
  )
}

export const FormButton = (props) => {
  return (
    <Col lg={24}>
      <Button style={{ width: '100%' }} type="primary" disabled={props.loading}
        htmlType="submit" className="login-form-button" >
        {props.loading ? <Spin indicator={<LoadingOutlined
          style={{ fontSize: 24 }} spin />} /> : props.name}
      </Button>
    </Col>
  )
}

export const FirstName = () => {
  return (
    <Form.Item name="firstName" hasFeedback rules={[{ required: true, message: 'Please input your first name.' }]}>
      <Input name="firstName" size="large" prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="First Name"
      />
    </Form.Item>
  )
}

export const LastName = () => {
  return (
    <Form.Item name="lastName" hasFeedback rules={[{ required: true, message: 'Please input your last name.' }]}>
      <Input name="lastName" size="large" prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Last Name"
      />
    </Form.Item>
  )
}

// export const CompanyName = () => {
//   return (
//     <Form.Item name="companyName" hasFeedback rules={[{ required: true, message: 'Please input your company name.' }]}>
//       <Input name="companyName" size="large" prefix={<UserOutlined className="site-form-item-icon" />}
//         placeholder="Company Name"
//       />
//     </Form.Item>
//   )
// }

/*****************************************************************/
/************** Merchant Info Below, Admin Info Above *****************/
/******************************************************************/
/**************************************************************/

export const ContactName = () => {
  return (
    <Form.Item name="contactName" hasFeedback rules={[{ required: true, message: 'Please input merchant\'s contact name.' }]}>
      <Input name="contactName" size="large" prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Contact Name"
      />
    </Form.Item>
  )
}

export const TextBlock = () => {
  return (
    <Form.Item name="merchantDescription" hasFeedback rules={[{ required: true, message: 'Please input merchant\'s description.' }]}>
      <TextArea name="merchantDescription" autoSize />
    </Form.Item>
  )
}


export const MerchantName = () => {
  return (
    <Form.Item name="merchantName" hasFeedback rules={[{ required: true, message: 'Will be displayed exactly as written on our deal site.' }]}>
      <Input name="merchantName" size="large" prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Business Name"
      />
    </Form.Item>
  )
}

export const PhoneNumber = () => {
  return (
    <Form.Item name="phoneNumber" hasFeedback rules={[{ required: true, message: 'Please input merchant\'s phone number.' }]}>
      <Input type="number" name="phoneNumber" size="large" prefix={"+1"}
        placeholder="Phone Number"
      />
    </Form.Item>
  )
}

export const StreetAddress = () => {
  return (
    <Form.Item name="streetAddress" hasFeedback rules={[{ required: true, message: 'Please input merchant street address.' }]}>
      <Input name="streetAddress" size="large" prefix={<AimOutlined className="site-form-item-icon" />}
        placeholder="2128 Washington Blvd."
      />
    </Form.Item>
  )
}

export const City = () => {
  return (
    <Form.Item name="city" hasFeedback rules={[{ required: true, message: 'Please input merchant city name.' }]}>
      <Input name="city" size="large" prefix={<CompassOutlined className="site-form-item-icon" />}
        placeholder="Los Angeles"
      />
    </Form.Item>
  )
}

export const ZipState = () => (
  <Form.Item noStyle>
    <Form.Item name="zipCode" hasFeedback style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
      rules={[{ required: true, message: 'Please input merchant zip code.' }]}>
      <Input type="number" name="zipCode" size="large" prefix={<AimOutlined className="site-form-item-icon" />}
        placeholder="90210"
      />
    </Form.Item>
    <Form.Item name="state" hasFeedback style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
      rules={[{ required: true, message: 'Please input merchant state.' }]}>
      <Input name="state" size="large" prefix={<AimOutlined className="site-form-item-icon" />}
        placeholder="AZ"
      />
    </Form.Item>
  </Form.Item>
)

export const MerchantEmail = () => (
  <Form.Item name="email" hasFeedback rules={[{
    required: true, type: 'email',
    message: 'This form will be sent to merchant\'s email upon submission.'
  }]}>
    <Input name="email" size="large" prefix={<UserOutlined className="site-form-item-icon" />}
      placeholder="Merchant Email" />
  </Form.Item>
)
