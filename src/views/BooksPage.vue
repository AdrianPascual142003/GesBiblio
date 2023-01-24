<script>
import axios from 'axios';
import { mapActions, mapState } from 'pinia';
import BookCard from '../components/BookCard.vue';
import { useDataStore } from '../stores/data';
const SERVER = import.meta.env.VITE_SERVERURL;

export default {
    data() {
        return {
            seleccion: '',
            libros: [],
            titulo: "",
            autor: {},
            tema: {}
        };
    },
    props: {
        id: String
    },
    computed: {
        ...mapState(useDataStore, {
            getThemesById: 'getThemesById',
            getAuthorById: 'getAuthorById',
            temas: 'temas'
        }),
        tituloLibros() {
            let titulo = "";
            if (this.id) {
                let autor = this.getAuthorById(this.id)
                titulo += " del autor " + autor.nombre
            }
            if (this.seleccion) {
                let tema = this.getThemesById(this.seleccion)
                titulo += " del tema " + tema.nombre
            }
            return titulo || " sin filtro"
        }
    },
    methods: {
        async getBooksFromServer(id = null) {
            try {
                if (id) {
                    var response = await axios.get(SERVER + "/libros?autor=" + id)
                } else {
                    var response = await axios.get(SERVER + "/libros");
                }
                this.libros = response.data;
            }
            catch (error) {
                alert(error);
            }
        },
        async deleteBookFromServer(id) {
            try {
                var response = await axios.delete(SERVER + '/libros/' + id)
                let libroABorrar = this.libros.findIndex(element => element.id === id)
                this.libros.splice(libroABorrar, 1)
                //this.$router.go()
            } catch (error) {
                alert(error);
            }
        },
        loadBooks() {
            if (this.$route.params.id) {
                this.getBooksFromServer(this.$route.params.id)
            } else {
                this.getBooksFromServer();
            }
        },
        async filterBySelect(id) {
            try {
                if (id) {
                    var response = await axios.get(SERVER + "/libros?autor=" + id + '&tema=' + this.seleccion)
                } else {
                    var response = await axios.get(SERVER + "/libros?tema=" + this.seleccion);
                }
                this.libros = response.data;
            }
            catch (error) {
                alert(error);
            }
        },
        onChangeSelect() {
            if (this.$route.params.id) {
                if (this.seleccion) {
                    this.filterBySelect(this.$route.params.id)
                } else {
                    this.getBooksFromServer(this.$route.params.id)
                }
            } else {
                if (this.seleccion) {
                    this.filterBySelect()
                } else {
                    this.getBooksFromServer()
                }
            }
        }
    },
    mounted() {
        this.loadBooks();
    },
    components: { BookCard },
    watch: {
        $route() {
            this.loadBooks()
        },
    },

}
</script>

<template>
    <h1>Libro {{ tituloLibros }}</h1>
    <div id="temas">
        <select v-model="seleccion" class="form-control mt-3" @change="onChangeSelect">
            <option value="">---SELECCIONA PARA FILTRAR---</option>
            <option v-for="tema in temas" :key="tema" v-bind:value="tema.id">{{ tema.nombre }}</option>
        </select>
    </div>
    <div class="container-fluid">
        <div class="row">
            <BookCard v-for="libro in libros" :key="libro.id" :libro="libro" class="col-4 pt-3"></BookCard>
        </div>
    </div>
</template>

<style>
#temas {
    width: 20%;
}
</style>