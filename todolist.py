from flask import Flask, request, jsonify, redirect, url_for
import mysql.connector

app = Flask(__name__)

# Povezivanje sa bazom podataka
mydb = mysql.connector.connect(
  host="localhost",
  user="username"
  password="password"
  database="ime baze podataka"
)

# Kreiranje tabele "tasks" ako ne postoji
mycursor = mydb.cursor()
mycursor.execute("CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, task VARCHAR(255))")

@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    cursor = mydb.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    return jsonify(tasks)


# Ruta za dodavanje zadatka u bazu podataka
@app.route('/add_task', methods=['POST'])
def add_task():
    task = request.json['task']
    mycursor.execute("INSERT INTO tasks (task) VALUES (%s)", (task,))
    mydb.commit()
    return jsonify(success=True)

# Ruta za ažuriranje zadatka u bazi podataka
@app.route('/update_task', methods=['POST'])
def update_task():
    old_task = request.json['oldTask']
    new_task = request.json['newTask']
    mycursor.execute("UPDATE tasks SET task = %s WHERE task = %s", (new_task, old_task))
    mydb.commit()
    return jsonify(success=True)

# Ruta za brisanje zadatka iz baze podataka
@app.route('/delete_task', methods=['POST'])
def delete_task():
    task = request.json['task']
    mycursor.execute("DELETE FROM tasks WHERE task = %s", (task,))
    mydb.commit()
    return jsonify(success=True)

# Ruta za dohvatanje svih zadatka iz baze podataka
@app.route('/get_tasks')
def get_tasks():
    mycursor.execute("SELECT task FROM tasks")
    tasks = mycursor.fetchall()
    task_list = []
    for task in tasks:
        task_list.append({'task': task[0]})
    return jsonify(task_list)

if __name__ == '__main__':
    app.run()

@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    cursor = mydb.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    return jsonify(tasks)






