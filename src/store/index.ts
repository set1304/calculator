import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface IState {
  buffer: string
  result: string
  number: string
  currentResult: number
  isCalculate: boolean
  isEndOperation: boolean
  type: string
}

const operation = ( state: IState): number =>
    state.type === '-' ? state.currentResult - +state.number : state.currentResult + +state.number

const createBuffer = (state: IState, opt: string): string => {
  const l = state.buffer.length
  if(!state.buffer) return ''
  if(state.buffer[l-2] === '+' || state.buffer[l-2] === '-' ){
    const re = /[+-]\s$/g
    const newBuffer = state.buffer.replace(re, opt)
    return newBuffer + ' '
  }
  return `${state.buffer} ${opt} `
}
const result = (currentResult: number): string => {
  if(currentResult.toString().length >= 12) {
    return  currentResult.toExponential(5)
  }
  return  currentResult.toString()
}

export default new Vuex.Store({
  state: {
    buffer: '',
    result: '',
    number: '',
    currentResult: 0,
    isCalculate: false,
    isEndOperation: false,
    type: '+',
  },
  mutations: {
    in_buffer(state, number) {
      if(!state.isCalculate){
        if(state.isEndOperation){
          state.buffer =  number
          state.number =  number
          state.isEndOperation = false
        } else {
          state.buffer = state.buffer + number
          state.number = state.number + number
        }
      }
    },
    reset(state) {
      if(!state.isCalculate) {
        state.buffer = ''
        state.result = ''
        state.number = ''
        state.currentResult = 0
        state.isEndOperation = false
        state.type = '+'
      }
    },
    sum(state) {
     if(!state.isCalculate && state.buffer) {
       if(state.isEndOperation) state.isEndOperation = false
       state.currentResult = operation(state)
       state.buffer = createBuffer(state, '+')
       state.result = '= ' + result(state.currentResult)
       state.number = ''
       state.type = '+'
     }
    },
    diff(state) {
     if(!state.isCalculate && state.buffer) {
       if(state.isEndOperation) state.isEndOperation = false
       state.currentResult = operation(state)
       state.buffer = createBuffer(state, '-')
       state.result = '= ' + result(state.currentResult)
       state.number = ''
       state.type = '-'
     }
    },
    equle(state) {
      state.isEndOperation = true
      if(state.number) {
        state.currentResult = operation(state)
      }
      state.result = ''
      state.buffer = result(state.currentResult)
      state.number = ''
      state.type = '+'
    },
    calculate(state) {
      state.isCalculate = !state.isCalculate
    }
  },
  actions: {
    equle(context){
      context.commit('calculate');
      setTimeout(() => {
        context.commit('equle')
        context.commit('calculate')
      }, 2000)
    }
  },
  modules: {
  }
})
