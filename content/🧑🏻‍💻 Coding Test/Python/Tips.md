#### 입력
- 일반적으로 그냥 `input()` 을 쓰면 시간 초과 가능성 ↑
- 아래 두 개를 추가하여 최적화 가능
	- import sys
	- `input = sys.stdin.readline`
- 여러 개의 값을, 공백을 기준으로, 한 번에 입력받을 때
	- `a, b = map(int, input().split())`



#### 배열 & 리스트
- 배열, 리스트 구분이 없음
- `list(input())` -> 입력 후 바로 리스트 형태로 저장