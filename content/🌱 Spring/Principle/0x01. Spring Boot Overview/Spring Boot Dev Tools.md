---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Spring Boot Dev Tools
---
Spring 개발을 하다보면 Application 을 실행한 상태에서 추가적인 개발을 할 가능성이 매우 농후하다. 하지만 기본적인 Spring 환경에서는 새로 개발한 코드를 적용하여 실행하려면 기존의 Application 을 종료하고, 다시 실행해야 한다. 한두번은 괜찮지만 반복적으로 기능을 추가하고 수정하는 일이 다반사이기 때문에 재실행하는 것은 꽤나 귀찮은 일이다.

이에 `spring-boot-devtools` 라는 dependency 를 POM 에 추가하면 자동으로 App 이 재실행된다.

> IntelliJ 환경에서는 IDE 내부에서 다음 설정을 추가하여야 한다.
> 1. [Settings] > [Build, Execution, Deployment] > [Compiler] 에서 Build project automatically 체크박스 설정
> 2. [Settings] > [Advanced Settings] 에서 Allow auto-make to start ~ 체크박스 설정