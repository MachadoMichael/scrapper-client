import axiosInstance from './axiosConfig';

export const getFoods = async () => {
    try {
      const response = await axiosInstance.get('/foods');
      return response.data;
    } catch (error) {
      console.error('Error fetching foods:', error);
      throw error;
    }
  };

  export const getFoodComponents = async (foodId) => {
    try {
      const response = await axiosInstance.get(`/components/food/${foodId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching components:', error);
      throw error;
    }
  };

  export const getScrapperFoods = async () => {
    try {
      const response = await axiosInstance.post(`/scrapper/foods`);
      return response.data;
    } catch (error) {
      console.error('Error fetching scrapper foods:', error);
      throw error;
    }
  };

  export const getScrapperFoodComponents = async (foodId) => {
    try {
      const response = await axiosInstance.post(`/scrapper/components/${foodId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching scrapper components:', error);
      throw error;
    }
  };