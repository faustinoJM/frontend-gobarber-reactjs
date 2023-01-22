import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "./toast";


function AppProvider({ children }: { children: ReactNode} ) {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
    
  )
}

export default AppProvider;