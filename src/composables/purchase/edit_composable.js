import {computed, onMounted, reactive} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store";

export function useEditPurchaseComposable(props) {
    // Reactive data
    const data = reactive({
        dataLoaded      : false,
        suppliers       : [],
        products        : [],
        searchQuery     : '',
        searchLoading   : false,
        selectedProducts: [],
        form            : {
            date       : '',
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

    const calculateTotal = (item) => {
        let total  = 0;
        total      = Number(item.price) * Number(item.qty);
        item.total = parseFloat(total).toFixed(2);
    };

    const qtyPriceChangeHandler = (index) => {
        calculateTotal(data.form.products[index]);
    };

    const resetForm = (item) => {
        data.form.date        = item.date;
        data.form.invoice_no  = item.invoice_no;
        data.form.supplier_id = item.supplier_id;
        data.form.note        = item.note;
        data.form.products    = item.products;

        data.selectedProducts = item.selected_products
    };

    const getItem = async () => {
        try {
            const res = await axios.get(`/purchases/${props.id}`);
            resetForm(res.data.data);
        } catch (err) {
            console.log(err.response);
            store.showSnackbar(err?.response?.data?.message, 'white', 'red', 'white');
        }
    };

    const updateHandler = async () => {
        try {
            const res = await axios.put(`/purchases/${props.id}`, data.form);
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
        // Promise all
        await Promise.all([getSuppliers(), getItem()]);
        data.dataLoaded = true;
    });


    return {
        data,
        purchaseTotal,
        updateHandler,
        generateInvoiceNo,
        selectProduct,
        removeProduct,
        searchHandler,
        qtyPriceChangeHandler
    };
}
