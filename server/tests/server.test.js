const expect = require('expect')
const request = require('supertest')

const app = require('./../server')
const Todo = require('./../models/todo')
const user = require('./../models/user')

beforeEach((done) =>{
    console.log(Todo);
  Todo.todos.remove({}).then(() =>{
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
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) =>{done(e)})
    })

    })
})