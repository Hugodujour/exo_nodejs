1. Démarrez MongoDB

2.

npm install

npm run dev

Lancez votre navigateur sur le port 3000

Si vous souhaitez lancer les tests : npm test

Diagramme UML :

![image](https://github.com/user-attachments/assets/c66c1393-12ca-451a-be6b-8ac35d13f4c4)
![image](https://github.com/user-attachments/assets/1ef4198f-658f-4656-963d-5ca8c9c3b3be)
#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: User
#------------------------------------------------------------

CREATE TABLE User(
        id_user  Int  Auto_increment  NOT NULL ,
        password Varchar (50) NOT NULL ,
        email    Varchar (50) NOT NULL ,
        date     Date NOT NULL ,
        role     Varchar (50) NOT NULL ,
        age      Int NOT NULL
	,CONSTRAINT User_PK PRIMARY KEY (id_user)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Article
#------------------------------------------------------------

CREATE TABLE Article(
        id_article Int  Auto_increment  NOT NULL ,
        title      Varchar (50) NOT NULL ,
        content    Text NOT NULL ,
        id_user    Int NOT NULL
	,CONSTRAINT Article_PK PRIMARY KEY (id_article)

	,CONSTRAINT Article_User_FK FOREIGN KEY (id_user) REFERENCES User(id_user)
)ENGINE=InnoDB;

