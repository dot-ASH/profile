<script setup lang="ts">

import { inject, onMounted, ref, watch } from 'vue';
import JsonData from "../../config.json";
import { CurveText } from '@inotom/vue-curve-text';
import { LoadingKeys, ThemeKeys } from '@/keys/Symbols';
import type { LoadingProps } from '@/types/LoadingProps';
import type { ThemeProps } from '@/types/ThemeProps';
import Tooltip from './ui/Custom/Tooltip.vue';


interface ThemeType {
    background: string;
    color: string;
}

const { profile, images, randomKeys, music } = JsonData;
const { loading, updateLoading } = inject(LoadingKeys) as LoadingProps;
const { theme, updateTheme } = inject(ThemeKeys) as ThemeProps;

const year = ref<HTMLElement>();
const bg = ref<HTMLElement>();
const bg1 = ref<HTMLElement>();
const bg2 = ref<HTMLElement>();


const overlay = ref({
    animation: "beep infinite 3s linear",
    opacity: 0,
    transform: "scale(1)",
    width: "0rem",
});

const textAnim = ref("none");

let audio = ref() as unknown as HTMLAudioElement;;
let coverOpacity = ref<0 | 1>();

onMounted(() => {
    audio = new Audio(music[0].src);
})

function start() {
    audio.play();
    overlay.value = {
        opacity: 1,
        width: "15rem",
        animation: "none",
        transform: "scale(1)"
    };
    textAnim.value = "marquee 20s linear infinite";
}

const stop = () => {
    audio.pause();
    overlay.value = {
        opacity: 0,
        width: "0rem",
        animation: "beep infinite 3s linear",
        transform: "scale(1.8)"
    };
    coverOpacity.value = 0;
    textAnim.value = "none";

};

const setLoading = (i: any) => {
    updateLoading(true);
    setTimeout(() => {
        updateLoading(false);
        window.open(music[i - 1].url, "_blank");
    }, 700);
}

function splitSentence(
    sentence: string | undefined,
    index: number
): string | undefined {
    if (sentence) {
        const words = sentence.split(" ");
        if (words.length === 2) {
            return words[index];
        } else if (words.length === 4) {
            words[0] = words[0] + words[1];
            words[1] = words[2] + words[3];
            return words[index];
        } else return words[0];
    } else return sentence;
}


const themes: Record<string, ThemeType> = {
    light: {
        background: '#ffe5d9',
        color: '#5A5549',
    },
    mint: {
        background: '#E5F4DF',
        color: '#5A5549',
    },
    default: {
        background: '#947981',
        color: '#ffe5d9',
    },
};

const applyStyles = (element: HTMLElement, style: ThemeType) => {
    element.style.background = style.background;
    element.style.color = style.color;
};

watch(theme, () => {
    const selectedTheme: ThemeType = themes[theme.value] || themes.default;
    applyStyles(year.value!, selectedTheme);
    applyStyles(bg.value!, selectedTheme);
    applyStyles(bg1.value!, selectedTheme);
    applyStyles(bg2.value!, selectedTheme);
})

</script>


<template>
    <section id="display">
        <div class=" home flex justify-between py-[1rem] my-[1rem] sm:mx-[3rem] lg:mx-[4rem] 2xl:mx-[6rem]">
            <div class="flex w-[35%] sm:mt-[4rem] relative left-display">
                <div v-motion :initial="{ left: '-50%', opacity: 0 }"
                    :visible-once="{ left: '0%', opacity: 1, transition: { duration: 500, delay: 500, ease: [0.7, 0, 0.84, 0] } }"
                    class="hidden sm:flex flex-row absolute justify-end dp-02 w-[215px] h-[250px] rounded-[0.3rem] showBorder xl:ml-[2rem] 2xl:ml-[3rem] overflow-hidden ">
                    <img :src="images.other[0].url" width="3000" height="3000" alt="" class="cloud-image alt-image" />
                    <div class="flex absolute year-text-bg justify-center items-center bottom-[0%] w-[100%] h-[15%]"
                        ref="year">
                        <p class="prime-font text-2xl">'{{ images.other[0].name }}</p>
                    </div>
                </div>
                <div class="name block relative mt-[18rem] xl:mt-[20rem] xl:ml-[3rem] z-[1000]">
                    <b>
                        <p
                            class="hidden sm:block non-prime-font uppercase text-[3rem] 2xl:text-[3vw] text-[#ffe5d9] smoothed disable-select">
                            {{ splitSentence(profile.Name, 0) }}
                        </p>
                    </b>
                    <b>
                        <p
                            class="hidden sm:block non-prime-font text-[3rem] 2xl:text-[4vw] text-[#ffe5d9] smoothed disable-select">
                            {{ splitSentence(profile.Name, 1) }}

                        </p>
                    </b>
                </div>

                <div class="sm:hidden absolute" v-motion :initial="{ opacity: 0, left: '-50%' }" :visible="{
                    opacity: 1, left: '0%', transition: {
                        duration: 1000, delay: 500, ease: [0.16, 1, 0.3, 1],
                    }
                }">
                    <p
                        class="relative text-[#ffe5d9] text-3xl quote-font mt-[25rem] ml-[-1rem] z-[40] text-right uppercase">
                        {{ randomKeys[2] }} &nbsp;
                        <br />
                        {{ randomKeys[3] }} &nbsp;
                        <br />
                        {{ randomKeys[4] }}
                    </p>
                </div>

            </div>


            <div class=" sm:hidden flex relative justify-center items-center w-[35%]">
                <div class="flex dp-border justify-center items-center " v-motion :initial="{ opacity: 0 }"
                    :visible-once="{ opacity: 1, transition: { duration: 500, delay: 500, ease: [0.7, 0, 0.84, 0] } }">
                    <div class="flex dp relative justify-center overflow-hidden">
                        <div class="cookie-text-cont non-prime-font" ref="bg">
                            <curve-text :width="400" :height="215" :r="190" offset="50%" textid="my-curve-text"
                                :font-size="17">{{ profile.Bio }}</curve-text>
                        </div>
                        <div class="absolute left-[0%] h-full w-full">
                            <img width={1000} height={2000} :src="images.primary" alt="" class="cloud-dp" />
                        </div>
                    </div>
                </div>
            </div>



            <div class=" hidden sm:flex xl:hidden relative justify-center items-center w-[35%]">

                <div class="flex dp-border justify-center items-center " v-motion :initial="{ opacity: 0 }"
                    :visible-once="{ opacity: 1, transition: { duration: 500, delay: 500, ease: [0.7, 0, 0.84, 0] } }">
                    <div class="flex dp relative justify-center overflow-hidden">
                        <div class="cookie-text-cont non-prime-font" ref="bg1">
                            <curve-text :width="400" :height="210" :r="165" offset="50%" textid="my-curve-text"
                                :font-size="20">{{ profile.Bio }}</curve-text>
                        </div>
                        <div class="absolute left-[0%] h-full w-full">
                            <img width={1000} height={2000} :src="images.primary" alt="" class="cloud-dp" />
                        </div>
                    </div>
                </div>
            </div>


            <div class="m-dp hidden xl:flex relative justify-center items-center w-[35%]">

                <div class="flex dp-border justify-center items-center " v-motion :initial="{ opacity: 0 }"
                    :visible-once="{ opacity: 1, transition: { duration: 500, delay: 500, ease: [0.7, 0, 0.84, 0] } }">
                    <div class="flex dp relative justify-center overflow-hidden">
                        <div class="cookie-text-cont non-prime-font" ref="bg2">
                            <curve-text :width="400" :height="220" :r="170" offset="50%" textid="my-curve-text"
                                :font-size="20">{{ profile.Bio }}</curve-text>
                        </div>
                        <div class="absolute left-[0%] h-full w-full">
                            <img width={1000} height={2000} :src="images.primary" alt="" class="cloud-dp" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="overlay-menu">
                <div id="play-music" :style="{ animation: overlay.animation, transform: overlay.transform }">
                    <button class=" start" @click.prevent="start" :style="{ opacity: coverOpacity }"
                        @mouseenter="coverOpacity = 1" />
                </div>
                <div class="overlay-context" :style="{ width: overlay.width, opacity: overlay.opacity }">
                    <div class="overlay-context-text">
                        <button @click=" setLoading(0)">
                            <p :style="{ animation: textAnim }"> &nbsp; {{ music[0].title }} &nbsp; {{ music[0].title }}
                            </p>
                        </button>
                    </div>
                    <!-- <Tippy content="Stop" placement="top" theme="bootstrap" arrow={false} offset="0,7"> -->
                    <button class="stop" @click.prevent="stop()">
                        <ToolTip hoverText="Hello" elementText="burh"></ToolTip>
                    </button>

                    <!-- </Tippy> -->
                    <!-- <Tippy content={links[1].title} placement="top" theme="bootstrap" arrow={false}> -->
                    <button @click="setLoading(1)" class="spotii" />
                    <!-- </Tippy> -->
                </div>
            </div>
            <div class="flex relative items-center  w-[35%] dp-container right-display"
                :data-before="images.other[1].name">
                <div class="sm:hidden absolute ml-[1rem]" v-motion :initial="{ opacity: 0, left: '50%' }" :visible="{
                    opacity: 1, left: '0%', transition: {
                        duration: 1000, delay: 500, ease: [0.16, 1, 0.3, 1],
                    }
                }
                    ">
                    <p class="relative text-[#ffe5d9] text-3xl font-[Cousine] ml-[1rem] mt-[-15rem] z-[40] uppercase">
                        {{ randomKeys[0] }}
                        <br />
                        {{ randomKeys[1] }}
                    </p>
                    <p class="text-3xl font-[Cousine] outline-text ml-[4rem] mt-[-1rem] z-[20] uppercase">
                        {{ randomKeys[0] }}
                        <br />
                        &nbsp; {{ randomKeys[1] }}
                    </p>
                </div>

                <div class="hidden sm:flex absolute dp-01 left-[45%] w-[270px] rounded-[3rem] showBorder overflow-hidden"
                    v-motion :initial="{ left: '100%', opacity: 0 }" :visible-once="{
                    left: '45%', opacity: 1, transition: {
                        duration: 1000, delay: 500, ease: [0.7, 0,
                            0.84, 0]
                    }
                }
                    ">
                    <img :src="images.other[1].url" width="5000" height="5000"
                        class="hover:scale-110 duration-500 ease-out" alt=""></img>

                </div>
            </div>
        </div>
        <div class="absolute pt-[22rem] small-show sm:hidden gap-[2rem]">
            <div class=" pl-[2rem] pb-[2rem] quote-font text-[#bfaca4]">
                <p v-for="      line, index       in       JsonData.quotes.slice(0, 3)      " class="relative" v-motion
                    :initial="{ opacity: 0, left: '-50%' }" :visible="{
                    opacity: 1, left: '0%', transition: {
                        duration: 1000, ease: [0.16, 1, 0.3, 1]
                    }
                }
                    " :delay="index * 50">
                    {{ line }}
                </p>
            </div>

            <div class="pr-[2rem] pt-[3rem] text-right quote-font text-[#bfaca4] z-[500]">
                <p v-for="      line, index       in       JsonData.quotes.slice(3, 6)      " class="relative" v-motion
                    :initial="{ opacity: 0, left: '50%' }" :visible="{
                    opacity: 1, left: '0%', transition: {
                        duration: 1000, ease: [0.16, 1, 0.3, 1]
                    }
                }
                    " :delay="index * 50">
                    {{ line }}
                </p>
            </div>
            <div class="name absolute z-[1000] mt-[-3rem]" v-motion :initial="{ opacity: 0, scale: 1.5 }" :visible-once="{
                    opacity: 1, scale: 1, transition: {
                        delay: 500,
                        duration: 1500, ease: [0.16, 1, 0.3, 1]
                    },

                }
                    ">
                <b>
                    <p class="non-prime-font uppercase sm:text-[4vw] text-[#ffe5d9] smoothed disable-select">
                        {{ splitSentence(profile.Name, 0) }}
                    </p>
                </b>
                <b>
                    <p class="non-prime-font sm:text-[5vw] text-[#ffe5d9] smoothed disable-select">
                        {{ splitSentence(profile.Name, 1) }}
                    </p>
                </b>
            </div>
            <img src="/cf1.png" class="cf" alt="" />
            <div class="override-line">
                <div class="flex absolute bg-[black] w-[200px] dp-small top-[15%] overflow-hidden" v-motion
                    :initial="{ right: '-50px' }" :visible="{
                    right: '0px', transition: {
                        duration: 1200, ease: [0.16, 1, 0.3, 1]
                    }
                }
                    ">
                    <img :src="images.other[1].url" width="5000" height="5000" alt=""
                        class="hover:scale-110 duration-500 ease-out z-[300]"></img>
                </div>
            </div>

            <div class="flex absolute dp-02 w-[250px] h-[270px] rounded-[0.3rem] overflow-hidden opacity-[0.7] bottom-[6%] left-[4em] z-[1000]"
                v-motion :initial="{ opacity: 0 }" :visible="{
                    opacity: 1, transition: {
                        duration: 1500, ease: [0.16, 1, 0.3, 1]
                    }
                }
                    ">
                <img :src="images.other[0].url" width="3000" height="3000" alt="" class="cloud-img absolute"></img>
            </div>
        </div>
    </section>
</template>

<style scoped>
#display {
    position: relative;
    z-index: 50;
}

home {
    height: 72vh;
}

.cookie-text-cont {
    color: #ffe5d9;
    text-transform: uppercase;
    font-weight: bolder;
}

.dp-container::before {
    position: absolute;
    margin-left: 120px;
    margin-top: -270px;
    content: attr(data-before);
    width: 200px;
    height: 200px;
    color: #ffe5d9;
    font-family: "carmine";
    font-size: 72px;
    z-index: 300;
    font-weight: bold;
    pointer-events: none;
}



.dp-border {
    position: absolute;
    border: 1px solid #ffe5d9;
    width: 400px;
    height: 580px;
    border-top-left-radius: 226px;
    border-top-right-radius: 226px;
    border-bottom-left-radius: 226px;
    border-bottom-right-radius: 226px;
    z-index: 100;
}

.dp {
    width: 93%;
    height: 95%;
    border-top-left-radius: 226px;
    border-top-right-radius: 226px;
    border-bottom-left-radius: 226px;
    border-bottom-right-radius: 226px;
    background: #947981;
    overflow: hidden;

    transition: 500ms ease-in;
    box-shadow: 0 0 70px 10px rgb(49, 49, 49);
}

.inner-circle {
    width: 75%;
    border: 2px solid #ffe5d9;
    height: 95%;
    border-top-left-radius: 170px;
    border-top-right-radius: 170px;
    border-bottom-left-radius: 170px;
    border-bottom-right-radius: 170px;

    overflow: hidden;
}

.override-line {
    margin-left: 7em;
    width: 400px;
    height: 230px;
}

.override-line::after {
    position: absolute;
    content: "";
    border: 1px solid rgb(124, 124, 124);
    top: 16%;
    right: 2%;
    width: 220px;
    height: 224px;
    margin-top: 20px;
    overflow: visible;
    z-index: 250;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 15px;
}

.dp-small {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    z-index: 500;
}

.year-text-bg {
    background-color: #947981;
    color: #ffe5d9;
    transition: 500ms ease-out;
    box-shadow: 0 0 60px 10px rgb(109, 95, 95);
}


.dp-01 {
    box-shadow: 0 0 70px 3px #3d3d3d;
}

.dp-02 {
    background-color: #000000;
    border-top-left-radius: 160px;
    border-top-right-radius: 160px;
    box-shadow: 0 0 30px 3px #555454;
    transition: 500ms;
}

.overlay-menu {
    position: absolute;
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;
    overflow: hidden;
    padding: 2rem;
    z-index: 3000;
    transition: 500ms;
}

#play-music {
    display: flex;

    width: 20px;
    height: 20px;
    background-color: #ffe5d9;
    z-index: 3000;
    border-radius: 50%;

    opacity: 1;
    box-shadow: 0 0 10px 3px #ccccccb8;
    transition: 500ms ease-out;
}

#play-music button {
    margin: auto auto;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    justify-content: center;
    overflow: hidden;
    background: url("songCover.jpg");
    background-size: cover;
    opacity: 0;
    transition: 500ms ease-out;
}

.lid {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background: url("songCover.jpg");
    background-size: cover;
    opacity: 1;
    transition: 500ms ease-out;
    z-index: 20000;
    cursor: pointer;
}



#play-music button:hover {
    opacity: 1;
    transition: 500ms ease-out;
}

.overlay-context {
    height: 2.5rem;
    background-color: #ffe5d9;
    box-shadow: 0 0 10px 3px #ccccccb8;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
    transition: 500ms ease-in;
}

.overlay-context-text {
    width: 9rem;
    overflow: hidden;
}

.overlay-context-text p {
    font-family: "Source Code Pro";
    white-space: nowrap;
    width: max-content;
    font-size: smaller;
}

.overlay-context .stop {
    margin-top: 2px;
    margin-left: -0.5rem;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 5px;
    background-color: #474747df;
    box-shadow: 0 0 5px 1px #424242b8;
    transition: 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
}

.stop:hover {
    background-color: #323232df;
    box-shadow: 0 0 5px 1px #424242b8;
}

.spotii {
    margin-top: 3px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    box-shadow: 0 0 5px 2px #343434b8;
    background: atr;
    background: url("spdp-small.png");
    background-size: cover;
}

.spotii a {
    width: 100%;
    height: 100%;
}




@media (max-width: 420px) {
    .extra-small {
        display: flex;
    }

    .s-dp {
        display: none;
    }

    .dp-border {
        margin-top: -3rem;
        position: absolute;
        border: 1px solid #ffe5d9;
        width: 350px;
        height: 480px;
        border-top-left-radius: 226px;
        border-top-right-radius: 226px;
        border-bottom-left-radius: 226px;
        border-bottom-right-radius: 226px;
        z-index: 100;
    }

    .small-show {
        margin-top: -2rem;
    }

    .grid-section {
        margin-top: -2rem;
        margin-bottom: 2rem;
    }

    .name {
        left: 20%;
        margin-top: -4rem;
    }

    .overlay-menu {
        left: 4%;

    }
}

@media (min-width: 420px) {
    .extra-small {
        display: none;
    }

    .s-dp {
        display: flex;
    }

    .dp-border {
        position: absolute;
        border: 1px solid #ffe5d9;
        width: 370px;
        height: 520px;
        border-top-left-radius: 226px;
        border-top-right-radius: 226px;
        border-bottom-left-radius: 226px;
        border-bottom-right-radius: 226px;
        z-index: 100;
    }

    .grid-section {
        margin-top: -2rem;
        margin-bottom: 1rem;
    }

    .overlay-menu {
        left: 7%;

    }
}

@media (max-width: 640px) {
    h1 {
        font-size: 18px;
    }

    h2 {
        font-size: 14px;
    }

    .home {
        height: 42rem;
    }

    .tooltiptext {
        left: 10%;
    }

    .dp-container::before {
        display: none;
    }

    .cf {
        position: absolute;
        top: 17%;
        left: 3%;
    }

    .small-show::before {
        content: "";
        position: absolute;
        width: auto;
        border-top: 1px solid #ffe5d9;
        bottom: 48%;
        left: 2em;
        right: 2em;
        z-index: 50;
    }

    .small-show {
        height: 57rem;
        color: #494f42;
        position: relative;
        background: #242323;
        box-shadow: 0 0 70px 100px #242323;
        margin-bottom: -60px;
        pointer-events: none;
        user-select: none;
    }

    .name {
        top: 2%;
        left: 25%;
        font-size: 11vw;
        text-align: center;
    }

    .name p {
        letter-spacing: 0.4rem;
    }

    .dp-02 {
        box-shadow: 0 0 40px 5px #5f5656;
    }
}

@media (min-width: 640px) {
    .s-dp {
        display: none;
    }

    .dp-border {
        position: absolute;
        border: 1px solid #ffe5d9;
        width: 400px;
        height: 580px;
        border-top-left-radius: 226px;
        border-top-right-radius: 226px;
        border-bottom-left-radius: 226px;
        border-bottom-right-radius: 226px;
        z-index: 100;
    }

    .left-display {
        transform: scale(1.1);
        margin-top: 5rem;
    }

    .right-display {
        transform: scale(1.1);
        margin-top: 3rem;
    }

    .m-dp {
        transform: scale(1.01);
    }

    .dp-container::before {
        position: absolute;
        margin-left: 182px;
        margin-top: -200px;
    }

    .grid-section {
        row-gap: 5rem;
        padding: 2rem;
        overflow: visible;
        column-gap: 6rem;
    }

    .overlay-menu {
        left: 50%;

    }
}


@media (min-width: 640px) and (max-height: 700px) {
    .home {
        height: 32rem;
    }

    .grid-section {
        margin-bottom: 3rem;
    }
}

@media (max-width: 640px) and (max-height: 700px) {
    .home {
        margin-top: -2em;
    }
}

@media (min-width: 640px) and (min-height: 700px) {
    .home {
        height: 73vh;
    }
}

@media (min-width: 640px) and (min-height: 850px) {
    .home {
        height: 77vh;
    }
}

@media (min-width: 1280px) {
    .dp-02 {
        width: 250px;
        height: 300px;
    }
}

@media (min-width: 800px) {
    .overlay-menu {
        left: 57%;

    }
}

@media (min-width: 900px) {
    .overlay-menu {
        left: 67%;

    }
}

@media (min-width: 1280px) and (min-height: 800px) {
    .m-dp {
        transform: scale(1.1);
    }
}


@media (min-width: 1536px) {
    .left-display {
        margin-top: 6rem;
    }

    .dp-container::before {
        position: absolute;
        margin-left: 256px;
        margin-top: -192px;
    }
}
</style>