import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_URL} from '../../constants';

const initialState = {
  loading: false,
  error: false,
  success: false,
  response: ''
}

const ingredientSlice = createSlice({
  name: 'ingredient',
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

export const { setSendRequest, setResponseSuccess, setResponseFailure, setInit } = ingredientSlice.actions;


export const getIngredientData = (current_page, page_size, category) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'GET',
        url: `${API_URL}/api/ingredient/get?page=${current_page}&page_size=${page_size}&category=${category}`,
    }
    // console.log(options);
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

export const getDishIngredient = (ingredient_id) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'GET',
        url: `${API_URL}/api/ingredient/get_dish/${ingredient_id}`,
    }
    const response = await axios.request(options)
    if (response.status >= 200 && response.status < 300) {
        const res = response.data
        dispatch(setResponseSuccess())
        return res
    } else {
        dispatch(setResponseFailure(response.data.msg));
        return null
    }
  } catch (error) {
      console.log(error)
      dispatch(setResponseFailure(`Error getDetailIngredient: ${error.message}`));
      return null;
  }

}


export const selectIsLoading = (state) => state.ingredient.loading;
export const selectIsSuccess = (state) => state.ingredient.success;
export const selectIsError = (state) => state.ingredient.error;
export const selectResponse = (state) => state.ingredient.response;

export default ingredientSlice.reducer;