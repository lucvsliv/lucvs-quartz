---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Inversion of Control
---
## Inversion of Control
Inversion of Control, 즉 제어의 역전이란 다음 한 문장으로 정의할 수 있다.

> **Inversion of Control (IoC)**
> The approach of outsourcing the construction and management of objects

문장 그대로 해석하면, 객체의 생성과 관리를 외주하는 접근법이라는 것이다. 우선 conventional 한 제어의 방식을 살펴보자.

##### Conventional Scenario

![[Pasted image 20250401185137.png|500]]

스포츠 클럽의 회원이 특정 코치를 선택하는 상화이라고 가정하자. 기존에는 위와 같이 `Member` 라는 class 가 직접 FootballCoach 라는 객체를 생성하여 이 객체에 대한 선언, 초기화, 관리 등을 모두 class 내부에서 직접 수행해야 했다. 그러나 Football 이 아닌 다른 스포츠의 코치도 선택할 수 있는 가능성이 높을 때에는 객체에 대한 construction 과 management 가 어려워질 수 있다.

이번에는 다른 방식을 살펴보자.

##### Ideal Scenario
![[Pasted image 20250401185124.png]]

해당 방식은 `Member` class 가 직접 object 들을 관리하는 것이 아니라, Spring Container 에게 원하는 Coach object 를 달라고 요청하는 방식이다. 

이렇게 되면 객체들에 대한 제어를 객체를 생성하는 class 에 존재하는 것이 아니라, 객체들을 생성하고 관리하는 Spring Container 에게 있기 때문에 제어의 권한이 넘어갔다, 즉 제어의 역전(Inversion of Control)이 일어났다고 하는 것이다.

##### Spring Container
Spring Container 는 객체들을 생성하고 관리하며, 특정 객체를 원하는 요청이 있을 때 해당 객체의 reference 를 제공하는 식의 기능을 수행한다. 여기서 Spring Container 는 다음 세 개의 주요한 기능을 가진다.

> **Primary functions of Spring Container**
> 1. 객체들을 만들고 관리한다. (Inversion of Control)
> 2. 객체 의존성을 주입한다. (Depedency Injection)
> 3. Spring Bean 의 생명 주기를 관리한다. (초기화 ~ 소멸)

그렇다면 Spring Container 에 존재하는 객체들은 어떻게 configure 하는 것일까? 다음 3가지의 방법이 존재한다.

> **Figuring Spring Container**
> 1. XML configuration file (legacy)
> 2. Java Annotations (modern)
> 3. Java Source Code (modern) 

이제 Inversion of Control 에 의해서 넘어간 객체의 제어에 대하여, Spring Container 는 어떤 방식으로 객체를 요청한 class 에게 객체에 대한 접근을 제공하는지 알아보자.