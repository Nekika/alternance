<template>
    <p class="bienvenue">Bonjour {{ nom }} !</p>
</template>

<script>
export default {
    data() {
        return {
            nom: "Vue"
        }
    }
}
</script>

<style scoped>
.bienvenue {
    text-align: center;
    font-size: 2em;
    color: #A2A2A2;
}
</style>
