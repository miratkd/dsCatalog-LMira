# DsCatalog (pt-BR)
### Um jeito simples de mostrar todos os seus produtos para os seus clientes!
 
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/miratkd/dsCatalog-LMira/blob/main/LICENSE)

![DSCatalog](https://github.com/miratkd/assets/blob/main/Home.PNG)

# Sobre o Projeto.
Um projeto full-stack de um catálogo online desenvolvido do zero durante o BootCamp DevSuperior. O site permite que um dono de comércio posa expor seus produtos na internet de forma
organizada e detalhada, além de cadastrar funcionários que terão acesso total ou parcial ao sistema. Os produtos serão apresentados através de uma interface simples e bonita
, disponível tanto para desktop quanto mobile.

 
# Layot

Talvez sendo a parte mais importante do projeto, a página de catálogo apresenta todos os produtos de forma paginada e filtrada. O usuário tem a opção de ir navegando entre
 as páginas para checar o catálogo inteiro, produto por produto, ou então usar a filtrar os produtos para encontrar exatamente oque ele procura.
 
 ![Catalogo](https://github.com/miratkd/assets/blob/main/catalogo.PNG)
 
 A filtragem e bastante simples e consiste basicamente em duas funções, filtragem por nome e filtragem por categoria. Na filtragem por nome o usuário digita um o nome de um produto
 e a tela só vai mostrar produto com aquele nome no título. Na filtragem por categoria o usuário tem de escolher entre as categorias já cadastradas no sistema e apenas os produtos associados aquela categoria serão mostrados na tela
 . A também para limpar todos os filtros e mostrar todos os produtos.
 
 ![Filtro](https://github.com/miratkd/assets/blob/main/Catalogo-livros.PNG)
 
 É importante lembrar também que todas essas funções estão disponíveis na versão mobile também!
 
 ![catalogo-mobile](https://github.com/miratkd/assets/blob/main/Catalogo-mobile.PNG)
 ![Home-mobile](https://github.com/miratkd/assets/blob/main/Home-mobile.PNG)
 
 Todo o sistema de administração do site e protegido através de um sistema robusto de autenticação, garantindo que apenas usuários cadastrados possam acessar recursos específicos
 
 ![Login](https://github.com/miratkd/assets/blob/main/Login.PNG)
 
 Na sessão admin os operadores do sistema podem adicionar, remover e editar os produtos e categorias, permitindo assim que o catálogo esteja sempre atualizado. Todos os 
 dados do site são salvos em um banco de dados postgreSQL hospedado junto com o backend na plataforma heroku.
 
 ![lista de produto](https://github.com/miratkd/assets/blob/main/Admin-produtos-lista.PNG)
 ![formulario de produto](https://github.com/miratkd/assets/blob/main/Admin-produtos-formulario-editar.PNG)
 ![lista de categorias](https://github.com/miratkd/assets/blob/main/admin-categorias-lista.PNG)
 
 Existem dois tipos de operadores do sistema; os "operators", aqueles que podem adicionar e remover produtos e categorias, e os "admins", aqueles que podem adicionar e remover outros operadores
 
 ![lista de usuarios](https://github.com/miratkd/assets/blob/main/admin-usuarios-lista.PNG)
 ![formulario de usuario](https://github.com/miratkd/assets/blob/main/admin-usuarios-formulario.PNG)
 
 Perceba que a opção de editar usuários do sistema só aparece para usuários do tipo admin.
 
 ![admin](https://github.com/miratkd/assets/blob/main/navbar%20admin.PNG)
 ![operator](https://github.com/miratkd/assets/blob/main/navbar%20operator.PNG)
 
 # Tecnologias trabalhadas
 
 ## BackEnd
 
 * Java 11
 * JPA Hibernate
 * Maven
 * Web Service REST
 * OAuth2
 * Token JWT
 
 ## FrontEnd
 
 * ReactJS
 * TypeScript
 * Bootstrap
 * React-router, React-hook-forms, React-select
 * HTML-CSS
 
 ## implementação e outros
 
 * Heroku (BackEnd)
 * Netlify (FrontEnd)
 * PostgreeSQL
 * H2
 * GitHub
 * Figma
 * Testes JUnit
 * PostMan
 
 # Teste o site você mesmo!
 
  Link para o site: <https://dscatalog-lmira.netlify.app/>
  
  #### utilize esse usuários para editar os produtos!
  
  Email: maria@gmail.com
  
  Senha: 13972684
  
  Email: alex@gmail.com
  
  Senha: 13972684
  
  Ps: por uma questão de segurança, a opção de alterar senha foi desativada
 
  # Author
  Lucas Mira de Carvalho
  
  [Linkedin](https://www.linkedin.com/in/lucas-mira-17514b203/)
  
 //////////////////////////////////////////////////////////////////////////////////////////////////
 
