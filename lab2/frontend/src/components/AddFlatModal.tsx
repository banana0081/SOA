import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import axios from 'axios';
import { useError } from '../providers/ErrorProvider';
import parseError from '../common/parseError';
import { SERVICE_API } from '../common/api';

interface AddFlatModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddFlatModal: React.FC<AddFlatModalProps> = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    x: '',
    y: '',
    area: '',
    numberOfRooms: '',
    timeToMetroByTransport: '',
    timeToMetroByWalk: '',
    centralHeating: false,
    furnish: 'none',
    houseName: '',
    houseYear: '',
    houseFlats: ''
  });
  const { showError } = useError()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const requestXml = `
      <FlatRequest>
        <name>${formData.name}</name>
        <price>${formData.price}</price>
        <coordinates>
          <x>${formData.x}</x>
          <y>${formData.y}</y>
        </coordinates>
        <area>${formData.area}</area>
        <numberOfRooms>${formData.numberOfRooms}</numberOfRooms>
        <timeToMetroByTransport>${formData.timeToMetroByTransport}</timeToMetroByTransport>
        <timeToMetroByWalk>${formData.timeToMetroByWalk}</timeToMetroByWalk>
        <centralHeating>${formData.centralHeating}</centralHeating>
        <furnish>${formData.furnish}</furnish>
        <house>
          <name>${formData.houseName}</name>
          <year>${formData.houseYear}</year>
          <numberOfFlatsOnFloor>${formData.houseFlats}</numberOfFlatsOnFloor>
        </house>
      </FlatRequest>`;

    try {
      await axios.post(`${SERVICE_API}/flats`, requestXml, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });
      onSuccess();
      onClose();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
              const errorMessage = parseError(error.response.data);
              showError(errorMessage); 
            } else {
              showError('Unexpected error');
            }
          } else {
            showError('Unexpected error');
          }
          console.error('Error adding flat:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" sx={{ mb: 2 }}>Добавить квартиру</Typography>
        <Box sx={scrollableFormStyle}>
          {[{
            label: 'Name', name: 'name' },
            { label: 'Price', name: 'price' },
            { label: 'Coordinate X', name: 'x' },
            { label: 'Coordinate Y', name: 'y' },
            { label: 'Area', name: 'area' },
            { label: 'Rooms number', name: 'numberOfRooms' },
            { label: 'Time to metro by transport', name: 'timeToMetroByTransport' },
            { label: 'Time to metro by walk', name: 'timeToMetroByWalk' },
            { label: 'House name', name: 'houseName' },
            { label: 'House year built', name: 'houseYear' },
            { label: 'Flats on floor', name: 'houseFlats' }
          ].map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={(formData as any)[field.name]}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          ))}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>Furnish</Typography>
          <RadioGroup
            row
            name="furnish"
            value={formData.furnish}
            onChange={handleChange}
          >
            <FormControlLabel value="designer" control={<Radio />} label="Designer" />
            <FormControlLabel value="fine" control={<Radio />} label="Fine" />
            <FormControlLabel value="none" control={<Radio />} label="None" />
          </RadioGroup>

          <FormControlLabel
            control={
              <Checkbox
                name="centralHeating"
                checked={formData.centralHeating}
                onChange={handleChange}
              />
            }
            label="Central Heating"
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Добавить
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    color: 'black'
  };
  
  const scrollableFormStyle = {
    maxHeight: '60vh',
    overflowY: 'auto',
    pr: 2,
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555',
    },
  };
  
  export default AddFlatModal;