---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Spring Boot Project Structure
---
## Spring Boot Project Structure
위에서 기본적인 Maven Project 에 대한 directory 구성에 대하여 살펴보았다. 그러나 아직 확인하고 넘어가야 할 파일들이 몇개 더 존재한다.

##### Maven Wrapper Files
![[스크린샷 2025-03-23 21.42.43.png|300]]

`mvnw` 파일, 즉 Maven Wrapper 는 자동으로 올바른 verison 의 Maven 을 실행하도록 도와주는 실행 파일이다. Wrapper 라는 이름을 가진만큼, Maven 의 실행 과정을 대신 감싸고 처리하는 역할을 한다. 개발자가 직접 자신의 프로젝트에 적합한 version 의 Maven 을 선택하여 설치하지 않더라도 Maven Wrapper 가 이 동작을 자동으로 처리해준다. 즉, local 환경에 Maven 이 존재하지 않는다면 Wrapper 가 알아서 다운로드하여 설치한다.

directory 를 보면 `mvnw.sh` 와 `mvnw.cmd` 두 개의 wrapper 가 존재하는데, 하나는 Linux/Mac 환경에서 사용되는 shell script 형식의 파일이고, 다른 하나는 Windows 환경에서 실행할 수 있는 파일이다.

##### Application Properties
Spring Boot 프로젝트에서 **`application.properties`** 파일은 애플리케이션의 다양한 설정을 관리한다. 이 파일은 애플리케이션 실행 시 자동으로 로드되며, Spring Initializr 로부터 자동으로 생성된다.

![[스크린샷 2025-03-24 00.35.21.png|300]]

해당 파일에서는 Spring Boot 의 properties 뿐만이 아니라 개발자가 개인적으로 사용할 수 있는 properties 도 추가할 수 있다. 예를 들어서,

```properties
# configure server port
server.port=8585

# configure my properties
coach.name=Arne Slot
team.name=Liverpool
```

과 같이 사용할 수 있는 것이다. custom properties 의 경우, Controller 등에서 Injection 을 사용하여 Java class 의 field 에 값을 할당할 수 있다. 아래처럼 말이다.

```java
@RestController
public class SampleController {
	@Value("${coach.name}")
	private String coachName;
	
	@Value("${team.name}")
	private String teamName;
}
```

##### Static Content
![[스크린샷 2025-03-24 01.43.52.png|300]]


다음은 `static` directory 에 대한 부분이다. 이 영역에는 static resources 들이 저장되는 곳이다. HTML, CSS, JavaScript 등의 파일과 이에 사용되는 image 파일들이 여기에 속한다. 해당 파일들은 Spring Boot 가 자동으로 load 하여 사용한다.

##### Templates
![[스크린샷 2025-03-24 01.51.26.png|300]]

`templates` 에서는 Thymeleaf, FreeMarker, Mustache 등의 template engine 들과 함께 사용된다. 이를 통하여 controller 에서 전달받은 데이터를 기반으로 dynamic 하게 HTML 페이지를 생성한다.

##### Unit Test
![[스크린샷 2025-03-24 01.56.07.png|400]]

마지막으로 Unit Test 에서 사용되는 `test` directory 이다. Spring Initializr 를 통하여 기본 Test class 가 하나 만들어져 있으며, 개발자가 원하는 unit tests 를 추가할 수 있다.