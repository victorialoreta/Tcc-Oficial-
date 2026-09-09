import mysql.connector

def abrir_conexao():
    """" Abre uma conxão com o banco do sistema"""

def abrir_conexao():
    conexao = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        port=3306,
        database="almoxarifado"
    )

    return conexao
