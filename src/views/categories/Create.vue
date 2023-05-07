<script setup>
import {useAddCategoryComposable} from "@/composables/category/add_composable.js";

const {
          data,
          storeHandler,
      } = useAddCategoryComposable();
</script>

<template>
    <v-card width="600" class="mx-auto mt-5" v-if="data.dataLoaded">
        <v-card-title>
            <h3 class="display-1">Add New Category</h3>
        </v-card-title>
        <v-form @submit.prevent="storeHandler">
            <v-card-text>
                <v-text-field
                        v-model="data.form.name"
                        label="Name"/>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="success" :to="{ name: 'categories.index' }">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info" type="submit">Submit</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>