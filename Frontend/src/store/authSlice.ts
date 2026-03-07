import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../globals/types/authTypes";

const initialState:AuthState = {
    user:{} as User
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser(state:AuthState,action:PayloadAction<User>){
            state.user = action.payload
        },
        setToken(state:AuthState,action:PayloadAction<string>){
            
            if(state.user){
                (state.user as User).token = action.payload
            }
        },
        resetToken(state:AuthState){
            if(state.user){
                (state.user as User).token = ""
            }
        }
    }
})

export const {setToken,setUser,resetToken} = authSlice.actions
export default authSlice.reducer

