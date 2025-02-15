<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template> 
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <!-- <a class="navbar-brand" href="/"><img class="logo" src="/pictures/sistem/logo_podium.png" alt="" srcset=""></a> -->

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
                        <RouterLink  class="nav-item nav-link" to="/about">Anúncios</RouterLink>
                    </li>
                    <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Anúncios
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/carrossel">Rotativo</a></li>
                            <li><a class="dropdown-item" href="#">Merchan</a></li>
                        </ul>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
