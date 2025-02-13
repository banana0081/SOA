import { Box, TextField } from "@mui/material";

interface DateFromToFilterProps {
    from: number | ""
    to: number | ""
    onChangeFrom: Function
    onChangeTo: Function
}

const NumberFromToFilter: React.FC<DateFromToFilterProps> = ({ from, to, onChangeFrom, onChangeTo }) => {
    return ( 
        <Box>
            <Box sx={{padding: '5px', display: 'flex', flexDirection: 'row'}}>
                <Box sx={{padding: '5px'}}>
                    От
                </Box>
                <TextField
                    type="number"
                    value={from}
                    onChange={(e) => onChangeFrom(e.target.value === '' ? '' : +e.target.value)}
                    fullWidth
                    style={{ marginBottom: '10px' }}
                />
                <Box sx={{padding: '5px'}}>
                    до
                </Box>
                <TextField
                    type="number"
                    value={to}
                    onChange={(e) => onChangeTo(e.target.value === '' ? '' : +e.target.value)}
                    fullWidth
                    style={{ marginBottom: '10px' }}
                />
            </Box>
        </Box>
     );
}
 
export default NumberFromToFilter;