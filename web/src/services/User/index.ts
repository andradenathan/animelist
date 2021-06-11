import { useState } from 'react';
import axios from 'axios';

const route = axios.create({
    baseURL: 'http://localhost:3333'
});

export default {
    async register(form: any) {
        try {
            const response = await route.post('/auth/register', form);
            alert('Usuário cadastrado com sucesso!');
            console.log('dados do usuário: ', response.data);
        } catch(err) {
            alert('Não foi possível cadastrar o usuário com sucesso');
        }
    }
}
