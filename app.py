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

@app.route('/incluir_novo', methods=['POST'])
def incluir_novo():
    
    nome = request.form.get('nome')
    descricao = request.form.get('descricao')
    qtde = request.form.get('qtde')
    categoria = request.form.get('categoria')
    preco = request.form.get('preco')
    foto = request.form.get('foto')

    conexao = mysql.connector.connect(
        host='localhost',
        password='',
        user='root',
        port=3306,
        database='almoxarifado'
    )

    cursor = conexao.cursor()
    
    query = "INSERT INTO estoque (nome, qtde, descricao, preco, foto, categoria) VALUES (%s, %s, %s, %s, %s, %s);"
    valores = (nome, qtde, descricao, preco, foto, categoria)
    cursor.execute(query, valores)
  
    conexao.commit()

    return redirect("/estoque.html")

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


@app.route('/usuarios.html', methods=['GET', 'POST'])
def usuarios():
   
    if request.method == 'GET':
        return render_template('usuarios.html')

    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        role = request.form.get('role')

        conexao = mysql.connector.connect(
            host='localhost',
            password='',
            user='root',
            port=3306,
            database='almoxarifado'
        )

        cursor = conexao.cursor()
        
        query = "INSERT INTO usuarios (login, password, role) VALUES (%s, %s, %s);"
        valores = (login, password, role)
        cursor.execute(query, valores)
      
        conexao.commit()
        
        cursor.close()
        conexao.close()

        return redirect("/estoque.html")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')



    
