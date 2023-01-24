import { createRouter, createWebHistory } from 'vue-router'
import AuthorsTable from '../views/AuthorsTable.vue'
import AuthorCard from '../views/AuthorCard.vue'
import BooksPage from '../views/BooksPage.vue'
import BookForm from '../views/BookForm.vue';
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/autores',
      name: 'autores',
      component: AuthorsTable
      //component: () => import('../views/AboutView.vue')
    },
    {
      path: '/libros',
      name: 'books',
      component: BooksPage
    },
    {
      path: '/addLibro',
      name: 'addLibro',
      component: BookForm
    },
    {
      path: '/author/:id',
      name: 'authorView',
      props: true,
      component: AuthorCard
    },
    {
      path: '/author/books/:id',
      name: 'authorBooks',
      props: true,
      component: BooksPage,
    },
    {
      path: '/editLibro/:id',
      name: 'editBook',
      props: true,
      component: BookForm,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    }
  ]
})

export default router
