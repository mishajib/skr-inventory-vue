import {onMounted, reactive} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store";
import {ca} from "vuetify/locale";

export function useEditUserComposable(props) {
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
            title: 'Yes',
            value: true
        },
        {
            title: 'No',
            value: false
        }
    ];

    // Methods
    const getUser = async () => {
        try {
            const res = await axios.get(`/users/${props.id}`);
            console.log(res);
            data.form.name     = res.data.data.name;
            data.form.email    = res.data.data.email;
            data.form.is_admin = res.data.data.is_admin;
        } catch (err) {
            console.log(err.response);
        }
    };

    const updateHandler = async () => {
        try {
            const res = await axios.put(`/users/${props.id}`, data.form);
            console.log(res);
            if (res.data.success) {
                store.showSnackbar(res.data.message, 'white', 'green', 'white');
                await getUser();
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
        await getUser();
        data.dataLoaded = true;
    });


    return {
        data,
        selectIsAdmin,
        updateHandler,
    };
}
