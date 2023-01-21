import React, { useCallback, useRef }from "react"
import { Container,Content, Background, AnimationContainer } from "./styles"
import logo from "../../assets/logo.svg"
import { FiArrowLeft, FiLock, FiMail, FiUser } from "react-icons/fi"
import Button from "../../components/Button"
import Input from "../../components/Input"
import * as Yup from "yup"
import { Form } from "@unform/web"
import { FormHandles } from "@unform/core"
import getValidateErrors from "../../utils/getValidationErrors"
import { Link, useNavigate } from "react-router-dom"
import api from "../../services/api"

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    // console.log(data)
    formRef.current?.setErrors({});

    try {  
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatorio'),
        email: Yup.string().required('E-mail Obrigatorio').email("Digite um email valido"),
        password: Yup.string().min(6, 'No minimo 6 caracters')
      })
      
      await schema.validate(data, {
        abortEarly: false,
      })

      await api.post('/users', data)
      
      //toat cadastrado com sucesso

      navigate('/')
      
    } catch (err: any) {
      // console.log({err})
      if (err instanceof Yup.ValidationError) {
        const errors = getValidateErrors(err)

        formRef.current?.setErrors(errors);
        
        return
      }
      //toast
       
    } 
  }, [navigate])  //[] array de dependencia do useCallback()

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faca seu cadastro</h1>

            <Input name="name"  icon={FiUser} type="text" placeholder="Nome" />

            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit">Cadastrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <Link to="/">
            <FiArrowLeft /> 
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>     
    </Container>
  )
}

// export default function SignUp() {
//   const [name ,setName]= useState('zz');
//   const [email ,setEmail]= useState('');
//   const [password, setPassword]= useState('');

//   const [errName ,setErrName]= useState('');
//   const [errEmail ,setErrEmail]= useState('');
//   const [errPassword ,setErrPassword]= useState('');

//   const formRef = useRef<HTMLFormElement>(null);

  // const  handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   // console.log(`${name} ${email} ${password}`)
  //   const data = {
  //     name,
  //     email, 
  //     password
  //   }
   
  //   try {
  //     setErrName('')
  //     setErrEmail('')
  //     setErrPassword('')
  //     const schema = Yup.object().shape({
  //       name: Yup.string().required('Nome Obrigatorio'),
  //       email: Yup.string().required('E-mail Obrigatior').email(),
  //       password: Yup.string().min(6, 'No minimo 6 caracters')
  //     })
      
  //     await schema.validate(data, {
  //       abortEarly: false,
  //     })
      
  //   } catch (err) {
  //     console.log(err)
  //     formRef.current?.setErrors({
  //        name: "Nome obrigatorio"
  //       })
  //     setErrName( 'Nome obrigratorio')
  //     setErrEmail('Email obrigatio')
  //     setErrPassword('Password deve ser maior que 6 caracteres')
  //   } 
  // }, [name, email, password])


//   return (
//     <Container>
//       <Background />
//       <Content>
//         <img src={logo} alt="GoBarber" />
//         <form ref={formRef} onSubmit={handleSubmit}>
//           <h1>Faca seu cadastro</h1>

//           <Input error={errName}
//           value={name} onChange={e => setName(e.target.value)} 
//               name="name"  icon={FiUser} type="text" placeholder="Nome" />

//           <Input error={errEmail}
//            value={email} onChange={e => setEmail(e.target.value)} 
//               name="email" icon={FiMail} type="email" placeholder="E-mail" />

//           <Input error={errPassword} 
//           value={password} onChange={e => setPassword(e.target.value)} name="password" icon={FiLock} type="password" placeholder="Senha" />

//           <Button type="submit">Cadastrar</Button>

//           <a href="forgot">Esqueci minha senha</a>
//         </form>

//         <a href="login">
//           <FiArrowLeft /> 
//           Voltar para logon
//         </a>
//       </Content>     
//     </Container>
//   )
// }