import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';
import HomeUsuario from '@/views/HomeUsuario'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "HomeUsuario",
    component: HomeUsuario,

  },
  {
    path: '/admin',
    name: 'HomeAdmin',
    component: () => import('@/views/HomeAdmin'),
    meta: {
      admin: true,
    },
    children: [{

        path: '/',
        name: "Base",
        component: () => import('@/views/HomeAdmin'),
        meta: {
          admin: true
        },
      },

      {

        path: 'articulos',
        name: 'Articulos',
        component: () => import('@/views/admin/Articulo'),
        meta: {
          admin: true
        },
      },
      {

        path: 'Categorias',
        name: 'Categorias',
        component: () => import('@/views/admin/Categoria'),
        meta: {
          admin: true
        },
      },
      {

        path: 'usuarios',
        name: 'Usuarios',
        component: () => import('@/views/admin/Usuario'),
        meta: {
          admin: true
        },
      },

    ],

  },
  {
    path: '/LoginAdmin',
    name: 'LoginAdmin',
    component: () => import('@/views/LoginAdmin'),
    meta: {
      admin: true,

    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  
  if (to.meta.admin) {
    if (store.state.usuario || to.name == 'LoginAdmin') {
      next();
    } else {
      next({
        name: 'LoginAdmin'
      });
    }

  } else {
    next();
  }


});

export default router