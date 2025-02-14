import React, { useState } from 'react';
import { Box } from '@mui/material';
import FlatTable from '../components/FlatTable';
import FlatFilters from '../components/FlatFilters';

const Flats: React.FC = () => {
  const [filters, setFilters] = useState<string[]>([]);

  const handleApplyFilters = (selectedFilters: string[]) => {
    setFilters(selectedFilters);
  };

  const handleClearFilters = () => {
    setFilters([]);
  };

  return (
    <div>
      <h1>Flats</h1>
      <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
        <Box sx={{flex: '1', width: '100%', padding: '20px'}}>
            <FlatFilters onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} />
        </Box>
        <Box sx={{flex: '4', width: '100%', padding: '20px'}}>
            <FlatTable filters={filters} />
        </Box>
      </div>
    </div>
  );
};

export default Flats;
