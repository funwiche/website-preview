<template>
  <section class="pa-6 pa-md-12 border">
    <h1 class="text-h5 text-md-h4 font-weight-black mb-2">Meta Tags Preview</h1>
    <div class="text-body-2 mb-6 text-medium-emphasis">
      Find out your website how it looks on Gppgle and social media platforms
      like Twitter and Facebook
    </div>
    <form @submit.prevent="submit">
      <div class="d-flex">
        <div class="w-100 mr-4">
          <v-text-field
            variant="outlined"
            density="comfortable"
            placeholder="Website address"
            required
            v-model="url"
            persistent-hint
            hint="Begin with https:// or http://"
          />
        </div>
        <v-btn
          flat
          height="48"
          color="info"
          class="text-subtitle-1"
          type="submit"
        >
          Preview
        </v-btn>
      </div>
    </form>
  </section>
  <section v-if="loading" class="text-center pa-8">
    <img src="/loading.gif" style="max-width: 280px" />
  </section>
  <section v-else-if="item">
    <!-- Google Preview  -->
    <section class="pb-4">
      <div class="d-flex align-center py-3">
        <div class="text-overline pr-3 text-disabled">Google</div>
        <v-divider />
      </div>
      <div style="max-width: 600px" class="">
        <div class="d-flex align-center mb-2">
          <v-avatar size="32" color="white">
            <v-avatar rounded="0" size="20">
              <v-img :src="item.favicon" />
            </v-avatar>
          </v-avatar>
          <div class="pl-3">
            <div
              class="text-subtitle-1 font-weight-bold text-medium-emphasis text-nowrap"
            >
              {{ item.name || item.domain }}
            </div>
            <div class="text-caption text-medium-emphasis text-nowrap">
              {{ item.origin
              }}{{
                item.pathname !== "/"
                  ? item.pathname.split("/").join(" > ")
                  : ""
              }}
            </div>
          </div>
        </div>
        <div class="text-info text-h6 hover-underline">
          {{ item.title }}
        </div>
        <div class="text-medium-emphasis text-body-2 two-lines">
          {{ item.description }}
        </div>
      </div>
    </section>
    <!-- Facebook Preview  -->
    <section class="pb-4">
      <div class="d-flex align-center py-3">
        <div class="text-overline pr-3 text-disabled">Facebook</div>
        <v-divider />
      </div>
      <div style="max-width: 600px" class="border">
        <v-img :aspect-ratio="2 / 1" :src="item.image" cover />
        <div class="pa-3 border-t bg-secondary">
          <div class="text-medium-emphasis text-uppercase text-caption">
            {{ item.name || item.domain }}
          </div>
          <div class="font-weight-bold text-subtitle-1">
            {{ item.title }}
          </div>
          <div class="text-medium-emphasis text-body-2 text-nowrap">
            {{ item.description }}
          </div>
        </div>
      </div>
    </section>
    <!-- Twitter Preview  -->
    <section class="pb-4">
      <div class="d-flex align-center py-3">
        <div class="text-overline pr-3 text-disabled">Twitter</div>
        <v-divider />
      </div>
      <div style="max-width: 600px" class="border rounded-lg">
        <v-img :aspect-ratio="2 / 1" :src="item.image" cover />
        <div class="pa-3 border-t">
          <div class="font-weight-bold text-subtitle-2">
            {{ item.title }}
          </div>
          <div class="text-medium-emphasis text-caption two-lines">
            {{ item.description }}
          </div>
          <div class="text-disabled mt-1 text-caption">
            {{ item.name || item.domain }}
          </div>
        </div>
      </div>
    </section>
    <!-- Raw Meta Data  -->
    <section>
      <div class="d-flex align-center py-3">
        <div class="text-overline pr-3 text-disabled text-no-wrap">
          Raw Meta Data
        </div>
        <v-divider />
      </div>
      <div class="bg-secondary pa-1">
        <div class="pa-3 overflow-x-auto">
          <pre>{{ item }}</pre>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
const loading = ref(false);
const url = ref("");
const item = ref(null);
async function submit() {
  try {
    loading.value = true;
    const [data, err] = await $fetch("/api/meta", {
      method: "POST",
      body: { url: url.value },
    });
    item.value = data;
    if (err) alert(err);
  } catch (error) {
    item.value = null;
    alert("An error occured. Please try again later!");
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.text-nowrap {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
.two-lines {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
}
.hover-underline {
  cursor: pointer;
}
.hover-underline:hover {
  text-decoration: underline;
}
</style>
