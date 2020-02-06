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

  let skills = []
  
  
    props.skills.map(skill=>{
        return skills.unshift({id: skill.id, name: skill.name});
    });
  



    const [chipData] = React.useState(skills);

  

  return (
    <Paper className={classes.root}>
      {chipData.map(data => {

        return (
          <Chip
            key={data.id}
            icon={<DoneIcon />}
            label={data.name}
            // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}