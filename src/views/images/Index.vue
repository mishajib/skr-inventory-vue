<template>
  <v-card class="mt-10">
    <v-card-title>
      All Images
      <v-btn class="float-end" color="primary" to="/images/create">Add Image</v-btn>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3" v-for="(image, index) in images" :key="index">
          <v-card
              :loading="loading"
              class="mx-auto my-12"
              max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
              ></v-progress-linear>
            </template>

            <v-img
                :lazy-src="APP_URL + '/storage/' + image.path"
                :src="APP_URL + '/storage/' + image.path"
            ></v-img>

            <v-card-title>
              {{ image.name }}
            </v-card-title>


            <v-divider class="mx-4"></v-divider>
            <v-card-text class="text-center">
              <div class="my-4 text-subtitle-1">
                {{ image.created_at_human }}
              </div>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn
                  color="red lighten-2"
                  text
                  @click="dialog.show = true; dialog.imageId = image.id"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-row justify="center">
    <v-dialog
        v-model="dialog.show"
        persistent
        max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Do you want delete this image?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red darken-1"
              text
              @click="dialog.show = false; dialog.imageId = null"
          >
            No
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click.prevent="deleteImage(dialog.imageId)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import {ref, onMounted, reactive, inject} from "vue";
import axios from "@/Http/axios";
import {useAuthStore} from "@/store";

// initialize the store
const store = useAuthStore();

// Get app url/backend url form env file
const APP_URL = import.meta.env.VITE_BACKEND_URL;

// initialize the reactive data
const images  = ref([]);
const loading = ref(false);
const page    = reactive({
  currentPage: 1,
});
const user    = reactive({
  id   : store?.user?.id,
  name : store?.user?.name,
  email: store?.user?.email
});
const dialog  = reactive({
  show   : false,
  imageId: null
});

// inject Echo into the component
const echo = inject('echo');

// listen to the event by private channel
echo.private(`App.Models.User.${user.id}`)
    .listen('ImageDownloadedEvent', (e) => {
      store.showSnackbar(e.message);
    });

echo.private(`App.Models.User.${user.id}`)
    .notification((notification) => {
      images.value.unshift(notification.image);
    });

// Get all images
const getImages = () => {
  axios.get('/images?page=' + page.currentPage)
      .then(res => {
        if (res.data.data.meta.current_page <= res.data.data.meta.last_page) {
          images.value.push(...res.data.data.data);
          page.currentPage++;
        }
      });
};

// Delete image
const deleteImage = (id) => {
  axios.delete('/images/' + id)
      .then(res => {
        store.showSnackbar(res.data.message);
        dialog.show      = false;
        dialog.imageId   = null;
        page.currentPage = 1;
        images.value     = [];
        getImages();
      })
      .catch(err => {
        store.showSnackbar(err?.response?.data?.message, 'red', 'white');
      });
};

// Load more images
const loadMore = () => {
  window.onscroll = () => {
    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
    if (bottomOfWindow) {
      getImages();
    }
  }
}

onMounted(() => {
  getImages();
  loadMore();
});
</script>