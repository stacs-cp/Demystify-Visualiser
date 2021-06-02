import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DemystifyViewer from './components/DemystifyViewer';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <DemystifyViewer/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
