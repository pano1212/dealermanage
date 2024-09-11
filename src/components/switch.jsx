import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function SwitchLabels({isToggle,handleToggle}) {
  return (
    <FormGroup >
      <FormControlLabel className='justify-end' control={<Switch checked={isToggle} onChange={handleToggle} />} />
    </FormGroup>
  );
}
