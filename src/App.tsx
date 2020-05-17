import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld';

import './App.css'
import store from "@/store/index"

@Component
export default class App extends Vue {
  handleClick(e: any){
      const num = e.target.dataset.num
      store.commit('in_buffer', num)
  }
  handleClickReset(){
      store.commit('reset')
  }
  handleClickResult(){
      store.dispatch('equle');
  }
  handleClickSum(){
      store.commit('sum')
  }
  handleClickDiff(){
      store.commit('diff')
  }
  render() {
    const { buffer, result, isCalculate } = store.state
    return (
      <div id="app">
        <HelloWorld msg1="Welcome to Your Vue.js + TypeScript App"/>
        <div class="conteiner">
            <div class="display">
                <div class="buffer">{buffer}</div>
                <div class="result">{result}</div>
                {isCalculate && <div class="locked">numpad is locked</div>}
            </div>
            <div class="numpad">
                <div class='numbers' onclick={this.handleClick}>
                    <div class="item" data-num={1}>1</div>
                    <div class="item" data-num={2}>2</div>
                    <div class="item" data-num={3}>3</div>
                    <div class="item" data-num={4}>4</div>
                    <div class="item" data-num={5}>5</div>
                    <div class="item" data-num={6}>6</div>
                    <div class="item" data-num={7}>7</div>
                    <div class="item" data-num={8}>8</div>
                    <div class="item" data-num={9}>9</div>
                    <div class="item" data-num={0}>0</div>
                </div>
                <div class="operation">
                    <div class="item" onclick={this.handleClickReset}>c</div>
                    <div class="item" onclick={this.handleClickDiff}>-</div>
                    <div class="item" onclick={this.handleClickSum}>+</div>
                    <div class="item" onclick={this.handleClickResult}>=</div>
                </div>
            </div>
       </div>
      </div>
    )
  }
}
