---
created: 2025-04-05
updated: 2025-04-05
dg-publish: true
title: MySQL Database
---
##### MySQL Database
MySQL 은 다음 두 개의 요소를 포함한다.

> - MySQL Database Server
> - MySQL Workbench

##### MySQL Database Server
[MySQL Database Server](https://dev.mysql.com/downloads/mysql/) 는 data 들을 실제로 저장하는 곳이며, data 들에 대한 CRUD features 들을 지원한다. 

##### MySQL Workbench

![[../images/스크린샷 2025-04-05 16.12.01.png]]
[MySQL Workbench](https://dev.mysql.com/downloads/workbench/) 는 database 와 상호작용할 수 있는 client GUI 이며, GUI 를 통하여 database schema 와 table 들을 생성할 수 있다. 또한 SQL query 들을 실행하여 data 를 가져올 수 있다. database 에 대하여 data 를 insert, update, delete 할 수 있으며, 사용자 계정을 만들고 권한을 설정하거나 관리하는 등의 administrative 한 기능을 사용할 수 있다. 이외에도 여러가지 동작을 수행할 수 있다.

##### Compatibility
MySQL Database Server 와 Workbench 간에는 버전 호환성이 존재한다. 테스트에 성공한 버전 호환성은 다음과 같다.

> Server - MySQL Community Server 8.0.41
> Workbench - MySQL Workbench 8.0.41

## Setting Up Database Table
##### Create New User
우선 Workbench 에서 Local instance 에 접속한 뒤, 다음 SQL 코드를 실행한다.

```sql
-- Drop user first if they exist
DROP USER if exists 'springstudent'@'localhost';

-- Now create user with prop privileges
CREATE USER 'springstudent'@'localhost' IDENTIFIED BY 'springstudent';
GRANT ALL PRIVILEGES ON * . * TO 'springstudent'@'localhost';
```

간단히 살펴보면, 우선 `localhost` host 를 대상으로, `springstudent` 라는 user 가 존재하면 해당 USER 를 삭제한다.

그 이후에는 사용자 계정의 이름을 `springstudent`, 비밀번호를 `springstudent` 로 설정하여 새로운 USER 를 추가한다.

마지막으로, `localhost` 를 대상으로, `springstudent` 계정에 대하여 `*,*`, 즉 모든 데이터베이스의 모든 테이블에 대한 권한을 부여한다.

이후 모든 script 를 실행하고, [Administration] > [Users and Privileges] > [User Accounts] 에서 살펴보면 아래와 같이 `springstudent` 의 이름으로 새로운 계정이 생성된 것을 볼 수 있다.

![[images/스크린샷 2025-04-05 19.07.12.png]]

##### Setup New Connection
![[../images/스크린샷 2025-04-05 19.13.10.png]]
이후 위와 같이 `springstudent` 계정에 대한 새로운 Connection 을 생성한다. 이후 해당 Connection 에 접속한 뒤에 다음 script 를 실행하여 `student_tracker` 이라는 이름의 database 를 만들고, 해당 database 안에서 `student` 라는 table 을 생성한다. table 의 구조는 다음 코드와 같이 구성한다.

```sql
CREATE DATABASE  IF NOT EXISTS `student_tracker`;
USE `student_tracker`;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name`varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
```

해당 script 를 실행하면 다음과 같이 성공적으로 database 와 table 이 생성된 것을 볼 수 있다.

![[images/스크린샷 2025-04-06 12.54.27.png]]