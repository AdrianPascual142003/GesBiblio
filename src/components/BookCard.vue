<script>
import { mapState } from 'pinia';
import { useDataStore } from '../stores/data';
import BooksPage from '../views/BooksPage.vue';


export default {
    computed: {
        ...mapState(useDataStore,['getAuthorById' , 'getThemesById']),
    },
    props: {
        libro: Object
    },
    data() {
        return {
            autor: {},
            tema: {}
        }
    },
    mounted() {
        this.autor = this.getAuthorById(this.libro.autor)
        this.tema = this.getThemesById(this.libro.tema)
    },
    methods: {
        deleteBook(id) {
            this.$parent.deleteBookFromServer(id)
        }
    }
}

</script>

<template>
    <div>
        <div class="card">
            <div class="row">
                <div class="col-5">
                    <img :src="`/src/assets/img/${libro.img}`"  :alt="libro.nombre" width="150">
                </div>
                <div class="card-body col-5">
                    <h5 class="card-title">{{ libro.nombre }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ autor.nombre + " " + autor.apellidos}}</h6>
                    <br>
                    <h6 class="card-subtitle mb-2 text-muted">{{ tema.nombre }}</h6>
                    <p class="card-text">{{ libro.desc }}</p>
                    <button class="btn btn-secondary" title="Editar" @click="$router.push('/editLibro/' + libro.id)"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-secondary" title="Eliminar" @click="deleteBook(libro.id)"><i class="bi bi-trash"></i></button>
                    <button class="btn btn-secondary" title="Ver autor" @click="$router.push('/author/' + autor.id)"><i class="bi bi-person"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>