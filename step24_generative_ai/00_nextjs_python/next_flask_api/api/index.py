from flask import Flask,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
#todo list will be stored in this list representing a database
todos = []

#route for getting all the todos
@app.route('/api/todos',methods=['GET'])
def get_todos():
    return {'todos':todos,'message':'success','status':200}

#route for adding a todo
@app.route('/api/todo',methods=['POST'])
def add_todo():
    #get the todo from the request body
    todo = request.json.get('todo')
    #append the todo to the todos list
    todos.append(todo)
    return {'todo':todo,'message':'success','status':200}

#route for deleting a todo
@app.route('/api/todo/<int:id>',methods=['DELETE'])
def delete_todo(id):
    #get the todo id from the url
    todo_id = id
    global todos
    #delete the todo from the todos list
    todos = [todo for todo in todos if todo["id"] != str(todo_id)]
    return {'message':'success','status':200}

#route for updating a todo
@app.route('/api/todo/<int:id>',methods=['PUT'])
def update_todo(id):
    #get the todo id from the url
    todo_id = id
    #get the todo from the request body
    todoNew = request.json.get('todo')
    global todos
    #update the todo in the todos list
    todoPrev = next((todo for todo in todos if todo["id"] == str(todo_id)), None)
    if todoPrev:
        todoPrev["id"] = todoNew["id"]
        todoPrev["title"] = todoNew["title"]
        todoPrev["status"] = todoNew["status"]
        return {'todo':todoNew,'message':'success','status':200}
     
    return {'message':'not found','status':404}
    

@app.route('/api/status',methods=['GET'])
def status():
    return 'API is up and running!'

if __name__ == '__main__':
    app.run()