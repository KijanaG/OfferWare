import React, { useState, useContext, useEffect } from 'react';
import FormWrapper from '../../../components/Styles/FormWrapper';
import { VerificationCode, FormButton } from '../../../components/Antd/Form';
import { AuthContext } from '../../../context/AuthProvider';


export default function Verify() {
  const [loading, setLoading] = useState(false);
  const { verifyEmail, verifyCode, error } = useContext(AuthContext);

  useEffect(() => {
    const verifyClient = async () => {
      await verifyEmail()
    }
    verifyClient();
  }, [])

  useEffect(() => { if (error) setLoading(false) }, [error])

  const handleEmail = async (value) => {
    setLoading(true)
    await verifyCode(value.code)
  }

  return (
    <React.Fragment>
      <FormWrapper onFinish={handleEmail}>
        <VerificationCode />
        <FormButton loading={loading} name="Confirm Code"/>
      </FormWrapper>
    </React.Fragment>
  )
}
