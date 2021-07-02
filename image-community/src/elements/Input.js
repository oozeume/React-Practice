import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from './index';

const Input = (props) => {
    const { label, placeholder, _onChange } = props;

    return (
        <React.Fragment>
            <Grid>
                <Text margin='0px'>{label}</Text>
                <ElementInput placeholder={placeholder} onChange={_onChange} />
            </Grid>
        </React.Fragment>
    )
}

// Input에 기본적으로 받아와야하는 어떤것들 미리 써준다. 
Input.defaultProps = {
    label: 'text',
    placeholder: '텍스트를 입력해주세요',
    _onChange: () => { } // 콜백함수
    // 텍스트가 변하는 값을 얘의 부모컴포넌트가 알고싶겠지
}

const ElementInput = styled.input`
    border: 1px solid black;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

export default Input;