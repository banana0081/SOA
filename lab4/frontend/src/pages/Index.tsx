import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/flats');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h4"
        color="white"
        align="center"
        sx={{ marginBottom: 2 }}
      >
        Лабораторная по СОА
      </Typography>
      <Typography
        variant="h6"
        color="white"
        align="center"
        sx={{ marginBottom: 4 }}
      >
        Авторы: Погрибняк Иван и Бугаев Сергей, группа P34131
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleExploreClick}
        sx={{ width: '200px' }}
      >
        Explore
      </Button>
    </Box>
  );
};

export default Index;