export const Portuguese  = {
    translation: {
      Error: {
        unexpected: 'Ocorreu um erro Inesperado :(',
        unexpectedresponse: 'Houve uma resposta inesperada do servidor',
        sendemail: 'Ocorreu um erro ao enviar o e-mail'
      },
      Navbar: {
        change_language: 'Trocar Idioma',
        dashboard: 'Dashboard',
        about_project: 'Sobre o Projeto',
        plans_project: 'Planos para o Projeto',
        register: 'Registrar-se',
        login: 'Login',
        logout: 'Sair',
        edit_account: 'Editar Conta',
        delete_account: 'Deletar Conta',
        change_password: 'Alterar Senha',
        account: 'Conta',
        modal_text: 'Tem certeza que deseja deletar sua conta?'
      },
      Footer: {
        github: 'Link para o projeto no GitHub'
      },
      ConfirmBox: {
        text: 'Título ausente',
        accept: 'Sim',
        recuse: 'Não'
      },
      Home: {
      	title: 'Página Home',
        create_account: 'Crie uma Conta',
        create_account_text: 'Teste nosso sistema de autenticação e criação de usuários. Se desejar, também podemos confirmar seu e-mail para que você receba permissões de Administrador em nosso sistema!',
        create_account_link: 'Cadastre-se',
        about_project: 'Sobre o Projeto',
        about_project_text: 'Conheça um pouco sobre as tecnologias utilizadas no projeto. Entenda o que significa a sigla MERN, como funciona a plataforma Heroku e todas as bibliotecas utilizadas no projeto.',
        about_project_link: 'Acesse',
        plans_project: 'Planos do Projeto',
        plans_project_text: 'Veja quais são os planos para o projeto, desde os que estão em andamento até os que já foram concluídos.',
        plans_project_link: 'Acesse'
      },
      SendEmailToken: {
      	message_text: 'Confirme seu email para receber acesso as funcionalidades de Admin',
      	button_text: 'Enviar Email'
      },
      AboutProject: {
      	title: 'Sobre o Projeto',

      	accordion1_title: 'O que é MERN',
      	accordion1_text1: 'MERN é uma das várias variações da pilha MEAN (MongoDB, Express, Angular, Node), onde a estrutura de front-end tradicional Angular.js é substituída por React.js. Outras variantes incluem MEVN (MongoDB, Express, Vue, Node) e realmente qualquer estrutura de front-end JavaScript pode funcionar.',
      	accordion1_text2: 'Express e Node constituem a camada intermediária (aplicativo). Express.js é uma estrutura da web do lado do servidor e Node.js a plataforma de servidor JavaScript popular e poderosa. Independentemente de qual variante você escolher, ME (RVA) N é a abordagem ideal para trabalhar com JavaScript e JSON, o tempo todo.',
      	accordion1_text3: 'A arquitetura MERN permite que você construa facilmente uma arquitetura de 3 camadas (front-end, back-end, banco de dados) inteiramente usando JavaScript e JSON.',
      	accordion1_linktext1: 'Texto Original em inglês:',
      	accordion1_link: 'Página Oficial do MongoDB',
      	
        accordion2_title: 'O que é Heroku',
        accordion2_text1: 'Heroku é uma plataforma como serviço (PaaS) em nuvem baseada em contêiner. Os desenvolvedores usam o Heroku para implantar, gerenciar e dimensionar aplicativos modernos. Nossa plataforma é elegante, flexível e fácil de usar, oferecendo aos desenvolvedores um caminho simples para colocar seus aplicativos no mercado.',
        accordion2_text2: 'Heroku permite implantar, executar e gerenciar aplicativos escritos em Ruby, Node.js, Java, Python, Clojure, Scala, Go e PHP.',
        accordion2_text3: 'A plataforma Heroku usa o Git como meio principal para implantar aplicativos (existem outras maneiras de transportar seu código-fonte para o Heroku, inclusive por meio de uma API).',
        accordion2_text4: 'Quando a plataforma Heroku recebe o código-fonte do aplicativo, ela inicia a construção do aplicativo-fonte. O mecanismo de construção é normalmente específico da linguagem, mas segue o mesmo padrão, normalmente recuperando as dependências especificadas e criando quaisquer ativos necessários (seja tão simples como o processamento de folhas de estilo ou tão complexo quanto a compilação de código).',
        accordion2_text5: 'O Heroku executa aplicativos executando um comando que você especificou no Procfile, em um dyno que foi pré-carregado com seu slug preparado (na verdade, com sua versão, que estende seu slug e alguns itens ainda não definidos: config vars e add-ons) .',
        accordion2_text6: 'Geralmente, se você implantar um aplicativo pela primeira vez, o Heroku executará 1 dyno web automaticamente. Em outras palavras, ele irá inicializar um dyno, carregá-lo com seu slug e executar o comando que você associou ao tipo de processo da web em seu Procfile.',
        accordion2_text7: 'O Heroku executa seu aplicativo em contêineres Linux leves e isolados chamados "dynos". A plataforma oferece diferentes tipos de dyno para ajudá-lo a obter os melhores resultados para o seu tipo de aplicativo.',
        accordion2_text8: 'Neste projeto eu uso o dyno gratuito, que me permite ter 512 MB de RAM disponíveis e Após 30 minutos de inatividade entra em modo sleep, caso contrário, mantém ativo por um período de tempo mensal gratuito.',
        accordion2_linktext1: 'Texto Original em inglês:',
        accordion2_linktext2: 'Para mais Detalhes sobre os Preços oferecidos em inglês:',
        accordion2_link1: 'Página Oficial do Heroku',

        accordion3_title: 'Pacotes/Bibliotecas Usadas',
        accordion3_subtitle1: 'Front-end',
        accordion3_subtitle2: 'Back-end',
        accordion3_npmjspage: 'Página no npmjs.com',
        accordion3_documentation: 'Documentação',
        accordion3_githubpage: 'Página no GitHub',
        accordion3_officialpage: 'Página Oficial',
      },
      ConfirmEmail: {
      	title: 'Confirmar Email'
      },
      Dashboard: {
      	title: 'Dashboard',
      	menu_title: 'Menu',
      	menu_item1: 'Listar Usuários',
        tableedit: 'Editar',
        tableremove: 'Remover'
      },
      EditAccount: {
      	title: 'Editar Conta',
      	form_label1: 'Nome:',
      	form_label2: 'Email:',
      	form_submit: 'Alterar',
        emailedit_text: 'Ao alterar seu e-mail, você precisará confirmá-lo novamente. Tem certeza que deseja alterar seu e-mail?'
      },
      EditPassword: {
      	title: 'Alterar Senha',
      	form_label1: 'Senha Atual:',
      	form_label2: 'Nova Senha:',
      	form_label3: 'Confirmar Nova Senha:',
      	form_submit: 'Alterar'
      },
      EditUser: {
      	title: 'Editar Usuário',
      	form_label1: 'Nome:',
      	form_label2: 'Email:',
      	form_submit: 'Editar'
      },
      NotFound: {
      	title: 'Página não encontrada :('
      },
      PlansProject: {
      	title: 'Planos para o Projeto',
      	plan1: 'Sistema de Autenticação de Usuário',
      	plan2: 'Sistema de Permissão de Usuário',
      	plan3: 'Envio de Email e Confirmação de Email',
      	plan4: 'Criação de Estilo Próprio',
      	plan5: 'Tradução do Site para Inglês',
        plan6: 'Estilo responsivo para dispositivo móvel'
      },
      SignIn: {
      	title: 'Login',
      	form_label1: 'Email:',
      	form_label2: 'Senha:',
      	form_submit: 'Login',
        form_empty: 'Preencha todos os dados para logar'
      },
      SignUp: {
      	title: 'Criar Conta',
      	form_label1: 'Nome:',
      	form_label2: 'Email:',
      	form_label3: 'Senha:',
      	form_submit: 'Cadastrar',
        form_empty: 'Preencha todos os dados para se cadastrar'
      },
      Unauthorized: {
      	title: 'Você não tem permissão para acessar'
      },
      Validations: {
        User: {
          username_required: 'Nome está vazio',
          username_min: 'Nome tem menos de 3 caracteres',
          username_max: 'Nome tem mais de 35 caracteres',
          email_required: 'Email está vazio',
          email_invalid: 'Email inválido',
          password_required: 'Senha está vazia',
          password_min: 'Senha tem menos de 8 caracteres',
          password_max: 'Senha tem mais de 40 caracteres',
          passwords_notmatch: 'As senhas não coincidem'
        }
      }
    }
}