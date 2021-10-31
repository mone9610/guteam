/* eslint-disable camelcase */
// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */
import { VFC } from 'react';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { CommunityData } from 'common/CustomTypes';

type Props = {
  menu: CommunityData[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const CommunityList: VFC<Props> = (props) => {
  const history = useHistory();
  const { menu } = props;
  const classes = useStyles();

  return (
    <List component="div" disablePadding>
      {menu?.map((m) => (
        <ListItem button className={classes.nested} key={m.id}>
          <ListItemText
            primary={m.name}
            onClick={() => history.push(`/client/community/${m.id}`)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default CommunityList;
