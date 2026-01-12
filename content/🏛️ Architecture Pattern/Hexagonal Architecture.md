---
created: 2025-08-17
---
![Simplifying Software Design with Hexagonal Architecture | by Rohit Doshi |  Medium](https://miro.medium.com/v2/resize:fit:1400/0*sKO6vFP7vcTwN-iy.jpg)

#### Interface & Infrastructure Layer

Hexagonal Architecture를 사용할 때, 크게 `domain`, `application`, `infrastructure` 세 개로 폴더링되어 있는 것을 알 수 있다. 그러나 위의 이미지를 보면, 기본적인 REST Controller 등은 Interface Layer로 분류되어 있는 것을 알 수 있으며, DB 등은 Infrastructure Layer로 되어 있는 것을 알 수 있다. 그러나 이 둘을 그냥 `infrastructure`라는 큰 묶음 안에 `in`과 `out`으로 구분하여 관리하는 것이 일반적이다.

더 자세하게는 Interface Layer를 Primary Adapters, Infrastructure Layer를 Secondary Adapters로 분류된다.


#### Persistence Adapter
- DB 와 직접 연결되어 있음
- DB 데이터의 저장, 조회, 수정, 삭제 등의 영속성 기능을 제공
- 어플리케이션 서비스는 이 어댑터를 통해서만 DB 에 접근 가능