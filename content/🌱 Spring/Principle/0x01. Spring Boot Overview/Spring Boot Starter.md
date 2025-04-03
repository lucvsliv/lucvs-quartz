---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Spring Boot Starter
---
Spring Boot 을 이용하여 개발을 하게 된다면 어떤 dependency 를 사용해야 할지 선택해야만 한다. Spring Boot 의 `Spring Boot Starter` 는 특정 기능을 구현하는 데 필요한 라이브러리와 설정을 미리 묶어서 제공하는 package 이다.

예를 들어, `spring-boot-starter-web` 은 spring-web, spring-webmvc, hibernate-validator, json, tomcat 등의 dependency 들을 포함한다.

또한, 아래처럼 Spring Initializr 를 통하여 간단하게 `pom.xml` 에 dependency 를 자동으로 설정할 수 있다.

![[Pasted image 20250324194639.png]]

그렇다면, 각 Starter 에 포함되어 있는 dependency 들은 어떤 것들이 있는지 어떻게 확인할까?

우선적으로 Maven Central Repository 홈페이지에 접속하여 특정 Starter 에 대한 dependecy 목록을 확인할 수 있다. 예를 들어, [Spring Boot Starter Web](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web/3.4.4) 에 대한 Dependecy 목록을 확인할 수 있다.

다른 방법은 IDE 를 통하여 해당 프로젝트에 포함된 Starter 들의 Dependency 목록을 확인할 수 있다. IntelliJ 의 경우, **View > Tool Windows > Maven > Dependencies** 를 통하여 아래와 같이 확인할 수 있다.

![[스크린샷 2025-03-24 19.38.50.png|500]]



## Spring Boot Starter Parent
Maven 이 Spring Boot 의 dependencies 를 개발자가 직접 다운로드 받고 설정하는 일을 대신 해준다. 또한 Starter 를 이용하여 어떤 dependency 를 사용해야 하는지 일일이 선택하지 않아도 된다.

그러나 여러개의 Starter 를 사용하는 경우에, 각 Starter 의 version 을 명시적으로 추가해줘야 한다. 이는 각 Starter 간의 version 호환성 문제로 인한 충돌이 일어날 수 있다.

이를 위하여 Starter 의 버전까지 통합 관리하는 Starter Parent 이 존재한다.

```xml
<parent>  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-parent</artifactId>  
    <version>3.4.4</version>  
    <relativePath/> <!-- lookup parent from repository -->  
</parent>
```
POM 파일은 부모-자식 관계를 지원하기 때문에, 위와 같이 Starter Parent 를 통하여 version 을 지정하면 부모 POM 의 설정을 자식 POM 이 상속받을 수 있다. 

```xml
<properties>  
    <java.version>17</java.version>  
</properties>
```
또한 각 Starter Parent 가 기본적으로 사용하는 Java version 이 존재한다. 따라서 위 코드처럼 overriding 을 통하여 해당 Java version 을 바꾸는 데에 사용하거나, 프로젝트에서 사용하는 Java version 을 명시적으로 나타내는 데에 사용할 수 있다.

이를 통하여 라이브러리 간의 version 충돌을 방지라고, 안정적인 개발 환경을 제공한다. 이외에도 Starter Parent 는 소스 인코딩 방식, Maven plugin 설정 등 프로젝트에 필요한 기본적인 환경의 정의한다.