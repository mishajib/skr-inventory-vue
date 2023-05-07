import {onMounted, reactive} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store";

export function useAddCategoryComposable() {
    // Reactive data
    const data = reactive({
        dataLoaded: false,
        form      : {
            name: ''
        },
    });
    // End of reactive data

    const store = useAuthStore();


    // Methods
    const storeHandler = async () => {
        try {
            const res = await axios.post('/categories', data.form);
            if (res.data.success) {
                store.showSnackbar(res.data.message);
                data.form.name = '';
            }
        } catch (err) {
            if (err.response?.data?.hasOwnProperty('errors')) {
                for (let error in err.response.data.errors) {
                    store.showSnackbar(err.response.data.errors[error][0], 'white', 'red', 'white');
                }
            } else {
                store.showSnackbar(err?.response?.data?.message, 'white', 'red', 'white');
            }
        }
    };


    // Mounted hook
    onMounted(async () => {
        data.dataLoaded = true;
    });


    return {
        data,
        storeHandler
    };
}
