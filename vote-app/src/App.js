import React, { useState, useEffect, useCallback } from 'react';

import './App.css';

function App() {
  const [results, setResults] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(process.env.REACT_APP_API_HOST)
        .then((res) => res.json())
        .then(data => setResults(data));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const voteYes = useCallback(() => fetch(process.env.REACT_APP_API_HOST + '/yes', { method: 'POST' }), []);
  const voteNo = useCallback(() => fetch(process.env.REACT_APP_API_HOST + '/no', { method: 'POST' }), []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Votes for <i>yes</i> : {results && results.yes}
        </p>
        <p>
          Votes for <i>no</i> : {results && results.no}
        </p>
        <p>
          <button type="button" onClick={voteYes}>Yes</button>
          <button type="button" onClick={voteNo}>No</button>
        </p>
      </header>
    </div>
  );
}

export default React.memo(App);
