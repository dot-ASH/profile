<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const delay = 18;
const dotOutline = ref();
const cursorVisible = ref(true);
const cursorEnlarged = ref(false);
let endX = window.innerWidth / 2;
let endY = window.innerHeight / 2;
let _x = 0;
let _y = 0;
let requestRef: number | null = null;

const toggleCursorVisibility = () => {
    if (dotOutline.value) {
        if (cursorVisible.value) {
            dotOutline.value.style.opacity = 1;
        } else {
            dotOutline.value.style.opacity = 0;
        }
    }

};

const toggleCursorSize = () => {
    if (dotOutline.value) {
        if (cursorEnlarged.value) {
            dotOutline.value.style.transform = "translate(-50%, -50%) scale(1.5)";
        } else {
            dotOutline.value.style.transform = "translate(-50%, -50%) scale(1)";
        }
    }
};

const mouseOverEvent = () => {
    cursorEnlarged.value = true;
    toggleCursorSize();
};

const mouseOutEvent = () => {
    cursorEnlarged.value = false;
    toggleCursorSize();
};

const mouseEnterEvent = () => {
    cursorVisible.value = true;
    toggleCursorVisibility();
};

const mouseLeaveEvent = () => {
    cursorVisible.value = false;
    toggleCursorVisibility();
};

const mouseMoveEvent = (e: any) => {
    cursorVisible.value = true;
    toggleCursorVisibility();

    endX = e.pageX;
    endY = e.pageY;
};

const animateDotOutline = () => {
    _x += (endX - _x) / delay;
    _y += (endY - _y) / delay;
    if (dotOutline.value) {
        dotOutline.value.style.top = `${_y}px`;
        dotOutline.value.style.left = `${_x}px`;
    }

    requestRef = requestAnimationFrame(animateDotOutline);
};

onMounted(() => {
    dotOutline.value = dotOutline.value;
    animateDotOutline();

    document.addEventListener("mousedown", mouseOverEvent);
    document.addEventListener("mouseup", mouseOutEvent);
    document.addEventListener("mousemove", mouseMoveEvent);
    document.addEventListener("mouseenter", mouseEnterEvent);
    document.addEventListener("mouseleave", mouseLeaveEvent);
});

onBeforeUnmount(() => {
    document.removeEventListener("mousedown", mouseOverEvent);
    document.removeEventListener("mouseup", mouseOutEvent);
    document.removeEventListener("mousemove", mouseMoveEvent);
    document.removeEventListener("mouseenter", mouseEnterEvent);
    document.removeEventListener("mouseleave", mouseLeaveEvent);
    if (requestRef) {
        cancelAnimationFrame(requestRef);
    }

})
</script>

<template>
    <div ref="dotOutline" class="hidden lg:block cursor-dot-outline"></div>
</template>

<style scoped>
.cursor-dot-outline {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    opacity: 1;
    transition: opacity 0.1s cubic-bezier(0.7, 0, 0.84, 0);
    width: 20px;
    height: 20px;
    background-color: rgba(232, 238, 241, 0.5);
    border: 1px solid #414141;
    z-index: 7000;
}

</style>