<template>
  <div class="container">
    <h1 class="mt-4 text-center">Conversor de Pesos a Dólar</h1>

    <div class="card mt-4">
      <div class="card-body">
        <h3>Conversor de Pesos a Dólar</h3>
        <div class="form-group">
          <label for="pesos">Pesos:</label>
          <input v-model.number="pesos" id="pesos" type="number" class="form-control" />
        </div>
        <div class="form-group">
          <label for="cotizacion">Cotización del Dólar:</label>
          <input v-model.number="cotizacion" id="cotizacion" type="number" class="form-control" />
          <div class="form-check mt-2">
            <input type="checkbox" v-model="actualizacionAutomatica" @change="alternarActualizacionAutomatica" class="form-check-input" id="actualizacionAutomatica" />
            <label class="form-check-label" for="actualizacionAutomatica">Actualización automática</label>
          </div>
          <p v-if="actualizacionAutomatica" class="text-muted mt-2">Actualizado a las: {{ ultimaActualizacion }}</p>
        </div>
        <div class="form-group">
          <p class="font-weight-bold" :class="{ 'text-danger': resultado === 'No se puede dividir por 0' }">Resultado: {{ resultado }}</p>
        </div>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-body">
        <h3>Preguntas</h3>
        <div class="form-group">
          <label>1. ¿Qué es Axios?</label>
          <p class="font-weight-bold">Respuesta: b) Es una biblioteca de cliente HTTP</p>
        </div>
        <div class="form-group">
          <label>2. ¿Cuál es la forma correcta para registrar un evento de click en Vue.js?</label>
          <p class="font-weight-bold">Respuesta: b) @click y d) v-on:click</p>
        </div>
        <div class="form-group">
          <label>3. Con Axios se pueden implementar los verbos:</label>
          <p class="font-weight-bold">Respuesta: c) Get, Post, Put y Delete</p>
        </div>
        <div class="form-group">
          <label>4. ¿Cuál de estas directivas se utiliza para modificar estilos a través de Vue.js?</label>
          <p class="font-weight-bold">Respuesta: b) v-bind:style y e) :style</p>
        </div>
        <div class="form-group">
          <label>5. ¿Qué función cumple el modificador number aplicado a v-model?</label>
          <p class="font-weight-bold">Respuesta: a) Permite transformar la entrada de un elemento en un número</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCotizacionDolar } from '@/axios';

export default {
  data() {
    return {
      pesos: 0,
      cotizacion: 0,
      actualizacionAutomatica: false,
      idIntervalo: null,
      ultimaActualizacion: ''
    };
  },
  computed: {
    resultado() {
      if (this.cotizacion === 0) {
        return 'No se puede dividir por 0';
      }
      return (this.pesos / this.cotizacion).toFixed(2);
    }
  },
  methods: {
    async obtenerCotizacion() {
      this.cotizacion = await getCotizacionDolar();
      this.ultimaActualizacion = new Date().toLocaleString();
    },
    alternarActualizacionAutomatica() {
      if (this.actualizacionAutomatica) {
        this.iniciarActualizacionAutomatica();
      } else {
        clearInterval(this.idIntervalo);
      }
    },
    iniciarActualizacionAutomatica() {
      this.obtenerCotizacion();
      this.idIntervalo = setInterval(this.obtenerCotizacion, 2000);
    }
  },
  beforeUnmount() {
    clearInterval(this.idIntervalo);
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
.card {
  border: 1px solid #e3e3e3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.text-center {
  text-align: center;
}
.font-weight-bold.text-danger {
  color: #dc3545 !important;
}
</style>
