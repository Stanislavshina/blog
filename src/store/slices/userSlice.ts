import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateUserInfo, getLogin, setNewUser } from '../../api/user/user';
import avatar from '../../assets/avatar.png';

type User = {
  username: string;
  email: string;
  password: string;
  image?: string;
  isAuth: boolean;
  errorMessage: string;
  token: string | null | undefined;
};

export const login = createAsyncThunk('user/login', getLogin);

export const createNewUser = createAsyncThunk('user/SignUp', setNewUser);

export const updateUser = createAsyncThunk('user/Update', UpdateUserInfo);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    email: '',
    token: '',
    username: '',
    image: avatar,
    errorMessage: '',
    password: '',
  } as User,
  reducers: {
    logOut(state) {
      state.isAuth = false;
      state.email = '';
      state.username = '';
      state.image = avatar;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        const { user } = action.payload;
        state.email = user.email;
        state.image = user.image || avatar;
        state.username = user.username;
        state.errorMessage = '';
        state.token = user.token;
      })
      .addCase(login.rejected, (state) => {
        state.errorMessage = 'Что-то не так ввел или тебя не существует';
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.isAuth = true;
        const { user } = action.payload;
        state.email = user.email;
        state.image = avatar;
        state.username = user.username;
        state.token = user.token;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.email = user.email;
        state.username = user.username;
        state.image = user.image ? user.image : avatar;
        state.errorMessage = '';
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
