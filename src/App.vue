<script>
import { RouterLink, RouterView } from 'vue-router'
import { useDataStore } from './stores/data';
import { mapActions } from 'pinia';
import AppMenu from './components/AppMenu.vue'
import AuthorsTable from './views/AuthorsTable.vue';
import AppFooter from './components/AppFooter.vue';

  export default {
    components: {
    AppMenu,
    AuthorsTable,
    AppFooter
},
    methods: {
      ...mapActions(useDataStore, {
        loadData: 'loadData',
      })
    },
    mounted() {
      this.loadData()
    }
  }

</script>

<template>
  <div class="container">
    <AppMenu></AppMenu>
    <RouterView />
  </div>
  <AppFooter></AppFooter>

</template>