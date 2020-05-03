import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve, reject) => {
    const jsonpCallback = '$$googleMapsAsyncLoadCallback';
    const googleMapsParameters = [
      'libraries=geometry,places',
      `v=quarterly`,
      `key=${process.env.REACT_APP_GMAPS_API_KEY}`,
      `callback=${jsonpCallback}`
    ];
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?${googleMapsParameters.join('&')}`;
    document.body.appendChild(script);

    // @ts-ignore
    window[jsonpCallback] = function() {
      // @ts-ignore
      delete window[jsonpCallback];
      document.body.removeChild(script);
      resolve();
    };
  });
}

async function bootstrapApplication(): Promise<void> {
  await loadGoogleMaps();

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

bootstrapApplication()
  .catch(e => console.error(e));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
