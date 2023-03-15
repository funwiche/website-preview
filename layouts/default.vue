<template>
  <div>
    <v-app>
      <div id="top" />
      <Header />
      <v-main>
        <v-container style="max-width: 960px">
          <v-tabs fixed-tabs>
            <v-tab
              class="text-subtitle-1"
              :to="x.path"
              v-for="x in tabs"
              :key="x.name"
            >
              {{ x.name }}
            </v-tab>
          </v-tabs>
          <NuxtPage />
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script setup>
const tabs = [
  { name: "Metatags", path: "/" },
  { name: "Screenshot", path: "/screenshot" },
];
</script>

<style lang="scss" scoped></style>
