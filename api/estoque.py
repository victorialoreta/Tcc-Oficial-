from flask import Blueprint, jsonify, request
from api.conexao import abrir_conexao

# O Blueprint agrupa as rotas relacionadas ao estoque.
# O prefixo /api será colocado no app.py.
estoque_api = Blueprint("estoque_api", __name__)


@estoque_api.route("/estoque", methods=["GET"])
def listar_estoque():
    """Retorna todos os itens cadastrados."""
    conexao = abrir_conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("""
        SELECT id, nome, qtde, descricao, preco,
               estoque_min, foto, categoria
        FROM estoque
        ORDER BY id
    """)

    itens = cursor.fetchall()

    cursor.close()
    conexao.close()

    # DECIMAL do MySQL pode chegar ao Python como Decimal.
    # float permite que o valor seja enviado em JSON.
    for item in itens:
        if item["preco"] is not None:
            item["preco"] = float(item["preco"])

    return jsonify(itens), 200


@estoque_api.route("/estoque/<int:id>", methods=["GET"])
def buscar_item(id):
    """Retorna um único item pelo id."""
    conexao = abrir_conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("""
        SELECT id, nome, qtde, descricao, preco,
               estoque_min, foto, categoria
        FROM estoque
        WHERE id = %s
    """, (id,))

    item = cursor.fetchone()

    cursor.close()
    conexao.close()

    if item is None:
        return jsonify({"erro": "Item não encontrado"}), 404

    if item["preco"] is not None:
        item["preco"] = float(item["preco"])

    return jsonify(item), 200


@estoque_api.route("/estoque", methods=["POST"])
def criar_item():
    """Cadastra um novo item usando dados JSON."""
    dados = request.get_json()

    # Se o cliente não enviar JSON, não há dados para cadastrar.
    if dados is None:
        return jsonify({
            "erro": "Envie um JSON no corpo da requisição"
        }), 400

    campos_obrigatorios = [
        "nome",
        "qtde",
        "descricao",
        "preco",
        "categoria"
    ]

    for campo in campos_obrigatorios:
        if campo not in dados:
            return jsonify({
                "erro": f"Campo obrigatório ausente: {campo}"
            }), 400

    conexao = abrir_conexao()
    cursor = conexao.cursor()

    cursor.execute("""
        INSERT INTO estoque
        (nome, qtde, descricao, preco, estoque_min, foto, categoria)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        dados["nome"],
        dados["qtde"],
        dados["descricao"],
        dados["preco"],
        dados.get("estoque_min", 0),
        dados.get("foto"),
        dados["categoria"]
    ))

    conexao.commit()

    novo_id = cursor.lastrowid

    cursor.close()
    conexao.close()

    return jsonify({
        "mensagem": "Item criado com sucesso",
        "id": novo_id
    }), 201


@estoque_api.route("/estoque/<int:id>", methods=["PUT"])
def atualizar_item(id):
    """Atualiza todos os dados principais de um item."""
    dados = request.get_json()

    if dados is None:
        return jsonify({
            "erro": "Envie um JSON no corpo da requisição"
        }), 400

    campos_obrigatorios = [
        "nome",
        "qtde",
        "descricao",
        "preco",
        "categoria"
    ]

    for campo in campos_obrigatorios:
        if campo not in dados:
            return jsonify({
                "erro": f"Campo obrigatório ausente: {campo}"
            }), 400

    conexao = abrir_conexao()
    cursor = conexao.cursor()

    cursor.execute("""
        UPDATE estoque
        SET nome = %s,
            qtde = %s,
            descricao = %s,
            preco = %s,
            estoque_min = %s,
            foto = %s,
            categoria = %s
        WHERE id = %s
    """, (
        dados["nome"],
        dados["qtde"],
        dados["descricao"],
        dados["preco"],
        dados.get("estoque_min", 0),
        dados.get("foto"),
        dados["categoria"],
        id
    ))

    if cursor.rowcount == 0:
        cursor.close()
        conexao.close()

        return jsonify({
            "erro": "Item não encontrado"
        }), 404

    conexao.commit()

    cursor.close()
    conexao.close()

    return jsonify({
        "mensagem": "Item atualizado com sucesso"
    }), 200


@estoque_api.route("/estoque/<int:id>", methods=["DELETE"])
def excluir_item(id):
    """Exclui um item pelo id."""
    conexao = abrir_conexao()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM estoque WHERE id = %s",
        (id,)
    )

    if cursor.rowcount == 0:
        cursor.close()
        conexao.close()

        return jsonify({ "erro": "Item não encontrado" }), 404

    conexao.commit()

    cursor.close()
    conexao.close()

    return jsonify({
        "mensagem": "Item excluído com sucesso"
    }), 200
