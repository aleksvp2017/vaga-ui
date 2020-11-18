const projetos = 
[
    {
        nome: 'SAAS',
        topicos: [
            {
                nome: 'Informações Gerais',
                itens: [
                    {nome:'Nome: Sistema de Acompanhamento e Avaliação de Cursos Técnicos - SAAS;'},
                    {nome:'O que é? É um moodle customizado, onde uma instituição de ensino se cadastra, cadastra seus professores, alunos e cursos. A partir daí são enviados formulários autoavaliativos. Os resultados desses podem ser consultados depois pelas instituições e pela SETEC;'},
                    {nome:'Foco: cursos técnicos financiados pelo Bolsa Formação;',
                     subitens: ['Presencial e EaD;']},
                    {nome:'Processo SEI original: 23000.006345/2018-18;'},
                    {nome:'http://moodle.saas.etec.ufsc.br/', link:true},
                    {nome:'Instituição responsável pelo desenvolvimento e hospedagem: UFSC; Parceria desde 2010;'},
                    {nome:'Público alvo: rede e-tec;Rede e-tec = rede federal + senai/senac + instituições estaduais de ept.'},
                ],
            },
            {
                nome: 'Proposta para novo TED',
                itens: [
                    {nome:'TED 9895;'},
                    {nome:'SEI:23000.022522/2020-10;'},
                    {nome:'Avaliação de cursos FIC: cadastro dos avaliadores, Coleta e Resultados;'},
                    {nome:'Aprimoramento de módulos para cursos presenciais: avaliação de disciplinas, Egressos e Evasão para o presencial;'},
                    {nome:'Webservice entre SISTEC e SAAS, para compartilhamento da base de dados;'},
                    {nome:'Aprimoramento do módulo de resultados para tomada de decisão pelo gestor federal;'},
                    {nome:'Aplicativo SAAS para sensibilização e acesso direto a resultados;'},
                    {nome:'Agendas presenciais e à distância para sensibilizar à participação;'},
                    {nome:'Avaliação dos cursos de formação de professores Novos Caminhos;'},
                    {nome:'Painel SINAEP e Avaliação institucional para os responsáveis pelas institucionais.'},                
                ],
            },
            {
                nome: 'Webservice com SISTEC',
                itens: [
                    {nome:'Foi desenvolvido no passado e está em produção. É uma espécie de API onde a UFSC pode ter acesso ao nosso banco de dados atualizado e a partir dele alcançar o nosso público-alvo das avaliações;'}, 
                    {nome:'SS 5600;'}, 
                ],
            } ,
            {
                nome: 'Histórico dos TEDs',
                tabelar: true,
                header: ['Ano','SEI', 'Valor R$', 'Observação'],
                itens: [
                    {nome:'',
                    subitens: ['2010','882','R$ 1.580.000,00', 'Desenvolvimento do módulo de avaliação de cursos, disciplinas e polos']},
                    {nome:'',
                     subitens: ['2013','17556','R$ 2.038.128,56','Desenvolvimento do módulo de egressos, evasão e perfil sócio escolar.']}, 
                    {nome:'',
                     subitens: ['2017','6669','R$ 1.499.904,00','Unidades de ensino e avaliação dos cursos técnicos do bolsa.']}, 
                    {nome:'',
                     subitens: ['2018','7968','R$ 1.545.201','ARQUIVADO (módulos para presencial e inclusão de FICS).']}, 
                    {nome:'',
                     subitens: ['2020','9895','R$ 3.500.000','24 meses']}, 
                ]
            },
            {
                nome: 'Comparativo entre SAAS x SINAEP',
                itens: [
                    {nome:'Feito pela UFSC em maio/2020;'}, 
                    {nome:'SAAS',
                     subitens: ['Autoavaliação das instituições;','Formulários; bases moodles das instituições; ',
                        'Objetos: Curso, Polo, Disciplina, Socioescolar, Egressos;']}, 
                    {nome:'SINAEP -  Sistema Nacional de Avaliação da Educação Profissional e Tecnológica;',
                     subitens: ['Não é um SISTEMA TECNOLÓGICO; ','Avaliação interna e externa das instituições;',
                        'Formulário, bases, visitas;', 'Objetos: instituição, aluno, cursos e egressos;']}, 
                    {nome:'A ideia é que o SAAS se adeque para contemplar os pontos do SINAEP.'}, 
                ],
            },
            {
                nome: 'Demandas dos órgãos de controle',
                itens: [
                    {nome:'CGU;'}, 
                    {nome:'Implementar um sistema de avaliação do programa;'}, 
                    {nome:'Criar indicadores e comprovar a realização de avaliações in loco nas instituições ofertantes'}, 
                    {nome:'Elaborar indicadores que permitam o acompanhamento e avaliação gerencial do Pronatec e da Bolsa-formação'}, 
                    {nome:'TCU:avaliar a conveniência e a oportunidade de agenda de discussão com o Inep, Sistema S e IFs e outros atores sobre a possibilidade de realização de avaliação nacional na qualidade dos cursos técnicos do país'}, 
                ],
            }                                   
        ]
    },
    {
    nome: 'Plataforma Itinerário',
    }
]

const listarProjetos = () => {
    return projetos
}


    

export {
    listarProjetos
}


