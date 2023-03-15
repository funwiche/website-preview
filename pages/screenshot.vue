<template>
  <section class="pa-6 pa-md-12 border">
    <h1 class="text-h5 text-md-h4 font-weight-black mb-2">Meta Tags Preview</h1>
    <div class="text-body-2 mb-6 text-medium-emphasis">
      Find out your website how it looks on Gppgle and social media platforms
      like Twitter and Facebook
    </div>
    <form @submit.prevent="submit">
      <v-text-field
        variant="outlined"
        density="comfortable"
        placeholder="Website address"
        required
        v-model="body.url"
        persistent-hint
        hint="Begin with https:// or http://"
        class="mb-3"
      />
      <v-radio-group inline v-model="body.device" color="info">
        <v-radio label="Destop" value="desktop" />
        <v-radio label="Tablet" value="tablet" />
        <v-radio label="Mobile" value="mobile" />
      </v-radio-group>
      <v-checkbox
        color="info"
        label="Full page"
        v-model="body.fullPage"
        class="mt-n6 mb-n3"
      />
      <v-btn
        flat
        height="48"
        color="info"
        class="text-subtitle-1"
        type="submit"
      >
        Preview
      </v-btn>
    </form>
  </section>
  <section v-if="loading" class="text-center pa-8">
    <img src="/loading.gif" style="max-width: 280px" />
  </section>
  <section v-else-if="item" class="py-6">
    <v-img
      class="border"
      :src="item"
      width="100%"
      :max-width="item.includes('mobile') ? '420' : '100%'"
    />
  </section>
</template>

<script setup>
const loading = ref(false);
const body = ref({
  url: "",
  device: "desktop",
  fullPage: false,
});
const item = ref(null);
async function submit() {
  try {
    loading.value = true;
    const [data, err] = await $fetch("/api/screenshot", {
      method: "POST",
      body: body.value,
    });
    item.value = data.screenshot;
    if (err) alert(err);
  } catch (error) {
    item.value = null;
    alert("An error occured. Please try again later!");
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped></style>
