// import React, { createContext,useReducer } from "react";
// import axios from "axios";
// import server from "../../env";

// export const Store = createContext({
//   handleLogin: () => {},
//   handleSignup: () => {},
//   handleLogout: () => {},
// });

// const reducer=(state, action)=>{
//       switch (action.type) {
//     case "ADD_Signup":
//       const res = await axios.post(
//         `${server}/signup`,
//         { email, password,name },
//         { withCredentials: true }
//       )
// }

// export const AuthContext = ({ children }) => {

//      const [state, dispatch] = useReducer(reducer, []);

//   const handleLogin = () => {
//     console.log("Login called");
//   };

//   const handleSignup = (data) => {
//     dispatch({
//       type: "ADD_Signup",
//       payload: {
//        name: data.name,
//        email: data.email,
//         password: data.password,
//       },
//     });
//   };
//   };

//   const handleLogout = () => {
//     console.log("Logout called");
//   };

//   return (
//     <Store.Provider
//       value={{
//         handleLogin,
//         handleSignup,
//         handleLogout,
//       }}
//     >
//       {children}
//     </Store.Provider>
//   );
// };