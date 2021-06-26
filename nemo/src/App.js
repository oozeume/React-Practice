import React from 'react';
import Nemo from './Nemo';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 3,
    }
  }
  addNemo = () => {
    this.setState({count: this.state.count +1});
    // 여기 중괄호 안에 수정할 값을 넣어주면 수정이 된다. 
    // 딕셔너리 형태로 파라미터 넘겨준다.
    // this.state.count 지금 state의 count값에서 +1 해줄거야
  }

  removeNemo = () => {
    if(this.state.count > 0){
    this.setState({count: this.state.count -1});
    } else {
      window.alert('네모가 없어요!');
    }
  }

  render() {
    // 어떤 숫자의 길이만큼 크기를 가진 배열로 반환해주는 배열메소드 Array.from
    const nemo_count = Array.from({ length: this.state.count }, (v, i) => (i));
    console.log(nemo_count);
    return (
      <div className="App">
        <Nemo />
      </div>
    );
  }
}


export default App;
