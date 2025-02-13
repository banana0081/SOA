import { Box, TextField } from "@mui/material";

interface DateFromToFilterProps {
    from: string
    to: string
    onChangeFrom: Function
    onChangeTo: Function
}

const DateFromToFilter: React.FC<DateFromToFilterProps> = ({ from, to, onChangeFrom, onChangeTo }) => {
    return (
        <Box>
        <Box sx={{padding: '5px', display: 'flex', flexDirection: 'row'}}>
            <Box sx={{padding: '5px'}}>
                От
            </Box>
            <TextField
                type="datetime-local"
                value={from}
                onChange={(e) => onChangeFrom(e.target.value)}
                InputLabelProps={{
                shrink: true,
                }}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            <Box sx={{padding: '5px'}}>
                до
            </Box>
            <TextField
                type="datetime-local"
                value={to}
                onChange={(e) => onChangeTo(e.target.value)}
                InputLabelProps={{
                shrink: true,
                }}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
        </Box>
      </Box>
      );
}
 
export default DateFromToFilter;