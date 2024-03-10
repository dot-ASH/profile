<script setup lang="ts">
import { ref } from 'vue';
import JsonData from "../../config.json";

const { profile } = JsonData
const imageLoad = ref(false);

const bottom = () => {
    const documentHeight = document.documentElement.scrollHeight;
    window.scrollTo({
        top: documentHeight,
        behavior: 'smooth',
    });
};

const imageLoaded = () => {
    imageLoad.value = true
}

</script>

<template>
    <section id="nav-div">
        <img src="/bg.svg" ref="BgImage" class="bg-img z-[45]" :on-load="imageLoaded()" alt="bg"
            :style="{ opacity: imageLoad ? 0.9 : 0 }" />
        <img src="/bgOpt.svg" class="z-[40]" :on-load="console.log('loaded')" alt="bg"
            :style="{ opacity: imageLoad ? 0 : 1 }" />
        <div
            class="navbar flex items-center justify-around pt-[1rem] md:ml-[3em] sm:ml-[1rem] xl:mx-[4rem] xl:ml-[6rem] xl:pt-[2rem] ">

            <div class="flex items-center pl-5 py-6 shrink-0">
                <div class="text-4xl ">
                    <p class="uppercase prime-font disable-select smoothed ">
                        Profile
                    </p>
                </div>
            </div>

            <div class=" sm:flex hidden justify-center w-full m-[1rem]">
                <div class="hr-line"></div>
            </div>

            <div class="disable-select flex gap-[0.5rem] sm:gap-[1rem] items-center sm:mr-[3rem]">
                <p @click="bottom"
                    class="about-text lowercase prime-font cursor-pointer underline-effect smoothed text-right">
                    about
                </p>
                <p v-if="profile.Portfolio" class="font-bold text-2xl lowercase prime-font smoothed text-right">
                    ~
                </p>

                <div v-if="profile.Portfolio" class="cursor-pointer underline-effect">
                    <a :href="profile.Portfolio" target="_blank" class="prime-font lowercase smoothed">
                        portfolio
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
img {
    position: fixed;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    background-color: #00000068;
}

.bg-img {
    position: fixed;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    background-color: black;
}

#nav-div div {
    color: #ffe5d9;
    position: relative;
    z-index: 1000;
}

.hr-line {
    width: 90%;
    height: 1px;
    border-top: 0.15rem solid #ffe5d9;
}

@media (min-width: 640px) and (max-height: 700px) {

    .navbar {
        padding-top: 0rem;
    }
}
</style>