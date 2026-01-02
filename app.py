import json
import os
import uuid
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

DATA_FILE = "data.json"


def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def load_data():
    if not os.path.exists(DATA_FILE):
        data = {
            "despesas": [],
            "receitas": [],
            "guardar": 0
        }
        save_data(data)
        return data

    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        data = {
            "despesas": [],
            "receitas": [],
            "guardar": 0
        }
        save_data(data)
        return data

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/add-despesa", methods=["POST"])
def add_despesa():
    data = load_data()
    nova = request.json
    nova["id"] = str(uuid.uuid4())
    data["despesas"].append(nova)
    save_data(data)
    return jsonify({"status": "ok"})


@app.route("/add-receita", methods=["POST"])
def add_receita():
    data = load_data()
    nova = request.json
    nova["id"] = str(uuid.uuid4())  
    data["receitas"].append(nova)
    save_data(data)
    return jsonify({"status": "ok"})

@app.route("/remover/<tipo>/<item_id>", methods=["DELETE"])
def remover_item(tipo, item_id):
    data = load_data()

    if tipo == "despesa":
        data["despesas"] = [
            d for d in data["despesas"]
            if d.get("id") != item_id
        ]
    elif tipo == "receita":
        data["receitas"] = [
            r for r in data["receitas"]
            if r.get("id") != item_id
        ]

    save_data(data)
    return jsonify({"status": "ok"})

@app.route("/guardar", methods=["POST"])
def guardar():
    data = load_data()
    data["guardar"] = request.json["valor"]
    save_data(data)
    return jsonify({"status": "ok"})


@app.route("/resumo")
def resumo():
    data = load_data()

    total_despesas = sum(d["valor"] for d in data["despesas"])
    total_receitas = sum(r["valor"] for r in data["receitas"])

    saldo = total_receitas - total_despesas - data["guardar"]

    return jsonify({
        "despesas_lista": data["despesas"],
        "receitas_lista": data["receitas"],
        "receitas": total_receitas,
        "despesas": total_despesas,
        "guardar": data["guardar"],
        "saldo_final": saldo
    })

if __name__ == "__main__":
    app.run(debug=True)
