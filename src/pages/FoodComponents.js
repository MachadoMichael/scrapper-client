import React, { useEffect, useState } from 'react';
import { getFoodComponents, getScrapperFoodComponents } from '../api/requests';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';

const FoodComponents = () => {
  const { foodId } = useParams();
  const [components, setComponents] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchComponents = async () => {
    setLoading(true);
    try {
      const data = await getFoodComponents(foodId);
      setComponents(data || []);
      setFoodName(data.foodName || '');
    } catch (error) {
      console.error('Error fetching components:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, [foodId]);

  const handleScrapperFetch = async () => {
    setLoading(true);
    try {
      await getScrapperFoodComponents(foodId);
      await fetchComponents(); // Tenta buscar os componentes novamente
    } catch (error) {
      console.error('Error fetching scrapper components:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          Voltar
        </Button>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          Componentes de {foodName}
        </Typography>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#3f51b5' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Id</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Units</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Value Per 100g</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Standard Deviation</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Min Value</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Max Value</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Number of Data Used</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>References</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Data Type</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Food Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {components.length > 0 ? (
                components.map(component => (
                  <TableRow key={component.id}>
                    <TableCell>{component.id}</TableCell>
                    <TableCell>{component.name}</TableCell>
                    <TableCell>{component.units}</TableCell>
                    <TableCell>{component.valuePer100g}</TableCell>
                    <TableCell>{component.standardDeviation}</TableCell>
                    <TableCell>{component.minValue}</TableCell>
                    <TableCell>{component.maxValue}</TableCell>
                    <TableCell>{component.numberOfDataUsed}</TableCell>
                    <TableCell>{component.references}</TableCell>
                    <TableCell>{component.dataType}</TableCell>
                    <TableCell>{component.foodId}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    <Button variant="contained" color="primary" onClick={handleScrapperFetch}>
                      Carregar Componentes do Scrapper
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default FoodComponents;