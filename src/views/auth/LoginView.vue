<template>
    <v-card width="600" class="mx-auto mt-5">
        <v-card-title>
            <h3 class="display-1">Login</h3>
        </v-card-title>
        <v-form @submit.prevent="loginHandler">
            <v-card-text>
                <v-text-field
                        label="Email"
                        v-model="data.email"
                        prepend-icon="mdi mdi-account"/>
                <v-text-field
                        type="password"
                        label="Password"
                        v-model="data.password"
                        prepend-icon="mdi mdi-lock"/>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="success" :to="{ name: 'register' }">Register</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info" type="submit">Login</v-btn>
            </v-card-actions>

            <v-card-actions>
                <v-btn color="indigo" @click.prevent="setAdminCredentials">Login as Admin</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="cyan" type="submit" @click.prevent="setUserCredentials">Login as User</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup>
import {useLoginComposable} from "@/composables/auth/login_composable.js";

const {
          data,
          loginHandler,
          setAdminCredentials,
          setUserCredentials
      } = useLoginComposable();

</script>
