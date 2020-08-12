import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
 
import api from '../../services/api';

import PageHeader from '../../Components/PageHeader';
import Input from '../../Components/Input';
import Textarea from '../../Components/TextArea';
import Select from '../../Components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

const TeacherForm:React.FC = () => { 

  const history = useHistory();

  //estados
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSuject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    {week_day: 0, from: '', to: ''}
  ]);

  // ----- ----- ----- ----- ----- ----- ----- ----- 

  // funcoes
  function addNewScheduleItem() { 
    setScheduleItems([
      ...scheduleItems,
      {week_day: 0, from: '', to: ''}
    ])
  }

  // funcao para captar o dia da semana do horario 
  function setScheduleItemValue(position:number, field: string, value: string){ 
    const updatedScheduleItems = scheduleItems.map((item, index) => { 
      if(index === position){ 
        return {...item, [field]:value };
      }

      return item;
    })

    setScheduleItems(updatedScheduleItems);
  }

  function handlCreateClass(e: FormEvent) { 
    e.preventDefault(); //preveni o comportamento padrão de um formulario nao redireciona para outra pagina

    api.post('/classes', { 
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    }).then(() => { 
      alert('Cadastro realizado com sucesso!');

      history.push('/'); // volta para página inicial landing page
    }).catch(() => { 
      alert('Erro no cadastro!')
    })

  }

  //----- ----- ----- ----- ----- ----- ----- ----- 
  //JSX
  return (
    <div id="page-teacher-form" className="container">
    <PageHeader 
      title="Que incrível que você quer dar aulas."
      description="O primeiro passo é preencher esse formulário de inscrição"
    />

    <main>
      <form onSubmit={handlCreateClass}>
        <fieldset>
          <legend>Seus dados</legend>

          <Input 
            name="name" 
            label="Nome completo" 
            value={name}
            onChange={(e) => {setName(e.target.value) }}
          />

          <Input 
            name="avatar" 
            label="Avatar"
            value={avatar}
            onChange={(e) => {setAvatar(e.target.value)}}
          />

          <Input 
            name="whatsapp" 
            label="Whatsapp"
            value={whatsapp}
            onChange={(e) => {setWhatsapp(e.target.value)}}
          />

          <Textarea 
            name="bio" 
            label="Biografia"
            value={bio}
            onChange={(e) => {setBio(e.target.value)}}
          />

        </fieldset>

        <fieldset>
          <legend>Sobre a Aula</legend>

          <Select 
            name="subject" 
            label="Matéria"
            value={subject}
            onChange={(e) => {setSuject(e.target.value)}}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
            ]}
          />
          
          <Input 
            name="cost" 
            label="Custo da sua hora por aula"
            value={cost}
            onChange={(e) => {setCost(e.target.value)}}
          />

        </fieldset>

        <fieldset> 
          <legend>
            Horários disponíveis 
            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
          </legend>
            
            {scheduleItems.map((item, index) => { 
              return (
                <div key={item.week_day} className="schedule-item">
                <Select 
                      name="week_day" 
                      label="Dia da Semana"
                      value={item.week_day}
                      onChange={e => setScheduleItemValue(index,'week_day', e.target.value)}
                      options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-Feira' },
                        { value: '2', label: 'Terça-Feira' },
                        { value: '3', label: 'Quarta-Feira' },
                        { value: '4', label: 'Quinta-Feira' },
                        { value: '5', label: 'Sexta-Feira' },
                        { value: '6', label: 'Sábado' },
                      ]}
                  />
      
                  <Input 
                    name="from"   
                    label="Das"   
                    type="time"
                    value={item.from}
                    onChange={(e) => setScheduleItemValue(index,'from', e.target.value)} 
                 />
                  <Input 
                    name="to"   
                    label="Até"   
                    type="time"
                    value={item.to}
                    onChange={(e) => setScheduleItemValue(index,'to', e.target.value)} 
                 />
              </div>
              )

            })}
        
        </fieldset>

        <footer> 
          <p>
            <img src={warningIcon} alt="Aviso Importante"/>
            Importante! <br/>
            Preencha todos os dados
          </p>
          <button type="submit" >
            Salvar cadastro
          </button>
        </footer>
      </form>
    </main>
  </div>
  ); 
}

export default TeacherForm;