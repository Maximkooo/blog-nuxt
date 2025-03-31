<script setup>
const { $api } = useNuxtApp();
const page = ref(1);

const {
  data: posts,
  pending,
  refresh,
} = await useAsyncData(`posts-page-${page.value}`, async () => {
  const response = await $api.get("posts", {
    params: { _page: page.value, _limit: 10 },
  });
  return response.data;
});


const nextPage = () => {
  page.value += 1;
  refresh();
}
const prevPage = () => {
  if (page.value > 1) {
    page.value -= 1;
    refresh();
  }
};
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Blog</h1>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <li
        v-for="post in posts"
        :key="post.id"
        class="bg-white p-4 rounded-lg shadow-md"
      >
        <NuxtLink
          :to="`/posts/${post.id}`"
          class="text-lg font-semibold hover:text-blue-500"
        >
          {{ post.title }}
        </NuxtLink>
      </li>
    </ul>

    <div class="flex justify-between mt-6">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition"
      >
        Previous
      </button>
      <button
        @click="nextPage"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Next
      </button>
    </div>
  </div>
</template>
