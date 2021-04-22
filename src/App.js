import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Sub from './pages/Sub';

function App() {
  return (
    // 국내와 세계 category를 통한 라우팅
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/world" exact component={Sub} />
    </Switch>
  );
}

export default App;
