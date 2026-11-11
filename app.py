# app.py
from flask import Flask, render_template, request, redirect
from flask_cors import CORS
from api.estoque import estoque_api
from api.usuarios import usuarios_api
from api.conexao import abrir_conexao

app = Flask(__name__)
CORS(app)

app.register_blueprint(estoque_api, url_prefix='/api')
app.register_blueprint(usuarios_api, url_prefix='/api')

@app.route('/')
def index():
    return render_template('login.html')
    
@app.route('/estoque.html')
def estoque():
    conexao = abrir_conexao()
    cursor = conexao.cursor()
    cursor.execute("SELECT * FROM estoque")
    resultado = cursor.fetchall()
    cursor.close()
    conexao.close()
    return render_template('estoque.html', resultado=resultado)

@app.route('/editar.html')
def editar():
    conexao = abrir_conexao()
    cursor = conexao.cursor()
    cursor.execute("SELECT * FROM estoque")
    resultado = cursor.fetchall()
    cursor.close()
    conexao.close()
    return render_template('editar.html', resultado=resultado)

@app.route('/novoitem.html')
def novoitem():
    return render_template('novoitem.html')
   
@app.route('/salvar_edicao', methods=['POST'])
def salvar_edicao():
    id = request.form.get('id')
    nome = request.form.get('nome')
    descricao = request.form.get('descricao')
    qtde = request.form.get('qtde')
    categoria = request.form.get('categoria')
    preco = request.form.get('preco')

    conexao = abrir_conexao()
    cursor = conexao.cursor()
  
    # CORREÇÃO: Atualiza todos os campos principais com base no ID recebido do formulário
    query = "UPDATE estoque SET nome = %s, descricao = %s, qtde = %s, categoria = %s, preco = %s WHERE id = %s;"
    valores = (nome, descricao, qtde, categoria, preco, id)
    
    cursor.execute(query, valores)
    conexao.commit()

    cursor.close()
    conexao.close()

    return redirect("/editar.html")

@app.route('/incluir_novo', methods=['POST'])
def incluir_novo():
    nome = request.form.get('nome')
    descricao = request.form.get('descricao')
    qtde = request.form.get('qtde')
    categoria = request.form.get('categoria')
    preco = request.form.get('preco')
    foto = request.form.get('foto')

    conexao = abrir_conexao()
    cursor = conexao.cursor()
    
    query = "INSERT INTO estoque (nome, qtde, descricao, preco, foto, categoria) VALUES (%s, %s, %s, %s, %s, %s);"
    valores = (nome, qtde, descricao, preco, foto, categoria)
    cursor.execute(query, valores)
    conexao.commit()

    cursor.close()
    conexao.close()

    return redirect("/estoque.html")

@app.route('/deletar', methods=['POST'])
def deletar():
    id = request.form.get('id')

    conexao = abrir_conexao()
    cursor = conexao.cursor()
    
    query = "DELETE FROM estoque WHERE id = %s;"
    valores = (id,)
    cursor.execute(query, valores)
    conexao.commit()

    cursor.close()
    conexao.close()

    return redirect("/editar.html")


@app.route('/usuarios.html', methods=['GET', 'POST'])
def usuarios():
    if request.method == 'GET':
        return render_template('usuarios.html')

    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        role = request.form.get('role')

        conexao = abrir_conexao()
        cursor = conexao.cursor()
        
        query = "INSERT INTO usuarios (login, password, role) VALUES (%s, %s, %s);"
        valores = (login, password, role)
        cursor.execute(query, valores)
        conexao.commit()
        
        cursor.close()
        conexao.close()

        return redirect("/estoque.html")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)