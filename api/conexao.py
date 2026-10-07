import mysql.connector

def abrir_conexao():
    """" Abre uma conxão com o banco do sistema"""

def abrir_conexao():
    conexao = mysql.connector.connect(
        host="db",
        user="root",
        password="mysql_root",
        port=3306,
        database="almoxarifado",
        charset = 'utf8'
    )

    return conexao
