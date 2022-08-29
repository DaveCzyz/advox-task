<script setup>
import { ref, inject } from "vue";

const change = inject("change");
const lang = inject("lang");
const languageDropdown = ref(false);
</script>

<template>
  <header
    class="px-5 flex items-center justify-between fixed top-0 w-full p-1 relative border-b bg-white"
  >
    <img src="@/assets/logo.png" alt="company_logo" />

    <div class="relative">
      <button
        @click="languageDropdown = !languageDropdown"
        class="flex items-center"
      >
        {{ lang }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-3 h-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      <Transition>
        <div
          v-if="languageDropdown"
          class="absolute border shadow-xl bg-white cursor-pointer right-0"
        >
          <div
            @click="
              change('PL');
              languageDropdown = false;
            "
            :class="{ active: lang === 'PL' }"
            class="p-2 hover:bg-stone-100 text-center"
          >
            PL
          </div>
          <div
            @click="
              change('EN');
              languageDropdown = false;
            "
            :class="{ active: lang === 'EN' }"
            class="p-2 hover:bg-stone-100 text-center"
          >
            EN
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
