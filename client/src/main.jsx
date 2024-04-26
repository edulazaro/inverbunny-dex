import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client'
//import './scss/index.scss';
import './index.css'

import LoadingContainer from './LoadingContainer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadingContainer />
  </React.StrictMode>,
)
