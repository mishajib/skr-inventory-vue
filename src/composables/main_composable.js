import {useRouter} from "vue-router";
import {useAuthStore} from "@/store/index.js";
import {computed} from "vue";

export function useMainComposable() {
    const router = useRouter();
    const store  = useAuthStore();

    // Computed
    const isAuthenticated = computed(() => store.isAuthenticated);
    const isAdmin         = computed(() => store.isAdmin);
    const snackbar        = computed(() => store.snackbar);

    const logoutHandler = async () => {
        try {
            const res = await store.logout();
            if (res.data.success) {
                store.showSnackbar(res.data.message);
                await router.push({name: 'login'});
            }
        } catch (err) {
            store.showSnackbar(err.response.data.message, 'red', 'white');
        }
    };

    return {
        isAuthenticated,
        isAdmin,
        snackbar,
        logoutHandler
    };
}
