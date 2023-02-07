import React, { createContext, ReactNode, useCallback, useContext } from "react";
import { useState } from "react";
import ToastContainer from "../components/ToastContainer";
import { v4 as uuidv4 } from "uuid"


export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info',
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

function ToastProvider({ children }: {children: ReactNode}) {
  const [messages, setMessages] = useState<ToastMessage[]>([])
  
  const addToast = useCallback(({ title, type, description}: Omit<ToastMessage, 'id'>) => {
    const id = uuidv4();

    const toast = {
      id,
      title,
      type, 
      description
    };

    setMessages((state) => [...state, toast])
  }, []);

  const removeToast = useCallback((id: string) => {
    // const m = messages.filter((message) => !message.id.includes(id))
    setMessages((state) => state.filter((message) => !(message.id === id)))
  }, [])
  
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages}/>
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if(!context) {
    throw new Error('useToast must be used within a ToatProvider')
  }

  return context;
}

export { ToastProvider, useToast }

