import './styles.css'
import { useState } from 'react'
import { api } from './api'
import { useEffect } from 'react'


function App() {

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [alunos, setAlunos] = useState("")


  useEffect(() => {
    async function listarAlunos() {
      const response = await api.get("/alunos")
      setAlunos(response.data)
    }

    listarAlunos()
  }, [alunos])

  async function cadastrarAluno() {

    if (!nome || !email)
      return alert("Digite os valores")

    await api.post("/alunos", { nome, email })


  }

  async function deleteRow(e, id) {
    await api.delete("/alunos/" + id)

    console.log(id)
  }


  return (
    <>
      <div id="main">


        <h1>Cadastro</h1>

        <div id="entrada">
          <label htmlFor="input-nome">Nome</label>
          <input id="input-nome" onChange={e => setNome(e.target.value)} type="text" />
          <label htmlFor="input-email">E-mail</label>
          <input id="input-email" onChange={e => setEmail(e.target.value)} type="text" />
          <button id="btn-cadastro" onClick={cadastrarAluno}>Cadastrar</button>
        </div>

        <div id="tabela">

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>

            <tbody>{
              alunos && alunos.map(aluno => (
                <tr key={aluno.id}>
                  <td>{aluno.nome}</td>
                  <td>{aluno.email}</td>
                  <td><button onClick={(e) => deleteRow(e, aluno.id)} >Remover</button></td>
                </tr>
              ))
            }</tbody>


          </table>

        </div>
      </div>

    </>
  )
}

export default App
