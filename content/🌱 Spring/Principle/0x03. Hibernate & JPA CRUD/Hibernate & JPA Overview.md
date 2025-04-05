---
created: 2025-04-04
updated: 2025-04-04
dg-publish: true
title: Hibernate & JPA Overview
---
##### What is Hibernate?
 
 ![[images/Pasted image 20250404154904.png|500]]

[Hibernate](https://hibernate.org/) 는 Java 의 objects 를 Database 에 저장 및 보존하도록 하는 framework 이다. Hibernate 를 사용하는 이유 및 장점에는 다음 세 가지 정도를 들 수 있다.

> - Hibernate 는 모든 low-level 의 SQL 에 대하여 다룬다.
> - 개발자가 작성해야 하는 JDBC 의 코드량을 최소화한다.
> - ORM(Object-to-Relational Mapping) 을 제공한다.

##### ORM(Object-to-Relational Mapping)
ORM 은 OOP(Object-Orientied Programming) 언어의 object 와 Relational Database 의 데이터를 mapping 한다. 개발자가 직접 SQL query 등을 작성하지 않더라도 Database 를 조작할 수 있도록 돕는 기술인 것이다.

##### What is JPA?
JPA 는 Jarkarta Persistence API, 이전에는 Java Persistence API 라고 불리던 것으로, ORM 의 표준 API 이다. 

JPA 는 specification, 즉 interface 들만을 제공하기 때문에, 반드시 사용을 위하여는 implementation 을 필요로 한다. JPA 는 단지 표준화된 specification 을 제공하는 것뿐이다.

![[images/Pasted image 20250405120712.png|500]]

이에 여러 vendor 들이 JPA 에 대한 implementation 을 하였는데, 대표적으로 위와 같이 Hibernate 와 EclipseLink 가 있다. Spring Boot 에서는 Hibernate 를 default 로 사용하고 있으며, 설정에 따라 다른 vendor 의 JPA implementation 을 사용할 수 있다.

##### Benefits of JPA
JPA 는 standard API 를 제공하기 때문에 특정 vendor 에 묶여있을 필요가 없다. JPA Spec 에 따라서 flexible 하게 code 를 유지보수하면 되기 때문에, 사용하고 있는 vendor 가 서비스 제공을 중단하더라도 vendor 만 단순하게 바꾸면 된다.