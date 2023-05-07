import {computed, onMounted, reactive} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store";

export function useAddPurchaseComposable() {
    // Reactive data
    const data = reactive({
        dataLoaded      : false,
        suppliers       : [],
        products        : [],
        searchQuery     : '',
        searchLoading   : false,
        selectedProducts: [],
        form            : {
            // format yyyy-MM-dd HH:mm:ss
            date       : new Date().toISOString().slice(0, 19).replace('T', ' '), // 2021-08-01 00:00:00
            invoice_no : '',
            supplier_id: '',
            note       : '',
            products   : []
        },
    });
    // End of reactive data

    // Store
    const store = useAuthStore();

    // Computed
    const purchaseTotal = computed(() => {
        let total = 0;
        data.form.products.forEach((item) => {
            total += Number(item.price) * Number(item.qty);
        });
        return parseFloat(total).toFixed(2);
    });

    // Methods
    const getSuppliers = async () => {
        try {
            const res = await axios.get('/select-suppliers');
            if (res.data.success) {
                data.suppliers = res.data.data;
            }
        } catch (err) {
            store.showSnackbar(err?.response?.data?.message, 'white', 'red', 'white');
        }
    };

    const getProducts = async () => {
        try {
            data.searchLoading = true;
            const res          = await axios.get(`/select-products?search=${data.searchQuery}`);
            if (res.data.success) {
                data.searchLoading = false;
                data.products      = res.data.data;
            }
        } catch (err) {
            store.showSnackbar(err?.response?.data?.message, 'white', 'red', 'white');
        }
    };

    const searchHandler = async () => {
        if (data.searchQuery.length > 0) {
            await getProducts();
        } else {
            data.products = [];
        }
    };

    const selectProduct = (item) => {
        console.log(item)
        const product = {
            product_id: item.id,
            qty       : 1,
            price     : '',
            total     : '0.00',
        };

        data.form.products.push(product);
        data.selectedProducts.push(item);
        data.products      = [];
        data.searchQuery   = '';
        data.searchLoading = false;
    };

    const removeProduct = (index) => {
        data.form.products.splice(index, 1);
        data.selectedProducts.splice(index, 1);
    };

    const generateInvoiceNo = () => {
        // Generate 10 random numbers
        let code = '';
        for (let i = 0; i < 10; i++) {
            code += Math.floor(Math.random() * 10);
        }
        data.form.invoice_no = code;
    };

    const resetForm = () => {
        data.form.date        = new Date().toISOString().slice(0, 19).replace('T', ' ');
        data.form.invoice_no  = '';
        data.form.supplier_id = '';
        data.form.note        = '';
        data.form.products    = [];

        data.selectedProducts = [];

        generateInvoiceNo();
    };

    const calculateTotal = (item) => {
        let total  = 0;
        total      = Number(item.price) * Number(item.qty);
        item.total = parseFloat(total).toFixed(2);
    };

    const qtyPriceChangeHandler = (index) => {
        calculateTotal(data.form.products[index]);
    };

    const storeHandler = async () => {
        try {
            const res = await axios.post('/purchases', data.form);
            if (res.data.success) {
                store.showSnackbar(res.data.message);
                resetForm();
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
        // Promise all
        await getSuppliers();
        generateInvoiceNo();
        data.dataLoaded = true;
    });


    return {
        data,
        purchaseTotal,
        storeHandler,
        generateInvoiceNo,
        selectProduct,
        removeProduct,
        searchHandler,
        qtyPriceChangeHandler
    };
}
