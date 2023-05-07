<script setup>
import {useProductsComposable} from "@/composables/product/index_composable.js";

const {
          data,
          pageLength,
          deleteItem
      } = useProductsComposable();
</script>

<template>
    <v-card class="mt-10" v-if="data.dataLoaded">
        <v-card-title>
            All Products
            <v-btn class="float-end" color="primary" :to="{ name: 'products.create' }">
                Add Product
            </v-btn>
        </v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
            <v-table
                    fixed-header
            >
                <thead>
                <tr>
                    <th class="text-left">
                        Brand
                    </th>
                    <th class="text-left">
                        Category
                    </th>
                    <th class="text-left">
                        Unit
                    </th>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Code
                    </th>
                    <th class="text-left">
                        Purchase Cost
                    </th>
                    <th class="text-left">
                        Selling Price
                    </th>
                    <th class="text-left">
                        Stock Quantity
                    </th>
                    <th class="text-center">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="data.products.length"
                    v-for="(item, index) in data.products"
                    :key="index"
                >
                    <td class="text-left">{{ item.brand.name }}</td>
                    <td class="text-left">{{ item.category.name }}</td>
                    <td class="text-left">{{ item.unit.name }}</td>
                    <td class="text-left">{{ item.name }}</td>
                    <td class="text-left">{{ item.code }}</td>
                    <td class="text-left">{{ item.cost }}</td>
                    <td class="text-left">{{ item.price }}</td>
                    <td class="text-left">{{ item.stock_quantity }}</td>
                    <td class="text-center">
                        <v-btn size="small"
                               color="primary"
                               :to="{ name: 'products.edit', params: { id: item.id } }"
                        >
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn size="small"
                               color="error"
                               class="ms-2"
                               @click="data.dialog.show = true; data.dialog.id = item.id"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </tr>

                <tr v-else>
                    <td colspan="100%" class="text-center">
                        No products found!
                    </td>
                </tr>
                </tbody>
            </v-table>
            <v-pagination v-if="data.products.length"
                    v-model="data.pagination.current_page"
                    :length="pageLength"
                    rounded="circle"
            ></v-pagination>
        </v-card-text>
    </v-card>

    <v-row justify="center">
        <v-dialog
                v-model="data.dialog.show"
                persistent
                max-width="290"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Do you want delete this product?
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="red darken-1"
                            text
                            @click="data.dialog.show = false; data.dialog.id = null"
                    >
                        No
                    </v-btn>
                    <v-btn
                            color="green darken-1"
                            text
                            @click.prevent="deleteItem"
                    >
                        Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>