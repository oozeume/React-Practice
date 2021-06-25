import React from 'react';
import logo from './logo.svg';
// BucketList 컴포넌트를 import 해옵니다.
// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import BucketList from './BucketList';
// import './style.css';
// import "./scss_ex.scss";
import styled from 'styled-component';

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class App extends React.Component {

   constructor(props) {
      super(props);
      // App 컴포넌트의 state를 정의해줍니다.
      this.state = {
         list: ['영화관 가기', '매일 책읽기', '수영 배우기'],
      };
   }

   // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
   render() {
      // this 키워드를 통해 state에 접근할 수 있어요.
      console.log(this.state);

      return (
         <div className="App">
            <div className="container">
               <h1 className="title">내 버킷리스트</h1>
               <hr className="line" />
               {/* 컴포넌트를 넣어줍니다. */}
               {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
               <BucketList list={this.state.list} />
            </div>
         </div>
      );
   }
}

const App = styled.div`
   width: 100vw;
   min-height: 100vh;
   background-color: #{$bgColor};
   padding: 32px;
   box-sizing: border-box;
   &:hover{
   background-color: blue;
   }
`;

const Container = styled.div`
   max-width: 350px;
   min-height: 80vh;
   background-color: #fff;
   padding: 16px;
   margin: 20px auto;
   border-radius: 5px;
   border: 1px solid #ddd;
`;

const Title = styled.h1`
   color: slateblue;
   text-align: center;
`;

const Line = styled.hr`
   margin: 16px 0px;
   border: 1px dotted #ddd;
`;

export default App;