const projetos = 
[
    {
        //SAAS
        nome: 'SAAS',
        topicos: [
            {
                nome: 'Situação atual',
                itens:[
                    {nome: 'Processo de obtenção de documentação e habilitação do Webservice junto à STIC (Alexandre e Ibsen) desde o dia 19/10/2020.'},
                ]
            },
            {
                nome: 'Informações Gerais',
                itens: [
                    {nome:'Nome: Sistema de Acompanhamento e Avaliação de Cursos Técnicos - SAAS;'},
                    {nome:'O que é? É um moodle customizado, onde uma instituição de ensino se cadastra, cadastra seus professores, alunos e cursos. A partir daí são enviados formulários autoavaliativos. Os resultados desses podem ser consultados depois pelas instituições e pela SETEC;'},
                    {nome:'Foco: cursos técnicos financiados pelo Bolsa Formação;',
                     subitens: ['Presencial e EaD;']},
                    {nome:'Processo SEI original: 23000.006345/2018-18;'},
                    {nome:'', link:'http://moodle.saas.etec.ufsc.br/'},
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
    //ACORDO DE GRATUIDADE
    nome: 'Acordo de gratuidade',
    topicos: [
        {
            nome: 'Situação atual',
            itens:[
                {nome: 'Contato com a Terezinha do SENAI para tirar algumas dúvidas sobre os dados do acordo em novembro;'},
                {nome: 'Inês do SENAC avisou dia 16/11 que ainda estão se organizando internamente para iniciar os trabalhos;'},
                {nome: 'Desde o dia 12/11 tentando obter informações, junto à STIC, dos dados do acordo que constam na página inicial do SISTEC (REQ368735);'},
                {nome: 'Existem hoje dados no SISTEC cadastrado pelas filiais:',
                    subitens:['SENAI: 110k no SISTEC em 2019 (modalidade de pagamento gratuito). No portal deles em 2020, 320k matrículas;',
                        'SENAC: 240k no SISTEC em 2019 (modalidade de pagamento gratuito);']}
            ]
        },        
        {
            nome: 'Informações Gerais',
            itens: [
                {   nome:'Contatos',
                    subitens: ['SENAI: Terezinha Angelica Monteiro Ervilha Gomes - terezinha.gomes@senaicni.com.br',
                            'SENAC: Inês Pereira - ines.pereira@senac.br']
                },
                {
                    nome: 'Instituído pelos Decretos 6.633/2008 e 6.635/2008;',
                    subitens: ['Determina que SENAI e SENAC devem vincular ⅔  da receita líquida da contribuição compulsória geral para vagas gratuitas em EPT;'],
                },
                {
                    nome:'Acórdão nº 1067/2017-TCU',
                    subitens:['DEMORA NA ATUAÇÃO DO MINISTÉRIO DA EDUCAÇÃO PARA VERIFICAÇÃO DE SEU CUMPRIMENTOIMPOSSIBILIDADE DE DELIBERAR, COM RAZOÁVEL CERTEZA, ACERCA DO CUMPRIMENTO DOS PERCENTUAIS APLICADOS NO ACORDO;',
                              'Resultou na instituição de grupo de trabalho com representantes da SETEC/MEC, SENAI e SENAC, por meio da Portaria SETEC nº 13/2018;',
                              'Grupo definiu a construção de ferramenta de integração entre os sistemas;',
                              'Relatório final do grupo: portaria 1.249/2018 09 de novembro de 2018;',
                              'Fim de 2019: STIC/MEC concluiu o desenvolvimento da ferramenta - SS6148;'],
                }
            ],
        },    
        {
            nome: 'Histórico',
            itens: [
                {
                    nome: '2008: Decretos 6.633/2008 e 6.635/2008',
                    subitens:['Determina que SENAI e SENAC devem vincular ⅔  da receita líquida da contribuição compulsória geral para vagas gratuitas em EPT (Técnico e FIC);']
                },
                {
                    nome: '2017: Acórdão nº 1067/2017-TCU',
                    subitens: ['Demora para verificação de seu cumprimento e impossibilidade de deliberar sobre o cumprimento dos percentuais;']
                },
                {
                    nome: '2018: Portaria SETEC nº 13/2018',
                    subitens:['Representantes da SETEC, SENAI e SENAC -  Portaria SETEC nº 13/2018;']
                },
                {
                    nome: '2019: Webservice 12/2019',
                    subitens: ['Definida a construção de ferramenta de integração entre os sistemas (entregue ao fim de 2019);']
                },                
                {
                    nome: '05/2020: Documentação e ambiente de homologação',
                    subitens: ['Etapa de configuração de acesso ao ambiente (liberar regras no firewall para os IPs de SENAI e SENAC);']
                },                                
                {
                    nome: '07/2020: Início da homologação por SENAI e SENAC. Combinado novembro carga de 2019; março carga de 2020;'
                },
                {
                    nome: '10/2020: SENAI levanta primeiras dúvidas já resppondidas;'
                },
                {
                    nome: '11/2020: SENAC indica que ainda precisa resolver coisas internas antes de começar o processo;'
                }                
            ]
        },
        {
            nome:'Processos SEI envolvidos',
            itens:[{nome:'23000.023376/2017-44: SENAI encaminha à SETEC/MEC dados do Acordo de Gratuidade dos exercícios de 2011 a 2015;'},
                    {nome:'23000.022358/2019-15: disponíveis os três relatórios desenvolvidos pelo consultor Rodrigo Proença em novembro de 2019 referente à homologação do WebService;'},
                    {nome:'23000.020287/2016-65: acompanhamento Acordo de Gratuidade SENAI;'},
                    {nome:'23000.020288/2016-18: acompanhamento Acordo de Gratuidade SENAC;'},
                    {nome:'23000.027272/2017-17: Acórdão nº 1067/2017-TCU-Plenário, o qual deu origem à necessidade de desenvolver o WebService.'}
                ],
        },
        {
            nome:'Requisições (STIC) associadas',
            itens:[{nome:'REQ328214 e REQ328218 (02/2020) - documentação e ambiente - ambas atendidas;'},
            {nome: 'REQ368735: investigar dados do acordo constantes na página inicial do SISTEC de 2009 até 2012;'}]
        },
        {
            nome: 'Dados publicados por SENAI/SENAC',
            itens:[
                {nome:'SENAI', link: 'https://www.portaldaindustria.com.br/senai/canais/transparencia/gratuidade/'},
            ]
        },
        {
            nome: 'Detalhamento técnico',
            itens:[{nome: 'No sistec, envolvem o Ciclo de Matrícula (não o Bolsa Formação);'},
                    {nome: 'O que diferencia é o campo CO_MODALIDADE_PAGAMENTO que deve ter valor gratuito (código equivalente 3). É por aluno (informa ao fazer a matrícula);'},
                    {nome: 'Mesmo que haja impedimento para matricular o mesmo CPF duas vezes no mesmo ciclo, não existe impedimento para cadastrar o mesmo CPF em ciclos distintos (unidades criam ciclos livremente);'},
                    {nome: 'Como fazer para evitar duplicidade? Não adianta tirar da tela a escolha da modalidade gratuita, pois poderia mandar 2x via WS;'},
                    {nome: 'Ciclo = conjunto de turmas do mesmo curso, mesmo início e fim, mesma forma de ensino (concomitante, subsequente, integrado).'}]
        }          
    ]
    },
    {
        //COMITÊ
        nome: 'Comitê EaD',
        topicos: [
            {
                nome: 'Situação Atual',
                itens:[{nome: 'Painel sobre a Oferta de Educação à Distância no âmbito da EPT;',
                        subitens:['Originalmente para dia 26/11/2020 - véspera do dia da EaD;', 'Modificado para dia 09 e 10/12/2020.']},
                        {nome: 'Mudança na coordenação com a saída do Weber. Deve ficar com a DPR (Joelma);'},
                        {nome: 'Próxima reunião ordinária ainda não marcada.'}
                ],
            },              
            {
                nome: 'Informações Gerais',
                itens:[{nome: 'Comitê Técnico para o Acompanhamento da Política de Educação a Distância da Secretaria de Educação Profissional e Tecnológica;'},
                    {nome: 'SEI: 23000.023669/2019-93;'},
                    {nome: 'Portaria SETEC nº 480, de 24 de agosto de 2020 - designa os membros.', link: 'https://www.jusbrasil.com.br/diarios/313697401/dou-secao-2-26-08-2020-pg-13'},
                ],
            },
            {
                nome: 'Composição',
                itens:[{nome: '15 membros;'},
                    {nome: '2 membros do gabinete;'},
                    {nome: '2 por cada diretoria da SETEC, totalizando 6 pessoas;'},
                    {nome: '4 membros do CONIF (Conselho Nacional das Instituições da Rede Federal de Educação Profissional e Tecnológica);'},
                    {nome: '2 membros do CONDETUF (Conselho Nacional de Diretores de Escolas Técnicas Vinculadas às Universidades Federais);'},
                    {nome: '1 Secretário Executivo - DAF.'},
                ],
            },  
            {
                nome: 'Normativos',
                itens:[{nome: 'Portaria MEC 573 (03/07/2020) - Criação do Comitê;', link: 'https://www.in.gov.br/en/web/dou/-/portaria-n-573-de-3-de-julho-de-2020-265061930'},
                    {nome: 'Portaria SETEC 480 (24/08/2020) - Nomeação dos membros;'},
                ],
            }, 
            {
                nome: 'Atribuições',
                itens:[{nome: 'Acompanhamento dos resultados;'},
                    {nome: 'Levantamento de demanda;'},
                    {nome: 'Ampliar oferta de cursos;'},
                    {nome: 'Ampliar e identificar produção de material didático;'},
                    {nome: 'Articulação.'},
                ],
            },  
            {
                nome: 'Reuniões / Trabalhos',
                itens:[{nome: '28/08 apresentações, cronogramas, método de trabalho, divisão em grupos temáticos;'},
                    {nome: '11/09 proposta de ações pelos grupos;'},
                    {nome: '02/10 apresentação do comitê EaD do CONIF;'},
                    {nome: '20/11 Apresentação do ProEdu - Professor Raymundo Carlos.'}
                ],
            }, 
            {
                nome: 'Documentos compartilhados',
                itens:[{nome: 'One drive da SETEC sobre Comitê', 
                    link: 'https://mecbrasil-my.sharepoint.com/:f:/g/personal/emersoncorazza_mec_gov_br/ElVzxP7Q11FNhpepT7h95SABv2w6EFFlX0eLthnUFnXT6A'},
                ],
            },                         
        ],
    },   
    {
        //Rede e-TEC Brasil
        nome: 'Rede e-tec Brasil',
        topicos: [
            {
                nome: 'Situação atual',
                itens:[
                    {
                        nome: 'Incluir na pauta de discussão na próxima reunião do Comitê de Ead;'
                    },
                    {
                        nome: 'Conversa inicial com coordenador e secretário executivo sobre a inclusão desse tópico na próxima reunião do Comitê (que ainda não tem data);'
                    },
                    {
                        nome: 'Definir uma linha nesse trabalho. Possibilidades:',
                        subitens: ['Levar o tema geral ao Comitê e deixar que ele decida como proceder. Quais normativos revisar, quais pontos relevantes, etc;',
                            'Definir na DAF o escopo e direção dessa revisão.'],
                    },   
                    {
                        nome: 'Planilhados os dois principais normativos envolvidos (DECRETO Nº 7.589, DE 26 DE OUTUBRO DE 2011 e PORTARIA Nº 1.152, DE 22 DE DEZEMBRO DE 2015) de modo a facilitar os comentários',
                        subitens:['Algumas obvservações já feitas']
                    },
                    {
                        nome: 'Normativos planilhados', link:'https://drive.google.com/file/d/1LXDtlaPiuT--T9XqVYnRcaNkdAirxSLI/view?usp=sharing'
                    },
                ],
            },            
            {
                nome: 'Informações Gerais',
                itens:[{nome: 'Elaboração de proposta de atualização da base normativa da Rede e-tec Brasil;'},
                    {nome: 'SEI: 23000.021813/2020-91;'},
                    {nome: 'Análise do Decreto 7589 e comparação com portaria de instituição do Comitê de Ead.', 
                        link: 'https://docs.google.com/document/d/1TuJCy5cSbJr9kGUjsIoLoPXV4X5_wA8UTQCwBXaTefo/edit?usp=sharing'}
                ],
            },       
        ],
    },       
    {
        //NOVO MÓDULO
        nome: 'Novo módulo de pactuação',
        topicos: [
            {
                nome: 'Situação Atual',
                itens:[{nome: 'Trabalhos estão andando, porém de forma bem mais lenta e confusa do que o desejado;'},
                        {nome: 'O projeto foi dividido em 5 partes, chamadas de releases. Ontem, a STIC entregou as duas primeiras para testarmos (a primeira na verdade já haviam entregue, mas rapidamente testamos e apontamos problemas). Além disso, estamos no processo de detalhamento da penúltima parte;'},
                        {nome: 'Não existe cronograma ou planejamento que tenha sido compartilhado conosco. Faz mais ou menos 6 meses que pedimos isso para diferentes pessoas da fábrica e da STIC. Nunca foi concretizado;'},
                        {nome: 'Ocorrências relevantes:',
                            subitens:['Haviam combinado entregar a release 1 e 2 no dia 13/11. Cobrei no dia 16/11 e somente no dia 19/11 recebi resposta de que a STIC tinha mudado a prioridade para atender uma outra demanda sem qualquer aviso. Somente concretizaram a entrega no dia 26/11;',
                                'O detalhamento dos requisitos está bem lento. Por exemplo, faz duas semanas que não recebemos nenhum documento para validar. A pessoa responsável por esse trabalho, mesmo depois de meses no projeto, continua conhecendo muito pouco do SISTEC e não é muito eficiente. Muitas vezes, a Cilene acaba escrevendo os documentos;',
                                'Houve mais uma mudança STIC diretamente relacionada ao projeto. Como você sabe, a Suyanne foi substituída pelo André que até esse momento, não deu sinal de vida, sequer se apresentou para falar a verdade. Na reunião de ontem, Ibsen apresentou o Alexandre como substituto da Suyanne. Quando perguntei se não era o André, ele ficou confuso;',
                                'Apesar da propaganda inicial de 7 desenvolvedores, ontem tivemos a certeza de que só dois desenvolvedores estão trabalhando no projeto; e só um analista de negócio compartilhado com outros projetos.'
                            ]}
                ],
            },            
            {
                nome: 'Informações Gerais',
                itens:[
                    {
                        nome:' Motivado pela Portaria 1720 de 8/10/2019',
                        subitens: ['Principais inovações: oferta indireta e valor variável da hora aula;',
                            'Motivação inicial:  saldos financeiros não utilizados nas contas dos parceiros da Bolsa-Formação;',
                            'As ofertas de vagas  deverão estar em consonância com as necessidades do setor produtivo local, devendo ser subsidiadas por um mapa de ofertas de vagas e demandas da região;',
                            'Fala sobre monitoramento;',
                        ]
                    },
                    {
                        nome: 'Por que não no SISTEC 2.0? Além de um horizonte mais distante não iria contemplar Bolsa-Formação (só a regulação).'
                    }
                ],
            },
            {
                nome: 'Histórico',
                itens: [
                    {
                        nome:'2019',
                        subitens:['Emitiu um parecer indicando novo módulo',
                            'Levantamento básico das funcionalidades; troca da fábrica;']
                    },
                    {
                        nome: 'Fev/2020 - retomada dos trabalhos - prazo maio/2020;',
                    },
                    {
                        nome: 'Mar/2020 - trabalhos andaram lentamente;'
                    },
                    {
                        nome: 'Abr/2020 - pandemia, troca de equipes (STIC e Basis), atrasos;',
                        subitens:['Equipe era totalmente nova, sem conhecimento do sistema;',
                            'Prazo definido para setembro; nunca apresentaram um cronograma;']
                    },
                    {
                        nome: 'Jun/2020 - retomam os trabalhos com a decisão da equipe de revisar o que havia sido escrito com participação da GPIS;'
                    },
                    {
                        nome: 'Out/2020 - 70% detalhado; 30% implementado sem testar;',
                        subitens:['Ambiente de testes disponibilizado.']
                    }
                ]
            },
            {
                nome:'Requisições (STIC) associadas',
                itens:[{nome:'REQ313350 (11/2019 - SS6482).'}]
            },
            {
                nome:'Riscos',
                itens:[{nome:'Processo pactuação de forma precária;'},
                        {nome:'execução indireta feita através de unidade remota;'},
                        {nome:'preço variável através de um controle manual.'}]
            },            
        ],
    },   
    {
        //PLATAFORMA DO ITINERÁRIO FORMATIVO
        nome: 'Plataforma do Itinerário',
        topicos: [
            {
                nome: 'Situação Atual',
                itens:[{nome: 'TED com a UFG estava pronto para assinatura, mas houve uma decisão do Secretário em aguardar definição do projeto dos cursos;'},
                        {nome: 'UFG foi notificada da situação no dia 18/11/2020;'},
                        {nome: 'No dia 18/11/2020, Joedna me procurou para saber detalhes da plataforma a serem repassado à quem vai elaborar os cursos.'}
                ],
            },
            {
                nome: 'Informações Gerais',
                itens:[
                    {
                        nome:'Plataforma EaD do MEC para ofertar cursos técnicos elaborados sobre a supervisão do mesmo para apoiar as redes públicas de ensino na oferta do Itinerário Formativo da EPT.'
                    },
                    {
                        nome: 'Projeto foi dividido em duas frentes:',
                        subitens:['Cursos: elaboração de cursos técnicos diferenciados sobre a supervisão do MEC seguindo o Currículo de Referência - Responsabilidade: DPR (Joelma e Joedna);',
                            'Plataforma tecnológica: desenvolvimento de uma plataforma EaD para suportar os referidos cursos - Responsabilidade: DAF (Aleks);']
                    },
                    {
                        nome: 'AVAMEC: a solução encontrada foi através de uma parceria (via TED) com a UFG para customizar o AVAMEC (plataforma já utilizada pela SEB).'
                    }
                ],
            }, 
            {
                nome: 'SEI e outros documentos',
                itens:[
                    {
                        nome: 'TED com a UFG: 9839, SEI: 23000.027984/2020-23;'
                    },
                    {
                        nome: 'TED do AVAMEC original: 9223;'
                    },
                ]
            } ,
            {
                nome: 'Orçamento e cronograma',
                itens:[
                    {
                        nome: 'Orçamento: R$984.000,00 (hospedagem 216 + desenvolvimento 768);'
                    },
                    {
                        nome: 'TED para 12 meses com entregas parciais ao longo do período;'
                    }
                ]
            }        
        ],
    },   
    {
        //SISTEMA DE VAGAS
        nome: 'Sistema de vagas',
        topicos: [
            {
                nome: 'Situação Atual',
                itens:[{nome: 'Dados sendo atualizados semanalmente de acordo com as planilhas do Leonardo, mas sem atualizações na ferramenta.'},
                ],
            },
            {
                nome: 'Informações Gerais',
                itens:[
                    {
                        nome: 'Solução para sistematizar a consolidação e o processo de armazenamento, consulta e divulgação de dados relativos à vagas dos processos de pactuação e repactuação;'
                    },{
                        nome: 'Envolve dois grandes grupos de informação:',
                        subitens:['Repactuação com Estados e Municípios;','Pactuações com a rede federal.']
                    }
                ],
            },     
            {
                nome: 'Fonte de dados',
                itens:[
                    {
                        nome: 'Relatórios SISTEC;'
                    },
                    {
                        nome: 'Planilhas CGFS;'
                    },
                    {
                        nome: 'Planilhas GPIS.'
                    }
                ],
            },   
            {
                nome:'Premissas',
                itens:[
                    {
                        nome: 'STIC: Não envolvimento da TI do MEC;'
                    },
                    {
                        nome: 'Internet: dados publicados na internet, mas não públicos;'
                    },
                    {
                        nome: 'Eficiência: evitar retrabalho por parte das equipes;'
                    },
                    {
                        nome: 'Granularidade: extração de dados detalhados ou consolidados;'
                    },   
                    {
                        nome: 'Caminho baseado nas premissas: desenvolvimento de uma ferramenta experimental com recursos da própria diretoria.'
                    }                                                         
                ]
            }               
        ],
    },           
    {
        //MONITORAMENTO
        nome: 'Monitoramento',
        topicos: [
            {
                nome: 'Situação Atual',
                itens:[{nome: 'Painel feito no PowerBI sendo entregue ao final de novembro pelos AEEs;'},
                        {nome: 'Como dar continuidade e melhorar o trabalho com o fim do contrato com os AEEs;'},
                        {nome: 'Iniciando estudo no PowerBI que podem vir a ser utilizados também no Mapa de Minas.'}
                ],
            },
            {
                nome: 'Informações Gerais',
                itens:[
                    {
                        nome:'Painel interno e boletim de monitoramento.'
                    }
                ],
            },          
        ],
    },     
    {
        //PROEDU
        nome: 'ProEDU',
        topicos: [
            {
                nome: 'Informações Gerais',
                itens:[
                    {
                        nome: 'O ProEdu é o repositório de objetos educacionais da rede profissional e tecnológica (Rede e-Tec Brasil) da Secretaria de Educação Profissional e Tecnológica (SETEC) do Ministério da Educação;'
                    },
                    {
                        nome: 'Desenvolvido pelo IFSul - Representante: Professor Raymundo Carlos.'
                    },
                    {
                        nome: '', link: 'http://proedu.rnp.br/'
                    },
                    {
                        nome: 'Hospedagem via RNP (está no contrato de gestão).'
                    }
                ],
            },
            {
                nome:'TEDs (Fase 3)',
                itens:[{nome:'8004.1.',
                    subitens:['Vigência inicial em 30/11/2018 e vigência final em 30/12/2020.',
                        'Valor previsto: R$ 965.200,00',
                        'Valor descentralizado (2018): R$ 965.200,00',
                        'Metas: Meta 1 - Manter o PROEDU atualizado, atendendo a requisitos de segurança, operacionalidade, atualizado em suas tecnologias e com melhoramentos na experiência do usuário; Meta 2 - Estruturar um Curso de Produção de Conteúdo Didático Digital Acessível (CDDA). Meta 3 - Desenvolver sistema de acompanhamento de produção de Conteúdo Didático Digital Acessível (CDDA).']}]
            },
            {
                nome: 'Detalhamento técnico',
                itens:[{nome: 'Permite integração via API, ou links embutidos (não existe ninguém usando via API);'},
                        {nome: 'Armazenamento de cursos moodles inteiros já formatados;'},
                        {nome: 'Não tem política de curadoria oficial;'},
                        {nome: 'Acesso é todo não identificado. Fazem sugestão de conteúdo via IP.'}]
            }             
        ],
    },
    /*
    {
    nome: 'Acordo de gratuidade',
    topicos: [
        {
            nome: 'Informações Gerais',
            itens: [
                {nome:'Contatos',
                 subitens: ['SENAI: Terezinha Angelica Monteiro Ervilha Gomes - terezinha.gomes@senaicni.com.br',
                            'SENAC: Inês Pereira - ines.pereira@senac.br']
                },
            ],
        },    
    ]
    }*/
]

const listarProjetos = () => {
    return projetos
}


    

export {
    listarProjetos
}


