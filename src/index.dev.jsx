import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import Demo from './components/Demo';

const HotApp = hot(module)(Demo);

ReactDOM.render(<Demo />, document.getElementById('app'));
