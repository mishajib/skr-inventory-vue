import {computed, onMounted, reactive, watch} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store/index.js";

export function useUsersComposable() {
    // Reactive data
    const data = reactive({
        dataLoaded: false,
        dialog    : {
            show: false,
            id  : null,
        },
        users     : [],
        pagination: {
            current_page: 1,
        }
    });
    // End of reactive data

    // Store
    const store = useAuthStore();

    // Computed properties
    const pageLength = computed(() => {
        // page length calculation
        let pageLength = data.pagination.total / data.pagination.per_page;
        if (pageLength % 1 !== 0) {
            pageLength = Math.floor(pageLength) + 1;
        }

        return pageLength;
    });

    const authUser = computed(() => store.user);

    // Methods
    const getUsers = async () => {
        try {
            const response  = await axios.get(`/users?page=${data.pagination.current_page}`);
            data.users      = response.data.data.data;
            data.pagination = response.data.data.meta;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async () => {
        try {
            const response = await axios.delete(`/users/${data.dialog.id}`);
            if (response.data.success) {
                data.dialog.show = false;
                store.showSnackbar(response.data.message);
                await getUsers();
            }
        } catch (err) {
            store.showSnackbar(err?.response?.data?.message, 'white', 'red', 'white');
        }
    };

    // watchers
    watch(() => data.pagination.current_page, async () => {
        await getUsers();
    });

    // Mounted hook
    onMounted(async () => {
        await getUsers();
        data.dataLoaded = true;
    });


    return {
        data,
        pageLength,
        authUser,
        deleteUser
    };
}
