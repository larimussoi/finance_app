const descDespesa = document.getElementById("descDespesa");
const valorDespesa = document.getElementById("valorDespesa");
const tipoDespesa = document.getElementById("tipoDespesa");

const descReceita = document.getElementById("descReceita");
const valorReceita = document.getElementById("valorReceita");

const listaDespesas = document.getElementById("listaDespesas");
const listaReceitas = document.getElementById("listaReceitas");

const guardar = document.getElementById("guardar");
const resumo = document.getElementById("resumo");

function addDespesa() {
  fetch("/add-despesa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      descricao: descDespesa.value,
      valor: Number(valorDespesa.value),
      tipo: tipoDespesa.value,
    }),
  }).then(() => {
    descDespesa.value = "";
    valorDespesa.value = "";
    tipoDespesa.value = "fixa";
  });
  carregarDados();
}

function addReceita() {
  fetch("/add-receita", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      descricao: descReceita.value,
      valor: Number(valorReceita.value),
    }),
  }).then(() => {
    descReceita.value = "";
    valorReceita.value = "";
  });
  carregarDados();
}

function guardarValor() {
  fetch("/guardar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      valor: Number(guardar.value),
    }),
  }).then(() => {
    guardar.value = "";
  });
  carregarDados();
}

function renderDespesas(despesas) {
  listaDespesas.innerHTML = "";

  despesas.forEach((d) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${d.descricao} — R$ ${d.valor.toFixed(2)}
      <button onclick="removerDespesa('${d.id}')">❌</button>
    `;
    listaDespesas.appendChild(li);
  });
}

function renderReceitas(receitas) {
  listaReceitas.innerHTML = "";

  receitas.forEach((r) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${r.descricao} — R$ ${r.valor.toFixed(2)}
      <button onclick="removerReceita('${r.id}')">❌</button>
    `;
    listaReceitas.appendChild(li);
  });
}

function carregarDados() {
  fetch("/resumo")
    .then((res) => res.json())
    .then((data) => {
      renderDespesas(data.despesas_lista);
      renderReceitas(data.receitas_lista);
      atualizarResumoComDados(data);
    });
}

function atualizarResumoComDados(data) {
  resumo.innerHTML = `
Receitas: R$ ${data.receitas.toFixed(2)}
Despesas: R$ ${data.despesas.toFixed(2)}
Guardar: R$ ${data.guardar.toFixed(2)}

Saldo final:
<span class="${data.saldo_final >= 0 ? "saldo-positivo" : "saldo-negativo"}">
R$ ${data.saldo_final.toFixed(2)}
</span>
  `;
}

function removerDespesa(id) {
  fetch(`/remover/despesa/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then(() => carregarDados());
}

function removerReceita(id) {
  fetch(`/remover/receita/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then(() => carregarDados());
}

carregarDados();
