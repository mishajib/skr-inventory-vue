<script setup>
import {useAddProductComposable} from "@/composables/product/add_composable.js";

const {
          data,
          storeHandler,
          generateCode,
          imageHandler,
          removeImage
      } = useAddProductComposable();
</script>

<template>
    <v-card class="mx-auto mt-5" v-if="data.dataLoaded">
        <v-card-title>
            <h3 class="display-1">Add New Product</h3>
        </v-card-title>
        <v-form @submit.prevent="storeHandler">
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                                v-model="data.form.name"
                                label="Name"/>

                        <v-text-field
                                v-model="data.form.code"
                                label="Code"
                                variant="outlined"
                                append-inner-icon="mdi-cached"
                                @click:append-inner="generateCode"/>

                        <v-text-field
                                type="number"
                                min="1"
                                step="any"
                                v-model="data.form.cost"
                                label="Purchase Cost"/>

                        <v-text-field
                                type="number"
                                min="1"
                                step="any"
                                v-model="data.form.price"
                                label="Selling Cost"/>

                        <v-text-field
                                type="number"
                                min="1"
                                v-model="data.form.quantity"
                                label="Stock Quantity"/>
                    </v-col>
                    <v-col cols="6">
                        <div>
                            <v-file-input
                                    label="Image"
                                    accept="image/*"
                                    show-size
                                    prepend-inner-icon="mdi-image"
                                    placeholder="Select your image"
                                    variant="outlined"
                                    @click:clear="removeImage"
                                    @change="imageHandler($event)"/>
                            <img v-if="data.imagePreview" src="" id="image-preview" alt="image_preview" class="mt-n5 mb-5 ml-10"
                                 style="width: 10rem;">
                        </div>

                        <v-select
                                v-model="data.form.brand_id"
                                :items="data.brands"
                                label="Brand"
                                item-title="name"
                                item-value="id"/>

                        <v-select
                                v-model="data.form.category_id"
                                :items="data.categories"
                                label="Category"
                                item-title="name"
                                item-value="id"/>

                        <v-select
                                v-model="data.form.unit_id"
                                :items="data.units"
                                label="Unit"
                                item-title="name"
                                item-value="id"/>
                    </v-col>
                </v-row>
                <v-textarea
                        v-model="data.form.note"
                        label="Note"/>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="success" :to="{ name: 'products.index' }">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info" type="submit">Submit</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>