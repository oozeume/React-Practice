// bucket.js
import { firestore } from "../../firebase";

const bucket_db = firestore.collection('bucket');

// Actions // Action의 이름은 모두 대문자일 것(코딩 룰)
// Reducer를 export default로 빼줄거기 때문에 Action은 그냥 export로 빼준다.
// type을 반드시 가지고있어야함
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
const UPDATE = "bucket/UPDATE";
const LOADED = "bucket/LOADED"; // 스피너 달아주는 부분

// 기본값, 초기값의 데이터 (App.js에 있음)
const initialState = {
    is_loaded: false,
    list: [ // 원래 string으로 있던걸 dictionary로 바꿔준다. 
        { text: '영화관 가기', completed: false },
    ],
    // list: ['영화관 가기', '매일 책읽기', '수영 배우기'],
};

// Action Creators // Action을 불러와야 ActionCreate할수있으니까 export 해온다
// Action 객체를 생성하는 함수 (액션 생성 함수)
export const loadBucket = (bucket) => {
    return { type: LOAD, bucket };
}

export const createBucket = (bucket) => {
    return { type: CREATE, bucket };
}

export const deleteBucket = (bucket) => {
    return { type: DELETE, bucket };
}

export const updateBucket = (bucket) => {
    return { type: UPDATE, bucket };
}

// is_loaded의 true/false 값 받아옴
export const isLoaded = (loaded) => {
    return {type: LOADED, loaded};
}

export const loadBucketFB = () => {
    return function (dispatch) { // 객체 대신 함수 반환하는 미들웨어

        bucket_db.get().then((docs) => {
            // 리덕스에 넣어주기 위한 빈 배열
            let bucket_data = [];

            docs.forEach((doc) => {
                if (doc.exists) {
                    bucket_data = [...bucket_data, {id: doc.id, ...doc.data()}];
                }
            })

            console.log(bucket_data);
            dispatch(loadBucket(bucket_data));
        });
    };
};

export const addBucketFB = (bucket) => {
    return function(dispatch) {
        // 추가할 bucket_data 만들어준다
        let bucket_data = {text: bucket, completed: false};

        // 요청을 보내자마자 화면을 가려줘야한다. 
        dispatch(isLoaded(false)); // false를 줘서 일단 화면 가리고


        bucket_db.add(bucket_data).then( (docRef) => {
            bucket_data = {...bucket_data, id: docRef.id};
            
            dispatch(createBucket(bucket_data));
            dispatch(isLoaded(true));
        })
    }
}
// 매개변수에 bucket의 index받아옴
export const updateBucketFB = (bucket) => {
    return function(dispatch, getState){
        const _bucket_data = getState().bucket.list[bucket];  // 수정되기 이전의 데이터가 먼저 있어야함
        console.log(_bucket_data);

        let bucket_data = {..._bucket_data, completed: true};

        // 만약에 id가 없을 경우 만들어준다
        if(!bucket_data.id){
            return;
        }

        // id줘야 딱 하나 지정해서 바꿀 수 있다.
        bucket_db.doc(bucket_data.id).update(bucket_data).then(docRef => {
            dispatch(updateBucket(bucket)); // 여기의 bucket은 index가리키고 있음
        }).catch(error => {
            console.log(error);
        });
    }
}

// 매개변수에 bucket의 index받아옴
export const deleteBucketFB = (bucket) => {
    return function (dispatch, getState) {
        const _bucket_data = getState().bucket.list[bucket];
    
        // 만약에 id가 없을 경우 만들어준다
        if(!_bucket_data.id){
            return;
        }

    bucket_db.doc(_bucket_data.id).delete().then(docRef => {
        dispatch(deleteBucket(bucket));
    }).catch(error => { // 에러가 나면 이쪽 구문을 실행한다.
        console.log(error);
    });
    }
}




// Reducer
// 현재상태(초기상태)와 전달받은 액션객체를 파라미터롤 받아와서 새로운 상태를 만들어서 반환한다. 
export default function reducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        // do reducer stuff
        case "bucket/LOAD": {
            if(action.bucket.length > 0){
                return {list: action.bucket, is_loaded: true};
            }
            return state;
        }

        case "bucket/CREATE": {
            const new_bucket_list = [...state.list, action.bucket];
            return { list: new_bucket_list };
        }

        case "bucket/DELETE": {
            const bucket_list = state.list.filter((l, index) => { //페이지의 인덱스 사용해서 지워준다.
                if (index !== action.bucket) {
                    return l;
                }
            });
            return { list: bucket_list };
        }
        case "bucket/UPDATE": { // 완료로 상태가 바뀐 리스트가 들어가야한다.
            const bucket_list = state.list.map((l, index) => {
                if (index === action.bucket) {
                    return { ...l, completed: true };
                } else {
                    return l;
                }
            });
            return { list: bucket_list };
        }

        case "bucket/LOADED" : {
            return {...state, is_loaded: action.loaded};
        }

        default:
            return state;
    }
}

