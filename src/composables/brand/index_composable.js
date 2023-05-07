import {computed, onMounted, reactive, watch} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store/index.js";

export function useBrandsComposable() {
    // Reactive data
    const data = reactive({
        dataLoaded: false,
        dialog    : {
            show: false,
            id  : null,
        },
        brands    : [],
        pagination: {
            current_page: 1,
        }
    });
    // End of reactive data

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

    // Methods
    const getItems = async () => {
        try {
            const response  = await axios.get(`/brands?page=${data.pagination.current_page}`);
            data.brands     = response.data.data.data;
            data.pagination = response.data.data.meta;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async () => {
        try {
            const response = await axios.delete(`/brands/${data.dialog.id}`);
            if (response.data.success) {
                data.dialog.show = false;
                store.showSnackbar(response.data.message);
                await getItems();
            }
        } catch (err) {
            store.showSnackbar(err?.response?.data?.message, 'white', 'red', 'white');
        }
    };

    // watchers
    watch(() => data.pagination.current_page, async () => {
        await getItems();
    });

    // Mounted hook
    onMounted(async () => {
        await getItems();
        data.dataLoaded = true;
    });


    return {
        data,
        pageLength,
        deleteItem
    };
}
