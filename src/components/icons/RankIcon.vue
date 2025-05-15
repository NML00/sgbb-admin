<script setup lang="ts">
import rank1 from '@/assets/images/rank/bronze.png'
import rank2 from '@/assets/images/rank/silver.png'
import rank3 from '@/assets/images/rank/gold.png'
import rank4 from '@/assets/images/rank/platinum.png'
import rank5 from '@/assets/images/rank/diamond.png'
import rank6 from '@/assets/images/rank/highness.png'
import rank7 from '@/assets/images/rank/emperor.png'
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
    <img :width="width" :height="height" :src="rank" />
</template>
