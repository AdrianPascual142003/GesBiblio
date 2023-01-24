<script>
import { mapActions, mapState } from 'pinia';
import { useDataStore } from '../stores/data';


export default {
    computed: {
        ...mapState(useDataStore, { getAuthorById: 'getAuthorById' }),
    },
    data() {
        return {
            autor: {}
        }
    },
    mounted() {
        this.autor = this.getAuthorById(Number(this.$route.params.id))
    },
}

</script>

<template>
    <div class="col-4">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="`/src/assets/img/${autor.img}`" class="card-img-top foto" :alt="autor.name" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ autor.nombre }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ autor.nacionalidad }}</h6>
                        <button class="bi bi-person btn btn-secondary" v-on:click.native="this.$router.push('/author/books/' + autor.id)"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>