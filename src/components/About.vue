<script setup lang="ts">

import { onMounted, ref, watch, inject } from "vue";
import JsonData from "../../config.json";

// types
import type { SocialTypes, SocialMapType } from "@/types/SocialTypes";
import type { ThemeProps } from "@/types/ThemeProps";
import type { LoadingProps } from "@/types/LoadingProps";
// import Tooltip from "./ui/Custom/Tooltip.vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

// icons
import { Icon, type IconProps } from '@iconify/vue';
import IconGithub from '@iconify/icons-fa-brands/github';
import IconDiscord from '@iconify/icons-fa-brands/discord'
import IconInstagram from "@iconify/icons-ri/instagram-fill"
import IconMail from "@iconify/icons-mdi/email"
import IconReddit from "@iconify/icons-fa-brands/reddit-alien"
import IconLinkedIN from "@iconify/icons-mdi/linkedin"
import IconVueJs from "@iconify/icons-fa-brands/vuejs"
import IconCircleFill from "@iconify/icons-ri/circle-fill"
import IconCircle from "@iconify/icons-ri/circle-line"
import { LoadingKeys, ThemeKeys } from "@/keys/Symbols";

const { socials, profile } = JsonData;
const { updateLoading } = inject(LoadingKeys) as LoadingProps;
const { theme, updateTheme } = inject(ThemeKeys) as ThemeProps;

const socialSet = ref<SocialTypes[]>();

const about = ref<HTMLElement>();
const icon = ref<HTMLImageElement>();


watch(theme, () => {

    switch (theme.value) {
        case "light": {
            about.value!.style.color = "#494f42";
            about.value!.style.background =
                "linear-gradient(0deg, rgb(255, 242, 237) 0%,rgba(255, 229, 217, 1) 30%,rgba(255, 201, 176, 1) 100%)"
            icon.value!.src = "/icon.png"
            break;
        }
        case "mint": {
            about.value!.style.color = "#494f42";
            about.value!.style.background =
                "linear-gradient(0deg, rgba(254,255,254,1) 5%, rgba(224,242,217,1) 64%, rgba(199,222,191,1) 100%)";
            icon.value!.src = "/icon.png"
            break;

        }
        default: {
            about.value!.style.color = "#ead6d6";
            about.value!.style.background =
                "linear-gradient(0deg, rgba(157,129,137,1) 1%, rgba(127,101,108,1) 57%, rgba(113,86,93,1) 100%)";
            icon.value!.src = "/icon-dark.png"
        }
    }
})

const socialsMap: SocialMapType = {
    "Github": IconGithub,
    "Discord": IconDiscord,
    "Instagram": IconInstagram,
    "Gmail": IconMail,
    "Reddit": IconReddit,
    "LinkedIn": IconLinkedIN
}

onMounted(() => {
    socialSet.value = socials.slice(0, 6).map((item) => ({
        id: item.id,
        url: item.url,
        name: item.name,
        icon: socialsMap[item.name]
    }))
})

const setLoading = (i: any) => {
    updateLoading(true);
    setTimeout(() => {
        updateLoading(false);
        window.open(socials[i - 1].url, "_blank");
    }, 700);
}


</script>

<template>
    <section ref="about" id="about" class="flex flex-col rounded-t-[4rem] rounded-b-[1rem] justify-center sm:mt-[1rem]">

        <div
            class="flex gap-[1rem] pl-[1rem] w-[100%] justify-center items-center h-[6rem] text-3xl z-[100] circle-border">
            <Icon @click="updateTheme(`light`)" :icon="IconCircleFill" id="c1" color="#ffe5d9" :width="36" />
            <Icon @click="updateTheme(`mint`)" :icon="IconCircleFill" id="c2" color="#f1faee" :width="36" />
            <Icon @click="updateTheme(`brown`)" :icon="IconCircleFill" id="c3" color="#9d8189" :width="36" />
            <p></p>
        </div>
        <div class="flex flex-col justify-between items-center w-[100%] h-[100%] z-[150]">
            <div class="my-[2.5rem] gap-[1.5rem] flex flex-col justify-between items-center text-[18px]">
                <p class="">~ {{ profile.Occupation }} ~</p>

                <h1 v-if="profile.Company" class="smoothed font-extrabold tracking-wider text-[20px] sm:text-[24px]">
                    Currently Working
                    At</h1>
                <h1 v-else class="smoothed font-extrabold tracking-wider text-[20px] sm:text-[24px]">Currently Working
                    On</h1>
                <h2 v-if="profile.Company" class="text-[14px] lg:text-[18px]">{{ profile.Company }}</h2>
                <div v-else class="flex gap-[1rem]">
                    <h2 class="text-[14px] sm:text-[18px]" v-for="(skill, index) in profile.Skills">
                        {{ skill }} {{ index < profile.Skills.length - 1 ? "|" : "" }} </h2>
                </div>
            </div>
            <div class="flex justify-center w-full h-[60%] ">
                <div class="sm:flex hidden typo absolute left-[0%] w-[33%] ">
                    <div class="relative">
                        <p v-for="(text, index) in JsonData.quotes" :key="index" v-motion
                            :initial="{ opacity: 0, left: '-50%' }" :visible="{
                opacity: 1, left: '0%', transition: {
                    duration: 1000, ease: [0.16, 1, 0.3, 1]
                }
            }" :delay="index * 50">
                            {{ text }}
                        </p>
                    </div>
                </div>

                <div class=" flex flex-col justify-center items-center w-full sm:w-[40%]  h-[100%]">
                    <div class="grid grid-section grid-cols-3 h-[60%] sm:ml-[0px] ">

                        <div v-for="icon, index  in  socialSet " :key="icon.id">
                            <div v-motion :initial="{ top: index === 1 || index === 4 ? '100%' : '-100%', opacity: 0 }"
                                :visible="{
                top: index === 1 || index === 3 ? '0%' : '0%', opacity: 1, transition: {
                    duration: 1000, ease: [0.16, 1, 0.3, 1]
                }
            }" class="relative">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger as-child>
                                            <button @click="setLoading(icon.id)">
                                                <Icon :icon="icon.icon" :width="38"
                                                    class="scale-[1] hover:scale-[1.2] duration-[200ms]">
                                                </Icon>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{{ icon.name }}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>

                    </div>
                    <h2 class="flex w-max">
                        <p class="text-[16px]">{{ profile.City }} | {{ profile.Country }}</p>
                    </h2>
                </div>
                <div class="hidden sm:flex relative h-[100%]" v-motion :initial="{ opacity: 0 }"
                    :visible="{ opacity: 1, transition: { duration: 400, ease: [0.7, 0, 0.84, 0] } }">
                    <div class="hidden sm:flex absolute ml-[7rem] mt-[-3rem] gap-[1.5rem] text-[36px]">

                        <div class="flex flex-col gap-[1.5rem]">
                            <Icon :icon="IconCircleFill" :width="20" />
                            <Icon :icon="IconCircleFill" :width="20" />
                            <Icon :icon="IconCircleFill" :width="20" />
                        </div>
                        <div class="flex flex-col gap-[1.5rem]">
                            <Icon :icon="IconCircleFill" :width="20" />
                            <Icon :icon="IconCircleFill" :width="20" />
                            <Icon :icon="IconCircleFill" :width="20" />
                        </div>
                        <div class="flex flex-col gap-[1.5rem]">
                            <Icon :icon="IconCircleFill" :width="20" />
                            <Icon :icon="IconCircleFill" :width="20" />
                            <Icon :icon="IconCircleFill" :width="20" />
                        </div>
                    </div>
                    <div
                        class="hidden sm:flex opacity-[0.4] absolute ml-[6rem] mt-[-2rem] gap-[1.5rem] text-[36px] z-[500]">
                        <div class="flex flex-col gap-[1.5rem]">
                            <Icon :icon="IconCircle" :width="20" />
                            <Icon :icon="IconCircle" :width="20" />
                            <Icon :icon="IconCircle" :width="20" />
                        </div>
                        <div class="flex flex-col gap-[1.5rem]">
                            <Icon :icon="IconCircle" :width="20" />
                            <Icon :icon="IconCircle" :width="20" />
                            <Icon :icon="IconCircle" :width="20" />
                        </div>
                        <div class="flex flex-col gap-[1.5rem]">
                            <Icon :icon="IconCircle" :width="20" />
                            <Icon :icon="IconCircle" :width="20" />
                            <Icon :icon="IconCircle" :width="20" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center gap-[0.8rem] items-center w-full h-[15%] p-[2rem] text-xl">
                <Icon :icon="IconVueJs" :width="22" />
                <img ref="icon" id="prod" src="/icon-dark.png" class="w-[28px]" />
            </div>
        </div>
    </section>
</template>


<style scoped>
#about {
    height: 93vh;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    color: #ead6d6;
    position: relative;
    background: linear-gradient(0deg,
            rgba(157, 129, 137, 1) 1%,
            rgba(127, 101, 108, 1) 57%,
            rgba(113, 86, 93, 1) 100%);
    overflow: hidden;
    transition: 0.5s ease-in;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 50px 40px rgb(57, 53, 53);
    z-index: 2000;
}

.circle-border svg {
    border: 1px solid #373737;
    border-radius: 50%;
    cursor: pointer;
}

.typo {
    bottom: 15%;
    left: 6%;
    width: 5%;
    text-align: justify;
    line-height: 25px;
    flex-shrink: 0;
    border-bottom: 2px solid;
    padding-bottom: 0.5rem;
}

.typo p {
    position: relative;
    font-size: 20px;
    font-family: "Alegreya SC", serif;
    width: max-content;
    z-index: 300;
}

.typo::before {
    position: absolute;
    content: "’’";
    font-family: "carmine";
    font-size: 108px;
    z-index: 300;
    font-weight: bolder;
    overflow: visible;
}

@media (min-width: 640px) {
    .typo p {
        line-height: 36px;
    }
}

@media (min-width: 640px) and (max-height: 700px) {
    #about {
        height: 42rem;
    }
}


@media (max-width: 640px) and (max-height: 700px) {
    #about {
        height: 40rem;
    }
}
</style>