import React from 'react';
import { Grid, Text, Button } from '../elements';
import { getCookie, deleteCookie } from '../shared/Cookie';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const Header = (props) => {
   const dispatch = useDispatch();
   const is_login = useSelector((state)=>state.user.is_login);
   // useSelector로 가져올거야. state에 있는 user에 있는 is_login가져올거야

   if (is_login) {
      return (
         <React.Fragment>
            <Grid is_flex padding='4px 16px'>
               <Grid>
                  <Text
                     margin='0px'
                     size='24px'>hello</Text>
               </Grid>

               <Grid is_flex>
                  <Button color='purple' text='내정보'> </Button>
                  <Button color='purple' text='알림'></Button>
                  <Button color='purple' text='로그아웃'
                     _onClick={() => { 
                        dispatch(userActions.logOut({}));
                     }}
                  ></Button>

               </Grid>
            </Grid>
         </React.Fragment>
      )
   }

   return (
      <React.Fragment>
         <Grid is_flex padding='4px 16px'>
            <Grid>
               <Text
                  margin='0px'
                  size='24px'>hello</Text>
            </Grid>

            <Grid is_flex>
               <Button
                  color='purple'
                  text='로그인'>
               </Button>

               <Button
                  color='purple'
                  text='회원가입'>

               </Button>

            </Grid>
         </Grid>
      </React.Fragment>
   )
}

Header.defaultProps = {

}

export default Header;