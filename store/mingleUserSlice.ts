import { MingleUserDto } from "@/protos/protos/mingle_pb"
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

const initialState =new MingleUserDto();

export const mingleUserSlice = createSlice({
    name: 'mingleUser',
    initialState,
    reducers: {
        setMingleUser: (state, action: PayloadAction<MingleUserDto>) => 
            Object.assign(state, action.payload)
        ,
    },
});

export const {setMingleUser}= mingleUserSlice.actions;
export default mingleUserSlice.reducer
