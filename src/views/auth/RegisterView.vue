<script setup>
import {useRegisterComposable} from "@/composables/auth/register_composable.js";

const {
          data,
          registerHandler
      } = useRegisterComposable();
</script>

<template>
    <v-card width="600" class="mx-auto mt-10">
        <v-card-title>
            <h3 class="display-1">Registration</h3>
        </v-card-title>
        <v-form @submit.prevent="registerHandler">
            <v-card-text>
                <v-text-field
                        v-model="data.name"
                        label="Name"/>
                <v-text-field
                        v-model="data.email"
                        label="Email"/>
                <v-text-field
                        v-model="data.password"
                        type="password"
                        label="Password"/>
                <v-text-field
                        v-model="data.password_confirmation"
                        type="password"
                        label="Password Confirmation"/>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="success" :to="{ name: 'login' }">Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info" type="submit">Register</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>

</template>