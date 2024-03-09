<script setup lang="ts">
import { onMounted, provide, ref, type Ref } from 'vue'
import { ThemeKeys, LoadingKeys } from './keys/Symbols'

import CustomCursor from './components/CustomCursor.vue'
import Display from "./components/Display.vue"
import Navbar from "./components/Navbar.vue"
import About from "./components/About.vue"
import ScreenLoader from "./components/ScreenLoader.vue"


const loading: Ref<boolean> = ref(true);
const theme: Ref<string> = ref<string>("brown");

const updateLoading = (loadingValue: boolean) => {
  loading.value = loadingValue
}

const updateTheme = (stringValue: string) => {
  theme.value = stringValue
}

onMounted(() => {
  setTimeout(() => {
    updateLoading(false)
  }, 750)
})

provide(LoadingKeys, {
  loading,
  updateLoading
})

provide(ThemeKeys, {
  theme,
  updateTheme
})

</script>

<template>
  <main :style="{ height: loading ? `100vh` : `auto` }">
    <CustomCursor />
    <ScreenLoader />
    <Navbar />
    <Display />
    <About />
  </main>
</template>
