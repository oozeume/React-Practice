import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
    // 먼저 props로 설정해준 값 가지고 와야한다. 
    const { is_flex, width, margin, padding, bg, children } = props;
    
    const styles = {
        is_flex: is_flex,
        width: width, 
        margin: margin,
        padding: padding,
        bg: bg,

    }
    
    return (
        <React.Fragment>
            <GridBox {...styles}>
            {children}
            </GridBox>
        </React.Fragment>
    );
}

Grid.defaultProps = {
    children: null,
    is_flex: false,
    width: '100%',
    padding: false, // padding에 값이 있으면 값 넣어주고 없으면 안넣어주고
    margin: false,
    bg: false,
}

const GridBox = styled.div`
    width: ${(props) => props.width};
    height: 100%;
    box-sizing: border-box;
    ${(props) => (props.padding ? `padding: ${props.padding};` : '')} // 패딩 없는 경우도 있을테니까 이렇게 작성해주는 것
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
    ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
    ${(props) => (props.is_flex ? `display: flex; align-items: center; justify-contents: center;`: '')} // 플렉스일경우 안에 연관된 속성(justify-contents이런것들)도 다 같이 가져와야해서 이렇게 적어준다

`;

export default Grid;