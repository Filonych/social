export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return await response.json();
};