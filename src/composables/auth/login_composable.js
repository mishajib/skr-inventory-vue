import {reactive} from "vue";
import {useAuthStore} from "@/store";
import {useRouter} from "vue-router";

export function useLoginComposable() {
    const store  = useAuthStore();
    const router = useRouter();

    // Reactive data
    const data = reactive({
        email   : "",
        password: ""
    });

    // Methods

    const setAdminCredentials = () => {
        data.email    = 'admin@app.com';
        data.password = 'password';
    };
    const setUserCredentials  = () => {
        data.email    = 'user@app.com';
        data.password = 'password';
    };

    const loginHandler = async () => {
        try {
            const res = await store.login(data);
            if (res.data.success) {
                store.showSnackbar(res.data.message);
                await router.push({name: 'dashboard'});
            }
        } catch (err) {
            if (err.response?.data?.hasOwnProperty('errors')) {
                for (let error in err.response.data.errors) {
                    store.showSnackbar(err.response.data.errors[error][0], 'red', 'white');
                }
            } else {
                store.showSnackbar(err?.response?.data?.message, 'red', 'white');
            }
        }
    };


    return {
        data,
        loginHandler,
        setAdminCredentials,
        setUserCredentials
    };
}
