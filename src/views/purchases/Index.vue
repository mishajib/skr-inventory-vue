<script setup>
import {usePurchasesComposable} from "@/composables/purchase/index_composable.js";

const {
          data,
          pageLength,
          deleteItem
      } = usePurchasesComposable();
</script>

<template>
    <v-card class="mt-10" v-if="data.dataLoaded">
        <v-card-title>
            All Purchases
            <v-btn class="float-end" color="primary" :to="{ name: 'purchases.create' }">
                Add Purchase
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
                        Invoice No
                    </th>
                    <th class="text-left">
                        Supplier
                    </th>
                    <th class="text-left">
                        Total Quantity
                    </th>
                    <th class="text-left">
                        Total Cost
                    </th>
                    <th class="text-left">
                        Date
                    </th>
                    <th class="text-center">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="data.purchases.length"
                    v-for="(item, index) in data.purchases"
                    :key="index"
                >
                    <td class="text-left">{{ item.invoice_no }}</td>
                    <td class="text-left">{{ item.supplier.name }}</td>
                    <td class="text-left">{{ item.total_qty }}</td>
                    <td class="text-left">{{ item.total }}</td>
                    <td class="text-left">{{ item.date }}</td>
                    <td class="text-center">
                        <v-btn size="small"
                               color="primary"
                               :to="{ name: 'purchases.edit', params: { id: item.id } }"
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
                        No purchases found!
                    </td>
                </tr>
                </tbody>
            </v-table>
            <v-pagination v-if="data.purchases.length"
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
                    Do you want delete this purchase?
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