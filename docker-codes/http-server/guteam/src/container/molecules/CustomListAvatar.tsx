// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */
// railsから取得するjsonの命名規則はキャメルケースであるため、無効化
/* eslint-disable camelcase */
import { VFC } from 'react';

import { useDispatch } from 'react-redux';
import {
  setProfileModalOpen,
  setProfileModalState,
} from 'common/features/profileModalSlice';
import { getUser } from 'common/customFunctions';
import { useToken } from 'common/CustomHooks';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

type Props = {
  image_url?: string;
  name?: string;
  sub?: string;
};

const CustomListAvatar: VFC<Props> = (props) => {
  const token = useToken();
  const { sub, image_url } = props;

  //   プロフィール用のモーダルを制御する機構
  const dispatch = useDispatch();
  const handleModal = () => {
    void getUser(token, sub as string)
      .then((u) => {
        dispatch(setProfileModalState(u));
      })
      .then(() => {
        dispatch(setProfileModalOpen(true));
      });
  };

  return (
    <ListItemAvatar>
      <IconButton onClick={handleModal}>
        <Avatar alt="" src={image_url} />
      </IconButton>
    </ListItemAvatar>
  );
};
export default CustomListAvatar;
