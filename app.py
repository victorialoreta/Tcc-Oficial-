from flask import Flask, render_template, request
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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')