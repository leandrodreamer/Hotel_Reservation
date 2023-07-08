<template>
    <header>
        <img src="/favicon.ico" alt="">
        <h1><router-link to="/">Miami Breeze Resorts</router-link></h1>
    </header>
</template>

<style lang="scss">
header {
    display: flex;
    align-items: center;
    background-color: $primary-color;
    color: azure;
    padding: 10px 10px 10px 20px;

    img {
        padding-right: 10px;
        min-width: 40px;
        min-height: 40px;
    }
}
</style>