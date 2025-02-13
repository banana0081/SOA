import { Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

interface SingleCheckboxFilterProps {
    options: { value: string | boolean; label: string }[];
    selected: string | boolean | null;
    onChange: (selected: string | boolean | null) => void;
}

const SingleCheckboxFilter: React.FC<SingleCheckboxFilterProps> = ({ options, selected, onChange }) => {
    const handleChange = (value: string | boolean) => {
        onChange(selected === value ? null : value);
    };

    return (
        <Box sx={{ padding: '5px' }}>
            <FormGroup style={{ marginBottom: '10px' }}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value.toString()}
                        control={
                            <Checkbox
                                checked={selected === option.value}
                                onChange={() => handleChange(option.value)}
                            />
                        }
                        label={option.label}
                    />
                ))}
            </FormGroup>
        </Box>
    );
};

export default SingleCheckboxFilter;