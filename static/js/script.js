const descDespesa = document.getElementById("descDespesa");
const valorDespesa = document.getElementById("valorDespesa");
const tipoDespesa = document.getElementById("tipoDespesa");

const descReceita = document.getElementById("descReceita");
const valorReceita = document.getElementById("valorReceita");

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
}

function atualizarResumo() {
  fetch("/resumo")
    .then((res) => res.json())
    .then((data) => {
      resumo.innerHTML = `
Receitas: R$ ${data.receitas.toFixed(2)}
Despesas: R$ ${data.despesas.toFixed(2)}
Guardar: R$ ${data.guardar.toFixed(2)}

Saldo final:
<span class="${data.saldo_final >= 0 ? "saldo-positivo" : "saldo-negativo"}">
R$ ${data.saldo_final.toFixed(2)}
</span>
      `;
    })
    .catch((err) => {
      resumo.innerText = "Erro ao carregar resumo 😢";
      console.error(err);
    });
}
