---
created: 2025-11-19
dg-publish: true
---
## RAG의 필요성
LLM은 현재 고급 모델이라고 하더라도 학습한 지식 안에서만 답변할 수 있다. 만약 이를 벗어난 영역에 대하여 답변 생성을 할 때에는 틀린 정보, 즉 Hallucation이 발생하게 된다.

이에 RAG(Retrieval-Augmented Generation)를 적용할 수 있다. RAG는 외부 데이터를 검색하여 LLM에게 Context의 형태로 제공함으로써 보다 신뢰성이 확보된 답변을 사용자에게 제공할 수 있게 된다.

그리고 Spring AI는 RAG의 Pipeline을 Spring 기반으로 구현하고 동작할 수 있게 한다.