import { Box, TextField } from "@mui/material";

interface ExactStringFilterProps {
    field: string
    onChange: Function
}

const ExactStringFilter: React.FC<ExactStringFilterProps> = ({ field, onChange }) => {
    return ( 
        <Box sx={{padding: '5px'}}>
        <TextField
            value={field}
            onChange={(e) => onChange(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px' }}
        />
      </Box>
     );
}
 
export default ExactStringFilter;