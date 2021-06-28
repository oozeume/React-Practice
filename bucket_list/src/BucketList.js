// 리액트 패키지를 불러옵니다.
import React from 'react';
import styled from 'styled-components';

// redux hook을 불러옵니다.
import { useSelector, useDispatch } from 'react-redux';

// () 안에 props! 부모 컴포넌트에게 받아온 데이터입니다.
// js 함수가 값을 받아오는 것과 똑같이 받아오네요.
const BucketList = (props) => {
    const bucket_list = useSelector(state => state.bucket.list);

    return (
        <ListStyle>
            {bucket_list.map((list, index) => { // js의 내장 함수 중 하나인 map입니다. 리스트의 갯수만큼 => 오른쪽 구문을 반복해요. 
                return (
                    <ItemStyle
                        className='list_item'
                        key={index}
                        color={list.completed ? "orange" : "aliceblue"} // 완료가 되었으면 오렌지색, 완료가 안되었으면 원래컬러인 aliceblue
                        onClick={() => {
                            props.history.push('/detail/'+index);
                            // 배열의 몇번째 항목을 눌렀는 지, url 파라미터로 넘겨줍니다.
                        }}>
                        {list.text}
                    </ItemStyle>
                );
            })}
        </ListStyle>
    );
};

const ListStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`;

const ItemStyle = styled.div`
    padding: 16px;
    margin: 8px;
    background-color: ${props => props.color};
`;

// 우리가 만든 함수형 컴포넌트를 export 해줍니다.
// export 해주면 다른 컴포넌트에서 BucketList 컴포넌트를 불러다 쓸 수 있어요.
export default BucketList;