<template>
    <div class="linha">
        <h3 style="text-align: center;">00:00</h3>
        <input class="form-control" style="width: 70px;" placeholder="0" type="number">
    </div>
    <div class="linha">
        <select style="width: 141px;" class="form-select" id="selectbox" >
            <option value="" selected="selected" disabled="disabled">Tipo</option>
            <option value="0">Progressivo</option>
            <option value="1">Regressivo</option>
        </select>
        <div style="display: flex;">
            <i class="fas fa-pause"></i>
            <i class="fas fa-play"></i>
            <i class="fas fa-stop"></i>
        </div>
    </div>

</template>
<script setup>
defineProps({
    largura: {
        type: Number,
        required: true,
    }
})
</script>

<style scoped>
.fas {
    font-size: 12px;
    font-weight: 900;
    background-color: rgb(0 123 255);
    width: 33px;
    height: 33px;
    padding: 11px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 3px;
    color: #ffffff;
    cursor: pointer;
    border-radius: 100%;
    box-shadow: 0px 0px 5px 2px #e7e5e5;
    margin: 0px 2px 0px 6px;
}

.form-select {
    --bs-form-select-bg-img: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e);
    display: block;
    width: 100%;
    padding: .375rem 2.25rem .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-body-color);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: var(--bs-body-bg);
    background-image: var(--bs-form-select-bg-img), var(--bs-form-select-bg-icon, none);
    background-repeat: no-repeat;
    background-position: right .75rem center;
    background-size: 16px 12px;
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>
