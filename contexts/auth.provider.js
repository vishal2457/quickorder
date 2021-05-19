// import React, { useReducer } from "react";
// import { AuthContext } from "./auth.context";

// const INITIAL_STATE = {
//   isAuthenticated:  false,
// };


// console.log(INITIAL_STATE);
// function reducer(state, action) {
//   switch (action.type) {
//     case "SIGNIN_SUCCESS":
//       return {
//         ...state,
//         isAuthenticated: false,
//       };
//     case "SIGN_OUT":
//       return {
//         ...state,
//         isAuthenticated: false,
//       };
//     default:
//       return state;
//   }
// }

// export const AuthProvider = ({ children }) => {
//   const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
//   return (
//     <AuthContext.Provider value={{ authState, authDispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
