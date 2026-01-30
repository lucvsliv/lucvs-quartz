---
created: 2026-01-14
dg-publish: true
---
## Out Port 위치에 대한 의문
헥사고날 아키텍처 패턴을 크게 `domain`, `application`, `infrastructure` layer로 나눈다고 했을 때, In/Out Port를 `domain` layer의 하위에 두곤 한다. 

먼저 In Port의 경우, 외부에서 어플리케이션에 "이것 좀 해줘"라고 명령을 내리는 입구라고 할 수 있는 인터페이스다. 기본적인 Layered Architecture 구조에서의 비즈니스 로직을 담당하는 Service Layer를, 헥사고날 아키텍처에서는 In Port의 구현체로 사용하게 된다.

이 부분에 대하여는 딱히 의구심이 들지 않는다. 메인 서비스 로직 자체가 어플리케이션의 핵심 기능이기 때문에, Application Layer 내부에 구현체가 존재해야 한다는 것은 매우 자연스러운 일이다.

이번에는 Out Port를 살펴보자. Out Port는 어플리케이션이 로직을 수행하다가 외부(DB 등)에 "이것 좀 저장해줘" 등을 요청하는 출구라고 할 수 있다. 그러나 Out Port에 대한 구현체인 Adapter는 보통 Infrastructure Layer 하위에 두게 되는데, 왜 이 친구는 멀리 떨어져 있는지 의구심이 든다.

단순하게 생각했을 때, Adapater에서 사용하는 로직은 비즈니스 로직과는 꽤 거리가 있기 때문에 Infrastructure에 두는 것은 이해가 가능하다. 그럼 이에 대한 인터페이스를 Application Layer가 아닌 Infrastructure Layer에 두는 것이 좋지 않을까? 같은 Layer 안에 존재하니까 좀 더 코드의 가독성이나 유지보수에 이점이 있지 않을까?

## Hexagonal Architecture 사용 이유
우선 Hexagonal Architecture을 사용하는 이유가 사라진다. Hexagonal Architecture을 사용하는 가장 큰 이유는 어플리케이션의 메인 비즈니스 로직을 외부로부터 분리하여 유지보수성, 유연성, 테스트 용이성 등을 극대화하기 위함이다. 즉 각 계층 간의 "분리"를 가장 큰 목적으로 둔다.

만약 Out Port가 Infrastructure Layer 내부에 있게 되면, 비즈니스 로직이 수행되는 과정에서 DB 저장이 필요한 경우 Out Port를 호출할 수 밖에 없다. 즉, Application Layer의 Service는 DB 저장과 관련된 로직을 수행하기 위하여 관련된 인터페이스, 구현체를 전부 Infrastructure Layer에서 끌어와야 한다.

더 쉽게 말하면 다음과 같다. Application을 집이라고 생각하고, Infrastructure를 가전제품이라고 가정하자. 집에서 살다보면 여러 가지 가전제품이 필요하다. 믹서기, 전자레인지, 냉장고 등 수없이 많은 가전제품이 필요할 것이다. 또 어떤 날에는 아예 처음보는 런닝머신 기계를 집에 들일 수도 있고, 또 어떤 날에는 잘 사용하던 믹서기가 고장나서 새로운 제품으로 바꿀 수도 있다.

그러나 만약 가전제품들이 저마다 다른 플러그 모양을 갖고 있으면 어떨까? 집에 각 가전제품 스펙에 해당하는 각기 다른 콘센트 구멍들이 즐비할 것이다.

말도 안 된다. 따라서 가전제품들이 집의 내부 규칙에 맞춰야 하는 것이다.

이걸 그대로 개발과 이어보자.

어플리케이션 개발을 하면서 어떤 시점에는 새로운 기능이 필요할 수도 있고, 또 어떤 시점에는 개발된 기능을 수정해야 할 수도 있다. 만약 Infrastructure 하위에 Out Port를 정의하게 된다면, 개발자는 새로운 기능이나 기존 기능을 수정할 때, Application Layer에 존재하는 Service 로직을 전부 갈아치워야할 수도 있을 것이다.

말도 안 된다. 따라서 외부 기술(Infrastructure Layer)이 내부 규칙(Application Layer)에 맞춰야 하는 것이다.

집은 220v의 콘센트 구멍(Interface)을 미리 뚫어놓고, 전자제품은 220v의 플러그(Adapter)를 만들어야 한다.

## Adapter?
한 발 더 나아가서, 왜 Out Port의 이름은 Adapter 일까? Plug가 더 적절하지 않을까?

우리가 전자제품을 사용하다보면 제품에서 플러그로 이어지는 전선다발 중간에 직육면체의 어떤 거대하고 무거운 것이 존재하는 것을 볼 수 있다. 이것을 Adapter라고 부르는데, 이는 벽면 콘센트의 교류 전기를 전자제품이 사용하는 안정적인 직류 저전압 전기로 변환하는 역할을 한다. 

따라서 Plug는 단순히 전력 규격을 맞추기 위한 모양일 뿐이지, 실제로 전류를 변환하는 "로직"을 수행하는 것은 Adapter이기 때문에 Hexagonal Architecture에서도 Adapter라고 부르는 게 아닐까 싶다.