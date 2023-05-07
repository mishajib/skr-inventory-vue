import {onMounted, reactive} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store";

export function useAddSupplierComposable() {
    // Reactive data
    const data = reactive({
        dataLoaded: false,
        form      : {
            name        : '',
            email       : '',
            phone_number: '',
            address     : ''
        },
    });
    // End of reactive data

    const store = useAuthStore();


    // Methods
    const storeHandler = async () => {
        try {
            const res = await axios.post('/suppliers', data.form);
            if (res.data.success) {
                store.showSnackbar(res.data.message);
                data.form.name         = '';
                data.form.email        = '';
                data.form.phone_number = '';
                data.form.address      = '';
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
