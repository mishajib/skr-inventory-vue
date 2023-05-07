import {reactive} from "vue";
import {useAuthStore} from "@/store";
import {useRouter} from "vue-router";

export function useRegisterComposable() {
    const store  = useAuthStore();
    const router = useRouter();

    // Reactive data
    const data = reactive({
        name                 : "",
        email                : "",
        password             : "",
        password_confirmation: ""
    });

    const registerHandler = async () => {
        try {
            const res = await store.register(data);
            if (res.data.success) {
                store.showSnackbar(res.data.message);
                await router.push({name: 'login'});
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
        registerHandler
    };
}
