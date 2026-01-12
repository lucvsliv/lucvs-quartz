---
created: 2025-09-19
dg-publish:
---

## Spring AI
Spring AI는 OpenAI, Antrophic, GoogleAI 등과 같은 다양한 AI 벤더들의 모델들을 하나의 공통된 방식으로 사용할 수 있게 해주는 Spring Framework 이다.

기존 Spring Framework에서, 직접 `RestTemplate`, `WebClient` 등과 같은 API 호출 클라이언트를 통하여 직접 AI API와 통신해야 했다. 이는 데이터 파싱 등에도 어려움이 있었기 때문에 비효율성이 꽤나 존재했다.

그러나 이제는 Spring AI를 활용하여 기존 과정들을 추상화한 클래스들을 사용하여 효율적으로 AI API를 사용할 수 있다.

#### Vector Storage
Spring AI에서는 데이터를 직접 벡터화하여 저장하는 작업을 알아서 해준다. RAG 흐름을 구성하는데 필요한 기능들을 기본으로 제공하기 때문에, `InMemmoryVectorStore` 를 사용하여 간단하게 사용할 수 있다. 이후 `PGVector`, `Qdrant` 같은 벡터 데이터베이스로 자연스럽게 확장 가능하다.

