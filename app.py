from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

data = {
    "despesas_fixas": [],
    "despesas_unicas": [],
    "receitas": [],
    "guardar": 0
}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add-despesa", methods=["POST"])
def add_despesa():
    info = request.json
    if info["tipo"] == "fixa":
        data["despesas_fixas"].append(info)
    else:
        data["despesas_unicas"].append(info)
    return jsonify(success=True)

@app.route("/add-receita", methods=["POST"])
def add_receita():
    data["receitas"].append(request.json)
    return jsonify(success=True)

@app.route("/guardar", methods=["POST"])
def guardar():
    data["guardar"] = request.json["valor"]
    return jsonify(success=True)

@app.route("/resumo")
def resumo():
    total_fixas = sum(d["valor"] for d in data["despesas_fixas"])
    total_unicas = sum(d["valor"] for d in data["despesas_unicas"])
    total_despesas = total_fixas + total_unicas
    total_receitas = sum(r["valor"] for r in data["receitas"])

    saldo = total_receitas - total_despesas
    saldo_final = saldo - data["guardar"]

    return jsonify({
        "fixas": total_fixas,
        "unicas": total_unicas,
        "despesas": total_despesas,
        "receitas": total_receitas,
        "guardar": data["guardar"],
        "saldo_final": saldo_final
    })

if __name__ == "__main__":
    app.run(debug=True)
