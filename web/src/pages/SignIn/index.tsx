import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, AnimationContainer } from './styles';

interface ISignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ISignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um email válido').required('E-mail obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      await signIn({
        email: data.email,
        password: data.password,
      });

      history.push('/dashboard');
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        const errors = getValidationErrors(e);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'danger',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer o login, verifique suas credenciais.',
      });
    }
  }, [signIn, history, addToast]);

  return (
    <AnimationContainer>
      <Container>
        <Content>
          <img src={logoImg} alt="Logo TaxStocks" width={160}/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Login</h1>

            <Input name="email" id="email" type="email" label="E-mail" placeholder="Digite seu e-mail"/>
            <Input name="password" id="password" type="password" label="Senha"
                   placeholder="Digite sua senha"/>

            <Link to="/forgot-password">Esqueci minha senha</Link>

            <Button type="submit">Entrar</Button>
          </Form>

          <hr/>

          <Link to="/signup" className="link_sign">
            Criar conta
          </Link>
        </Content>
      </Container>
    </AnimationContainer>
  );
};

export default SignIn;
