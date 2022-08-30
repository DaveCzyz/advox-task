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
        :class="{ 'border border-red-400': error }"
        v-model="albumName"
        class="input w-full sm:w-auto mb-5 sm:mb-0"
      />
      <button
        class="group relative inline-flex border border-[color:var(--color-actions)] focus:outline-none w-full sm:w-auto sm:ml-5"
        @click.prevent="addAlbum"
      >
        <span
          class="pt-[9px] pb-[9px] w-full inline-flex items-center justify-center self-stretch px-4 text-sm text-[color:var(--color-actions)] text-center font-bold uppercase bg-white ring-1 ring-[color:var(--color-actions)] ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1"
        >
          {{ t("Dodaj") }}
        </span>
      </button>
      <div v-if="error">
        <span id="error" class="text-sm text-red-400">{{ t(error) }}</span>
      </div>
    </form>
  </div>
</template>
