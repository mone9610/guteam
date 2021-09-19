// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */
// railsから取得するjsonの命名規則はキャメルケースであるため、無効化
/* eslint-disable camelcase */
import { VFC } from 'react';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

type Props = {
  sub?: string;
  picture_url?: string;
};

const CustomListAvatar: VFC<Props> = (props) => {
  const { sub, picture_url } = props;
  const test = () => {
    alert(sub);
  };
  return (
    <ListItemAvatar>
      <IconButton onClick={test}>
        <Avatar alt="" src={picture_url} />
      </IconButton>
    </ListItemAvatar>
  );
};
export default CustomListAvatar;
