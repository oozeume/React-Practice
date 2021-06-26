import React from 'react';

const Cat = (props) => {
    return (<div>내 고양이 이름은 {props.match.params.cat_name}이예요</div>);
}

export default Cat;