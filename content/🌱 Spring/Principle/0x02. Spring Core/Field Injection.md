---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Field Injection
---
## Field Injection
Injection 에 있어서, Constructor Injection 과 Setter Injection 두 가지를 살펴보았다. 이들은 spring.io 
development team 이 추천하는 방식이지만, Field Injection 이라는 추천하지 않는 Injection 방식도 하나 존재한다.

legacy project 에서는 꽤나 Field Injection 을 자주 사용했지만, 시간이 흐르면서 Unit Test 에 있어 어려움이 있다는 것을 알고 최근에는 거의 쓰이지 않고 있다.

```java
@Autowired
private Coach myCoach;
```

Field Injection 은 위 처럼 Constructor 나 Setter 를 전혀 사용하지 않는다. 그냥 단순히 field 에 `@Autowired` annotation 을 달아줌으로써 Injection 을 수행한다.