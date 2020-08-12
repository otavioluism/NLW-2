import {Request, Response} from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem { 
  week_day: number; 
  from: string;
  to: string;
}

export default class ClassesControllers { 
      
      async index(request: Request, response: Response){ 
          const filters = request.query;

          const subject = filters.subject as string;
          const week_day = filters.week_day as string;
          const time = filters.time as string;

          // caso nao existir filtros
          if(!week_day || !subject || !time){ 
            return response.status(400).json({ 
              error: "Missing filters to search classes"
            })
          }
          
          // convertendo o horario passado do filtro em minutos
          const timeInMinutes = convertHourToMinutes(time);
          
          // filtrando no banco de dados sobre a matéria, horarios, e dias da semana
          const classes = await db('classes')
            .whereExists(function() {
              this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`') 
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])

            })
            .where("classes.subject", "=", subject) // procurando onde o assunto da materia do BD bate com o passado pelo filtro
            .join("users", "classes.user_id", "=", "users.id") //junta as duas tabelas classes e users pelos seus ids relacionados
            .select(['classes.*', 'users.*']) // traga todos os dados da tabela classese usuarios
          

          return response.json(classes);
      }
      
      async create(request: Request, response: Response) { 

        const { 
          name,
          avatar,
          whatsapp,
          bio,
          subject,
          cost,
          schedule
        } = request.body;

        const trx = await db.transaction();

        try { 
                  //inserir:  selecionar a tabela e inserir os dados nas colunas
            const insertedUserIds = await trx('users').insert({
              name,
              avatar,
              whatsapp,
              bio,
            });

            // retornando o id do usuario cadastrado
            const user_id = insertedUserIds[0];


            //inserir:  selecionar a tabela e inserir os dados nas colunas
            const insertedClassesIds = await trx('classes').insert({ 
              subject,
              cost,
              user_id,
            });

            // retornando o id da aula cadastrada
            const class_id = insertedClassesIds[0];

            // iremos transforma a hora primeiro em minutos para trabalhar melhor no BD
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => { 
              return { 
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
              };
            })
            
            // inserindo os dados dos dias e horários da matéria no BD
            await trx("class_schedule").insert(classSchedule);

            // com transaction só ira passar todas as informacoes no BD se não tiver nenhum erro nas inserções acima
            await trx.commit();
          
            return response.status(201).send();
            
        }catch(err){
          console.log(err);

          await trx.rollback();

          return response.status(400).json({ 
              error: 'Unexpected error while creating new class'
            })
        }
    }

}