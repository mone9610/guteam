import { VFC } from 'react';
import { Switch, Route } from 'react-router';

import Profile from 'container/template/Profile';
import Timeline from 'presentational/template/Timeline';
import Community from 'presentational/template/Community';
import AdminUser from 'presentational/template/AdminUser';

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
