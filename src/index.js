import './styles.css'
import { increment, decrement, changeTheme } from './redux/actions'

import {applyMiddleware, createStore, compose} from 'redux'
import {rootReducer} from './redux/rootReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const themeBtn = document.getElementById('theme')


const store = createStore(rootReducer,   
		composeWithDevTools(
    applyMiddleware(thunk, logger)
  ))


addBtn.addEventListener('click', () => {
	store.dispatch(increment())
})
subBtn.addEventListener('click', () => {
	store.dispatch(decrement())
})
themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light')
    ? 'dark'
    : 'light'
  store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {
	const state = store.getState()
	counter.textContent = state.counter
	document.body.className = state.theme.value
})



store.dispatch({type: 'INIT_APPLICATION'})