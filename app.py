from bottle import route, run

@route('index')
def index():
    return 'hello world!'

run(host='localhost', port=8080, debug=True)
