import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import RoutesProvider from "@/config/routes";
import {ConfigProvider} from 'antd';
import reportWebVitals from './reportWebVitals';
import zhCN from 'antd/locale/zh_CN';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ConfigProvider
        locale={zhCN}
    >
        <React.StrictMode>
            <RoutesProvider/>
        </React.StrictMode>
    </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
