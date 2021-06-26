import React from 'react';

import BucketList from './BucketList';
import Detail from './Detail';
import NotFound from './NotFound';

import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class App extends React.Component {
   constructor(props) {
      super(props);
      // App 컴포넌트의 state를 정의해줍니다.
      this.state = {
         list: ['영화관 가기', '매일 책읽기', '수영 배우기'],
      };

      this.text = React.createRef();
      // 아래 render()에서 먼저 작성해줬음. text가져올꺼니까 text로 작성
      // createRef()는 Ref 생성해주는 친구
      // input에 입력된 텍스트 가져오고싶어 -> 리액트 요소에서 가져온다.
   }

   //Ref값 가져와서 연결해줄때 add해주는 함수 만들어줘야겠죠 (input에 text입력하고 추가하기 버튼 눌렀을때)
   addBucketList = () => {
      let list = this.state.list; //state에 있는 리스트 가져올게요
      const new_item = this.text.current.value; // input에서 value값 가져오면 담아줄 변수를 만들어준다. 

      this.setState({ list: [...list, new_item] });
   }

   componentDidMount() {
      console.log(this.text);
      console.log(this.text.current);
   }

   // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
   render() {
      // this 키워드를 통해 state에 접근할 수 있어요.
      console.log(this.state);

      return (
         <AppBox>
            <Container>
               <Title>내 버킷리스트</Title>
               <Line />
               <Switch>
                  <Route exact path="/" render={(props) => <BucketList history={this.props.history} list={this.state.list} />} />
                  <Route path="/detail" component={Detail} />

                  {/* Switch 안에 path가 지정되지 않는 페이지를 연결해준다. */}
                  <Route render={() => (<NotFound history={this.props.history}/>)} />
               </Switch>

            </Container>



            <TextContainer>
               <input type="text" ref={this.text} />
               <button onClick={this.addBucketList}>추가하기</button>
            </TextContainer>
         </AppBox>
      );
   }
}

const AppBox = styled.div`
   width: 100vw;
   min-height: 100vh;
   background-color: #{$bgColor};
   padding: 32px;
   box-sizing: border-box;
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

const TextContainer = styled.div`
   max-width: 350px;
   padding: 16px;
   margin: 20px auto;
   border-radius: 5px;
   border: 1px solid #ddd;
`;

export default withRouter(App);