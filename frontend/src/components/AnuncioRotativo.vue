<script setup>
defineProps({
    largura: {
        type: Number,
        required: true,
    }

})

function toggleSelection(card, checkbox) {
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
        card.classList.add("selected");
    } else {
        card.classList.remove("selected");
    }
}

function removerItem(id) {
    document.getElementById(id).remove();
}
</script>

<template>
    <div class="col-md-4 col-sm-6" id="item1">
        <div class="card shadow-sm p-3 item-card" v-on:click="toggleSelection(this, document.getElementById('checkbox1'))">
            <input type="checkbox" class="form-check-input me-2" id="checkbox1">
            <img src="" alt="Thumbnail" class="item-img">
            <div class="mt-2">
                <h6 class="mb-1">Item 1</h6>
                <small class="text-muted">Duração:</small>
                <input type="number" class="form-control w-25 d-inline" value="150" min="1"
                    onclick="event.stopPropagation();"> Seg
                <button class="btn btn-danger btn-sm mt-2 w-100"
                    onclick="event.stopPropagation(); removerItem('item1')">Remover</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.selected {
    border: 2px solid #007bff;
}

.bg-light {
    --bs-bg-opacity: 1;
    background-color: rgb(219 221 223) !important;
}

.item-img {
    width: 100%;
    height: auto;
    max-height: 150px;
    /* Ajusta a altura sem perder a proporção */
    object-fit: cover;
    border-radius: 5px;
}

.form-check-input:checked[type=checkbox] {
    --bs-form-check-bg-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e);
    font-size: 19px;
    margin-top: 12px;
    margin-bottom: 14px;
    border-radius: 100%;
}

.form-check-input:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);
    font-size: 19px;
    margin-top: 12px;
    margin-bottom: 14px;
    border-radius: 100%;
}

.form-check-input[type=checkbox] {
    border-radius: .25em;
    font-size: 19px;
    margin-top: 12px;
    margin-bottom: 14px;
    border-radius: 100%;
}

.selected {
    border: 2px solid #007bff;
    border-radius: 7px;
    padding: 0px;
}

.col-md-4 {
    flex: 0 0 auto;
    width: 27.333333%;
    margin: 2px;
    padding: 0px;
    min-width: 350px;
    /* border: 2px solid #c8dbeefe; */
    border-radius: 7px;
}
</style>