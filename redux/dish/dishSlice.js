import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_URL} from '../../constants';

const initialState = {
  loading: false,
  error: false,
  success: false,
  response: ''
}

const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: {
    setSendRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    setResponseSuccess: (state) => {
      state.success = true
      state.loading = false;
      state.error = false
    },
    setResponseFailure: (state, action) => {
      state.error = true
      state.loading = false;
      state.success = false
      state.response = action.payload;
    },
    setInit: (state) => {
      state.success = false
      state.loading = false;
      state.error = false
      state.response = ""
    },
  },
})

export const { setSendRequest, setResponseSuccess, setResponseFailure, setInit } = dishSlice.actions;


export const getDishData = (current_page, page_size) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'GET',
        url: `${API_URL}/api/dish/get?page=${current_page}&page_size=${page_size}`,
    }
    const response = await axios.request(options)
    if (response.status >= 200 && response.status < 300) {
        const data = response.data
        dispatch(setResponseSuccess())
        return data
    } else {
        dispatch(setResponseFailure(response.data.msg));
        return null
    }
  } catch (error) {
      dispatch(setResponseFailure(`Error getIngredientData: ${error.message}`));
      return null;
  }

}

export const getUserDishData = (token, dishId) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'GET',
        url: `${API_URL}/api/dish/get_detail/${dishId}`,
        headers: {
          Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.request(options)
    if (response.status >= 200 && response.status < 300) {
        const data = response.data
        dispatch(setResponseSuccess())
        return data
    } else {
        dispatch(setResponseFailure(response.data.msg));
        return null
    }
  } catch (error) {
      dispatch(setResponseFailure(`Error getIngredientData: ${error.message}`));
      return null;
  }
}

export const addDishFavo = (token, dishId) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'POST',
        url: `${API_URL}/api/dish/add_favorite`,
        data: {
          dish_id: parseInt(dishId)
        },
        headers: {
          Authorization: `Bearer ${token}`
        }

    }
    const response = await axios.request(options)
    if (response.status >= 200 && response.status < 300) {
        const data = response.data
        dispatch(setResponseSuccess())
        return data
    } else {
        dispatch(setResponseFailure(response.data.msg));
        return null
    }
  } catch (error) {
      dispatch(setResponseFailure(`Error getIngredientData: ${error.message}`));
      return null;
  }
}

export const getRecipeData = (dishId) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'GET',
        url: `${API_URL}/api/dish/detail_recipe/${dishId}`
    }
    const response = await axios.request(options)
    if (response.status >= 200 && response.status < 300) {
        const data = response.data
        dispatch(setResponseSuccess())
        return data
    } else {
        dispatch(setResponseFailure(response.data.msg));
        return null
    }
  } catch (error) {
      dispatch(setResponseFailure(`Error getIngredientData: ${error.message}`));
      return null;
  }

}



export const selectIsLoading = (state) => state.dish.loading;
export const selectIsSuccess = (state) => state.dish.success;
export const selectIsError = (state) => state.dish.error;
export const selectResponse = (state) => state.dish.response;

export default dishSlice.reducer;