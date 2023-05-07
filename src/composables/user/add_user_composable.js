import {onMounted, reactive} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store";

export function useAddUserComposable() {
    // Reactive data
    const data = reactive({
        dataLoaded: false,
        form      : {
            name                 : '',
            email                : '',
            password             : '',
            password_confirmation: '',
            is_admin             : false,
        },
    });
    // End of reactive data

    const store = useAuthStore();

    // computed
    const selectIsAdmin = [
        {
            title : 'Yes',
            value: true
        },
        {
            title : 'No',
            value: false
        }
    ];

    // Methods
    const storeHandler = async () => {
        try {
            const res = await axios.post('/users', data.form);
            console.log(res);
            if (res.data.success) {
                store.showSnackbar(res.data.message, 'white', 'green', 'white');
                data.form.name                  = '';
                data.form.email                 = '';
                data.form.password              = '';
                data.form.password_confirmation = '';
                data.form.is_admin              = false;
            }
        } catch (err) {
            console.log(err.response);
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
        selectIsAdmin,
        storeHandler
    };
}
