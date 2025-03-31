<script setup>
import axios from "axios";
const { $api } = useNuxtApp();
const route = useRoute();

const {
  data: post,
  pending,
  error,
} = await useAsyncData(`post-${route.params.slug}`, async () => {
  const response = await $api.get(`posts/${route.params.slug}`);
  return response.data;
});
</script>

<template>
  <div class="container mx-auto p-6">
    <div v-if="pending" class="text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">Error loading post</div>
    <div v-else class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold">{{ post.title }}</h1>
      <p class="mt-4 text-gray-700">{{ post.body }}</p>
      <NuxtLink to="/" class="mt-6 inline-block text-blue-500 hover:underline"
        >← Back</NuxtLink
      >
    </div>
  </div>
</template>
