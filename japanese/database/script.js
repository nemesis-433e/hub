function toggleAllDatabases() {
    const checkboxes = document.querySelectorAll('.database-filters input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach(checkbox => {
        checkbox.checked = !allChecked;
    });
    
    buscar();
}

function checkSelectedDatabases() {
    const selectedDatabases = [];
    
    // Seleciona todos os checkboxes da seção de filtros
    const checkboxes = document.querySelectorAll('.database-filters input[type="checkbox"]');
    
    // Adiciona o valor de cada checkbox marcado ao array
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedDatabases.push(checkbox.value);
        }
    });
    
    return selectedDatabases;
}

async function buscar() {
    const termo = document.getElementById("search").value.toLowerCase();
    const res = await fetch("http://localhost:3001/grammar");
    const dados = await res.json();
    
    // Obtém as databases selecionadas
    const selectedDatabases = checkSelectedDatabases();
    
    // Filtra por termo de busca E por database selecionada
    const filtrados = dados.filter(d => {
        return d.point.toLowerCase().includes(termo) && 
               selectedDatabases.includes(d.source);
    });
    
    const lista = document.getElementById("resultado");
    lista.innerHTML = "";

    filtrados.forEach(d => {
        const item = document.createElement("li");
        const link = `<a href="${d.link}" target="_blank">${d.point}</a>`;
        const checkbox = `<input type="checkbox" ${d.read === "YES" ? "checked" : ""} onchange="atualizar(${d.id}, this.checked)">`;
        item.innerHTML = `${link} - ${d.source} ${checkbox}`;
        lista.appendChild(item);
    });
}

async function atualizar(id, checked) {
    await fetch("http://localhost:3001/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: checked ? "YES" : "NO" })
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.database-filters input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', buscar);
    });
    
    // init
    buscar();
});
