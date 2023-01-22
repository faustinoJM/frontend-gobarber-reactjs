import React, { useCallback, useRef } from "react"
import { Container,Content, Background, AnimationContainer } from "./styles"
import logo from "../../assets/logo.svg"
import { FiLogIn, FiMail, FiLock } from "react-icons/fi"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { Form } from "@unform/web"
import { FormHandles } from "@unform/core"
import * as Yup from "yup"
import getValidateErrors from "../../utils/getValidationErrors"
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "../../hooks/toast"

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const formRef = useRef<FormHandles>(null);

  const navigate = useNavigate();
  
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    // console.log(data)
    formRef.current?.setErrors({});

    try {  
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail Obrigatorio').email("Digite um email valido"),
        password: Yup.string().required('Senha Obrigatoria')
      })
      
      await schema.validate(data, {
        abortEarly: false,
      })

       await signIn({
        email: data.email,
        password: data.password
      })

      navigate('/dashboard')

    } catch (err: any) {
      // console.log({err})
      if(err instanceof Yup.ValidationError) {
        const errors = getValidateErrors(err)
        formRef.current?.setErrors(errors)  

        return;
      }
      //add toast msg
      addToast({
        type: "error",
        title: "Erro na Autenticacao",
        description: "Ocorreu um erro ao fazer login, cheque as Credenciais"
      })
    } 
  }, [signIn, navigate, addToast]) 
  
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faca seu logon</h1>

            <Input name="email"  icon={FiMail} type="email" placeholder="email" />

            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn /> 
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}