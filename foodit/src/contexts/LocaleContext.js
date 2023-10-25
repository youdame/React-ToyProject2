import { createContext } from "react";
import { useState, useContext } from "react";
const LocaleContext = createContext();

export function LocaleProvider({ defaultValue = "ko", children }) {
  const [locale, setLocale] = useState(defaultValue);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("반드시 LocalProvider 안에서 사용해야합니다.");
  }
  return context.locale;
}

export function useSetLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("반드시 LocalProvider 안에서 사용해야합니다.");
  }
  return context.setLocale;
}
