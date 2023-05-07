<template>
    <v-app>
        <v-app-bar>
            <v-app-bar-title>
                <v-btn to="/" class="float-start">
                    SKR Inventory
                </v-btn>
            </v-app-bar-title>
            <v-btn-group class="float-end">
                <template v-if="!isAuthenticated">
                    <v-btn to="/register">Register</v-btn>
                    <v-btn to="/login">Login</v-btn>
                </template>
                <template v-else>
                    <v-btn :to="{ name: 'dashboard' }">Dashboard</v-btn>
                    <v-btn :to="{ name: 'users.index' }" v-if="isAdmin">Users</v-btn>
                    <v-btn :to="{ name: 'brands.index' }">Brands</v-btn>
                    <v-btn :to="{ name: 'categories.index' }">Categories</v-btn>
                    <v-btn :to="{ name: 'units.index' }">Units</v-btn>
                    <v-btn :to="{ name: 'suppliers.index' }">Suppliers</v-btn>
                    <v-btn :to="{ name: 'products.index' }">Products</v-btn>
                    <v-btn :to="{ name: 'purchases.index' }" v-if="isAdmin">Purchase</v-btn>
                    <v-btn @click.prevent="logoutHandler">Logout</v-btn>
                </template>
            </v-btn-group>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>

    <v-snackbar
            v-model="snackbar.snackbar"
            :timeout="snackbar.timeout"
            :color="snackbar.color"
    >
        <span :class="`text-${snackbar.textColor}`">{{ snackbar.text }}</span>

        <template v-slot:actions>
            <v-btn
                    :color="snackbar.closeColor"
                    text
                    class="float-end"
                    @click="snackbar.snackbar = false"
                    icon="mdi mdi-close"
            >
            </v-btn>
        </template>

    </v-snackbar>
</template>

<script setup>
import {useMainComposable} from "@/composables/main_composable.js";

const {
          isAuthenticated,
          isAdmin,
          snackbar,
          logoutHandler
      } = useMainComposable();
</script>
