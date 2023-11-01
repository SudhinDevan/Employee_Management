import {createSlice} from '@reduxjs/toolkit'

export const ClientAuth = createSlice  ({
    name:'Client',
    initialState: {
        Token : null ,
        DisplayName : null ,
        adminToken : null ,
        adminName : null ,
        Authorized : false
    } ,
    reducers: {
        clientLogin(state, action) {
            state.Token = action.payload.token;
            state.DisplayName = action.payload.username;
          },          
        clientLogout(state,action){
            state.Token=null
        },
        adminLogin(state,action){
            state.adminToken= action.payload.adminToken
            state.adminName= action.payload.adminName
            state.Authorized=  action.payload.Authorized
        },
        adminLogout(state,action){
            state.adminToken = null
            state.adminName = null
            state.Authorized = false
        }
    }
})

export const {clientLogin,clientLogout,adminLogin,adminLogout} =ClientAuth.actions

export const Clientreducer = ClientAuth.reducer