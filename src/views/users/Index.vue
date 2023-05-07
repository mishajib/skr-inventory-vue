<script setup>
import {useUsersComposable} from "@/composables/user/index_user_composable.js";

const {
          data,
          pageLength,
          deleteUser,
          authUser
      } = useUsersComposable();
</script>

<template>
    <v-card class="mt-10" v-if="data.dataLoaded">
        <v-card-title>
            All Users
            <v-btn class="float-end" color="primary" :to="{ name: 'users.create' }">
                Add User
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
                        Name
                    </th>
                    <th class="text-left">
                        Email
                    </th>
                    <th class="text-left">
                        Is Admin
                    </th>
                    <th class="text-center">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="data.users.length"
                    v-for="(item, index) in data.users"
                    :key="index"
                >
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>
                        <span class="bg-green pa-1" v-if="item.is_admin">Yes</span>
                        <span class="bg-red pa-1" v-else>No</span>
                    </td>
                    <td class="text-center">
                        <v-btn size="small"
                               color="primary"
                               :to="{ name: 'users.edit', params: { id: item.id } }"
                        >
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn size="small" :disabled="authUser.id === item.id"
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
                        No users found!
                    </td>
                </tr>
                </tbody>
            </v-table>
            <v-pagination v-if="data.users.length"
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
                    Do you want delete this user?
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
                            @click.prevent="deleteUser"
                    >
                        Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>