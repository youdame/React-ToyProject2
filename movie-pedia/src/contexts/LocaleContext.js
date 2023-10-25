import { useState, createContext, useContext } from "react";

const LocalContext = createContext();

export function LocaleProvider({ defaultValue = "ko", children }) {
  const [locale, setLocale] = useState(defaultValue);
  return (
    <LocalContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocalContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocalContext);
  if (!context) {
    throw new Error("반드시 LocalProvider 안에서 사용해야합니다.");
  }
  return context.locale;
}

export function useSetLocale() {
  const context = useContext(LocalContext);
  if (!context) {
    throw new Error("반드시 LocalProvider 안에서 사용해야합니다.");
  }
  return context.setLocale;
}
