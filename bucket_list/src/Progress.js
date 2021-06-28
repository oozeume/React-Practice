import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

const Progress = (props) => {
    // 버킷리스트를 리덕스 훅으로 가져오기
    // 스토어에서 상태값 가져오기
    const bucket_list = useSelector(state => state.bucket.list);
    
    let count = 0;

    bucket_list.map((l, index) => {
        if(l.completed){ //completed가 true이면 count++해서 완성도 구할거다
            count++;
        }
     })

    return (

        <ProgressBar>
            <HigthList width={(count/bucket_list.length)*100 + '%'} />
            {/* 넓이는 리덕스에 있으니까 리덕스 가져와서 퍼센테이지로 구한다 */}

        </ProgressBar>
    );
}

const ProgressBar = styled.div`
    background: #eee;
    width: 100%;
    heigth: 40px;
`;

const HigthList = styled.div`
    background: orange;
    height: 40px;
    width: ${props => props.width};
    transition: width 1s;
    // width는 view짜면서 바로 지정하지 않는다. 완성도에 따라서보여줘야해서 데이터를 가지고와야한다.
`;

export default Progress;