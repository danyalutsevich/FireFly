import React from 'react';
import ReactDOM from 'react-dom/client';
import { App }from './Components/App';
import Snowfall from 'react-snowfall'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Snowfall style={{position:"fixed", zIndex:"1000"}} speed={[1,5]} radius={[0.2,0.5]} wind={[-3,3]} snowflakeCount={200}/>
    <App />
  </React.StrictMode>
);

