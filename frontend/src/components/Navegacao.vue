<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template> 
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">IDEV - IVIRTON</a>

            <!-- <a class="navbar-brand" href="/<%=href%>"> <%= titulo %></a> -->

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-item nav-link" to="/transmissao">Transmissões</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-item nav-link" to="/anuncio">Anúncios</RouterLink>
                    </li>
                    <!-- <li class="nav-item">
                        <RouterLink class="nav-item nav-link" to="/anunciospgm">AnúnciosPGM</RouterLink>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>

.logo{
    width: 70px;
}
</style>
