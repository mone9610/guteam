// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */
import { VFC } from 'react';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

type Menu = {
  id: number;
  name: string;
};

type Props = {
  menu: Menu[];
  path: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const AccordionMenu: VFC<Props> = (props) => {
  const history = useHistory();
  const { menu, path } = props;
  const classes = useStyles();

  // idで昇順にソートする
  menu?.sort((a: Menu, b: Menu) => {
    if (a.id < b.id) {
      return -1;
    }
    return 1;
  });

  return (
    <List component="div" disablePadding>
      {menu?.map((m) => (
        <ListItem button className={classes.nested} key={m.id}>
          <ListItemText
            primary={m.name}
            onClick={() => history.push(`/client/${path}/${m.id}`)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default AccordionMenu;
