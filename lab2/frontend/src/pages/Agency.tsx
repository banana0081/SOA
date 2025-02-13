import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Paper } from '@mui/material';
import FlatTableForAgency from '../components/FlatTableForAgency';
import { AGENCY_API } from '../common/api';

interface Flat {
  id: number;
  name: string;
  price: number;
}

interface ErrorResponse {
  code: number;
  message: string;
}

const Agency: React.FC = () => {
  const [id1, setId1] = useState('');
  const [id2, setId2] = useState('');
  const [flat, setFlat] = useState<Flat | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const handleGetCheaper = async () => {
    setFlat(null);
    setError(null);

    try {
      const response = await fetch(`${AGENCY_API}/agency/get-cheaper/${id1}/${id2}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/xml',
        },
      });

      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'application/xml');

      if (xmlDoc.querySelector('Error')) {
        setError({
          code: parseInt(xmlDoc.querySelector('code')?.textContent || '0'),
          message: xmlDoc.querySelector('message')?.textContent || 'Unknown error',
        });
      } else {
        setFlat({
          id: parseInt(xmlDoc.querySelector('id')?.textContent || '0'),
          name: xmlDoc.querySelector('name')?.textContent || 'Unknown',
          price: parseInt(xmlDoc.querySelector('price')?.textContent || '0'),
        });
      }
    } catch (e) {
      setError({
        code: 500,
        message: 'Server error. Please try again later.',
      });
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Agency
      </Typography>

      <Paper sx={{padding: '40px', mb: '40px'}}>
        <Box sx={{ display: 'flex', gap: '10px', mb: 2 }}>
          <TextField
            label="ID 1"
            value={id1}
            onChange={(e) => setId1(e.target.value)}
          />
          <TextField
            label="ID 2"
            value={id2}
            onChange={(e) => setId2(e.target.value)}
          />
          <Button variant="contained" onClick={handleGetCheaper}>
            Get Cheaper Flat
          </Button>
        </Box>

        {flat && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Cheaper Flat:</Typography>
            <Typography>ID: {flat.id}</Typography>
            <Typography>Name: {flat.name}</Typography>
            <Typography>Price: {flat.price}</Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {`Error ${error.code}: ${error.message}`}
          </Alert>
        )}
      </Paper>
      <FlatTableForAgency />
    </Box>
  );
};

export default Agency;