
export const handleLogin = ({isLoggedIn,setIsLoggedIn}) => {
    setIsLoggedIn(true);
  };

export const handleLogout = ({isLoggedIn,setIsLoggedIn}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
    localStorage.removeItem("loggedIn");
  };