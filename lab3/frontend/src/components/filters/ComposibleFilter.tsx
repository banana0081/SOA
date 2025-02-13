import { Box, Typography, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

interface CollapsibleFilterProps {
  label: string;
  children: React.ReactNode;
}

const CollapsibleFilter: React.FC<CollapsibleFilterProps> = ({ label, children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box sx={{ marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          cursor: "pointer",
          backgroundColor: "#f5f5f5",
        }}
        onClick={handleToggle}
      >
        <Typography>{label}</Typography>
        <IconButton size="small" sx={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      <Collapse in={expanded}>{children}</Collapse>
    </Box>
  );
};

export default CollapsibleFilter;