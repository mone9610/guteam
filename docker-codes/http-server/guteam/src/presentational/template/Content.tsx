import { VFC } from 'react';
import { Switch, Route } from 'react-router';

import Profile from 'container/template/Profile';
import Timeline from 'presentational/template/Timeline';

const Content: VFC = () => (
  <div>
    <Switch>
      <Route exact path="/client">
        <Timeline />
      </Route>
      <Route path="/client/timeline">
        <Timeline />
      </Route>
      <Route path="/client/profile">
        <Profile />
      </Route>
    </Switch>
  </div>
);

export default Content;
