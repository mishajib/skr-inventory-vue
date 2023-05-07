import {onMounted, reactive} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store";

export function useEditCategoryComposable(props) {
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
    const getItem = async () => {
        try {
            const res      = await axios.get(`/categories/${props.id}`);
            data.form.name = res.data.data.name;
        } catch (err) {
            console.log(err.response);
            store.showSnackbar(err?.response?.data?.message, 'white', 'red', 'white');
        }
    };

    const updateHandler = async () => {
        try {
            const res = await axios.put(`/categories/${props.id}`, data.form);
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
