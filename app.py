from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/estoque.html')
def estoque():
    return render_template('estoque.html')

@app.route('/editar.html')
def editar():
    return render_template('editar.html')

@app.route('/novoitem.html')
def novoitem():
    return render_template('novoitem.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')