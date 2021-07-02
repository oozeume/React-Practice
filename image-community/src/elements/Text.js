import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
    const { bold, color, size, children, margin } = props;

    const styles = {
        bold: bold,
        color: color,
        size: size,
        margin: false,
    };

    return (
        <Textp {...styles}>
            {children}
        </Textp>
    );
}

Text.defaultProps = {
    children: null,
    bold: false,
    color: 'black',
    size: '14px',
    margin: false,
}

const Textp = styled.p`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    font-weight: ${(props) => (props.bold ? '600' : '400')};
    margin: ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
`;

export default Text;