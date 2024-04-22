import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_URL} from '../../constants';

const initialState = {
  loading: false,
  error: false,
  success: false,
  response: ''
}

const userSlice = createSlice({
  name: 'user',
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

export const { setSendRequest, setResponseSuccess, setResponseFailure, setInit } = userSlice.actions;


export const getUserData = (token) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'GET',
        url: `${API_URL}/api/user/get`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.request(options)
    if (response.status >= 200 && response.status < 300) {
        const userData = response.data
        dispatch(setResponseSuccess())
        return userData
    } else {
        dispatch(setResponseFailure(response.data.msg));
        return null
    }
  } catch (error) {
      dispatch(setResponseFailure(`Error getting user data: ${error.message}`));
      return null;
  }

}

export const getUserCalo = (token) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'GET',
        url: `${API_URL}/api/user/get_today`,
        headers: {
            Authorization: `Bearer ${token}`
        }
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
      dispatch(setResponseFailure(`Error getting user calo: ${error.message}`));
      return null;
  }

}

export const getUserStatistic = (token, days) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'GET',
        url: `${API_URL}/api/statistic/sevendays_statistic?days=${days}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
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
      dispatch(setResponseFailure(`Error getting user calo: ${error.message}`));
      return null;
  }

}

export const addMorningCalo = (token, calo) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'POST',
        url: `${API_URL}/api/statistic/add_morning`,
        data: {
          morning_calo: parseInt(calo)
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
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
      dispatch(setResponseFailure(`Error getting user data: ${error.message}`));
      return null;
  }
}

export const addNoonCalo = (token, calo) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'POST',
        url: `${API_URL}/api/statistic/add_noon`,
        data: {
          noon_calo: parseInt(calo)
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
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
      dispatch(setResponseFailure(`Error getting user data: ${error.message}`));
      return null;
  }
}

export const addDinnerCalo = (token, calo) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'POST',
        url: `${API_URL}/api/statistic/add_dinner`,
        data: {
          dinner_calo: parseInt(calo)
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
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
      dispatch(setResponseFailure(`Error getting user data: ${error.message}`));
      return null;
  }
}

export const addSnackCalo = (token, calo) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'POST',
        url: `${API_URL}/api/statistic/add_snack`,
        data: {
          snack_calo: parseInt(calo)
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.request(options)
    if (response.status >= 200 && response.status < 300) {
        const res = response.data
        dispatch(setResponseSuccess())
        return res
    } else {
        dispatch(setResponseFailure(response.data));
        return null
    }
  } catch (error) {
      dispatch(setResponseFailure(`Error getting user data: ${error.message}`));
      return null;
  }
}

export const addExerciseCalo = (token, calo) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
        method: 'POST',
        url: `${API_URL}/api/statistic/add_exercise`,
        data: {
          exercise_calo: parseInt(calo)
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
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
      dispatch(setResponseFailure(`Error getting user data: ${error.message}`));
      return null;
  }
}

export const updateAgeHeightWeight = (token, age, height, weight) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
      method: 'PUT',
      url: `${API_URL}/api/user/update_age_height_weight`,
      data: {
        age: parseInt(age),
        height: parseInt(height),
        weight: parseInt(weight)
      },
      headers: {
        Authorization: `Bearer ${token}`
    }
    }
    const response = await axios.request(options)
    if (response.status >= 200 && response.status < 300) {
        dispatch(setResponseSuccess())
    } else {
      dispatch(setResponseFailure("Cập nhật thất bại"));
    }
  } catch (error) {
    dispatch(setResponseFailure("Cập nhật thất bại"));
  }
}

export const updateGender = (token, gender) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
      method: 'PUT',
      url: `${API_URL}/api/user/update_gender`,
      data: {
        gender: gender,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.request(options)
    if (response.status >= 200 && response.status < 300) {
        dispatch(setResponseSuccess())
    } else {
      dispatch(setResponseFailure("Cập nhật thất bại"));
    }
  } catch (error) {
    dispatch(setResponseFailure("Cập nhật thất bại"));
  }
}

export const updateExercise = (token, exercise) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
      method: 'PUT',
      url: `${API_URL}/api/user/update_exercise`,
      data: {
        exercise: exercise,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.request(options)
    if (response.status >= 200 && response.status < 300) {
        dispatch(setResponseSuccess());
    } else {
      dispatch(setResponseFailure("Cập nhật thất bại"));
    }
  } catch (error) {
    dispatch(setResponseFailure("Cập nhật thất bại"));
  }
}

export const getSuggestMenu = (token) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
      method: 'GET',
      url: `${API_URL}/api/menu/get_suggest_menu`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.request(options)
    if (response.status >= 200 && response.status < 300) {
        const data = response.data
        dispatch(setResponseSuccess());
        return data
    } else {
      dispatch(setResponseFailure("Get thất bại"));
    }
  } catch (error) {
    dispatch(setResponseFailure("Get thất bại"));
  }
}

export const newSuggestMenu = (token) => async (dispatch) => {
  try {
    dispatch(setSendRequest());
    const options = {
      method: 'GET',
      url: `${API_URL}/api/menu/new_genetic_algorithm`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.request(options)
    if (response.status >= 200 && response.status < 300) {
        const data = response.data
        dispatch(setResponseSuccess());
        return data
    } else {
      dispatch(setResponseFailure("Get thất bại"));
    }
  } catch (error) {
    dispatch(setResponseFailure("Get thất bại"));
  }
}

export const selectIsLoading = (state) => state.user.loading;
export const selectIsSuccess = (state) => state.user.success;
export const selectIsError = (state) => state.user.error;
export const selectResponse = (state) => state.user.response;

export default userSlice.reducer;