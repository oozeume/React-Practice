// bucket.js

// Actions // Action의 이름은 모두 대문자일 것(코딩 룰)
// Reducer를 export default로 빼줄거기 때문에 Action은 그냥 export로 빼준다.
// type을 반드시 가지고있어야함
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
const UPDATE = "bucket/UPDATE";

// 기본값, 초기값의 데이터 (App.js에 있음)
const initialState = {
    list: [ //원래 string으로 있던걸 dictionary로 바꿔준다. 
        { text: '영화관 가기', completed: false },
        { text: '매일 책읽기', completed: false },
        { text: '수영 배우기', completed: false },

    ]
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


// Reducer
// 현재상태(초기상태)와 전달받은 액션객체를 파라미터롤 받아와서 새로운 상태를 만들어서 반환한다. 
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // do reducer stuff
        case "bucket/LOAD": {
            return state;
        }
        case "bucket/CREATE": {
            const new_bucket_list = [...state.list, { text: action.bucket, completed: false }];
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
                if(index === action.bucket){
                    return {...l, completed: true};
                } else {
                    return l;
                }
            });
            return { list: bucket_list };
        }
        
        default:
            return state;
    }
}

