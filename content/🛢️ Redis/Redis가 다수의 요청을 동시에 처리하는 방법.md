---
created: 2026-04-10
dg-publish: true
---
## 1. 기존의 I/O Multiplexing
기존의 전통적인 웹 서버(과거의 Apache)는 클라이언트가 접속할 때마다 스레드를 하나씩 만들었다. 그러나 1만 명이 접속하면 1만 개의 Thread가 필요했기 때문에 메모리 폭발과 함께 서버가 다운되는 일이 다반사였다.

현대의 Tomcat도 연결을 관리할 때는 Redis처럼 `epoll(Linux)/kqueue(MacOS)`(OS에서 다수의 네트워크 연결을 효율적으로 관리하기 위한 고성능 비동기 I/O 방식)과 같은 I/O Multiplexing 기술을 사용한다. 

Tomcat의 내부에는 크게 Acceptor, Poller, Worker Thread Pool 세 가지 역할이 존재한다. 먼저 Acceptor은 클라이언트의 새로운 연결을 받아낸다. 이 수많은 연결 상태들을 Poller가 감시하다가, 특정 소켓에 HTTP 요청이 들어오게 되면 이를 감지한다. 각각의 Poller는 Single-Thread 형식의 Event Loop 방식으로 자기 담당 소켓들만 감시하게 되고, Tomcat은 각 Poller에 대한 부하를 분산하고자 여러 개의 Poller를 두는 방식으로 동작한다.

이렇게 감지된 요청은 Poller가 직접 처리하지 않고 이를 Worker Thread Pool, 즉 미리 만들어둔 Thread 마을에 이를 보낸다. Tomcat은 기본적으로 200개의 Thread Pool Size를 갖고 있으며, 대기 중인 Thread 하나에게 해당 요청을 전달하여 작업을 수행하게 한다. 이 작업은 Spring의 `DispatcherServlet`을 거쳐 Controller 로직을 쭉 수행하게 된다.

그럼 왜 Tomcat은 Thread Pool이 필요한 것일까?

Spring Application은 실질적인 I/O 작업을 수행한다. 만약 하나의 Thread 환경이라고 가정하면, I/O 작업을 수행하느라 그 뒤에 밀려있는 다른 요청들은 서버가 멈춘 것처럼 아무것도 못하고 Thread에 실릴 때까지 대기해야 한다. 그래서 Tomcat은 하나의 Thread가 DB의 응답을 기다리며 Blocking 상태에 있는 동안, 다른 Thread가 다른 사용자의 요청을 처리하도록 하기 위하여 Multi-Thread 환경으로 운용되는 것이다.

## 2. Redis I/O Multiplexing
Redis는 전통적인 Thread의 Blocking 상태를 만들 필요가 없다. 모든 데이터가 메인 메모리에 올라와 있기 때문에 디스크 I/O 작업이 없기 때문이다. 따라서 Redis는 Single Thread Event Loop을 통하여 Http 요청을 처리하고, 모든 데이터가 RAM에 있기 때문에 즉시 요청에 대한 명령어를 처리하고, 이를 반환한다.
