---
created: 2026-04-09
dg-publish: true
---
## 1. In-Memory 기반
DB 성능 저하(병목 등)의 99%는 디스크 I/O에서 발생한다.

제1공학관 23동에서 들었던 운영체제 강의 시간으로 잠깐 회귀해보자. 디스크, 흔히 HDD는 필요한 데이터만 Page 단위로 RAM에 가져와서 접근하는 방식을 사용한다. 만약 특정 프로세스가 어떤 데이터를 읽으려고 할 때, L1/L2/L2 Cache에서 Miss가 발생하고, RAM에도 존재하지 않을 때 Page Fault가 발생하게 된다.

이후, 디스크에서 해당 데이터가 존재하는 페이지를 찾아서 가져오게 되는데, 만약 메모리가 모두 Use 상태라면 Replacement Policy에 의하여 Page Replacement가 일어난다. 가끔씩 엄청 무거운 작업을 할 때면 디스크가 끽끽 갈리는 내며 살려달라고 외친다는 교수님의 말씀이 생각난다.

근데 도대체 얼마나 속도 차이가 나길래 CPU, L1, L2, L3, RAM 그리고 DISK 레벨까지 나누는 것일까? 실질적인 수치로 살펴보자.

| 저장장치       | 접근 시간 (Latency) |
| ---------- | --------------- |
| L1 Cache   | ~1 ns           |
| L2 Cache   | ~3~5 ns         |
| L3 Cache   | ~10~20 ns       |
| RAM (DRAM) | ~50~100 ns      |
| SSD (NVMe) | ~50~150 μs      |
| HDD        | ~5~10 ms        |

위 표에서 볼 수 있듯이, RAM의 레이턴시는 HDD가 아닌 SSD를 기준으로 하더라도 최소 1,000배까지 차이가 나는 것을 볼 수 있다. RDBMS가 디스크에서 데이터를 읽으려면 OS에 `read()` 시스템 콜을 보내고, 디스크에서 원하는 페이지를 찾아 메모리에 복사하는 과정을 거치게 되는 것이다.

Redis는 이 모든 과정을 생략한다.


## 2. Single Thread
흔히 성능을 높이기 위해서는 Multi-Thread를 사용해야 한다고 생각하지만, Redis는 기본적으로 `GET`/`SET` 등과 같이 기본적인 메인 로직에 대하여는 Single-Thread 방식을 사용한다. 왜 그럴까?

#### 2-1. Context Switching의 함정
이 역시 운영체제 시간으로 돌아가야 한다. Thread가 여러 개면 CPU는 이들을 번갈아가며 실행해야 한다. 이때, 특정 스레드에서 I/O 작업이 발생하면 Context Switching이 일어나게 되는데, 해당 I/O 작업을 수행하는 동안 다른 Thread가 실행된다.이 과정에서 실행 흐름의 문맥, 즉 말 그대로 Context를 Switching하는 작업이 이루어져야 하고, 이 역시 `1~5` μs의 비용이 소모된다. Redis `GET`은 약 `100` μs, `SET`은 약 `200~500` μs 정도의 시간이 소모되기 때문에 Switching 비용이 더 비싸다는 것을 알 수 있다.

#### 2-2. Lock-Free
Multi-Thread 환경에서, 만약 여러 Thread가 동시에 같은 데이터에 접근하게 되면 Race Condition 등의 문제가 발생할 수 있기 때문에 Mutex 등의 Lock을 사용해야 한다. 하지만 Lock을 사용하게 된다면 하나의 Thread가 Lock을 얻었을 때, 나머지 Thread들은 Blocking, 즉 Lock을 얻을 때까지 대기해야 하므로 극심한 병목이 생기게 된다. 

#### 2-3. Atomicity
Single-Thread 환경이기 때문에 한 번에 단 하나의 명령어만 처리하게 된다. Redis는 Single-Thread 환경이므로 Lock이 필요없게 되고, 이로써 Atomicity도 얻을 수 있다.

#### 2-ɑ. Redis 6.0 이후
너무 많은 네트워크 요청이 들어오면 I/O 단에서도 병목이 발생하기 시작했다. 그래서 최신 Redis는 네트워크 I/O(소켓 읽기/쓰기)에만 Multi-Thread를 도입하고, 실제 명령어 실행은 여전히 Single-Thread를 유지하였다.

