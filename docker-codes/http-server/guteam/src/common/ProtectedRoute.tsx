// NOTE:サンプルコードを流用、関数定義およびeslintの無効化は許容する
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Route } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export function ProtectedRoute({ component, ...args }: any) {
  return (
    <Route component={withAuthenticationRequired(component, {})} {...args} />
  );
}
