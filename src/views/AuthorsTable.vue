<script>
    import { mapState } from 'pinia';
    import { useDataStore } from '../stores/data';
    import AuthorItem from '../components/AuthorItem.vue';

export default {
    computed: {
        ...mapState(useDataStore, {
            autores: "autores"
        })
    },
    components: { AuthorItem }
}

</script>

<template>
    <br>
    <table class="table text-center">
        <thead class="thead-dark bg-dark">
            <tr class="text-light">
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Nacionalidad</th>
                <th scope="col">Imgen</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <AuthorItem v-for="autor in autores" :key="autor.id" :autor="autor"></AuthorItem>
        </tbody>
    </table>
    <h4>Total Autores: {{ autores.length }}</h4>
</template>