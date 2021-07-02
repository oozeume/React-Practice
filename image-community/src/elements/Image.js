import React from 'react';
import styled from "styled-components";

const Image = (props) => {
    const { shape, src, size } = props; // 이거 세개는 props에서 받아와야한다.
    // 비구조화 할당을 통해서 props를 앞에 안붙이고 바로 추출해서 쓸 수 있다. 
    const styles = {
        src: src,
        size: size,
    }

    if (shape === 'circle') {
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if(shape === 'rectangle'){
        return (
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }

    return (
        <React.Fragment>

        </React.Fragment>
    )
}

Image.defaultProps = {
    shape: 'circle',
    src: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80',
    size: 36,
}

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px; // 사이즈도 props에서 받아온다
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-image: url('${(props) => props.src}');
    background-size: cover;
    margin: 4px;
`;

const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative; // 이동의 기준점 원래 자기자리, 자기위치 기준 다른 애들한테 영향안주고 조금만 움직이고싶은 경우
    padding-top: 75%; // 넓이의 4:3 맞추기위해서
    overflow: hidden;
    background-image: url('${(props)=>props.src}');
    background-size: cover;
`;

export default Image;