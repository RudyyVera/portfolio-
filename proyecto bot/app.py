from flask import Flask, render_template, request, jsonify

# Configurar rutas relativas para templates y static
app = Flask(__name__, template_folder="templates", static_folder="static")

@app.route("/")
def home():
    return render_template("bot.html")

@app.route("/mensaje", methods=["POST"])
def mensaje():
    data = request.json
    texto = data["texto"]
    return jsonify({"respuesta": f"Recibí: {texto}"})

if __name__ == "__main__":
    app.run(debug=True)
