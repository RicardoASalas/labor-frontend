import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';


const useStyles = makeStyles(theme => ({
root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
//   const [chipData, setChipData] = React.useState([
//     { key: 0, label: 'Angular' },
//     { key: 1, label: 'jQuery' },
//     { key: 2, label: 'Polymer' },
//     { key: 3, label: 'React' },
//     { key: 4, label: 'Vue.js' },
//   ]);
   
    const [chipData, setChipData] = React.useState(props.skills);

    console.log(chipData)


  return (
    <Paper className={classes.root}>
      {chipData.map(data => {

        return (
          <Chip
            key={data.key}
            icon={<DoneIcon />}
            label={data.label}
            // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}