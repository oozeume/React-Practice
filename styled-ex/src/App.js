import React from 'react';
import styled from 'styled-components';

function App() {
  return (
    <div className="App">
      <MyStyled>hello React</MyStyled>
    </div> // background color를 props로 받아오고싶어요. // 여기서 먼저 작성해주고
  );
}

const MyStyled = styled.div`
  width: 50vw;
  min-height: 150px;
  padding: 10px; 
  boerder-radius: 15px;
  color: #fff;
  &:hover {
    background-color: #ddd;
  }
  background-color: ${(props)=>(props.bgcolor ? "red" : "purple")}; // 여기서 받아오는거 써준다. 
`

export default App;
