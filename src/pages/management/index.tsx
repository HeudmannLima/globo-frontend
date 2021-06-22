import React, { useContext, useEffect, useState } from 'react';
import { RiSettings4Fill, RiDeleteBin2Line, RiEditBoxLine, RiCheckboxCircleLine, RiCloseCircleLine, RiUserAddLine } from 'react-icons/ri';
import Modal, { ModalHeader, ModalBody, ModalFooter, useModal } from '../../components/modal';
import { userData, nivelAcesso, Context } from '../../contexts/AuthContext'
import Menu from '../../components/menu'
import api from "../../services/api";

import './crud.css'


function Management() {
  const { isShowing, toggle } = useModal();
  const { handleLogout } = useContext(Context);
  
  const [users, setUsers] = useState<userData[]>();
  const [edit, setEdit] = useState<userData | null>(null);
  const [userType, setUserType] = useState('');
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [activeUser, setActiveUser] = useState<string | null>('');

  useEffect(() => {
    (async () => {
      loadData();
    })();
    
    const email = localStorage.getItem('email');
    setActiveUser(email);
  }, []);

  async function loadData() {
    const { data } = await api.apiBackend.get('/users');
    setUsers(data);
  }

  async function handleDelete(user: userData) {
    if(activeUser === user.email) {
      alert(`Você não pode deletar seu próprio usuário de Status ADMINISTRADOR neste sistema.\nContate o setor responsável.`);
      return;
    }

    const res = window.confirm(`Deseja remover o usuário (${user.email}) ?`);
    if (res) {
      await api.apiBackend.delete(`/users/${user._id}`).then(() => {
        alert(`Usuário (${user.email}) removido!`);
      })
    }
    loadData();
  }

  function handleEdit(user: userData) {  
    setEdit(user);
    setUserMail(user.email);
    setUserType(user.nivel_acesso);
  }

  async function handleSave() {  
    if (userMail === '') {
      alert(`Usuário não pode estar em branco!`);
      return;
    }
   
    const res = await api.apiBackend.put(`/users/${edit?._id}`, {
      email: userMail,
      nivel_acesso: userType
    });
    
    setEdit(null);
    if (res) {
      alert(`Usuário alterado com Sucessso!`);
      loadData();
    }

    if(activeUser === edit?.email) {
      alert(`Devido suas próprias alterações, você se DESLOGARÁ do Sistema e precisará efetuar o Login novamente.`);
      handleLogout();
    }
  }

  async function handleAddUser() {
    setEdit(null);
    setUserMail('');
    setUserPassword('');
    setUserType(nivelAcesso.FUNCIONARIO);

    if (userMail === '' || userPassword === '') {
      alert(`Usuário/Senha não podem estar em branco!`);
      return;
    }
   
    await api.apiBackend.post('/users', {
      email: userMail,
      senha: userPassword,
      nivel_acesso: userType
    }).then(() => {
      toggle();
      alert(`Usuário ${userMail} Adicionado com Sucessso!`);
      loadData();
    }).catch((err) => {
      alert(`Não foi possível Adicionar o usuário.\nTente Novamente.`);
    });
    loadData();
  }

  return (
    <>
      <div>
        <Menu />
      </div>
      <div id="box-main">
        <div className="container-title">
          <div className="page-title">
            <RiSettings4Fill size="30" color="#FEA756"/>
            <span className="title-name">Painel</span>
          </div>
        </div>

        <div className="container-crud">
          <table className="crud-table">
            <thead className="crud-title">
              <tr className="blank">
                <td className="blank"></td>
                <td className="blank"></td>
                <td className="blank"></td>
                <td>
                  <button onClick={() => {
                      setEdit(null);
                      setUserMail('');
                      setUserType(nivelAcesso.FUNCIONARIO);
                      toggle();
                    }}>
                    <RiUserAddLine size="30" color="blue"/>
                  </button>
                </td>
              </tr>
              <Modal {...{isShowing, toggle}}>
                <ModalHeader {...{toggle}}>
                  Adicionar Usuário
                </ModalHeader>
                <ModalBody>
                  <table className="crud-table">
                    <thead className="crud-title">
                      <tr>
                        <td>Usuário/Email</td>
                        <td>Senha</td>
                        <td>Nível</td>
                        <td>Salvar</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>

                        <td className="crud-data">
                          <input
                            type="email"
                            placeholder="E-mail"
                            style={{ 
                              padding: '2px', alignContent:'flex-start', 
                              fontSize: '11px', height: '23px', 
                              width: 'auto', borderRadius: '0' 
                            }}
                            value={userMail}
                            onChange={e => setUserMail(e.target.value)}
                          ></input>
                        </td>

                        <td className="crud-data">
                          <input
                            type="password"
                            placeholder="Senha"
                            style={{ 
                              padding: '2px', alignContent:'flex-start', 
                              fontSize: '11px', height: '23px', 
                              width: 'auto', borderRadius: '0' 
                            }}
                            value={userPassword}
                            onChange={e => setUserPassword(e.target.value)}
                          ></input>
                        </td>

                        <td className="crud-data">
                          <select 
                            value={userType}
                            name="nivel_acesso" 
                            id="nivel_acesso"
                            onChange={e => setUserType(e.target.value)}
                          >
                            <option value={nivelAcesso.ADMINISTRADOR}>Administrador</option>
                            <option value={nivelAcesso.FUNCIONARIO}>Funcionário</option>
                          </select>
                        </td>

                        <td className="icon">
                          <button onClick={handleAddUser}>
                            <RiCheckboxCircleLine size="30" color="green"/>
                          </button>
                        </td>

                      </tr>
                    </tbody>
                  </table>
                </ModalBody>
                <ModalFooter>
                  <button onClick={() => {toggle()}}>
                    <strong>Cancelar</strong>
                  </button>
                </ModalFooter>   
              </Modal>
              <tr>
                <td>Usuário/Email</td>
                <td>Nível</td>
                {!edit ? <td>Alterar</td> : <td>Salvar</td> }
                {!edit ? <td>Deletar</td> : <td>Cancelar</td> }
              </tr>
            </thead>
            {!edit
              // List
              ? <tbody>
                  {users?.map(user => (
                    <tr key={user._id}>
                      <td className="crud-data">{user.email}</td>
                      <td className="crud-data">{user.nivel_acesso}</td>
                      <td className="icon">
                        <button onClick={() => {handleEdit(user)}}>
                          <RiEditBoxLine size="30" color="#FEA756"/>
                        </button>
                      </td>
                      <td className="icon">
                        <button onClick={() => {handleDelete(user)}}>
                          <RiDeleteBin2Line size="30" color="#FEA756"/>
                        </button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              // Edit
              : <tbody>
                  <tr>
                    <td className="crud-data">
                        <input 
                          style={{ 
                            padding: '2px', alignContent:'flex-start', 
                            fontSize: '11px', height: '23px', 
                            width: 'auto', borderRadius: '0' 
                          }}
                          value={userMail}
                          onChange={e => setUserMail(e.target.value)}
                        ></input>
                    </td>
                    <td className="crud-data">
                      <select 
                        value={userType}
                        name="nivel_acesso" 
                        id="nivel_acesso"
                        onChange={e => setUserType(e.target.value)}
                      >
                        <option value={nivelAcesso.ADMINISTRADOR}>Administrador</option>
                        <option value={nivelAcesso.FUNCIONARIO}>Funcionário</option>
                      </select>
                    </td>
                    <td className="icon">
                      <button onClick={handleSave}>
                        <RiCheckboxCircleLine size="30" color="green"/>
                      </button>
                    </td>
                    <td className="icon">
                      <button onClick={() => {setEdit(null)}}>
                      <RiCloseCircleLine size="30" color="red"/>
                    </button>
                    </td>
                  </tr>
              </tbody>
            }
          </table>
        </div>
      </div>
    </>
  )
}

export default Management;