const expect = require('expect')
const request = require('supertest')
const app = require('./../server')
const Todo = require('./../models/todo')
const user = require('./../models/user')

const ObjectID = require('mongodb')

const todoarr = [
    {
        _id: new ObjectID.ObjectId(),
        text:"first chunk"

    },{
        _id: new ObjectID.ObjectId(),
        text:"second chunk",
        completed:false,
        completedAt: new Date().getTime()
    }
];

beforeEach((done) =>{
  Todo.todos.remove({}).then(() =>{
      return Todo.todos.insertMany(todoarr);
  }).then(() =>{
      done();
  })
});


describe('POST /todos',() =>{
    it('should create new todo',(done) =>{
        var text = "test todo text";
        request("http://localhost:3000")
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) =>{
            console.log(res.body.text);
            expect(res.body.text).toBe(text);
        })

        .end((err,res) =>{
            if(err){
                return done(err);
            }

            Todo.todos.find().then((todos) =>{
                console.log("from inside should");
                console.log(todos);
                expect(todos.length).toBe(3);
                expect(todos[2].text).toBe(text);
                done();
            }).catch((e) =>{done(e)})
    })

    })
})

describe('POST/todos',() =>{
    it('should not create on empty text',(done) =>{
        request('http://localhost:3000')
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res) =>{
            if(err) {
                return done(err);
            }
        })
        
        Todo.todos.find().then((todos) =>{
            console.log("from inside should not");
            console.log(todos);
            expect(todos.length).toBe(2);
            done();
        }).catch((e) => done(e))
    })
})

describe('GET/todos',() =>{
    it('should get all todos',(done) =>{
        request('http://localhost:3000')
        .get('/todos')
        .expect(200)
        .expect((res) =>{
            console.log("from inside get");
            console.log(res.body.todos);
            expect(res.body.todos.length).toBe(2)
        })
        .end(done)
    })
})
describe('GET/todos/:id' ,() =>{
    it('should return todo doc',(done) =>{
        var hexId = todoarr[0]._id.toHexString();
        request('http://localhost:3000')
        .get(`/todos/${hexId}`)
        .expect(200)
        .expect((res) =>{
            expect(res.body.todo.text).toBe(todoarr[0].text)
        })

        .end(done)
    })

    it('should return 404 if todo not found', (done) =>{
        var hexId = new ObjectID();
        request('http://localhost:3000')
        .get(`/todos/${hexId}`)
        .expect(404)

        .end(done)
    })

    it('should return 404 if wrong url', (done) =>{
        request('http://localhost:3000')
        .get('/todos/123')
        .expect(404)
        .end(done)
    })
})

describe('Delete/todos/:id',() =>{
    it('should delete todo doc',(done) => {
        var hexid = todoarr[0]._id.toHexString();
        request('http://localhost:3000')
        .delete(`/todos/${hexid}`)
        .expect(200)
        .expect((res) =>{
            console.log(res.body);
            expect(res.body._id).toBe(hexid)
        })

        .end((err,res) =>{
            if(err){
                return done(err);
            }

            Todo.todos.findById(hexid).then((todo) =>{
                expect(todo).toNotExist();
                console.log(todo);
                done();
            }).catch((e) =>{
                done(e);
            })
        })
    })
/*
    it('should return 404 if todo not found', (done) =>{
        var hexId = new ObjectID();
        request('http://localhost:3000')
        .delete(`/todos/rty`)
        .expect(404)

        .end(done)
    })
*/
    it('should return 404 if wrong url', (done) =>{
        request('http://localhost:3000')
        .delete('/todos/123')
        .expect(404)
        .end(done)
    })
})

describe('Patch/todos/:id',() =>{
    it('should update todo doc',(done) => {
        var hexid = todoarr[0]._id.toHexString();
        var text = "there should be new text";
        request('http://localhost:3000')
        .patch(`/todos/${hexid}`)
        .send({
            completed:true,
            text
        })
        .expect(200)
        .expect((res) =>{
            console.log(res.body);
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })

        .end(done)
    })

    it('should not update todo if completedAt false', (done) =>{
        var hexid = todoarr[0]._id.toHexString();
        var text = "there should be new text";
        request('http://localhost:3000')
        .patch(`/todos/${hexid}`)
        .send({
            completed:false,
            text
        })
        .expect(200)
        .expect((res) =>{
            console.log(res.body);
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done)
    })
})