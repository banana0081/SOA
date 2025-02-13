import axios from "axios";
import { useError } from "../providers/ErrorProvider";
import { useEffect, useState } from "react";
import parseError from "../common/parseError";
import { Box, Checkbox, FormControlLabel, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AGENCY_API } from "../common/api";

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

const FlatTableForAgency = () => {
    const { showError } = useError();
    const [flats, setFlats] = useState<Flat[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalFlats, setTotalFlats] = useState(0);
    const [isDesc, setIsDesc] = useState(false)
    const [isByTransport, setIsByTransport] = useState(false);
    const navigate = useNavigate()

    const fetchFlats = async () => {
        try {
          const url = `${AGENCY_API}/agency/get-ordered-by-time-to-metro/${isByTransport}/${isDesc}`;
          const response = await axios.get(url, {
            params: {
              page: page + 1,
              size: rowsPerPage
            },
            paramsSerializer: { indexes: null }
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

    useEffect(() => {
        fetchFlats();
    }, [page, rowsPerPage, isByTransport, isDesc]); 

    const handleRowClick = (id: number) => {
        navigate(`/flats/${id}`);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
      };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return ( 
        <Paper sx={{padding: '20px', display: 'flex', flexDirection: 'column'}}>
            <Typography sx={{textAlign: 'center'}} variant="h5">{`Flats sorted by ${isByTransport ? 'Time to Metro by Transport' : 'Time to Metro by Walk'}`}</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <FormControlLabel
                    control={
                        <Checkbox
                        name="isDesc"
                        checked={isDesc}
                        onChange={() => setIsDesc(!isDesc)}
                        />
                    }
                    label="Descending"
                />
                <FormControlLabel
                control={
                    <Checkbox
                        name="isByTransport"
                        checked={isByTransport}
                        onChange={() => setIsByTransport(!isByTransport)}
                        />
                    }
                    label="Is by transport"
                />
            </Box>
            <Box>
            <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Flat Name</TableCell>
                    <TableCell>Creation date</TableCell>
                    <TableCell>X</TableCell>
                    <TableCell>Y</TableCell>
                    <TableCell>Area</TableCell>
                    <TableCell>Rooms</TableCell>
                    <TableCell>Time to Metro by Walk</TableCell>
                    <TableCell>Time to Metro by Transport</TableCell>
                    <TableCell>Heating</TableCell>
                    <TableCell>Furnish</TableCell>
                    <TableCell>House Name</TableCell>
                    <TableCell>House Year</TableCell>
                    <TableCell>House Flats on Floor</TableCell>
                    <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {flats.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={12} align="center">
                        <Typography variant="h6" color="textSecondary">
                            Квартиры не найдены
                        </Typography>
                        </TableCell>
                    </TableRow>
                    ) : (
                    flats.map(flat => (
                        <TableRow
                        key={flat.id}
                        onClick={() => handleRowClick(flat.id)}
                        sx={{
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                        }}
                        >
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.name}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{moment(flat.creationDate).format('D MMMM YYYY H:mm:ss')}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.x}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.y}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.area}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.numberOfRooms}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.timeToMetroByWalk}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.timeToMetroByTransport}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.centralHeating ? 'Yes' : 'No'}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.furnish}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.houseName}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.houseYear}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.houseFlats}</TableCell>
                        <TableCell
                            sx={{
                            maxWidth: 150,  // Ширина ячейки
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            }}
                        >{flat.price}</TableCell>
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
            </Box>
        </Paper>
     );
}
 
export default FlatTableForAgency;