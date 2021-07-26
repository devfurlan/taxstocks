import React, {useCallback, useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

import {Container, Content, AnimationContainer} from './styles';
import {useToast} from '../../hooks/toast';
import RadioInput from "../../components/RadioInput";

interface ISignUpFormData {
    name: string;
    cpf: string;
    birth: Date;
    gender: 'M'|'F'|'O';
    email: string;
    password: string;
    passwordConfirmation: string;
}

interface IGenderOption {
    id: string;
    value: string;
    label: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const {addToast} = useToast();

    const [cpfNumber, setCpfNumber] = useState('');

    const handleChangeCPF = useCallback((e) => {
        const cpf = e.target.value;

        const parsedCPF = cpf.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')

        setCpfNumber(parsedCPF)
    }, [])

    const handleSubmit = useCallback(async (data: ISignUpFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                cpf: Yup.string().min(14, 'Digite um CPF válido').required('Digite um CPF válido'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
                gender: Yup.string().required('Gênero obrigatório'),
                birth: Yup.date().required('Data de nascimento obrigatória'),
                password: Yup.string().min(6, 'No mínimo 6 caracteres'),
                passwordConfirmation: Yup.string().min(6, 'No mínimo 6 caracteres').oneOf([Yup.ref('password'), null], 'Senha errada')
            });

            await schema.validate(data, {abortEarly: false});

            const cpf = data.cpf;
            let cpfParsed = cpf.replace(".", "").replace(".", "").replace("-", "");

            const handleData = {...data, cpf: cpfParsed};
            // @ts-ignore
            delete handleData.passwordConfirmation;

            await api.post('/customers', handleData);

            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode acessar o TaxStocks',
            });
        } catch (e) {
            if (e instanceof Yup.ValidationError) {
                const errors = getValidationErrors(e);

                formRef.current?.setErrors(errors);
            }

            addToast({
                type: 'danger',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
            });
        }
    }, [addToast, history]);

    const radioOptions: IGenderOption[] = [
        { id: "M", value: "M", label: "Masculino" },
        { id: "F", value: "F", label: "Feminino" },
        { id: "O", value: "O", label: "Outro" }
    ];

    return (
        <AnimationContainer>
            <Container>
                <Content>
                    <img src={logoImg} alt="Tax Stocks" width={160}/>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Criei sua conta</h1>

                        <Input name="name" id="name" type="text" label="Nome completo"
                               placeholder="Digite seu nome completo"/>

                        <Input name="cpf" id="cpf"
                               maxLength={14}
                               value={cpfNumber}
                               onChange={handleChangeCPF}
                               type="text" label="Digite seu CPF" placeholder="Digite seu CPF"/>

                        <Input name="birth" id="birth" type="date" label="Data de nascimento"
                               placeholder="Digite sua data de nascimento"/>

                        <RadioInput name="gender" label="Gênero" options={radioOptions} />

                        <Input name="email" id="email" type="email" label="E-mail" placeholder="Digite seu e-mail"/>

                        <Input name="password" id="password" type="password" label="Senha"
                               placeholder="Digite sua senha"/>

                        <Input name="passwordConfirmation" id="passwordConfirmation" type="password"
                               label="Confirme sua senha"
                               placeholder="Confirme sua senha"/>

                        <Button type="submit">Cadastrar</Button>
                    </Form>

                    <hr/>

                    <p>Já tem uma conta?</p>
                    <Link to="/" className="link_sign">
                        Entrar
                    </Link>
                </Content>
            </Container>
        </AnimationContainer>
    );
};

export default SignUp;
