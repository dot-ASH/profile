<template>
    <svg ref="svgRef" :height="height" :width="width" v-bind="svgProps">
        <text :key="textKey" v-bind="textProps">
            <textPath :xlink:href="`#${ellipseId}`" :startOffset="startOffset" v-bind="textPathProps">
                <tspan v-bind="tspanProps">{{ text }}</tspan>
            </textPath>
        </text>
    </svg>
</template>

<script lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import SVGPathCommander, { type GlyphAttr } from 'svg-path-commander';
// Import isNullOrUndefined from 'ControlUtils'; // Uncomment this line and update the import as needed

interface Props {
    width: number;
    height: number;
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    startOffset?: number;
    reversed?: boolean;
    text: string;
    svgProps?: Record<string, unknown>;
    ellipseProps?: Record<string, unknown>;
    textPathProps?: Record<string, unknown>;
    textProps?: Record<string, unknown>;
    tspanProps?: Record<string, unknown>;
}

export default {
    props: {
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        cx: {
            type: Number,
            required: true,
        },
        cy: {
            type: Number,
            required: true,
        },
        rx: {
            type: Number,
            required: true,
        },
        ry: {
            type: Number,
            required: true,
        },
        startOffset: {
            type: Number,
            default: 0,
        },
        reversed: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            required: true,
        },
        svgProps: {
            type: Object,
            default: () => ({}),
        },
        ellipseProps: {
            type: Object,
            default: () => ({}),
        },
        textPathProps: {
            type: Object,
            default: () => ({}),
        },
        textProps: {
            type: Object,
            default: () => ({}),
        },
        tspanProps: {
            type: Object,
            default: () => ({}),
        },
    } as const,
    setup(props: Props) {
        const rendered = ref(false);
        const uniqueId = ref<string>('');
        const ellipseId = ref<string>('');
        const svgRef = ref<SVGSVGElement | null>(null);

        const textKey = () => JSON.stringify({
            width: props.width,
            height: props.height,
            cx: props.cx,
            cy: props.cy,
            rx: props.rx,
            ry: props.ry,
            startOffset: props.startOffset,
            reversed: props.reversed,
            text: props.text,
            svgProps: props.svgProps,
            ellipseProps: props.ellipseProps,
            textPathProps: props.textPathProps,
            textProps: props.textProps,
            tspanProps: props.tspanProps,
            rendered: rendered.value,
        });

        const handleSvgRef = (el: SVGSVGElement | null) => {
            svgRef.value = el;
        };

        watch(() => svgRef.value, (newValue) => {
            if (newValue) {
                const myEllipseAttr: GlyphAttr = {
                    id: ellipseId.value,
                    type: 'ellipse',
                    rx: props.rx,
                    ry: props.ry,
                    cx: props.cx,
                    cy: props.cy,
                    style: 'fill: none;',
                    ...props.ellipseProps,
                };

                const newEllipsePath = SVGPathCommander.shapeToPath(myEllipseAttr, true);

                const alreadyAddedChild = document.getElementById(ellipseId.value);
                if (alreadyAddedChild) {
                    alreadyAddedChild.remove();
                }

                newValue.prepend(newEllipsePath);

                if (props.reversed) {
                    const currentPath = newEllipsePath.getAttribute('d');
                    const pathValueReversed = SVGPathCommander.reversePath(currentPath || '');
                    const pathValueReversedStr = SVGPathCommander.pathToString(pathValueReversed);
                    newEllipsePath.setAttribute('d', pathValueReversedStr);
                }

                rendered.value = true;
            }
        });

        onMounted(() => {
            // Implement useId logic here if needed
            uniqueId.value = ''; // Replace with your useId logic
            ellipseId.value = `ellipse-id${uniqueId.value.replaceAll(':', '-').substring(0, uniqueId.value.length - 1)}`;
        });

        onBeforeUnmount(() => {
            // Cleanup logic if needed
        });

        return {
            svgRef,
            textKey,
            handleSvgRef,
        };
    },
};
</script>