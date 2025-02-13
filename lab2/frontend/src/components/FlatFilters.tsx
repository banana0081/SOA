import React, { useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import ExactStringFilter from './filters/ExactStringFilter';
import DateFromToFilter from './filters/DateFromToFilter';
import NumberFromToFilter from './filters/NumberFromToFilter';
import SingleCheckboxFilter from './filters/SingleCheckboxFilter';
import ComposibleFilter from './filters/ComposibleFilter';

interface FlatFiltersProps {
  onApplyFilters: (filters: string[]) => void;
  onClearFilters: () => void;
}

const FlatFilters: React.FC<FlatFiltersProps> = ({ onApplyFilters, onClearFilters }) => {

  const [priceStart, setPriceStart] = useState<number | ''>('')
  const [priceEnd, setPriceEnd] = useState<number | ''>('')
  const [name, setName] = useState('');
  const [creationDateStart, setCreationDateStart] = useState('');
  const [creationDateEnd, setCreationDateEnd] = useState('');
  const [xStart, setXStart] = useState<number | ''>('');
  const [xEnd, setXEnd] = useState<number | ''>('');
  const [yStart, setYStart] = useState<number | ''>('');
  const [yEnd, setYEnd] = useState<number | ''>('');
  const [areaStart, setAreaStart] = useState<number | ''>('');
  const [areaEnd, setAreaEnd] = useState<number | ''>('');
  const [timeToMetroStart, setTimeToMetroStart] = useState<number | ''>('');
  const [timeToMetroEnd, setTimeToMetroEnd] = useState<number | ''>('');
  const [timeToMetroByWalkStart, setTimeToMetroByWalkStart] = useState<number | ''>('');
  const [timeToMetroByWalkEnd, setTimeToMetroByWalkEnd] = useState<number | ''>('');
  const [heating, setHeating] = useState<string | boolean | null>(null);
  const [furnish, setFurnish] = useState<string | boolean | null>('');
  const [houseName, setHouseName] = useState('');
  const [houseYearStart, setHouseYearStart] = useState<number | ''>('');
  const [houseYearEnd, setHouseYearEnd] = useState<number | ''>('');
  const [houseFloorStart, setHouseFloorStart] = useState<number | ''>('');
  const [houseFloorEnd, setHouseFloorEnd] = useState<number | ''>('');

  const handleApply = () => {
    let updatedFilters: string[] = [];
    
    if (priceStart) updatedFilters.push(`price>${priceStart}`);
    if (priceEnd) updatedFilters.push(`price<${priceEnd}`);
    if (name) updatedFilters.push(`name=${name}`);
    if (creationDateStart) updatedFilters.push(`creationDate>${creationDateStart}`);
    if (creationDateEnd) updatedFilters.push(`creationDate<${creationDateEnd}`);
    if (xStart) updatedFilters.push(`coordinates.x>${xStart}`);
    if (xEnd) updatedFilters.push(`coordinates.x<${xEnd}`);
    if (yStart) updatedFilters.push(`coordinates.y>${yStart}`);
    if (yEnd) updatedFilters.push(`coordinates.y<${yEnd}`);
    if (areaStart) updatedFilters.push(`area>${areaStart}`);
    if (areaEnd) updatedFilters.push(`area<${areaEnd}`);
    if (timeToMetroStart) updatedFilters.push(`timeToMetroByTransport>${timeToMetroStart}`);
    if (timeToMetroEnd) updatedFilters.push(`timeToMetroByTransport<${timeToMetroEnd}`);
    if (timeToMetroByWalkStart) updatedFilters.push(`timeToMetroByWalk>${timeToMetroByWalkStart}`);
    if (timeToMetroByWalkEnd) updatedFilters.push(`timeToMetroByWalk<${timeToMetroByWalkEnd}`);
    if (heating !== null) updatedFilters.push(`centralHeating=${heating}`);
    if (furnish) updatedFilters.push(`furnish=${furnish}`);
    if (houseName) updatedFilters.push(`house.name=${houseName}`);
    if (houseYearStart) updatedFilters.push(`house.year>${houseYearStart}`);
    if (houseYearEnd) updatedFilters.push(`house.year<${houseYearEnd}`);
    if (houseFloorStart) updatedFilters.push(`house.numberOfFlatsOnFloor>${houseFloorStart}`);
    if (houseFloorEnd) updatedFilters.push(`house.numberOfFlatsOnFloor<${houseFloorEnd}`);
    console.log(updatedFilters)
    onApplyFilters(updatedFilters);
  };

  const handleClear = () => {
    setName('');
    setCreationDateStart('');
    setCreationDateEnd('');
    setXStart('');
    setXEnd('');
    setYStart('');
    setYEnd('');
    setAreaStart('');
    setAreaEnd('');
    setTimeToMetroStart('');
    setTimeToMetroEnd('');
    setTimeToMetroByWalkStart('');
    setTimeToMetroByWalkEnd('');
    setHeating(null);
    setFurnish('');
    setHouseName('');
    setHouseYearStart('');
    setHouseYearEnd('');
    setHouseFloorStart('');
    setHouseFloorEnd('');
    onClearFilters();
  };

  return (
    <Paper sx={{padding: '30px'}}>
        <Typography variant="h6">Filters</Typography>

        <ComposibleFilter label='Price'>
          <NumberFromToFilter from={priceStart} to={priceEnd} onChangeFrom={setPriceStart} onChangeTo={setPriceEnd} />
        </ComposibleFilter>

        <ComposibleFilter label='Name'>
          <ExactStringFilter field={name} onChange={setName} />
        </ComposibleFilter>
      
        <ComposibleFilter label='Creation date'>
          <DateFromToFilter from={creationDateStart} to={creationDateEnd} onChangeFrom={setCreationDateStart} onChangeTo={setCreationDateEnd} />
        </ComposibleFilter>
        
        <ComposibleFilter label='Coordinates X'>
          <NumberFromToFilter from={xStart} to={xEnd} onChangeFrom={setXStart} onChangeTo={setXEnd} />
        </ComposibleFilter>

        <ComposibleFilter label='Coordinates Y'>
          <NumberFromToFilter from={yStart} to={yEnd} onChangeFrom={setYStart} onChangeTo={setYEnd} />
        </ComposibleFilter>

        <ComposibleFilter label='Area'>
          <NumberFromToFilter from={areaStart} to={areaEnd} onChangeFrom={setAreaStart} onChangeTo={setAreaEnd} />
        </ComposibleFilter>

        <ComposibleFilter label='Time to metro by walk'>
          <NumberFromToFilter from={timeToMetroByWalkStart} to={timeToMetroByWalkEnd} onChangeFrom={setTimeToMetroByWalkStart} onChangeTo={setTimeToMetroByWalkEnd} />
        </ComposibleFilter>

        <ComposibleFilter label='Time to metro by transport'>
          <NumberFromToFilter from={timeToMetroStart} to={timeToMetroEnd} onChangeFrom={setTimeToMetroStart} onChangeTo={setTimeToMetroEnd} />
        </ComposibleFilter>

        <ComposibleFilter label='Heating'>
          <SingleCheckboxFilter 
            options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false }
            ]}
            onChange={setHeating} 
            selected={heating}
          />
        </ComposibleFilter>

        <ComposibleFilter label='furnish'>
          <SingleCheckboxFilter
            options={[
              {label: 'Designer', value: 'designer'},
              {label: 'Fine', value: 'fine'},
              {label: 'None', value: 'none'}
            ]} 
            selected={furnish} 
            onChange={setFurnish}       
          />
        </ComposibleFilter>

        <ComposibleFilter label='House name'>
          <ExactStringFilter field={houseName} onChange={setHouseName} />
        </ComposibleFilter>

        <ComposibleFilter label='House year'>
          <NumberFromToFilter from={houseYearStart} to={houseYearEnd} onChangeFrom={setHouseYearStart} onChangeTo={setHouseYearEnd} />
        </ComposibleFilter>

        <ComposibleFilter label='Flats on floor'>
          <NumberFromToFilter from={houseFloorStart} to={houseFloorEnd} onChangeFrom={setHouseFloorStart} onChangeTo={setHouseFloorEnd} />
        </ComposibleFilter>

        <Button variant="contained" color="primary" onClick={handleApply} style={{ marginRight: '10px' }}>
            Apply Filters
        </Button>
        <Button variant="outlined" onClick={handleClear}>
            Clear Filters
        </Button>
    </Paper>
  );
};

export default FlatFilters;
