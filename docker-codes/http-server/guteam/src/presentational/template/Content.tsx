import { VFC } from 'react';
import { Switch, Route } from 'react-router';

import Profile from 'container/template/Profile';
import Timeline from 'presentational/template/Timeline';
import Notification from 'presentational/template/Notification';

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
      <Route path="/client/notification">
        <Notification />
      </Route>
    </Switch>
  </div>
);

export default Content;
