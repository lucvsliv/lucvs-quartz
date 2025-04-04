---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Maven
---
___
##### What is Maven?
Maven 은 Project Management Tool 이다. 더 자세하게 말하면, [[🌱 Spring/Principle/0x01. Spring Boot Overview/Spring Boot Overview#Maven|여기]]에서 설명한 것과 같이 개발자들이 프로젝트에 사용되는 JAR 파일 관리를 용이하게 할 수 있도록 도와주는 도구이다.

아래 그림은 Maven 이 동작하는 과정을 설명하고 있다.

<img src="images/20250322165211.png" style="width:700px; height:auto;">

1. Maven 은 프로젝트 의 config 파일을 읽고, 어떤 JAR 파일을 필요로 하는지 확인
2. 우선적으로, 개발자의 local repository 를 확인하여 해당 JAR 파일이 있는지 확인
3. 만약에 local 에 없다면, Internet 환경에 존재하는 Maven Central Repository 에서 다운로드
4. 다운로드 받은 JAR 파일들을 local repo 에 저장
5. local 에 저장된 JAR 파일들을 build 와 run 에 사용

##### Handling JAR Dependencies
 이렇게 관리되는 각각의 Dependency 들은 개발자가 수동으로 다운로드 받고 이를 다시 local repository 에 저장하지 않아도 되게 만들어준다.

또한 프로젝트 내에서 class 나 build path 를 직접 수정하지 않아도 Maven 이 이를 다 알아서 handling 해준다.

##### Maven Project Structure
일반적인 Spring project 에서는 따로 개발하는 데에 있어서 기준이 존재하지 않는다. 이는 유지보수 차원에서도 꽤나 큰 영향을 미치지만, 신입 개발자에 있어서 혼동을 초래할 수 있게 된다.

하지만 Maven 을 이용하여 project 를 관리한다면 다음과 같은 Standard 한 directory structure 가 존재하게 된다.

<img src="images/Pasted-image-20250322221114.png" style="width:300px; height:auto;">

Maven 기반 Spring 프로젝트의 directory structure 를 살펴보자. 기본적으로 Spring Initializr 를 통하여 Project 를 생성한 이후에 IDE 에 이를 Import 하여 살펴보면 위와 같이 나타난다. 대표적인 구조 구성은 다음과 같다.

- `src/main/java` : Java 소스코드
- `src/main/resources` : properties / config 파일
- `src/test` : unit test 코드 및 properties
- `target` : Maven build 과정에서 컴파일된 class 파일 (`target/classes`)

이렇게 고정된 directory structure 가 존재하기 때문에, Maven 기반의 project 들은 `portable` 하다고 할 수 있다. 그냥 하나의 project 를 특정 IDE 에 구속시키는 것이 아니라, IDE 간에 손쉽게 공유되고 개발될 수 있기 때문이다. 

간단한 프로젝트의 directory 구성을 보더라도 누군가의 설명이 없이는 원하는 코드 조각을 보거나 수정하는 데에 있어서 많은 시간이 소요된다는 것을 쉽게 경험할 수 있다. 이에 Maven 은 이런 수고스러운 일들을 깔끔하게 정리한다.

그럼 제일 아래에 존재하는 `pom.xml` 파일에 대하여 알아보자.

##### POM file
Project Object Model file 로, Spring project 에 대한 설정 파일이다. 앞서 말했듯이, 이 파일에 원하는 쇼핑 목록, 즉 원하는 라이브러리를 입력해주면 Maven 이 local 이 됐건, remote 가 됐건 알아서 모든 환경 설정을 대신 관리해준다. 또한 POM 파일은 언제나 project 의 root directory 에 위치한다.

POM 파일의 구조를 살펴보자.

<img src="images/Pasted-image-20250322234918.png" style="width:300px; height:auto;">

`project metadata` 부분에는 프로젝트의 이름, 버전 등이 포함되어 있고, 프로젝트의 output file 이 JAR type 인지, WAR type 인지 등으로 구성되어 있다.

`dependencies` 부분에서는 프로젝트가 의존하는 다른 project 의 목록이 포함되어 있다. 우리가 Maven 을 사용하는 가장 주목적인 부분이라고 할 수 있다.

`plugins` 부분은 JUnit test reports 와 같은 추가적인 기능을 제공하는 플러그인들을 지정하여 사용할 수 있게 한다.

##### Project Coordinates
특정 프로젝트를 고유하게 나타낼 수 있는건 이름도 있지만, 더 정확하게는 POM 파일 내부의 metadata 부분을 통하여 나타낼 수 있다.

```xml
<groupId>com.lucvs.springboot.demo</groupId>  
<artifactId>spring-practice-app</artifactId>  
<version>0.0.1-SNAPSHOT</version>
```

POM 파일의 metadata 부분이 위와 같이 되어있다고 가정해보자. 마치 Real-World 의 latitude/longitude 를 사용하여 실제 지구의 Coordinates 를 만드는 것과 같이, `groupId`, `artifactId`, `version` 으로 특정 프로젝트를 고유하게 나타낼 수 있다.

`groupId` 는 주로 회사, 그룹, 기관명을 나타내며, convention 은 domain name 을 뒤집어서 사용하는 것이다(lucvs.com → com.lucvs). `artifactId` 는 프로젝트의 이름을 나타낸다.

`version` 은 말그대로 이 프로젝트의 실질적인 release version 을 나타내는 부분이다. 만약 아직 개발중인 프로젝트라면, 이름 버전 뒤에 `1.0-SNAPSHOT` 과 같이 적고, 개발이 완료된 프로젝트라면 `-GA` 를 붙여 General Availability 즉, 안정적인 release 라는 것을 나타낸다. 이외에도 Release Candidate, 즉 release 후보 버전을 의미하는 `-RC`, 정해진 주기마다 배포하는 Milestone 의 `-M` 을 일반적으로 사용한다.

Spring Boot 의 경우, version 을 관리하는 순서는 다음과 같다.

> SNAPSHOT → M → RC → GA → SNAPSHOT(next version)

#### Dependency Coordinates
POM 파일에 사용하고자 하는 dependency 를 추가하기 위하여, 즉 Maven 에게 특정 dependency 를 관리하도록 요청하고 싶은 경우 아래와 같이 `dependencies` 태그 안에 작성해야 한다. 

```xml
<dependencies>
    <dependency>       
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-web</artifactId>  
    </dependency>
<dependencies>
```

project coordinates 와 마찬가지로, 원하는 dependency 의 `groupId` 와 `artifactId` 를 명시적으로 지정해줘야 한다. `version` 은 optional 의 영역이기는 하나, DevOps 를 실현하기 위하여는 포함시키는 것이 바람직하다. 외부에서 해당 프로젝트의 명세를 "GAV 가 어떻게 되나요?" 라는 식으로 질문하기 때문에 Version 역시 포함시키는 것이 좋다. 아니, 해야한다고 생각한다.

dependecy 들의 Coordinates 들은 직접 해당 사이트에 들어가서 찾을 수 있겠지만, 대부분 [Maven Central Repository](https://central.sonatype.com/) 에서 쉽게 이들의 Coordinates 들을 얻을 수 있다.
