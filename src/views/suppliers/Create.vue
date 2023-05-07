<script setup>
import {useAddSupplierComposable} from "@/composables/supplier/add_composable.js";

const {
          data,
          storeHandler,
      } = useAddSupplierComposable();
</script>

<template>
    <v-card width="600" class="mx-auto mt-5" v-if="data.dataLoaded">
        <v-card-title>
            <h3 class="display-1">Add New Supplier</h3>
        </v-card-title>
        <v-form @submit.prevent="storeHandler">
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
                <v-btn color="info" type="submit">Submit</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>