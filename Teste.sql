create database teste;
use teste;

create table Usuario(
	id_usuario int not null auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(10) not null, #ver se tem alguma coisa especifica para senha
    
    primary key(id_usuario)
);

create table Historico(
	id_historico int auto_increment not null,
	datahora datetime not null auto_increment,
    progresso int,
    
    
    primary key(id_historico),
    foreign key(id_historico) references Usuario(id_usuario)
);

create table Tutorial(
	
);