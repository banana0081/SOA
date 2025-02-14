import React, { createContext, useState, useContext, ReactNode } from 'react';

// Типы для контекста
interface ErrorContextType {
  open: boolean;
  errorMessage: string;
  showError: (message: string) => void;
  closeError: () => void;
}

// Создаем контекст с пустым значением
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// Создаем провайдер для контекста
export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Функция для отображения ошибки
  const showError = (message: string) => {
    setErrorMessage(message);
    setOpen(true);
  };

  // Функция для закрытия ошибки
  const closeError = () => {
    setOpen(false);
    setErrorMessage('');
  };

  return (
    <ErrorContext.Provider value={{ open, errorMessage, showError, closeError }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Хук для использования контекста
export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};