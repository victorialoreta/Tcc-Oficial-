from flask import Flask, render_template, request, redirect
import mysql.connector

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/estoque.html')
def estoque():

    conexao = mysql.connector.connect(
        host = 'localhost',
        password = '',
        user = 'root',
        port = 3306,
        database = 'almoxarifado'
    )

    cursor = conexao.cursor()
    cursor.execute("SELECT * FROM estoque")

    resultado = cursor.fetchall()

    return render_template('estoque.html', resultado=resultado)

@app.route('/editar.html')
def editar():

    conexao = mysql.connector.connect(
        host='localhost',
        password='',
        user='root',
        port=3306,
        database='almoxarifado'
    )

    cursor = conexao.cursor()

    cursor.execute("SELECT * FROM estoque")

    resultado = cursor.fetchall()

    cursor.close()
    conexao.close()

    return render_template(
        'editar.html',
        resultado=resultado
    )

@app.route('/novoitem.html')
def novoitem():
    return render_template('novoitem.html')

    nome = request.form.get('nome')

    conexao = mysql.connector.connect(
        host='localhost',
        password='',
        user='root',
        port=3306,
        database='almoxarifado'
    )

    cursor = conexao.cursor()
    query = "INSERT INTO estoque SET qtde = %s, id = %s, descricao = %s WHERE nome = %s;"
    valores = (nome,)
    cursor.execute(query, valores)
    conexao.commit()

    return redirect("/estoque.html")

@app.route('/salvar_edicao', methods=['POST'])
def salvar_edicao():
    
    id = request.form.get('id')
    nome = request.form.get('nome')
    descricao = request.form.get('descricao')
    qtde = request.form.get('qtde')

    conexao = mysql.connector.connect(
        host='localhost',
        password='',
        user='root',
        port=3306,
        database='almoxarifado'
    )

    cursor = conexao.cursor()
    query = "UPDATE estoque SET qtde = %s, id = %s, descricao = %s WHERE nome = %s;"
    valores = (qtde, id, descricao, nome)
    cursor.execute(query, valores)
    conexao.commit()

    return redirect("/editar.html")

@app.route('/deletar', methods=['POST'])
def deletar():
    
    nome = request.form.get('nome')

    conexao = mysql.connector.connect(
        host='localhost',
        password='',
        user='root',
        port=3306,
        database='almoxarifado'
    )

    cursor = conexao.cursor()
    query = "DELETE FROM estoque WHERE nome = %s;"
    valores = (nome,)
    cursor.execute(query, valores)
    conexao.commit()

    return redirect("/editar.html")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

