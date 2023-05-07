import {defineStore} from 'pinia';
import axios from '@/Http/axios';

export const useAuthStore = defineStore('authentication', {
    state  : () => ({
        user    : localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null,
        snackbar: {
            text      : "",
            textColor : "white",
            timeout   : 3000,
            snackbar  : false,
            color     : 'success',
            closeColor: 'red',
        }
    }),
    getters: {
        isAuthenticated: state => !!state.user,
        isAdmin        : state => state.user?.is_admin,
    },
    actions: {
        register(data) {
            return new Promise((resolve, reject) => {
                return axios.post('/register', data)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        login(data) {
            return new Promise((resolve, reject) => {
                return axios.post('/login', data)
                    .then(res => {
                        this.user  = res.data.data.user;
                        this.token = res.data.data.token;
                        localStorage.setItem('authUser', JSON.stringify(res.data.data.user));
                        localStorage.setItem('accessToken', JSON.stringify(res.data.data.token));
                        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
                        resolve(res);
                    })
                    .catch(err => {
                        this.user                                      = null;
                        this.token                                     = null;
                        axios.defaults.headers.common['Authorization'] = null;
                        localStorage.removeItem('authUser');
                        localStorage.removeItem('accessToken');
                        reject(err);
                    });
            });
        },
        logout() {
            return new Promise((resolve, reject) => {
                axios.post('/logout')
                    .then(res => {
                        this.user  = null;
                        this.token = null;
                        localStorage.removeItem('authUser');
                        localStorage.removeItem('accessToken');
                        axios.defaults.headers.common['Authorization'] = null;
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        getUser() {
            return new Promise((resolve, reject) => {
                axios.get('/current-user')
                    .then(res => {
                        if (res.data.success) {
                            this.user = res.data.data.user;
                            localStorage.setItem('authUser', JSON.stringify(res.data.data.user));
                            axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`;
                        }
                        resolve(res);
                    })
                    .catch(err => {
                        this.user = null;
                        localStorage.removeItem('authUser');
                        localStorage.removeItem('accessToken');
                        axios.defaults.headers.common['Authorization'] = null;
                        reject(err);
                    });
            });
        },
        showSnackbar(text, textColor = 'white', color = 'success', closeColor = 'red') {
            this.snackbar.text       = text;
            this.snackbar.textColor  = textColor;
            this.snackbar.color      = color;
            this.snackbar.closeColor = closeColor;
            this.snackbar.snackbar   = true;
        }
    }
});
