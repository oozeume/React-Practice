import React from 'react';
import styled, {keyframes} from 'styled-components';

function App() {
    return (
        <div className="App">
            <Box />
        </div>
    );
}
const move = keyframes` //키프레임인 변수 선언 먼저
    0%{
        top: 20px;
        opacity: 1;
        left: 20px;
        background-color: orange;
    }
    30%{
        top: 50px;
        opacity: 1;
    }
    50%{
        top: 200px;
        opacity: 0;
        left: 100px;
        background-color: blue;

    }
    80%{
        top: 150px;
        opacity: 0;

    }
    100%{
        top: 20px;
        opacity: 1;       
        left: 20px;
        background-color: orange;

    }
`;

const Box = styled.div`
    width: 300px;
    height: 300px;
    background-color: green;
    border-radius: 150px;
    position: absolute;
    top: 20px;
    left: 20px;
    opacity: 1;
    animation: ${move} 2s 1s infinite;
`;



export default App;
