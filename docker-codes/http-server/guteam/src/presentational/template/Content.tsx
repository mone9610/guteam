import { VFC } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Timeline from './Timeline';
import Community from './Community';
import Profile from './Profile';
import AdminUser from './AdminUser';

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
      <Route path="/client/profile">
        <Profile />
      </Route>
      <Route path="/client/admin/user">
        <AdminUser />
      </Route>
    </Switch>
  </div>
);

export default Content;
