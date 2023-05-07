import {onMounted, reactive} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store";

export function useEditSupplierComposable(props) {
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
    const getItem = async () => {
        try {
            const res              = await axios.get(`/suppliers/${props.id}`);
            data.form.name         = res.data.data.name;
            data.form.email        = res.data.data.email;
            data.form.phone_number = res.data.data.phone_number;
            data.form.address      = res.data.data.address;
        } catch (err) {
            console.log(err.response);
            store.showSnackbar(err?.response?.data?.message, 'white', 'red', 'white');
        }
    };

    const updateHandler = async () => {
        try {
            const res = await axios.put(`/suppliers/${props.id}`, data.form);
            if (res.data.success) {
                store.showSnackbar(res.data.message);
                await getItem();
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
        await getItem();
        data.dataLoaded = true;
    });


    return {
        data,
        updateHandler,
    };
}
