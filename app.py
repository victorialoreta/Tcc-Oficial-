from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/estoque.html')
def cadastro():
    return render_template('estoque.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')