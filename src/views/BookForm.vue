<script>
import axios, { Axios } from 'axios';
import { mapState } from 'pinia';
import { useDataStore } from '../stores/data';
import { Form, Field, ErrorMessage }  from "vee-validate"
import * as yup from 'yup'
const SERVER = import.meta.env.VITE_SERVERURL;


    export default {
        computed: {
            ...mapState(useDataStore, ['temas','autores'])
        },
        components: {
            Form,
            Field,
            ErrorMessage
        },
        data() {
            const mySchema = yup.object({
                nombre: yup.string().required().min(2).max(50),
                ISBN: yup.string().required().length(10),//.matches('^[\d]{10}$'),
                tema: yup.string().required(),
                autor: yup.string().required(),
            })
            return {
                libro: {},
                edit: 'Editar Libro',
                add: 'Añadir Libro',
                mySchema
            }
        },
        methods: {
            doItem(values) {
                if (this.libro.id) {
                    this.editLibro(values)
                }else {
                    this.addLibro(values)
                }
                this.$router.push('/libros')
                this.reset();
            },
            async reset() {
                if (this.libro.id) {
                    this.libro = await this.searchBook(this.libro.id)
                }else {
                    this.libro = {}
                }
            },
            async addLibro(values) {
                try {
                    await axios.post(SERVER + '/libros', values)
                } catch (error) {
                    alert(error)
                }
            },
            async editLibro(values) {
                try {
                    await axios.patch(SERVER + '/libros/' + values.id,values)
                } catch (error) {
                    alert(error)
                }
            },
            async searchBook(id) {
                try {
                    var response = await axios.get(SERVER + '/libros/' + id)
                    return response.data
                } catch (error) {
                    alert(error)
                }
            }
        },
        async mounted() {
            if (this.$route.params.id) {
                this.libro = await this.searchBook(this.$route.params.id);
            }
        },
        watch: {
            $route() {
                this.libro = {}
            }
        }
    }

</script>

<template>
   <div class="col-sm-6 col-md-4 col-lg-4 container mt-4">
        <Form id="new-prod" @submit="doItem" @reset="reset" :validation-schema="mySchema" :initial-values="libro">
            <header>
                <h1>{{ libro.id ? edit : add }}</h1>
            </header>
            <fieldset>
                <legend class="bg-dark text-white text-center" id="tablaProd">{{ libro.id ? edit : add }}</legend>
                <div class="form-group">
                    <label for="newprod-id">ID:</label>
                    <!-- <input type="text" class="form-control" id="newprod-id" v-model="libro.id" disabled> -->
                    <Field class="form-control" name="id" type="number" disabled></Field>
                </div>
                <div class="form-group">
                    <label for="newprod-name">Nombre:</label>
                    <!-- <input type="text" id="newprod-name" class="form-control" v-model="libro.nombre"> -->
                    <Field class="form-control" name="nombre" type="text"/>
                    <ErrorMessage name="nombre" />
                </div>
                <div class="form-group">
                    <label for="newprod-units">ISBN.:</label>
                    <!-- <input type="text" class="form-control" id="newprod-units" v-model="libro.ISBN"> -->
                    <Field class="form-control" name="ISBN" type="text"></Field>
                    <ErrorMessage name="ISBN" />
                </div>
                <div class="form-group">
                    <label for="newprod-category">Temas:</label>
                    <Field name="tema" as="select" class="form-control">
                        <option value="">--- Selecciona un tema ---</option>
                        <option :value="tema.id" v-for="tema in temas" :key="tema.id">{{tema.nombre}}</option>
                    </Field>
                    <ErrorMessage name="tema" />
                </div>
                <div class="form-group">
                    <label for="newprod-category">Autor:</label>
                    <Field class="form-control" name="autor" as="select">
                        <option value="">--- Selecciona un autor ---</option>
                        <option :value="autor.id" v-for="autor in autores" :key="autor.id">{{autor.nombre}}</option>
                    </Field>
                    <ErrorMessage name="autor" />
                </div>
                <div class="form-group">
                    <label for="newprod-price">Descripción:</label>
                    <!-- <input type="text" step="any" id="newprod-price" class="form-control" v-model="libro.desc"> -->
                    <Field name="desc" as="textarea" class="form-control"></Field>
                </div>
                <div class="form-group">
                    <label for="newprod-price">Imagen:</label>
                    <!-- <input type="text" step="any" id="newprod-price" class="form-control" v-model="libro.img"> -->
                    <Field name="img" type="text" class="form-control"></Field>
                </div>
                <br>
                <button type="submit" class="btn btn-default btn-dark m-1" id="botonProd">{{
                    libro.id ? 'Editar' :
                        'Añadir'
                }}</button>
                <button type="reset" class="btn btn-danger">Reset</button>
            </fieldset>
        </Form>
    </div>  
</template>