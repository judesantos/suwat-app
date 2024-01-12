'use client';

import { useEffect, useReducer, useState } from "react"
import SignUpFormEmail from "./signup-form-email";
import SignUpFormUserInfo from "./signup-form-userinfo";

export enum Direction {
  PREVIOUS = -1,  
  NEXT = 1
}
export type UserForm = {
  email: string,
  userName: string,
  fullName: string,
  phone: string,
  password: string,
  providerId: string
}

const reducer = (state: UserForm, action: any) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {...state, email: action.email};
    case "SET_USERNAME":
      return {...state, userName: action.userName};
    case "SET_FULL_NAME":
      return {...state, fullName: action.fullName};
    case "SET_PASSWORD":
      return {...state, password: action.password};
    case "SET_PHONE":
      return {...state, phone: action.phone};
    case "SET_PROVIDER_ID":
      return {...state, providerId: action.providerId};
    default:
      return state;
  }
}

const SignUpMain = () => {

  const [formData, dispatch] = useReducer(reducer, {} as UserForm);
  const [currentTab, setCurrentTab] = useState(0);

  const updateTab = (direction: Direction) => {
    setCurrentTab(prev => prev + direction)
  }

  const emailFrmComp = (
    <div
      className="h-screen flex justify-center items-center"
    >
      <SignUpFormEmail
        user={formData} 
        dispatch={dispatch} 
        setCurrentTab={updateTab}/>
    </div>
  );
     
  const userFrmComp =  (
    <div
      className="h-screen flex items-center justify-center relative"
    >
      <SignUpFormUserInfo
        user={formData} 
        dispatch={dispatch}/>
    </div>
  );

  const multiStepForm = [
    emailFrmComp,
    userFrmComp
  ]

  return (
    multiStepForm[currentTab]
  )

}

export default SignUpMain;