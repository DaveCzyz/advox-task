<script setup>
import { ref, onMounted, inject, computed } from "vue";
import Header from "./HeaderComponent.vue";
import Footer from "./FooterComponent.vue";
import Form from "./FormComponent.vue";

const albums = ref(null);
const category = ref(null);
const layout = ref("grid");
const t = inject("t");

onMounted(() => {
  albums.value = JSON.parse(window.localStorage.getItem("advox-albums"));
});

const layoutVersion = computed(() => {
  return layout.value;
});

/**
 * Update list
 */
const addItemToList = (album) => {
  if (!albums.value) albums.value = [];
  albums.value.unshift(album);

  /**
   * Keep order when new item appears
   */
  if (category.value) sort(category.value);
};

/**
 * Add/remove album from favourites
 */
const toggleFav = (id) => {
  albums.value.map((item, index) => {
    if (index === id) item.favorite = !item.favorite;
  });

  window.localStorage.setItem("advox-albums", JSON.stringify(albums.value));

  /**
   * Keep order when new item appears
   */
  if (category.value) sort(category.value);
};

/**
 * Delete album
 */
const deleteItem = (id) => {
  const album = (albums.value = albums.value.filter(
    (item, index) => index !== id
  ));

  if (album.length === 0) {
    window.localStorage.removeItem("advox-albums"); // Delete key from LS if no more results are present.
    albums.value = null;
  } else {
    window.localStorage.setItem("advox-albums", JSON.stringify(album));
  }
};

/**
 * Sort list
 */
const sort = (category) => {
  switch (category) {
    case "album":
      albums.value.sort((a, b) =>
        a.album > b.album ? 1 : b.album > a.album ? -1 : 0
      );
      break;
    case "created_at_asc":
      albums.value.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      break;
    case "created_at_desc":
      albums.value.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      break;
    case "favorite_asc":
      albums.value.sort((a, b) =>
        a.favorite > b.favorite ? 1 : b.favorite > a.favorite ? -1 : 0
      );
      break;
    case "favorite_desc":
      albums.value.sort((a, b) =>
        a.favorite < b.favorite ? 1 : b.favorite < a.favorite ? -1 : 0
      );
      break;
  }
};
</script>

<template>
  <Header />
  <main class="pb-10 bg-sky-50">
    <Form @updateList="addItemToList" />
    <div v-if="!albums" class="text-center p-5">
      <p>{{ t("Brak danych") }}.</p>
    </div>

    <Transition name="fade">
      <div v-if="albums">
        <div class="flex pt-5 px-5 mx-1">
          <button
            :class="{ active: layout === 'grid' }"
            @click.prevent="layout = 'grid'"
            title="Grid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          </button>
          <button
            :class="{ active: layout === 'list' }"
            @click.prevent="layout = 'list'"
            title="List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </div>

        <div class="flex pt-5 px-5 mx-1">
          <select
            v-model="category"
            name="sort"
            class="input"
            @change="sort($event.target.value)"
          >
            <option value="created_at_asc">
              {{ t("Data dodania - rosn??co") }}
            </option>
            <option value="created_at_desc">
              {{ t("Data dodania - malej??co") }}
            </option>
            <option value="album">
              {{ t("Nazwa albumu") }}
            </option>
            <option value="favorite_asc">
              {{ t("Ulubione - rosn??co") }}
            </option>
            <option value="favorite_desc">
              {{ t("Ulubione - malej??co") }}
            </option>
          </select>
        </div>

        <div
          class="p-5 grid"
          :class="[
            layoutVersion === 'grid'
              ? 'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
              : 'grid-cols-1',
          ]"
        >
          <div v-for="(item, index) in albums" :key="index">
            <div
              class="bg-white mx-1 p-5 border border-[color:var(--color-actions)] mb-2 relative"
              :class="{ 'hover:shadow-2xl': layoutVersion === 'grid' }"
            >
              <svg
                v-if="item.favorite"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 absolute text-yellow-400 right-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>

              <div class="pb-5">
                #{{ index + 1 }}
                <div>
                  <span class="text-sm">{{ t("Nazwa albumu") }}: </span>
                  <span class="font-medium">{{ item.album }}</span>
                </div>

                <div>
                  <span class="text-sm">{{ t("Dodano") }}: </span>
                  <span class="font-medium">{{
                    new Date(item.created_at).toLocaleDateString("pl-PL")
                  }}</span>
                </div>
              </div>
              <div class="flex" :class="{ 'flex-col': layout === 'grid' }">
                <button
                  class="group relative inline-flex border border-[color:var(--color-actions)] focus:outline-none w-full sm:w-auto"
                  :class="{ 'mb-2': layout === 'grid' }"
                  @click="toggleFav(index)"
                >
                  <span
                    class="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-[color:var(--color-actions)] text-center font-bold uppercase bg-white ring-1 ring-[color:var(--color-actions)] ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1"
                  >
                    {{
                      item.favorite
                        ? t("Usu?? z ulubionych")
                        : t("Dodaj do ulubionych")
                    }}
                  </span>
                </button>
                <button
                  class="group relative inline-flex border border-stone-400 focus:outline-none w-full sm:w-auto"
                  :class="{ 'ml-2': layout === 'list' }"
                  @click="deleteItem(index)"
                >
                  <span
                    class="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-stone-400 text-center font-bold uppercase bg-white ring-1 ring-stone-400 ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1"
                  >
                    {{ t("Usu??") }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </main>
  <Footer />
</template>
