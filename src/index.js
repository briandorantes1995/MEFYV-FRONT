import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {persistor,store} from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        </PersistGate>
</Provider>
);
