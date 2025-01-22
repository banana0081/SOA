import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Button, Box, Typography } from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import moment from 'moment';
import AddFlatModal from './AddFlatModal';
import parseError from '../common/parseError';
import { useError } from '../providers/ErrorProvider';
import { SERVICE_API } from '../common/api';

interface Flat {
  price: number;
  houseYear: number;
  houseFlats: number;
  creationDate: string;
  y: number;
  x: number;
  id: number;
  name: string;
  area: number;
  numberOfRooms: number;
  timeToMetroByTransport: number;
  timeToMetroByWalk: number;
  centralHeating: boolean;
  furnish: string;
  houseName: string;
}

const FlatTable: React.FC<{filters: string[]}> = ({ filters }) => {
  const { showError } = useError();
  const [flats, setFlats] = useState<Flat[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalFlats, setTotalFlats] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalRooms, setTotalRooms] = useState<number | null>(null);
  const [averageTime, setAverageTime] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortParams, setSortParams] = useState<string[]>([]);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleSuccess = () => setTimeout(() => fetchFlats(), 500);

  const columnMapper: Record<keyof Flat, { head: string; param: string }> = {
    'id': {head: 'ID', param: 'id'},
    'name': { head: 'Name', param: 'name' },
    'creationDate': { head: 'Creation date', param: 'creationDate' },
    'x': { head: 'X', param: 'coordinates.x' },
    'y': { head: 'Y', param: 'coordinates.y' },
    'area': { head: 'Area', param: 'area' },
    'numberOfRooms': { head: 'Rooms', param: 'numberOfRooms' },
    'timeToMetroByTransport': { head: 'Time to Metro by Transport', param: 'timeToMetroByTransport' },
    'timeToMetroByWalk': { head: 'Time to Metro by Walk', param: 'timeToMetroByWalk' },
    'centralHeating': { head: 'Heating', param: 'centralHeating' },
    'furnish': { head: 'Furnish', param: 'furnish' },
    'houseName': { head: 'House name', param: 'house.name' },
    'houseYear': { head: 'House year', param: 'house.year' },
    'houseFlats': { head: 'House flats', param: 'house.numberOfFlatsOnFloor' },
    'price': {head: 'Price', param: 'price'},
    
  }

  const fetchSummaryData = async () => {
    try {
      const roomsResponse = await axios.get(`${SERVICE_API}/flats/rooms/sum`);
      const metroResponse = await axios.get(`${SERVICE_API}/flats/metro/average`);

      const parser = new DOMParser();

      const roomsDoc = parser.parseFromString(roomsResponse.data, 'text/xml');
      const metroDoc = parser.parseFromString(metroResponse.data, 'text/xml');

      setTotalRooms(parseInt(roomsDoc.getElementsByTagName('totalRooms')[0].textContent || '0'));
      setAverageTime(parseFloat(metroDoc.getElementsByTagName('averageTime')[0].textContent || '0'));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  
  useEffect(() => {
    fetchSummaryData();
  }, []);

  const navigate = useNavigate();  

  const fetchFlats = async () => {
    try {
      const url = searchQuery ? `${SERVICE_API}/flats/search` : `${SERVICE_API}/flats`;
      const response = await axios.get(url, {
        params: {
          page: page + 1,
          size: rowsPerPage,
          query: searchQuery,
          filter: filters,
          sort: sortParams
        },
        paramsSerializer: { indexes: null },
      });

      if (response.status === 204) {
        setFlats([]);  
        setTotalFlats(0);  
        return;
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const flatsNodes = xmlDoc.getElementsByTagName('flat');
      const flatList = Array.from(flatsNodes).map((flatNode: any) => ({
        id: flatNode.getElementsByTagName('id')[0]?.textContent,
        name: flatNode.getElementsByTagName('name')[0]?.textContent,
        area: flatNode.getElementsByTagName('area')[0]?.textContent,
        numberOfRooms: flatNode.getElementsByTagName('numberOfRooms')[0]?.textContent,
        timeToMetroByTransport: flatNode.getElementsByTagName('timeToMetroByTransport')[0]?.textContent,
        timeToMetroByWalk: flatNode.getElementsByTagName('timeToMetroByWalk')[0]?.textContent,
        centralHeating: flatNode.getElementsByTagName('centralHeating')[0]?.textContent === 'true',
        furnish: flatNode.getElementsByTagName('furnish')[0]?.textContent,
        houseName: flatNode.getElementsByTagName('house')[0]?.getElementsByTagName('name')[0]?.textContent,
        x: flatNode.getElementsByTagName('coordinates')[0]?.getElementsByTagName('x')[0]?.textContent,
        y: flatNode.getElementsByTagName('coordinates')[0]?.getElementsByTagName('y')[0]?.textContent,
        creationDate: flatNode.getElementsByTagName('creationDate')[0]?.textContent,
        houseYear: flatNode.getElementsByTagName('house')[0]?.getElementsByTagName('year')[0]?.textContent,
        houseFlats: flatNode.getElementsByTagName('house')[0]?.getElementsByTagName('numberOfFlatsOnFloor')[0]?.textContent,
        price: flatNode.getElementsByTagName('price')[0]?.textContent
      }));

      setFlats(flatList);
      setTotalFlats(parseInt(xmlDoc.getElementsByTagName('totalFlats')[0]?.textContent || '0'));
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

  const toggleSort = (column: string) => {
    if (sortParams.includes(column)) setSortParams(sortParams.map(param => param === column ? `-${column}` : param))
    else if (sortParams.includes(`-${column}`)) setSortParams(sortParams.filter(param => param !== `-${column}`))
    else setSortParams([...sortParams, column])
  }

  useEffect(() => {
    fetchFlats();
  }, [page, rowsPerPage, searchQuery, filters, sortParams]); 

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (id: number) => {
    navigate(`/flats/${id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); 
  };

  return (
    <Paper sx={{padding: '30px'}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Paper sx={{ padding: 1 }}>
          <Typography>Total rooms number: {totalRooms ?? 'Загрузка...'}</Typography>
          <Typography>Average time to metro: {averageTime ? averageTime.toFixed(2) : 'Загрузка...'}</Typography>
        </Paper>
        <Button variant="contained" color="primary" onClick={handleModalOpen}>
          Add Flat
        </Button>
      </Box>
      <TextField
        label="Search Flats"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        style={{ margin: '20px 0' }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Object.entries(columnMapper).filter(([key]) => key !== 'id').map(([key, value]) => (
                <TableCell sx={{cursor: 'pointer', userSelect: 'none'}} key={key} onClick={() => toggleSort(value.param)}>
                  {`${value.head} `}
                  {(!sortParams.includes(value.param) && !sortParams.includes(`-${value.param}`)) ? <UnfoldMoreIcon/> : ''}
                  {sortParams.includes(value.param) ? <KeyboardArrowUpIcon /> : ''}
                  {sortParams.includes(`-${value.param}`) ? <KeyboardArrowDownIcon /> : ''}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {flats.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <Typography variant="h6" color="textSecondary">
                    No flats
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              flats.map(flat => (
                <TableRow onClick={() => handleRowClick(flat.id)} sx={{userSelect: 'none', cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' }}}>
                  {Object.entries(columnMapper).filter(([key]) => key !== 'id').map(([key]) => (
                    <TableCell 
                      key={key} 
                      sx={{
                        maxWidth: 150,  
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {
                        key === 'centralHeating'
                        ? flat[key as keyof Flat] ? 'Yes' : 'No'
                        : key === 'creationDate'
                          ? moment(flat[key as keyof Flat] as string).format('D MMMM YYYY HH:mm:ss')
                          : flat[key as keyof Flat]
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>

          
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 20]}
        count={totalFlats}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddFlatModal open={modalOpen} onClose={handleModalClose} onSuccess={handleSuccess} />
    </Paper>
  );
};

export default FlatTable;

