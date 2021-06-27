import React from 'react';

import BucketList from './BucketList';
import Detail from './Detail';
import NotFound from './NotFound';
import styled from 'styled-components';

import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

// 리덕스 스토어와 연결하기 위한 connect 호출
import { connect } from 'react-redux';
import { loadBucket, createBucket } from './redux/modules/bucket';


// connect를 하기위한 함수 2가지 필요
// 1) redux Store에 있는 상태값을 props의 형태로 받아오기위한 함수 (컴포넌트에 넣어주는 친구)
const mapStateToProps = (state) => ({
    bucket_list: state.bucket.list,
});

// 2) 값을 변화시키기 위한 액션생성함수를 props로 받아오기위한 함수 (Dispatch를 Props로 넘겨줄거야)
const mapDispatchToProps = (dispatch) => ({
    // 우리가 만들었던 액션 생성 함수를 넣어준다. Action을 반환해야 Reducer에서 처리할수있음
    load: () => {
        dispatch(loadBucket());
    },
    create: (new_item) => {
        dispatch(createBucket(new_item));
    }

});

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class App extends React.Component {
    constructor(props) {
        super(props);
        // App 컴포넌트의 state를 정의해줍니다.
        this.state = {

        };

        //Ref선언
        this.text = React.createRef();
        // 아래 render()에서 먼저 작성해줬음. text가져올꺼니까 text로 작성
        // createRef()는 Ref 생성해주는 친구
        // input에 입력된 텍스트 가져오고싶어 -> 리액트 요소에서 가져온다.
    }

    //Ref값 가져와서 연결해줄때 add해주는 함수 만들어줘야겠죠 (input에 text입력하고 추가하기 버튼 눌렀을때)
    addBucketList = () => {
        const new_item = this.text.current.value; // input에서 value값 가져오면 담아줄 변수를 만들어준다. 
        this.props.create(new_item);
    };

    componentDidMount() {
        console.log(this.props);
    }

    // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
    render() {
        return (
            <AppBox>
                <Container>
                    <Title>내 버킷리스트</Title>
                    <Line />

                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => (
                                <BucketList
                                    bucket_list={this.state.bucket_list}
                                    history={this.props.history}
                                />
                            )}
                        />
                        <Route path="/detail/:index" component={Detail} />
                        <Route render={(props) => (<NotFound history={this.props.history} />)} />
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

// 처음에 withRouter적용
// connect 로 묶어준다. 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));