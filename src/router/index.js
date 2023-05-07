import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/store";
import axios from "@/Http/axios/index.js";

const routes = [
    {
        path     : '/',
        name     : 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
    },
    {
        path     : '/register',
        name     : 'register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/auth/RegisterView.vue'),
        meta     : {
            guest: true,
        }
    },

    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/LoginView.vue'),
        meta     : {
            guest: true,
        }
    },

    {
        path     : '/dashboard',
        name     : 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/DashboardView.vue'),
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/users',
        name     : 'users.index',
        component: () => import(/* webpackChunkName: "images" */ '@/views/users/Index.vue'),
        meta     : {
            requiresAuth: true,
            requireAdmin: true
        }
    },
    {
        path     : '/users/create',
        name     : 'users.create',
        component: () => import(/* webpackChunkName: "images" */ '@/views/users/Create.vue'),
        meta     : {
            requiresAuth: true,
            requireAdmin: true
        }
    },
    {
        path     : '/users/:id/edit',
        name     : 'users.edit',
        component: () => import(/* webpackChunkName: "images" */ '@/views/users/Edit.vue'),
        props    : true,
        meta     : {
            requiresAuth: true,
            requireAdmin: true
        }
    },
    {
        path     : '/brands',
        name     : 'brands.index',
        component: () => import(/* webpackChunkName: "images" */ '@/views/brands/Index.vue'),
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/brands/create',
        name     : 'brands.create',
        component: () => import(/* webpackChunkName: "images" */ '@/views/brands/Create.vue'),
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/brands/:id/edit',
        name     : 'brands.edit',
        component: () => import(/* webpackChunkName: "images" */ '@/views/brands/Edit.vue'),
        props    : true,
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/categories',
        name     : 'categories.index',
        component: () => import(/* webpackChunkName: "images" */ '@/views/categories/Index.vue'),
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/categories/create',
        name     : 'categories.create',
        component: () => import(/* webpackChunkName: "images" */ '@/views/categories/Create.vue'),
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/categories/:id/edit',
        name     : 'categories.edit',
        component: () => import(/* webpackChunkName: "images" */ '@/views/categories/Edit.vue'),
        props    : true,
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/units',
        name     : 'units.index',
        component: () => import(/* webpackChunkName: "images" */ '@/views/units/Index.vue'),
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/units/create',
        name     : 'units.create',
        component: () => import(/* webpackChunkName: "images" */ '@/views/units/Create.vue'),
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/units/:id/edit',
        name     : 'units.edit',
        component: () => import(/* webpackChunkName: "images" */ '@/views/units/Edit.vue'),
        props    : true,
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/suppliers',
        name     : 'suppliers.index',
        component: () => import(/* webpackChunkName: "images" */ '@/views/suppliers/Index.vue'),
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/suppliers/create',
        name     : 'suppliers.create',
        component: () => import(/* webpackChunkName: "images" */ '@/views/suppliers/Create.vue'),
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/suppliers/:id/edit',
        name     : 'suppliers.edit',
        component: () => import(/* webpackChunkName: "images" */ '@/views/suppliers/Edit.vue'),
        props    : true,
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/products',
        name     : 'products.index',
        component: () => import(/* webpackChunkName: "images" */ '@/views/products/Index.vue'),
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/products/create',
        name     : 'products.create',
        component: () => import(/* webpackChunkName: "images" */ '@/views/products/Create.vue'),
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/products/:id/edit',
        name     : 'products.edit',
        component: () => import(/* webpackChunkName: "images" */ '@/views/products/Edit.vue'),
        props    : true,
        meta     : {
            requiresAuth: true
        }
    },
    {
        path     : '/purchases',
        name     : 'purchases.index',
        component: () => import(/* webpackChunkName: "images" */ '@/views/purchases/Index.vue'),
        meta     : {
            requiresAuth: true,
            requireAdmin: true
        }
    },
    {
        path     : '/purchases/create',
        name     : 'purchases.create',
        component: () => import(/* webpackChunkName: "images" */ '@/views/purchases/Create.vue'),
        meta     : {
            requiresAuth: true,
            requireAdmin: true
        }
    },
    {
        path     : '/purchases/:id/edit',
        name     : 'purchases.edit',
        component: () => import(/* webpackChunkName: "images" */ '@/views/purchases/Edit.vue'),
        props    : true,
        meta     : {
            requiresAuth: true,
            requireAdmin: true
        }
    }
]

const router = createRouter({
    history             : createWebHistory(),
    routes,
    linkActiveClass     : "text-indigo",
    linkExactActiveClass: "text-indigo",
});


router.beforeEach(async (to, from, next) => {
    const store         = useAuthStore();
    const token         = localStorage.getItem('accessToken');
    let isAuthenticated = false;
    if (!isAuthenticated && token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
        await store.getUser();
    }

    isAuthenticated = store.isAuthenticated;

    // If route is restricted and user is not authenticated
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        localStorage.removeItem('accessToken');
        next('/login');
    }

    // If route is not restricted and user is authenticated
    if (to.matched.some(record => record.meta.guest) && isAuthenticated) {
        next('/dashboard');
    }

    // If route is not restricted and user is authenticated and user is not admin
    if (to.matched.some(record => record.meta.requireAdmin) && isAuthenticated && !store.user.is_admin) {
        next('/dashboard');
    }

    // If route is not restricted and user is not authenticated
    next();
})

export default router;
