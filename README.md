#Controle Financeiro — Projeto Fullstack (Flask + JavaScript)

Este projeto é um sistema de controle financeiro pessoal, desenvolvido com backend em Python (Flask) e frontend em HTML, CSS e JavaScript puro, com foco em estudar arquitetura fullstack, comunicação entre front e back e persistência de dados.
O sistema permite registrar despesas, receitas, definir um valor para guardar e visualizar um resumo financeiro automático, com saldo final atualizado. Projeto executado localmente para fins de estudo, simulando a separação entre frontend e backend via API REST.

#Tecnologias Utilizadas

Backend

Python

Flask

Flask-CORS

Persistência em arquivo JSON

API REST

Frontend

HTML5

CSS3

JavaScript (ES6+)

Fetch API

##Arquitetura do Projeto

O projeto segue uma arquitetura front-back desacoplada, onde:

O backend expõe endpoints REST para:

- adicionar despesas e receitas

- remover itens

- armazenar valor para guardar

- calcular e retornar o resumo financeiro

O frontend consome esses dados via fetch, atualizando a interface dinamicamente. Mesmo rodando localmente, a estrutura já está preparada para deploy separado de backend e frontend.

###Funcionalidades

- Adicionar despesas e receitas

- Listagem dinâmica de despesas e receitas

- Exclusão de itens individualmente

- Definir valor para guardar

- Cálculo automático de:

total de receitas

total de despesas

saldo final

- Persistência de dados em JSON

- Atualização dinâmica da interface

####Como Executar Localmente
1️⃣ Clonar o repositório
git clone <url-do-repositorio>
cd finance_app

2️⃣ Criar e ativar ambiente virtual
python -m venv venv
venv\Scripts\activate   # Windows

3️⃣ Instalar dependências
pip install -r requirements.txt

4️⃣ Executar o backend
python app.py

O backend ficará disponível em:

http://127.0.0.1:5000

5️⃣ Abrir o frontend

Abra o arquivo index.html no navegador.

#####Observações Importantes

Os dados são salvos em um arquivo data.json, criado automaticamente.

O projeto foi desenvolvido com foco em aprendizado de lógica, integração front-back e organização de código.

A estrutura já está preparada para deploy futuro em serviços como Render (backend) e Vercel (frontend).
