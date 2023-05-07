<script setup>
import {useEditCategoryComposable} from "@/composables/category/edit_composable.js";

const props = defineProps(['id']);

const {
          data,
          updateHandler,
      } = useEditCategoryComposable(props);
</script>

<template>
    <v-card width="600" class="mx-auto mt-5" v-if="data.dataLoaded">
        <v-card-title>
            <h3 class="display-1">Edit Category</h3>
        </v-card-title>
        <v-form @submit.prevent="updateHandler">
            <v-card-text>
                <v-text-field
                        v-model="data.form.name"
                        label="Name"/>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="success" :to="{ name: 'categories.index' }">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info" type="submit">Update</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>