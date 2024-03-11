import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
  } from "react";
  import PropTypes from "prop-types";
  
  const USER_APP = "USER_APP";
  
  const initialState = {};
  
  export const UserContext = createContext();
  
  export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(() =>
    JSON.parse(window.localStorage.getItem(USER_APP)));

    const userSetOnSession = useCallback(function (id, name, lastName, email, token, rol) {
        const user = {
            id: id,
            name: name,
            lastName: lastName,
            email: email,
            token: token,
            rol: rol,
          };
          window.localStorage.setItem(USER_APP, JSON.stringify(user));
          setUser(user);
      }, []);
  
  
    const userSetOffSession = useCallback(function(){
        window.localStorage.removeItem(USER_APP);
        setUser(initialState)}, []) 

  
    const value = useMemo(
      () => ({
        userSetOnSession,
        userSetOffSession,
        user,
      }),
      [user, userSetOffSession, userSetOnSession]
    );
  
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
    }
  
  UserContextProvider.propTypes = {
    children: PropTypes.object,
  };
  
  export function useUserContext() {
    return useContext(UserContext);
  }
  