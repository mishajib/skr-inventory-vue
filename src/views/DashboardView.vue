<script setup>
import {usePurchasesComposable} from "@/composables/purchase/index_composable.js";
import {useAuthStore} from "@/store/index.js";
import {useUsersComposable} from "@/composables/user/index_user_composable.js";

const {
          data: purchaseData,
      } = usePurchasesComposable();

const {
          data: userData,
      } = useUsersComposable();

const store = useAuthStore();
</script>

<template>
    <v-row class="justify-center">
        <v-col cols="4">
            <v-card class="mt-10 text-center">
                <v-card-title class="text-center">
                    Logged in as {{ store.user.name }}
                </v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                    <v-card-title>
                        Name: {{ store.user.name }}
                    </v-card-title>
                    <v-card-subtitle>
                        Email: {{ store.user.email }}
                    </v-card-subtitle>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="6">
            <v-card class="mt-10" v-if="purchaseData.dataLoaded">
                <v-card-title class="text-center">
                    Recent 10 Purchases
                </v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                    <v-table
                            fixed-header
                    >
                        <thead>
                        <tr>
                            <th class="text-center">
                                Invoice No
                            </th>
                            <th class="text-center">
                                Supplier
                            </th>
                            <th class="text-center">
                                Total Quantity
                            </th>
                            <th class="text-center">
                                Total Cost
                            </th>
                            <th class="text-center">
                                Date
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="purchaseData.purchases.length"
                            v-for="(item, index) in purchaseData.purchases"
                            :key="index"
                        >
                            <td class="text-center">{{ item.invoice_no }}</td>
                            <td class="text-center">{{ item.supplier.name }}</td>
                            <td class="text-center">{{ item.total_qty }}</td>
                            <td class="text-center">{{ item.total }}</td>
                            <td class="text-center">{{ item.date }}</td>
                        </tr>

                        <tr v-else>
                            <td colspan="100%" class="text-center">
                                No purchases found!
                            </td>
                        </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
                <v-card-actions class="justify-center" v-if="store.isAdmin">
                    <v-btn color="primary" :to="{ name: 'purchases.index' }">
                        View All
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>

        <v-col cols="6">
            <v-card class="mt-10" v-if="userData.dataLoaded">
                <v-card-title class="text-center">
                    Recent 10 Users
                </v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                    <v-table
                            fixed-header
                    >
                        <thead>
                        <tr>
                            <th class="text-center">
                                Name
                            </th>
                            <th class="text-center">
                                Email
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="userData.users.length"
                            v-for="(item, index) in userData.users"
                            :key="index"
                        >
                            <td class="text-center">{{ item.name }}</td>
                            <td class="text-center">{{ item.email }}</td>
                        </tr>

                        <tr v-else>
                            <td colspan="100%" class="text-center">
                                No users found!
                            </td>
                        </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
                <v-card-actions class="justify-center" v-if="store.isAdmin">
                    <v-btn color="primary" :to="{ name: 'users.index' }">
                        View All
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>