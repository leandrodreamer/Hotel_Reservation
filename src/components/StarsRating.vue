<template>
    <div class="stars">
        <span class="star" v-for="n in stars" :key="n">&#9733;</span>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        stars: {
            type: Number,
            required: true
        }
    }
});
</script>
  
<style lang="scss" scoped>
.stars {
    background-color: #000000b0;
    padding: 0 6px;
    width: fit-content;
    border-radius: 20px;
    .star {
        color: gold;
    }
}
</style>