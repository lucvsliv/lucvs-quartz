---
created: 2025-09-19
dg-publish:
---

#### Controller
```kotlin
class ChatController() {
	...
	
	@PostMapping("/query")
	suspend fun sendMessage() { ... }
}
```

`suspend` 키워드를 사용하면, kotlin Coroutines를 사용하여 비동기 처리를 할 수 있다. API를 사용한 LLM 응답 시간이 꽤나 느리기 때문에 Coroutines를 사용하여 어플리케이션의 응답성을 높일 수 있다.