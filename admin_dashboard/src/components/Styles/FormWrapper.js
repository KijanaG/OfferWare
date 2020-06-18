import styled from 'styled-components';
import { Form } from 'antd';

import { colors } from './Colors';

const FormWrapper = styled(Form)`
    max-width: 350px;
    border: 1px solid ${colors.grey};
    margin: 7% auto !important;
    padding: 42px 24px 50px !important;
    background: ${colors.white}
`;

export default FormWrapper;

export const DealForm = styled(Form)`
    margin: 0% auto !important;
    padding: 2px 0 0 !important;
`;