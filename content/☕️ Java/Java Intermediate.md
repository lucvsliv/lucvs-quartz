#### 00. Java Documents
https://docs.oracle.com/javase/8/docs/api/index.html

#### 01. Object Class
- Object Class 는 Java 에 존재하는 모든 Class 의 최상위 Class 임
- Object Class 에 존재하는 method 중, 자주 overriding 하여 사용하는 것들은,
	- `equals()`, `toString()`, `hashCode()`
- 여기서 `equals()` 의 경우, 모든 값이 같은 Obejct 라고 하더라도
	- `s1.equals(s2)` 와 같이 비교하면 다르다고 나옴 -> `hashCode()` 가 다르기 때문
- 따라서, 상황에 맞게 `equals()` 를 overriding 하여 method 를 customizing 할 필요가 있음


#### 02. java.lang 패키지
- Wrapper, Object, String, StringBuffer, StringBuilder, System, Math 등의 기본적인 Class 가 모두 java.lang package 에 포함됨
- Wrapper Class
	- 기본 자료형 데이터를 Object 로 변환시킬 수 있는 Class 를 의미
	- 각 자료형마다 각각의 Wrapper Class 가 존재 (ex. `int` -> `Integer`)
	- 최신 Java 에서는 `Integer i = new Integer(5);` 가 아닌 `Integer i = 5;` 와 같이 사용하여도 자동으로 Integer Object 가 만들어짐
		- 기본 타입 데이터를 객체 타입 데이터로 자동 형변환 시켜주는 기능 -> Auto Boxing
		- 반대로, 객체 데이터를 기본형 타입 데이터로 자동 형변환 하는 기능 -> Auto Unboxing
- StringBuffer Class
	- String Class 는 절대 변하지 않는 불변 Class 임
	- 반면 StringBuffer Class 는 가변 Class 임
	- `sb.append()` method 는 `this`, 즉 자기 자신의 object 를 return 함
		- 따라서, 이를 사용하여 method 를 연속적으로 호출 -> Method Chaining
		- ex) `sb.append("A").append("B").append("C")...`
- String Class 의 문제점
	- String object 를 `+` 연산자를 통하여 연속적으로 더해주면,
		- 더할 때마다 내부적으로 새로운 `StringBuilder` object 가 생성되어 성능이 낮아짐
	- 따라서, StringBuilder 를 선언하고, 이에 연속적으로 더해야 `new` 를 통한 새로운 Object 생성이 안 되고, 훨씬 더 빠른 성능을 보임
- Math Class
	- Math Class 는 생성자 자체가 `private` 이기 때문에 `new` 를 통한 객체 생성이 불가능
	- 그러나 모든 method 가 `static` 으로 선언되어 있기 때문에 전역에서 사용 가능
	- `Math.max(5, 30)`, `Math.min(50, 30)`, `Math.abs(-10)`, `Math.pow(2, 10)`, `Math.log10(100)`
	- `Math.random()` 은 0 부터 1 사이의 랜덤한 소수를 return


#### 03. java.util 패키지
- java.util package
	- 날짜와 관련된 Class 인 Date, Calendar Class
	- 자료구조와 관련된 컬렉션 프레임워크와 관련된 Interface 와 Class
	- Date Class 는 지역화를 지원하지 않아서 deprecated 됨 ->  즉 더 이상 지원하지 않으니 사용을 자제해라
		- 이런 문제를 해결하기 위하여 나온 Class 가 Calendar Class
		- 지역화와 관련된 클래스들은 Locale로 시작되는 이름을 가진 Class 들임
	- List, Set, Collection, Map 은 자료구조 -> 즉Collection Framework 와 관련된 Interface
- Collection Framework 에서 가장 기본이 되는 Interface 는 Collection Interface
	- Collection Interface 는 중복도 허용, 자료가 저장된 순서도 기억하지 X
	- Collection 이 가지고 있는 대표적인 method -> `add()`, `size()`, `iterator()`
	- `iterator()` 를 사용하여 단순히 하나씩 꺼낼 수 있는 Iterator 라는 Interface 를 반환
		- Iterator Interface 는 다음 두 가지의 대표 method 를 가짐
			- `hasNext()` : 꺼낼 것이 있는지를 확인
			- `next()` : 하나씩 자료를 꺼낼 때 사용
- Set Interface
	- 중복을 허용하지 않음
	- Collection Interface 를 상속받음
	- Set Interface 의 `add()` method -> 같은 자료가 있으면 `false`, 없으면 `true` return
- List Interface
	- 중복은 허용, 순서를 기억
	- 마찬가지로 Collection Interface 를 상속 -> `iterator()` 사용 가능
	- 순서를 기억하기 때문에, n 번째의 자료를 꺼낼 수 있는 `get(int n)` method 를 가짐
- Map Interface
	- Key, Value 를 가짐
	- `put()` method 를 이용하여 key 와 value 를 함께 저장
	- 원하는 key 에 해당하는 값을 꺼낼 때는 `get(key)` 와 같이 사용
	- `put()` 을 통하여 기존에 존재하는 key 값을 넣으면, overwrite 됨
	- Map 에 저장된 모든 key 들은 중복 X -> 가지고 있는 모든 Key 를 return 하는 `keySet()`
		- `keySet()` 은 Set type 이므로 `iterator()` 를 사용하여 모든 원소를 꺼낼 수 있음
	  ![[images/스크린샷 2025-05-07 00.34.53.png]]
- Generic
	- Generic 을 사용하여, 선언할 때는 가상의 타입으로 선언하고, 사용 시에는 구체적인 타입을 지정함
	- Generic 을 사용하는 대표적인 Class 는 Collection Framework 와 관련된 Class 들임
	- `public class Box<E> {}` 와 같이 Box Class 를 선언, 내부적으로는 `private E obj;` 와 같이 아직 정해지지 않은 `E` 타입의 field 를 생성하여 사용
		- 실제 사용 시에는, `Box<String> box = new Box<>();` 와 같이 사용하고,
		- `box.setObj("Hello");` 와 같이 정한 타입에 해당하는 데이터를 parameter 로 사용
		- 만약 정해진 타입과 다른 타입의 데이터를 parameter 로 넣을 경우 -> 오류
	- 정리하면, Generic 을 통하여 다양한 Class 를 사용하는 Class 를 만들 수 있음


#### 04. 날짜와 시간
- Date Class
	- Date Class 는 지역화 (사용자의 지역에 맞춤) 부분이 고려되지 않았음
	- 따라서, 거의 모든 생성자와 method 가 Deprecated 되어 있음
- Calender Class
	- 기본적으로 Calender Class 는 Abstract Class 임 -> 따라서 직접적으로 객체 생성 불가
	- 인스턴스를 생성하려면 `getInstance()` method 를 사용해야 함
		- `Calendar cal = Calendar.getInstance();`
		- 내부적으로 자식 Class 인 GregodianCalender 인스턴스를 생성하여 return
	- Calender Class 를 이용하여 현재 날짜 정보 얻는 법
		- `get()` method parameter 로 Calender 의 어떤 constant 를 넣느냐에 따라 달라짐
		- `int yyyy = cal.get(Calendar.YEAR);`
		- `int month = cal.get(Calendar.MONTH) + 1;` -> 월은 0 부터 시작
		- `HOUR` -> 12시간제, `HOUR_OF_DAY` -> 24 시간제
- java.time package
	- 기존에 존재하던 Calendar, Date Class 의 부족한 기능 -> 새롭게 재 디자인한 API 를 제공
	- `LocalDateTime timePoint = LocalDateTime.now();` : 현재 날짜와 시간
	- `LocalDate ld = LocalDate.of(2021, Month.DECEMBER, 12);` : 날짜 객체 생성
		- 이외에도 `LocalTime` 을 사용하여 시간 객체 생성 가능
	- 위에서 만든 LocalDateTime 객체에서 원하는 정보만을 다른 method, getter 를 통하여 얻을 수 있음
		- ex) `LocalDate theDate = timePoint.toLocalDate();`
		- ex) `Month month = timePoint.getMonth();`


#### 05. IO
![[images/스크린샷 2025-05-07 03.31.40.png|500]]

- Java IO 는 크게 Byte 단위 IO, Character 단위 IO 로 나뉨
	- byte 단위 IO 클래스는 InputStream, OutputStream 이라는 추상 클래스를 상속받아 만들어짐
	- char 단위 IO 클래스도 Reader, Writer 추상 클래스를 상속 받아 만들어짐
- 생성자에 `InputStream`, `Reader`, `Writer`, `OutputStream` 을 전달받을 수 있다면
	- 이 Class 는 다양한 입력/출력 도구를 연결하여 사용할 수 있다는 뜻
	- ex) `BufferedReader br = new BufferedReader(new InputStreamReader(System.in));`
- 만약 해당 추상 클래스들을 받는 생성자가 없다면
	- 이 클래스는 단순히 입력이 출력 대상이 무엇인지 고정되어 있다는 뜻
	- ex) `FileInputStream fis = new FileInputStream("data.txt");`
- 장식대상 클래스 (Component)
	- Decorator 패턴에서, 기능을 확장할 객체
	- 파일로 부터 입력받고 쓰기 위한 클래스 : FileInputStream, FileOutputStream, FileReader, FileWriter
	- 배열로 부터 입력받고 쓰기 위한 클래스 : ByteArrayInputStream, ByteArrayOutputStream, CharReader, CharWrite
- 장식하는 클래스 (Decorator)
	- Decorator 패턴에서, 장식 대상 클래스의 기능을 확장하는 역할
	- DataInputStream, DataOutputStream : 다양한 데이터 타입을 입력받고 출력
	- BufferedReader, PrintWriter : `println()`, `readLine()` 과 같이 기존 장식대상 클래스와는 달리 "한 줄만" 출력하거나 입력받는 method 를 가지고 있음
- 즉, Decorator Pattern 에서 보면,
	- 장식대상 클래스인 `InputStreamReader` 라는 샤워호스에, 
	- `BufferedReader` 라는 물줄기가 여러 형태로 바뀌어 나올 수 있는 최신형 샤워기 헤드를 꼽아서 사용하는 것이라고 보면 됨

> Stream 이란?
> - 스트림은 Java 에서 데이터를 순차적으로 읽거나 쓰는 데 사용되는 추상적인 개념
> - 스트림은 메모리 상에 자료 구조 형태로 데이터를 저장하는 것이 X
> - 데이터가 순차적으로 흘러가는 통로일 뿐 -> 내부적으로는 효율성을 위하여 buffer 를 사용
> 	- buffer 는 주로 JVM 의 heap 메모리에 존재
> 	- 사용된 이후에는 그저 dummy 데이터 (참조하는 애들이 없음, Garbage Collection 대상)

- Byte 단위 입출력
	- InputStream, OutpuStream 이라는 이름으로 끝나는 Class
	- `fis = new FileInputStream("data.txt");
	- `fos = new FileOutputStream("copy.txt");`
- Byte 단위 입출력 심화
	- `byte[] buffer = new byte[512];`
		- 이렇게 buffer 를 512 byte 로 잡아주면,
	- `while((readCount = fis.read(buffer))!= -1)`
		- buffer 를 read 에 넣어서 사용할 때 -> 한번에 512 bytes 씩 읽어들임

- 다양한 타입의 출력
	- 다양한 타입의 입출력은 DataInputStream, DataOutputStream 을 사용
		- 얘네들은 장식하는 클래스, 즉 Decorator 들이라 Component 와 반드시 함께 사용해야 함
	- `DataOutputStream out = new DataOutputStream(new FileOutputStream("data.txt"));`
	- 이렇게 생성된 `out` 을 다음과 같이 형식을 지정하여 입력(write) 가능
	- `out.writeInt(100);`, `out.writeBoolean(true);`, `out.writeDouble(50.5);`
- 다양한 타입의 입력
	- `DataInputStream in = new DataInputStream(new FileInputStream("data.txt"));`
	- 파일에 입력할 때, 타입을 지정하여 입력했거나, 원하는 타입으로 읽어오기 가능
		- `int i = in.readInt();`, `boolean b = in.readBoolean();` ...

- try-with-resources 문법
	- 위에서 다룬 모든 입출력 관련 클래스들은 AutoClosable Interface 를 implement 하기 때문에
		- try-with-resources 문법에 의하여 별도의 `close()` 를 작성하지 않아도 됨

- Char 단위 입출력 (Console)
	- Class 이름이 Reader 나 Writer 로 끝남
	- System.in 은 키보드를 의미 -> InputStream type, 즉 장식 대상 클래스
		- 즉 혼자서는 못 쓰기 때문에 InputStreamReader 클래스를 이용
	- `BufferedReader br = new BufferedReader(new InputStreamReader(System.in));`
	- `br.readLine()` 으로 한 줄씩 입력받기 가능
- Char 단위 입출력 (File)
	- `BufferedReader br = new BufferedReader(new FileReader("data.txt"))`
		- 파일에서 읽어오기 위하여 FileReader 클래스 이용
		- 해당 파일에서 한 줄씩 읽어오기 위하여 BufferedReader 클래스 이용
			- `readLine()` method 는 파일에서 더 이상 읽어올 내용이 없을 때, `null` 을 return
	- `PrintWriter pw = new PrintWriter(new FileWriter("test.txt"));`
		- 파일에 쓰기를 위하여 기본적으로 FileWriter 를 사용하고
			- 이에 대한 Decorator 로 PrintWriter 를 사용
			- `String line = br.readLine()` 으로 파일에서 한 줄씩 읽어오고,
			- `pw.println()` 를 통하여 한 줄씩 다른 파일에 쓰기


#### 06. 어노테이션
- annotation 은 클래스나 method 위에 붙여서 사용 -> `@` 를 붙여서 사용
- 이를 통하여 annotation 에 설정된 값을 통하여 클래스가 좀 더 다르게 실행되게 할 수 있음
	- 이 때문에 annotation 을 일종의 설정 파일처럼 설명하는 경우도 존재
- Java 가 제공하는 annotation 도 있고, 사용자가 직접 만드는 Custom Annotation 도 존재
	- `public @interface MyAnnotation {}` 을 통하여 생성 가능
	- 이 때, JVM 실행 시에 해당 annotation 을 감지할 수 있도록
	- `@Rentention(RetentionPolicy.RUNTIME)` 을 위에 붙여주어야 함
	- 


#### 07. 쓰레드
- 프로세스 -> 현재 실행되고 있는 프로그램
- Java 프로그램은 JVM 에 의하여 실행됨 -> 이 JVM 도 역시 프로그램 중 하나
- OS 입장에서는 Java 도 하나의 프로세스로 실행하는 것
- 예를 들어, Word 프로그램이 하나의 프로세스라면 -> 해당 프로세스 안에서도 맞춤법 검사, 글 작성 등의 여러 개의 흐름이 동시에 동작하게 할 수 있음 -> 각각이 바로 Thread 에 해당

- Thread 만들기
	- Thread 를 만드는 방법은
		- Thread 클래스를 상속받는 방법
			- Thread 가 가지고 있는 `run()` method 를 overriding
			- Thread 를 생성하고, Thread 를 `start()` method 를 통하여 실행
		- Runnable 인터페이스를 구현하는 방법
			- Runnable 이 가지고 있는 `run()` method 를 implement
			- Runnable 로 생성한 Thread 는 Thread class 로 생성하지 않았기 때문에 Thread 가 아님, 그냥 Runnable 객체일 뿐 -> `start()` method 가 없음
			- 따라서, `Thread t1 = new Thread(r1);` 처럼 Runnable 객체를 Thread 생성자에 넣어서 Thread 로 만들어줘야 함
			- 이후에 `t1.start()` 를 통하여 Thread 를 실행

- Thread 와 공유 객체
	- 여러 개의 Thread 가 동시에 접근하거나 사용하는 하나의 객체
	- Java 에서 Thread 는 동시에 실행됨 -> 공유 객체의 field 나 method 에 동시에 접근할 경우
		- Race Condition 문제 발생 가능 -> `synchronized` keyword 를 사용하여 해결 가능
			- synchronized 는 method 나 block 에 사용 -> 한 번에 하나의 Thread 만 해당 코드에 접근 가능하게 만듦
			- 내부적으로는 먼저 호출한 method 가 Monitoring Lock 을 얻음 -> 해당 method 가 종료되거나 `wait()` 을 만나기 전까지는 Lock 을 유지
			- 다른 Thread 들은 Lock 을 놓을 때까지 대기
		- method 길이 가 매우 긴 method 자체에 synchronized keyword 를 걸어버림 -> 마지막에 대기하는 Thread 가 starving 할 수 있음 -> 따라서 Race Condition 이 발생할 것 같은 부분에만 부분적으로 `synchronized(this) { count++; }` 과 같이 synchronized block 을 사용하면 됨

- Thread 와 상태제어![[images/스크린샷 2025-05-09 01.21.13.png]]
	- OS 는 여러 개의 Thread 를 잘게 쪼개서 번갈아가며 실행 -> 마치 동시에 실행되는 것처럼 보임
	- Thread 는 실행가능상태인 Runnable 과 실행 상태인 Running 상태로 나뉨
		- Runnable 은 곧 차례에 CPU 자원을 받는다는 것이고, Running 은 지금 현재 CPU 자원을 받아서 실행 중이라는 것
	- 실행되는 Thread 안에서 `Thread.sleep()` 호출되면 -> 해당 Thread 는 Time Waiting 상태
		-  `wait()`method 가 호출이 되면 -> Thread 는 Waiting 상태
	- `Thread.sleep()` 은 특정시간이 지나면 자신 스스로 블록상태에서 빠져나와 Runnable 로 복귀
	- 현재 Thread 가 `wait()` method 를 통해서 다른 쓰레드가 끝나기를 기다릴 때, 그 다른 Thread 나 또다른 Thread 에서 `notify()` 나 `notifyAll()` 메소드를 호출하기 전에는 Waiting 상태에서 해제되지 않음
	- `wait()` method 는 호출이 되면 Monitoring Lock 을 놓게 됨 -> 그래서 대기중인 다른 메소드가 실행됨
	- Thread 의 `run()` method 가 종료되면, Thread 는 종료됨 -> 즉 Dead 상태
	- Thread 의 `yeild()` method 가 호출되면 해당 Thread 는 다른 Thread 에게 자원을 양보
	- Thread가 가지고 있는 `join()` method 를 호출하게 되면 -> 해당 Thread 가 종료될 때까지 현재 Thread 는 멈춰서 대기 (Blocked 상태)

- 데몬 쓰레드 (Daemon Thread)
	- Daemon 이라는 것 -> 리눅스, 유닉스 계열에서 백그라운드로 동작하는 프로그램
	- Daemon Thread 는 일반 Thread 가 모두 종료되면 강제적으로 종료됨
	- Daemon Thread 로 지정할 Thread 는 `t1.start()` 이전에 `t1.setDaemon(true)` 를 사용

#### 08. 람다
- Interface 중, method 를 하나만 가지고 있는 Interface 를 함수형 Interface 라고 함
	- ex) Runnerable Interface -> `run()` 하나만 갖고 있음

```java
public class LambdaExam {
	public static void main(String[] args) {
		new Thread(new Runnable() {
			public void run() {
				for(int i = 0; i < 10; i++) {
					System.out.println("hello");
				}
			}
		}).start();
	}   
}
```
- 위와 같이 Thread 를 생성할 때에는 Runnable 객체를 생성자에 넣어야 함
- 이때, 바로 Runnable 의 `run()` method 를 overriding 할 수 있음
- 그리고 마지막에 생성된 Thread 를 바로 `.start()` 를 통해 실행 가능
- 그런데 너무 코드가 복잡함
	- Java 8 버전부터 Lambda Expression 을 지원
	- Lambda Expression 은 함수형 인터페이스를 구현할 때 사용
	- 불필요한 클래스 정의 없이 짧고 간단하게 코드 작성 가능

```java
public class LambdaExam {  
	public static void main(String[] args) {
		new Thread( () -> {
			for(int i = 0; i < 10; i++) {
				System.out.println("hello");
			}
		}).start();
	}   
}
```
- JVM 이 Thread 생성자를 보고, 해당 생성자에 전달될 객체가 Runnable 임을 파악
	- -> 이후에 등장하는 람다식을, Runnable 을 구현하는 코드로 사용하여 자동으로 Runnable 객체를 생성하여 Thread 생성자의 parameter 로 넣어줌

- 람다식 문법
	- (매개변수 목록) -> { 실행문 }
	- 