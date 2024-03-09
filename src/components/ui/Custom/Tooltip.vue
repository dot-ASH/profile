<script setup lang="ts">
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
defineProps<{
    elementText?: string,
    hoverText: string
}>()
</script>

<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>{{ elementText }}</TooltipTrigger>
            <TooltipContent>
                <p>{{ hoverText }}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>