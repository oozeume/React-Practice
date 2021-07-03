import React from 'react';
import { Text, Input, Grid, Button } from '../elements';
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch } from 'react-redux'; // 액션을 쓰기위해서는 useDispatch import해놓고
import { actionCreators as userActions } from '../redux/modules/user';

const Login = (props) => {
   const dispatch = useDispatch(); // dispatch 만들어놓고 시작한다. 

   const login = () => {
      // dispatch안에 액션생성함수 넣어줘야하니까 import해주자. 
      dispatch(userActions.loginAction({user_name: 'perl'}));
   };

   return (
      <React.Fragment>
         <Grid padding='16px' >
            <Text size="32px" bold>로그인</Text>
         </Grid>
         <Grid padding='16px 0px' >
            <Input placeholder='아이디를 입력해주세요'/>
            <Input vplaceholder='패스워드를 입력해주세요'/>
         </Grid>
         <Button color='black' text='로그인하기' 
         _onClick={()=>{
            console.log('로그인했어');
            login();
         }}
         >
         </Button>
      </React.Fragment>
   )
}

export default Login;
