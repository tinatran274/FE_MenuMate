import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import authReducer from './auth/authSlice'
import userReducer from './user/userSlice'
import ingredientReducer from './ingredient/ingredientSlice'
import dishReducer from './dish/dishSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
    ingredient: ingredientReducer,
    dish: dishReducer
  }
})