<script>

    export default {
        props: {
            autor: Object
        }
    }

</script>

<template>
    <tr>
        <th scope="row">{{autor.id}}</th>
        <td>{{ autor.nombre }}</td>
        <td>{{ autor.apellidos }}</td>
        <td>{{ autor.nacionalidad }}</td>
        <td>
            <img :src="`/src/assets/img/${autor.img}`" alt="" width="30">
        </td>
        <td>
            <button @click="$router.push('/author/' + autor.id)" class="btn btn-danger">Ver</button>
        </td>
    </tr>
</template>