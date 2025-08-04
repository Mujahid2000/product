'use client';
import { store } from '@/Store/AllStore/Store';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
const Redux_ContextProvide = ({children}: {children: ReactNode}) => {
    return (
        <Provider store={store}>
          {children}  
        </Provider>
    );
};

export default Redux_ContextProvide;