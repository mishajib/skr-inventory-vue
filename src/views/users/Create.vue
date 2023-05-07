<script setup>
import {useAddUserComposable} from "@/composables/user/add_user_composable.js";

const {
          data,
          selectIsAdmin,
          storeHandler,
      } = useAddUserComposable();
</script>

<template>
    <v-card width="600" class="mx-auto mt-5">
        <v-card-title>
            <h3 class="display-1">Add New User</h3>
        </v-card-title>
        <v-form @submit.prevent="storeHandler">
            <v-card-text>
                <v-text-field
                        v-model="data.form.name"
                        label="Name"/>
                <v-text-field
                        v-model="data.form.email"
                        label="Email"/>
                <v-text-field
                        v-model="data.form.password"
                        type="password"
                        label="Password"/>
                <v-text-field
                        v-model="data.form.password_confirmation"
                        type="password"
                        label="Password Confirmation"/>
                <v-select
                        v-model="data.form.is_admin"
                        :items="selectIsAdmin"
                        label="Is Admin"
                ></v-select>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="success" :to="{ name: 'users.index' }">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info" type="submit">Submit</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>