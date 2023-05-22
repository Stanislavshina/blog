import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateUserInfo, getLogin, setNewUser } from '../../api/user/user';
import avatar from '../../assets/avatar.png';

type User = {
  username: string;
  email: string;
  password: string;
  image?: string;
  isAuth: boolean;
  token: string | undefined | null;
  errorMessage: string;
};

export const login = createAsyncThunk('user/login', getLogin);

export const createNewUser = createAsyncThunk('user/SignUp', setNewUser);

export const updateUser = createAsyncThunk('user/Update', UpdateUserInfo);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    email: '',
    token: undefined,
    username: avatar,
    image: '',
    errorMessage: '',
    password: '',
  } as User,
  reducers: {
    logOut(state) {
      state.isAuth = false;
      state.email = '';
      state.token = undefined;
      state.username = '';
      state.image = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        console.log(state.isAuth);

        const { user } = action.payload;
        state.email = user.email;
        state.image = user.image;
        state.token = user.token;
        state.username = user.username;
        state.errorMessage = '';
      })
      .addCase(login.rejected, (state) => {
        state.errorMessage = 'Что-то не так ввел или тебя не существует';
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.isAuth = true;
        const { user } = action.payload;

        state.email = user.email;
        state.image = avatar;
        state.token = user.token;
        state.username = user.username;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.email = user.email;
        state.username = user.username;
        state.image = user.image ? user.image : 'https://static.productionready.io/images/smiley-cyrus.jpg';
        state.errorMessage = '';
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
