create database teste;
use teste;

create table Usuario(
	id_usuario int not null auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(10) not null, #ver se tem alguma coisa especifica para senhaTables
    
    primary key(id_usuario)
);

create table Historico(
	id_historico int auto_increment not null,
	datahora DATETIME not null default CURRENT_TIMESTAMP, -- Adicionado valor automático
    progresso int,
    id_usuario INT NOT NULL,   -- Coluna criada para guardar a FK de Usuario
    id_tutorial INT NOT NULL,  -- Coluna criada para guardar a FK de Tutorial
    
    primary key(id_historico),
    foreign key(id_usuario) references Usuario(id_usuario),
    foreign key(id_tutorial) references Tutorial(id_tutorial)
);

create table Tutorial(
	id_tutorial int not null auto_increment,
    titulo varchar(50) not null,
    descricao varchar(500),
    
    primary key (id_tutorial)
    
);
