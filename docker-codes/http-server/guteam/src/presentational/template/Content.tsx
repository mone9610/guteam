import { VFC } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Timeline from './Timeline';
import Community from './Community';

const Content: VFC = () => (
  <div>
    <Switch>
      <Route exact path="/client">
        <Timeline />
      </Route>
      <Route path="/client/timeline">
        <Timeline />
      </Route>
      <Route path="/client/community">
        <Community />
      </Route>
    </Switch>
  </div>
);

export default Content;
