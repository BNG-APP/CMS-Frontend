import { createSlice } from "@reduxjs/toolkit";

const appSlice=createSlice(
    {
        name:"app",
        initialState:
        {
            isSideMenuOpen:false
        },
        reducers:
        {
             setIsSideMenuOpen:(state,action)=>
            {
                state.isSideMenuOpen=action.payload;
            }
        }
    }
)

export const {setIsSideMenuOpen}=appSlice.actions;

export default appSlice.reducer;