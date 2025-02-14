import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ background: '#2E3B55' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h5" 
          component={Link} 
          to="/"
          sx={{ 
            fontWeight: 'bold', 
            letterSpacing: 2, 
            color: '#FFF',
            textDecoration: 'none'
          }}
        >
          SOA
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={Link} 
            to="/flats"
            sx={{ mx: 1, fontWeight: 'bold', letterSpacing: 1 }}
          >
            Flats
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/agency"
            sx={{ mx: 1, fontWeight: 'bold', letterSpacing: 1 }}
          >
            Agency
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
