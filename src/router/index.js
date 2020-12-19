import Vue from 'vue'
import VueRouter from 'vue-router'
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
    children: [{
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/',
        component: () => import('@/views/HomeAdmin')
      },
      {
        
        path: 'adminLoginAdmin',
        name: 'adminLoginAdmin',
        component: () => import('@/views/LoginAdmin')
      },
      {
        
        path: 'adminArticulo',
        name: 'adminArticulo',
        component: () => import('@/views/Articulo')
      },
      {
        
        path: 'adminCategoria',
        name: 'adminCategoria',
        component: () => import('@/views/Categoria')
      },

    ],
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/loginAdmin',
    name: 'LoginAdmin',
    component: () => import('@/views/LoginAdmin'),
    meta: {
      isAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/loginAdmin"
      });
    } else {
      next();
    }
  } else {
    next();
  }
  if (to.matched.some(record => record.meta.isAuth)) {
    if (localStorage.getItem("jwt") != null) {
      next({
        path: "/home"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router