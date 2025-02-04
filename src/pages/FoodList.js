import React, { useEffect, useState } from 'react';
import { getFoods, getScrapperFoods } from '../api/requests';
import { List, ListItem, ListItemText, Typography, Box, Paper, Divider, IconButton, TextField, CircularProgress, InputAdornment, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const data = await getFoods();
        setFoods(data);
        setFilteredFoods(data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleFoodClick = (foodId) => {
    navigate(`/foods/${foodId}`);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFilterSubmit = () => {
    const filtered = foods.filter(food =>
      food.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredFoods(filtered);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFilterSubmit();
    }
  };

  const handleScrapperFetch = async () => {
    setLoading(true);
    try {
      const data = await getScrapperFoods();
      setFoods(data);
      setFilteredFoods(data);
    } catch (error) {
      console.error('Error fetching scrapper foods:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          Lista de Alimentos
        </Typography>
        <TextField
          label="Filtrar Alimentos"
          variant="outlined"
          sx={{ width: '300px' }}
          value={filter}
          onChange={handleFilterChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleFilterSubmit}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={4} sx={{ borderRadius: 2 }}>
          {filteredFoods.length > 0 ? (
            <List>
              {filteredFoods.map((food, index) => (
                <React.Fragment key={food.id}>
                  <ListItem
                    button
                    onClick={() => handleFoodClick(food.id)}
                    sx={{
                      padding: 2,
                      '&:hover': {
                        backgroundColor: '#e0e0e0',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <ListItemText
                      primary={food.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="textSecondary">
                            Código: {food.code}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="textSecondary">
                            Nome Científico: {food.scientificName}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="textSecondary">
                            Grupo: {food.group}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="textSecondary">
                            Marca: {food.brand}
                          </Typography>
                        </>
                      }
                      sx={{ color: '#333', fontWeight: 'medium' }}
                    />
                    <IconButton edge="end" aria-label="navigate">
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </ListItem>
                  {index < filteredFoods.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
              <Button variant="contained" color="primary" onClick={handleScrapperFetch}>
                Carregar Alimentos do Scrapper
              </Button>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default FoodList;
