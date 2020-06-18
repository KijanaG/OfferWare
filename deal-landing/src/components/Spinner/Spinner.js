import React from 'react';
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import FormWrapper from '../Styles/FormWrapper';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const spinner = () => (
  <FormWrapper>
    <RingLoader
      css={override}
      size={100}
      color={"#123abc45"}
      loading={true}
    />
  </FormWrapper>
);

export default spinner;