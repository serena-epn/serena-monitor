import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://52.252.1.225:3000', // Reemplaza con la URL de tu API
  baseURL: 'http://192.168.1.32:3000', // Reemplaza con la URL de tu API
  timeout: 5000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
    // Puedes agregar más encabezados según sea necesario
  },
});

export default api;
