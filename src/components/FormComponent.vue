<script setup>
import { ref, watch, inject } from "vue";

const emit = defineEmits(["updateList"]);

const albumName = ref("");
const error = ref(false);
const t = inject("t");

watch(albumName, (text) => {
  if (text.length >= 3) error.value = false;
});

const addAlbum = () => {
  if (albumName.value.length < 3) error.value = "Przynajmniej 3 znaki!";
  if (!albumName.value) error.value = "Pole nie może być puste!";

  if (error.value) return false;

  const el = {
    album: albumName.value,
    favorite: false,
    created_at: new Date(),
  };

  const list = JSON.parse(window.localStorage.getItem("advox-albums")) ?? [];
  window.localStorage.setItem("advox-albums", JSON.stringify([el, ...list]));

  emit("updateList", el);
  albumName.value = "";
};
</script>

<template>
  <div class="p-5 border-b">
    <form class="w-full">
      <input
        @blur="error = false"
        type="text"
        :class="{ 'border border-red-400' : error }"
        v-model="albumName"
        class="input w-full sm:w-auto"
      />
      <button
        @click.prevent="addAlbum"
        class="btn w-full sm:w-auto mt-2 sm:mt-0 bg-[color:var(--color-actions)] border border-[color:var(--color-actions)] sm:ml-5"
      >
        {{ t("Dodaj") }}
      </button>
      <div v-if="error">
        <span class="text-sm text-red-400">{{ t(error) }}</span>
      </div>
    </form>
  </div>
</template>
