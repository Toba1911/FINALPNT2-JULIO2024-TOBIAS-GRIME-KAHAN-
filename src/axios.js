import axios from 'axios';

const url = 'https://api.bluelytics.com.ar/v2/latest';

export const getCotizacionDolar = async () => {
  try {
    const { data } = await axios.get(url);
    return data.blue.value_sell;
  } catch (error) {
    console.error('Error obteniendo cotización del dólar:', error);
    return 0;
  }
};
