import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore } from '../../shared/firebase';
import "moment";
import moment from 'moment';

// Action
const SET_POST = "SET_POST" // 목록을 넣어주기
const ADD_POST = "ADD_POST" // 포스트 추가

// ActionCreator
// 지금은 createAction
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

// initialState
const initialState = {
   list: [], // 리듀서가 사용할 initialState
};

const initialPost = { // 게시글 하나에 뭐뭐들어가있는지 보기위해서
   // id: 0, // id 추가
   // user_info: {
   //     user_name: "mean0",
   //     user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
   // },
   image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
   contents: "",
   comment_cnt: 0,
   insert_dt: moment().format("YYYY-MM-DD hh:nn:ss"),
   // insert_dt: "2021-02-27 10:00:00" 여기 시간을 넣어주기위해 moment패키지 설치함
};

// middleware
// firebase에서 포스트 가지고오기
const getPostFB = () => {
   return function (dispatch, getState, { history }) {
      const postDB = firestore.collection('post');

      postDB.get().then((docs) => {
         let post_list = [];
         docs.forEach((doc) => {
            console.log(doc.id, doc.data());

            let _post = {
               id: doc.id,
               ...doc.data()
            };

            let post = {
               id: doc.id,
               user_info: {
                  user_name: _post.user_name,
                  user_profile: _post.user_profile,
                  user_id: _post.user_id,
               },
               image_url: _post.image_url,
               contents: _post.contents,
               comment_cnt: _post.comment_cnt,
               insert_dt: _post.insert_dt,
            };

            post_list.push(post);
         });
         console.log(post_list); // 배열 안에 딕셔너리 잘 들어갔는지 확인

         dispatch(setPost(post_list));
      })
   }
}

const addPostFb = (contents = "") => { //firestore에 추가하는 함수
   return function (dispatch, getState, { history }) {
      //firestore에 추가하려면 데이터의 모양새를 알아야한다. 똑같이 데이터 넣어줘야하니까 
      
      const postDB = firestore.collection("post");

      const _user = getState().user.user; // store(user.js리덕스)에 있는 정보 가져온다. getState()는 store의 내장함수
      const user_info = {
         user_name: _user.user_name,
         user_id: _user.uid,
         user_profile: _user.user_profile,
      }
      const _post = {
         ...initialPost,
         contents: contents, // contents는 받아올거야
         insert_dt: moment().format("YYYY-MM-DD hh:nn:ss"),
      }

      //.add()로 우리가 지정한 firestore의 콜렉션에 정보 넣어주기
      postDB.add({...user_info, ..._post}).then((doc)=>{
         let post = {user_info, ..._post, id:doc.id };
         dispatch(addPost(post));
         history.replace('/');
      }).catch((err)=>{
         console.log('post작성에 실패했어요', err);
      });
   }
}




// Reducer
// 불변성 관리를 위해 immer 사용
export default handleActions({

   [SET_POST]: (state, action) => produce(state, (draft) => {
      // 갈아 끼워줄거야
      draft.list = action.payload.post_list;
   }),
   [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post);
   }),
}, initialState
);

const actionCreators = {
   setPost,
   addPost,
   getPostFB,
   addPostFb,
}

export { actionCreators };