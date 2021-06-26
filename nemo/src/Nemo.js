import React from 'react';

// 함수형 컴포넌트 사용
const Nemo = (props) => {
    const [count, setCount] = React.useState(3); // useSate()소괄호 안의 값은 초기값을 뜻함
    // 컴포넌트는 뭘 반환한다? 리액트 엘리먼트 UI요소를 반환해줘야한다.

    const addNemo = () => {
        setCount(count+1);
    }

    const removeNemo = () => {
        setCount(count > 0 ? count-1 : 0);
    }

    const nemo_count = Array.from({ length: count }, (v, i) => (i));

    return ( // 반환할 리액트 요소 적어주는 부분
        <div className="App">
            {nemo_count.map((num, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            width: '150px',
                            height: '150px',
                            backgroundColor: '#eee',
                            margin: '10px'
                        }}>
                        nemo
                    </div>
                );
            })}

            <div>
                <button onClick={addNemo}>하나추가</button>
                <button onClick={removeNemo}>하나빼기</button>
            </div>
        </div>
    );
};

export default Nemo;