import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
// import Paper from '@material-ui/core/Paper';
// import TagFacesIcon from '@material-ui/icons/TagFaces';
// import { isElementOfType } from 'react-dom/test-utils';

//<SkillChip skills = {this.state.userSkills}  /> 
//Copiar el componente y pasarle las props como un array de objetos skill con id y name


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
    console.log(props.skills)
    const classes = useStyles();
    //Se almacena el array de objetos skill en la variable chipData
     var [chipData, setChipData] = React.useState(props.skills);

     const handleDelete = chipToDelete => () => {
        setChipData(chips => chips.filter(chip => chip.id !== chipToDelete.id));
      };


  return (
    
    <div>

      {chipData.map(data => {
        let icon;

        

        return (
          <Chip
            key={data.id}
            icon={icon}
            label={data.name}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
      </div>
  );
}