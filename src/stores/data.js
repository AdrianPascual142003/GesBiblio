import { defineStore } from 'pinia'
import axios, { Axios } from 'axios';

const SERVER = import.meta.env.VITE_SERVERURL;

export const useDataStore = defineStore('counter', {
  state() {
    return {
      temas: [],
      autores: [],
    }
  },
  getters: {
    getAuthorById: (state) => (id) => {
      return state.autores.find(element => element.id == id)
    },
    getThemesById: (state) => (id) => {
      return state.temas.find(element=>element.id == id)
    },
  },
  actions: {
    async loadData() {
      try {
        const [responseThemes, responseAuthors] = await Promise.all([
          axios.get(SERVER + '/temas'),
          axios.get(SERVER + '/autores'),
        ])
        this.temas = responseThemes.data;
        this.autores = responseAuthors.data;
      } catch (error) {
        alert(error)
      }
    },
  }
})
