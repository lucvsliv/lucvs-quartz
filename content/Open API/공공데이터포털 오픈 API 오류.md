---
created: 2025-05-24
updated: 2025-05-24
dg-publish: true
title: 공공데이터포털 오픈 API 오류
---

![[images/스크린샷 2025-05-24 00.44.39.png|500]]

공공데이터포털의 오픈 API 에서 response 되는 에러코드는 위와 같다.

#### 30. SERVICE_KEY_IS_NOT_REGISTERED_ERROR
오픈 API 를 사용하여 Spring Boot 프로젝트를 만들고 있던 중에 기상청의 단기예보 API 에 대하여 `SERVICE_KEY_IS_NOT_REGISTERED_ERROR` 의 에러코드가 response 된 적이 있다.

분명히 그저께 테스트할 때에는 API 명세에 적힌대로 초단기실황에 대한 응답 메시지가 성공적으로 response 되었으나 오늘은 갑자기 오류가 발생했다.

에러코드의 내용은 등록되지 않은 서비스키를 사용했다는 것이다. 이에 대한 해결방안은 두 개가 존재한다.

###### 1. Decoding 된 개인 API 인증키를 사용
![[images/스크린샷 2025-05-24 01.03.17.png]]

[마이페이지] > [데이터 요청] 에서 보면 위와 같이 발급받은 개인 API 인증키를 확인할 수 있는데, Spring Boot 의 Service 코드에서 UriBuilder 를 통하여 `serviceKey` 값이 `build()` method 를 통하여 자동으로 encoding 되기 때문에 Decoding 된 인증키를 사용해야 한다.

위와 같은 화면에서 Encoding 된 인증키와 Decoding 된 인증키를 모두 복사할 수 있다.

###### 2. 인증키 재발급
![[images/스크린샷 2025-05-24 01.20.37.png]]

발급받은 인증키에 오류가 있어 재발급을 하는 것도 하나의 방법일 수 있다. 하지만 신규/재발급의 경우 해당 정보가 기관 서버로 동기화되는데 약 30분에서 1시간정도 소요될 수 있다.