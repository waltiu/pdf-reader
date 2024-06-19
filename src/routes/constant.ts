import React from "react"
import { getUrlPath } from "../utils/url"
import useGloBalStore from "../store/useGlobalStore"

export const BASE_PATH='/'
export const HOME_PATH='/home'
export const LOGIN_PATH='/login'
export const TEST_PATH='/test'

export const routerGuide=(element:React.ReactNode)=>{
    console.log(111)
    const {isLogin}=useGloBalStore.getState()
    const path=getUrlPath()
    if(!isLogin&&path!==LOGIN_PATH){
        window.location.href=LOGIN_PATH
        return 
    }
    if(path!==BASE_PATH){
        return element
    }else {
        window.location.href=HOME_PATH
        return
    }
    return element
}