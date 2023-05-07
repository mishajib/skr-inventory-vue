<template>
  <v-card width="600" class="mx-auto mt-5">
    <v-card-title>
      <h3 class="display-1">Add New Image</h3>
    </v-card-title>
    <v-form @submit.prevent="storeHandler">
      <v-card-text>
        <v-text-field
            v-model="data.url"
            label="URL" placeholder="Enter image url"/>
        <v-img v-if="data.url"
               :lazy-src="data.url"
               :src="data.url"
        ></v-img>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" to="/images">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" type="submit">Submit</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store";

const store = useAuthStore();

const router = useRouter();
const data   = reactive({
  url: "",
});

const storeHandler = () => {
  axios.post('/images', data)
      .then(res => {
        store.showSnackbar(res.data.message);
        router.push('/images');
      })
      .catch(err => {
        if (err.response?.data?.hasOwnProperty('errors')) {
          for (let error in err.response.data.errors) {
            store.showSnackbar(err.response.data.errors[error][0], 'red', 'white');
          }
        } else {
          store.showSnackbar(err?.response?.data?.message, 'red', 'white');
        }
      });
};
</script>