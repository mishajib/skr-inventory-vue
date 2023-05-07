import {onMounted, reactive} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store";

export function useEditProductComposable(props) {
    // Reactive data
    const data = reactive({
        dataLoaded  : false,
        imagePreview: false,
        imageUrl    : '',
        form        : {
            _method    : "PUT", // This is for laravel to accept the request as PUT request
            name       : '',
            code       : '',
            cost       : '',
            price      : '',
            image      : '',
            note       : '',
            brand_id   : '',
            category_id: '',
            unit_id    : ''
        },
    });
    // End of reactive data

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

    const resetForm = (item) => {
        data.form.name        = item.name;
        data.form.code        = item.code;
        data.form.cost        = item.cost;
        data.form.price       = item.price;
        data.form.note        = item.note;
        data.form.brand_id    = item.brand.id;
        data.form.category_id = item.category.id;
        data.form.unit_id     = item.unit.id;

        data.imageUrl = item.image;
        data.imagePreview = !!item.image;
    };

    const getItem = async () => {
        try {
            const res = await axios.get(`/products/${props.id}`);
            resetForm(res.data.data);
        } catch (err) {
            console.log(err.response);
            store.showSnackbar(err?.response?.data?.message, 'white', 'red', 'white');
        }
    };

    const updateHandler = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const res    = await axios.post(`/products/${props.id}`, data.form, config);
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
        await Promise.all([getBrands(), getCategories(), getUnits(), getItem()]);
        data.dataLoaded = true;
    });


    return {
        data,
        updateHandler,
        generateCode,
        removeImage,
        imageHandler
    };
}
