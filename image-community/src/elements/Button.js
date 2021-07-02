import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
    const { text, _onClick, color } = props;

    const styles = {
        color: color,
    }

    return (
        <React.Fragment>
            <Btn 
            onClick={_onClick}
            {...styles}>
                {text}
            </Btn>
        </React.Fragment>
    )
}

Button.defaultProps = {
    text: '클릭하기',
    _onClick: () => {}
}

const Btn = styled.button`
    background-color: ${(props) => props.color};
    color: #fff;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
    border: none;
`;

export default Button;