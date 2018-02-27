import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import TodoList from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TodoList />, document.getElementById('root'));
registerServiceWorker();
