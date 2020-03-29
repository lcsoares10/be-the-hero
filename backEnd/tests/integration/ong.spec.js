const request = require('supertest');
const   app = require('../../src/app')
const conection = require('../../src/database/connection')

describe('ONG',()=>{

    beforeEach( async ()=>{
        //desfaz a migration se tiver alguma
        await conection.migrate.rollback();
        await conection.migrate.latest();
    });

    afterAll( async()=>{
        await conection.destroy();
    })

    it('should be able to create a new ONG',async ()=> {
        const response =  await request(app).post('/ongs')
        .send({
            name:"cachoro",
            email:"teste@gmail.com",
            whatsapp:"55219699999",
            city:"itaipuaçu",
            uf:"RJ"
        })
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});