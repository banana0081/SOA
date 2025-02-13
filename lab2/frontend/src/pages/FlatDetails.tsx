import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Grid, TextField, Button, Switch, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { SERVICE_API } from '../common/api';

const FlatDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useNavigate();
  const [flat, setFlat] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    axios.get(`${SERVICE_API}/flats/${id}`)
      .then(response => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const flatData = {
          id: xmlDoc.getElementsByTagName('id')[0]?.textContent,
          price: xmlDoc.getElementsByTagName('price')[0]?.textContent,
          name: xmlDoc.getElementsByTagName('name')[0]?.textContent,
          area: xmlDoc.getElementsByTagName('area')[0]?.textContent,
          numberOfRooms: xmlDoc.getElementsByTagName('numberOfRooms')[0]?.textContent,
          timeToMetroByTransport: xmlDoc.getElementsByTagName('timeToMetroByTransport')[0]?.textContent,
          timeToMetroByWalk: xmlDoc.getElementsByTagName('timeToMetroByWalk')[0]?.textContent,
          centralHeating: xmlDoc.getElementsByTagName('centralHeating')[0]?.textContent === 'true',
          furnish: xmlDoc.getElementsByTagName('furnish')[0]?.textContent,
          creationDate: xmlDoc.getElementsByTagName('creationDate')[0]?.textContent,
          x: xmlDoc.getElementsByTagName('coordinates')[0]?.getElementsByTagName('x')[0]?.textContent,
          y: xmlDoc.getElementsByTagName('coordinates')[0]?.getElementsByTagName('y')[0]?.textContent,
          houseName: xmlDoc.getElementsByTagName('house')[0]?.getElementsByTagName('name')[0]?.textContent,
          houseYear: xmlDoc.getElementsByTagName('house')[0]?.getElementsByTagName('year')[0]?.textContent,
          houseNumberOfFlatsOnFloor: xmlDoc.getElementsByTagName('house')[0]?.getElementsByTagName('numberOfFlatsOnFloor')[0]?.textContent,
        };
        setFlat(flatData);
        setFormData(flatData); // Инициализируем formData для редактирования
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const requestXml = `
      <FlatRequest>
        <id>${formData.id}</id>
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
          <numberOfFlatsOnFloor>${formData.houseNumberOfFlatsOnFloor}</numberOfFlatsOnFloor>
        </house>
      </FlatRequest>`;

    axios.put(`${SERVICE_API}/flats/${id}`, requestXml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    }).then(() => {
      setIsEditing(false);
      setFlat(formData);
    }).catch((error) => {
      console.error("Error updating flat:", error);
    });
  };

  const handleDelete = () => {
    axios.delete(`${SERVICE_API}/flats/${id}`)
      .then(() => {
        history("/flats"); // Redirect to flats list
      })
      .catch((error) => {
        console.error("Error deleting flat:", error);
      });
  };

  if (!flat) return <Typography>Loading...</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 4, m: 4 }}>
      <Typography variant="h4" gutterBottom>Flat Details</Typography>
      <FormControlLabel
        control={<Switch checked={isEditing} onChange={handleToggleEdit} />}
        label="Edit Mode"
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">General Information</Typography>
          {isEditing ? (
            <>
              <TextField
                label="ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Rooms"
                name="numberOfRooms"
                value={formData.numberOfRooms}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Time to Metro by Transport"
                name="timeToMetroByTransport"
                value={formData.timeToMetroByTransport}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Time to Metro by Walk"
                name="timeToMetroByWalk"
                value={formData.timeToMetroByWalk}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
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
                control={<Switch
                  checked={formData.centralHeating}
                  onChange={(e) => setFormData({
                    ...formData,
                    centralHeating: e.target.checked,
                  })}
                />}
                label="Central Heating"
              />
            </>
          ) : (
            <>
              <Typography><strong>ID:</strong> {flat.id}</Typography>
              <Typography><strong>Price:</strong> {flat.price}</Typography>
              <Typography><strong>Name:</strong> {flat.name}</Typography>
              <Typography><strong>Creation Date:</strong> {moment(flat.creationDate).format('D MMMM YYYY H:mm:ss')}</Typography>
              <Typography><strong>Area:</strong> {flat.area} m²</Typography>
              <Typography><strong>Rooms:</strong> {flat.numberOfRooms}</Typography>
              <Typography><strong>Time to Metro by Transport:</strong> {flat.timeToMetroByTransport} min</Typography>
              <Typography><strong>Time to Metro by Walk:</strong> {flat.timeToMetroByWalk} min</Typography>
              <Typography><strong>Heating:</strong> {flat.centralHeating ? 'Yes' : 'No'}</Typography>
              <Typography><strong>Furnish:</strong> {flat.furnish}</Typography>
            </>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Location & House Details</Typography>
          {isEditing ? (
            <>
              <TextField
                label="Coordinate X"
                name="x"
                value={formData.x}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Coordinate Y"
                name="y"
                value={formData.y}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="House Name"
                name="houseName"
                value={formData.houseName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Year Built"
                name="houseYear"
                value={formData.houseYear}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Flats per Floor"
                name="houseNumberOfFlatsOnFloor"
                value={formData.houseNumberOfFlatsOnFloor}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </>
          ) : (
            <>
              <Typography><strong>Coordinates:</strong> X: {flat.x}, Y: {flat.y}</Typography>
              <Typography><strong>House Name:</strong> {flat.houseName}</Typography>
              <Typography><strong>Year Built:</strong> {flat.houseYear}</Typography>
              <Typography><strong>Flats per Floor:</strong> {flat.houseNumberOfFlatsOnFloor}</Typography>
            </>
          )}
        </Grid>
      </Grid>
      <div style={{ marginTop: 20 }}>
        {isEditing ? (
          <Button onClick={handleSave} variant="contained" color="primary">Save Changes</Button>
        ) : (
          <>
            <Button onClick={handleDelete} variant="contained" color="secondary">Delete Flat</Button>
          </>
        )}
      </div>
    </Paper>
  );
};

export default FlatDetails;
