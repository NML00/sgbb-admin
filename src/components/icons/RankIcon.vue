<script setup lang="ts">
import rank1 from '@/assets/videos/bronze.mp4'
import rank2 from '@/assets/videos/silver.mp4'
import rank3 from '@/assets/videos/gold.mp4'
import rank4 from '@/assets/videos/platinum.mp4'
import rank5 from '@/assets/videos/diamond.mp4'
import rank6 from '@/assets/videos/highness.mp4'
import rank7 from '@/assets/videos/emperor.mp4'
import { computed } from 'vue'

const ranklist = [rank1, rank2, rank3, rank4, rank5, rank6, rank7]

const props = defineProps(
    {
        rank: {type: Number, required: true},
        width: {type: [Number, String], default: 50},
        height: {type: [Number, String], default: 50}
    }
)

const rank = computed(() => {
  if (props.rank) return ranklist[Number(props.rank) - 1]
  return ''
})
</script>

<template>
    <video :width="width" :height="height">
        <source :src="rank" type="video/mp4"/>
    </video>
</template>
