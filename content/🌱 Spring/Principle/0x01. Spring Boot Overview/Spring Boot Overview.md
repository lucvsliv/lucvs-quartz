---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Spring Boot Overview
---
## Main Objective
Spring Boot 와 Hibernate 를 사용하여 Java Application 을 build



## Course Preview
- Spring Boot application 개발
- DB 접근을 위하여 Hibernate/JPA 를 활용
- Spring Boot 를 사용하여 REST API 개발
- Spring Boot 를 사용하여 Spring MVP app 을 생성
- CRUD 개발을 위하여 Spring Boot 와 DB 연결
- application access 를 관리하기 위하여 Spring Security 를 적용
- 모든 Java configuration 과 Maven 을 활용 (no XML)



## Spring Boot Overview
##### Spring Boot
기존의 전통적인 Spring 에서는 JAR(Java ARchive) dependencies 를 Maven 으로 할 것인지 아니면 Gradle 로 할 것인지, 또 이에 맞는 configuration 은 xml 형식으로 관리할 것인지, Java 형식으로 관리할 것인지를 모두 수동으로 설정해야 한다. 또한 server 등 모든 설정을 하나하나 다 만져줘야 한다.

그러나 Spring Boot 에서는 위와 같은 과정을 최소화시키고, `spring-boot-starter-web` 라이브러리를 사용 시에 기본적으로 Tomcat server 가 내장되어 있다. 물론 Jetty 나 Undertow 등의 서버로 바꿀 수 있다.

##### Spring vs. Spring Boot
Spring Boot 는, 간단하게 말하면 Spring 을 기반으로 한 확장된 framework 로, 위에서 설명했듯이 Spring 의 복잡한 설정을 자동화하여 빠르게 application 을 개발하고 실행할 수 있게 도와준다. 그냥 간단하게 Spring Boot 는 Spring 을 더 쉽게 사용할 수 있는 도구로 보면 될 것 같다.

##### Spring Initializr
[Spring Initializr](http://start.spring.io) 는 Spring Boot project 를 빠르게 생성할 수 있는 웹 기반 도구이다.


##### Spring Boot Embedded Server
![[Pasted image 20250321172918.png|250]]
Spring Boot 는 내장된 HTTP Server 를 제공하기 때문에 별도로 다른 서버를 설치할 필요가 없다. 위 그림과 같이 JAR 파일에는 application code 뿐만이 아니라 서버도 포함되어 있는 것이다. 

##### Running Spring Boot Apps
기본적으로 Spring Boot Apps 는 JAR 파일의 형식으로 생산되기 때문에 IDE 에서 실행하거나 CLI 환경에서 명령어 입력을 통하여 Standalone-fashion 으로 실행할 수 있다.

##### Deploying Spring Boot Apps
![[Pasted image 20250321173136.png|400]]
Spring Boot Apps 는 전통적인 방법으로 외부 서버에 WAR 파일의 형식으로 배포할 수도 있다.



## Spring Boot Initializr Demo
##### Maven
Java project 를 하나 build 하려고 할 때 추가적인 JAR 파일들이 필요할 때가 다반사일 것이다. Spring 을 사용한다면 이와 관련된 여러개의 외부 JAR 파일들이 필요할 것이다.

이때, 각 파일들을 각각의 website 에서 다운로드하여 하나씩 build path 나 class path 에 넣어주는 방법이 있을 것이다. 그러나 Maven 을 사용하면 단순히 dependencied 설정만으로 각각의 JAR 파일을 다운로드하게 만들고, compile 이나 실행하는 과정에서 해당 JAR 파일들을 활성화시켜준다.

간단하게 말해서, Maven 은 persoanl shopper 및  friendly helper 라고 생각하면 된다.



## Spring Projects
Spring Projects Spring Framwork 의 중심 위에 추가적으로 만들어진 module 들을 의미한다.

Spring Cloud, Spring Data, Spring Batch, Spring Security, Spring Web Services 등 많은 [Spring Projects](https://spring.io/projects) 들이 존재한다. 