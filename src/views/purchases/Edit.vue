<script setup>
import {useEditPurchaseComposable} from "@/composables/purchase/edit_composable.js";

const props = defineProps(['id']);

const {
          data,
          purchaseTotal,
          updateHandler,
          generateInvoiceNo,
          searchHandler,
          selectProduct,
          removeProduct,
          qtyPriceChangeHandler
      } = useEditPurchaseComposable(props);
</script>

<template>
    <v-card class="mx-auto mt-5" v-if="data.dataLoaded">
        <v-card-title>
            <h3 class="display-1 text-center">Edit Purchase</h3>
        </v-card-title>

        <v-form @submit.prevent="updateHandler">
            <v-card-text>
                <v-row class="mb-15">
                    <v-col cols="4">
                        <vue-date-picker clearable input-class-name="v-field__field"
                                         placeholder="Select Date"
                                         format="yyyy-MM-dd HH:mm:ss"
                                         v-model="data.form.date"/>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                                v-model="data.form.invoice_no"
                                label="Code"
                                variant="outlined"
                                append-inner-icon="mdi-cached"
                                @click:append-inner="generateInvoiceNo"/>
                    </v-col>
                    <v-col cols="4">
                        <v-select
                                v-model="data.form.supplier_id"
                                :items="data.suppliers"
                                label="Supplier"
                                item-title="name"
                                item-value="id"
                                variant="outlined"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="search-container">
                            <v-label class="mb-2 text-h5">
                                Products
                            </v-label>
                            <v-text-field
                                    placeholder="Product code or name"
                                    @input="searchHandler"
                                    v-model="data.searchQuery"
                                    :loading="data.searchLoading"
                                    prepend-inner-icon="mdi-magnify"
                                    variant="outlined"
                            ></v-text-field>
                            <v-card class="search-results mt-n8" v-if="data.products.length">
                                <v-list variant="elevated" lines="two" border="2" item-props>
                                    <v-list-item v-for="(result, index) in data.products" :key="index"
                                                 @click="selectProduct(result)">
                                        <v-list-item-title>
                                            <h2 class="font-weight-regular mb-1">{{ result.name }}</h2>
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            {{ result.code }}
                                        </v-list-item-subtitle>
                                        <hr>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-text>
                                <v-table
                                        fixed-header
                                >
                                    <thead>
                                    <tr>
                                        <th class="text-left">
                                            SL#
                                        </th>
                                        <th class="text-left">
                                            Product Name
                                        </th>
                                        <th class="text-left">
                                            Stock
                                        </th>
                                        <th class="text-left">
                                            Quantity
                                        </th>
                                        <th class="text-left">
                                            Price
                                        </th>
                                        <th class="text-left">
                                            Total Price
                                        </th>
                                        <th class="text-center">

                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-if="data.form.products.length"
                                        v-for="(product, index) in data.form.products"
                                        :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ data.selectedProducts[index].name }}</td>
                                        <td>{{ data.selectedProducts[index].stock_quantity }}</td>
                                        <td>
                                            <v-text-field label="Quantity"
                                                          class="mt-8"
                                                          v-model="product.qty"
                                                          type="number"
                                                          min="1"
                                                          @input="qtyPriceChangeHandler(index)"
                                                          variant="outlined"/>
                                        </td>
                                        <td>
                                            <v-text-field label="Price"
                                                          class="mt-8"
                                                          v-model="product.price"
                                                          type="number"
                                                          min="1"
                                                          step="any"
                                                          @input="qtyPriceChangeHandler(index)"
                                                          variant="outlined"/>
                                        </td>
                                        <td>
                                            &#2547;
                                            {{ product.total }}
                                        </td>
                                        <td>
                                            <v-btn color="error" rounded @click="removeProduct(index)">
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="100%" class="text-center">
                                            No products added yet, please add some products!
                                        </td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colspan="4"></td>
                                        <td class="text-right font-weight-medium text-h6">Total</td>
                                        <td class="font-weight-medium text-h6">
                                            &#2547;
                                            {{ purchaseTotal }}
                                        </td>
                                    </tr>
                                    </tfoot>
                                </v-table>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea
                                v-model="data.form.note"
                                label="Note"/>
                    </v-col>
                </v-row>
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