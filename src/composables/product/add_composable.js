import {onMounted, reactive} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store";

export function useAddProductComposable() {
    // Reactive data
    const data = reactive({
        dataLoaded  : false,
        brands      : [],
        categories  : [],
        units       : [],
        imagePreview: false,
        form        : {
            name       : '',
            code       : '',
            cost       : '',
            price      : '',
            image      : '',
            note       : '',
            brand_id   : '',
            category_id: '',
            unit_id    : '',
            quantity   : ''
        },
    });
    // End of reactive data

    // Store
    const store = useAuthStore();

    // Methods
    const getBrands = async () => {
        try {
            const res = await axios.get('/select-brands');
            if (res.data.success) {
                data.brands = res.data.data;
            }
        } catch (err) {
            store.showSnackbar(err?.response?.data?.message, 'white', 'red', 'white');
        }
    };

    const getCategories = async () => {
        try {
            const res = await axios.get('/select-categories');
            if (res.data.success) {
                data.categories = res.data.data;
            }
        } catch (err) {
            store.showSnackbar(err?.response?.data?.message, 'white', 'red', 'white');
        }
    };

    const getUnits = async () => {
        try {
            const res = await axios.get('/select-units');
            if (res.data.success) {
                data.units = res.data.data;
            }
        } catch (err) {
            store.showSnackbar(err?.response?.data?.message, 'white', 'red', 'white');
        }
    };

    const generateCode = () => {
        // Generate 10 random numbers
        let code = '';
        for (let i = 0; i < 10; i++) {
            code += Math.floor(Math.random() * 10);
        }
        data.form.code = code;
    };

    const imageHandler = (e) => {
        console.log(e.target.files[0]);
        data.imagePreview = true;
        data.form.image   = e.target.files[0];

        let file = e.target.files;

        const reader  = new FileReader();
        reader.onload = function (e) {
            document.querySelector('#image-preview').src = e.target.result;
        };
        reader.readAsDataURL(file[0]);
    };

    const removeImage = () => {
        data.form.image                              = '';
        document.querySelector('#image-preview').src = '';
        data.imagePreview                            = false;
        console.log('Image removed')
    };

    const resetForm    = () => {
        data.form.name        = '';
        data.form.code        = '';
        data.form.cost        = '';
        data.form.price       = '';
        data.form.note        = '';
        data.form.brand_id    = '';
        data.form.category_id = '';
        data.form.unit_id     = '';
        data.form.quantity    = '';

        removeImage();
    };
    const storeHandler = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const res    = await axios.post('/products', data.form, config);
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
        await Promise.all([getBrands(), getCategories(), getUnits()]);
        generateCode();
        data.dataLoaded = true;
    });


    return {
        data,
        storeHandler,
        generateCode,
        removeImage,
        imageHandler
    };
}
