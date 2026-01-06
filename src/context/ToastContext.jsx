// context/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 5000) => {
        const id = Date.now();
        const toast = { id, message, type, duration };

        setToasts(prev => [...prev, toast]);

        // Auto remove toast after duration
        setTimeout(() => {
            removeToast(id);
        }, duration);

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const success = useCallback((message, duration) => {
        return addToast(message, 'success', duration);
    }, [addToast]);

    const error = useCallback((message, duration) => {
        return addToast(message, 'error', duration);
    }, [addToast]);

    const info = useCallback((message, duration) => {
        return addToast(message, 'info', duration);
    }, [addToast]);

    const warning = useCallback((message, duration) => {
        return addToast(message, 'warning', duration);
    }, [addToast]);

    return (
        <ToastContext.Provider value={{ success, error, info, warning, removeToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-3">
                {toasts.map(toast => {
                    const Icon = {
                        success: CheckCircle,
                        error: XCircle,
                        warning: AlertCircle,
                        info: Info
                    }[toast.type] || Info;

                    const bgColor = {
                        success: 'bg-green-50 border-green-200',
                        error: 'bg-red-50 border-red-200',
                        warning: 'bg-yellow-50 border-yellow-200',
                        info: 'bg-blue-50 border-blue-200'
                    }[toast.type] || 'bg-blue-50 border-blue-200';

                    const textColor = {
                        success: 'text-green-800',
                        error: 'text-red-800',
                        warning: 'text-yellow-800',
                        info: 'text-blue-800'
                    }[toast.type] || 'text-blue-800';

                    const iconColor = {
                        success: 'text-green-500',
                        error: 'text-red-500',
                        warning: 'text-yellow-500',
                        info: 'text-blue-500'
                    }[toast.type] || 'text-blue-500';

                    return (
                        <div
                            key={toast.id}
                            className={`${bgColor} border rounded-lg shadow-lg p-4 w-80 animate-slideIn`}
                            role="alert"
                        >
                            <div className="flex items-start">
                                <Icon className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${iconColor}`} />
                                <div className="flex-1">
                                    <p className={`text-sm font-medium ${textColor}`}>{toast.message}</p>
                                </div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="ml-3 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
};