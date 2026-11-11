from flask import Blueprint, jsonify, request
from api.conexao import abrir_conexao

usuarios_api = Blueprint("usuarios_api", __name__)

@usuarios_api.route("/usuarios", methods=["GET"])
def listar_usuarios():
    conexao = abrir_conexao()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("SELECT login, role FROM usuarios ORDER BY login")
    usuarios = cursor.fetchall()
    cursor.close()
    conexao.close()
    return jsonify(usuarios), 200


@usuarios_api.route("/usuarios", methods=["POST"])
def criar_usuario():
    dados = request.get_json()
    if dados is None:
        return jsonify({"erro": "Envie um JSON no corpo da requisição"}), 400

    campos = ["login", "password", "role"]
    for campo in campos:
        if campo not in dados or dados[campo] == "":
            return jsonify({"erro": f"Campo obrigatório ausente: {campo}"}), 400

    conexao = abrir_conexao()
    cursor = conexao.cursor()

    cursor.execute("SELECT login FROM usuarios WHERE login = %s", (dados["login"],))
    if cursor.fetchone() is not None:
        cursor.close()
        conexao.close()
        return jsonify({"erro": "Login já cadastrado"}), 409

    cursor.execute("""
        INSERT INTO usuarios (login, password, role)
        VALUES (%s, %s, %s)
    """, (dados["login"], dados["password"], dados["role"]))

    conexao.commit()
    cursor.close()
    conexao.close()

    return jsonify({"mensagem": "Usuário criado com sucesso"}), 201


@usuarios_api.route("/login", methods=["POST"])
def login():
    dados = request.get_json()
    if dados is None or "login" not in dados or "password" not in dados:
        return jsonify({"erro": "Informe login e password"}), 400

    conexao = abrir_conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("""
        SELECT login, password, role
        FROM usuarios
        WHERE login = %s
    """, (dados["login"],))
    usuario = cursor.fetchone()
    cursor.close()
    conexao.close()

    if usuario is None or usuario["password"] != dados["password"]:
        return jsonify({"erro": "Login ou senha inválidos"}), 401

    return jsonify({
        "mensagem": "Login realizado com sucesso",
        "usuario": usuario["login"],
        "role": usuario["role"]
    }), 200