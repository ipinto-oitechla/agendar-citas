import { createContext, useState, useContext, useMemo } from "react";

const AppointmentContext = createContext();

const initialState = {
  token: "",
  paciente: {},
};

export const AppointmentProvider = ({ children }) => {
  const [info, setInfo] = useState(initialState);

  const storeInfo = (logInfo) => {
    setInfo((prevState) => ({
      ...prevState,
      ...logInfo,
    }));
  };

  const value = useMemo(
    () => ({
      info,
      storeInfo,
    }),
    [info]
  );

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AppointmentContext);
};
