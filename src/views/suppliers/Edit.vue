<script setup>
import {useEditSupplierComposable} from "@/composables/supplier/edit_composable.js";

const props = defineProps(['id']);

const {
          data,
          updateHandler,
      } = useEditSupplierComposable(props);
</script>

<template>
    <v-card width="600" class="mx-auto mt-5" v-if="data.dataLoaded">
        <v-card-title>
            <h3 class="display-1">Edit Supplier</h3>
        </v-card-title>
        <v-form @submit.prevent="updateHandler">
            <v-card-text>
                <v-text-field
                        v-model="data.form.name"
                        label="Name"/>
                <v-text-field type="email"
                              v-model="data.form.email"
                              label="Email"/>
                <v-text-field
                        v-model="data.form.phone_number"
                        label="Phone Number"/>
                <v-textarea
                        v-model="data.form.address"
                        label="Address"/>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="success" :to="{ name: 'suppliers.index' }">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info" type="submit">Update</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>