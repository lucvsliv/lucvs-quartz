---
created: 2026-01-14
dg-publish: true
---
## GitHub CLI를 통한 일괄 등록
- Mac: `brew install gh`
- Windows: `winget install --id GitHub.cli`
- 설치 후 `gh auth login`으로 로그인

## 일괄 등록
```shell
# 기존 라벨 삭제 (선택사항: 깔끔하게 새로 시작하고 싶다면 주석 해제)
# gh label list --limit 100 | awk '{print $1}' | xargs -n 1 gh label delete --yes

# 1. Type
gh label create "type/feat" --color "33B864" --description "New feature" --force
gh label create "type/fix" --color "D93F0B" --description "Bug fix" --force
gh label create "type/chore" --color "8250DF" --description "Build, configs, no production code change" --force
gh label create "type/refactor" --color "118DE1" --description "Refactoring production code" --force
gh label create "type/docs" --color "1D76DB" --description "Documentation only changes" --force
gh label create "type/test" --color "E99695" --description "Adding or fixing tests" --force

# 2. Area
gh label create "area/domain" --color "FBCA04" --description "Domain layer (Business logic)" --force
gh label create "area/api" --color "C2E0C6" --description "Web/API layer (Controller, DTO)" --force
gh label create "area/infra" --color "F9D0C4" --description "Infrastructure layer (DB, External API)" --force

# 3. Priority
gh label create "priority/critical" --color "B60205" --description "Critical priority" --force
gh label create "priority/high" --color "D93F0B" --description "High priority" --force
gh label create "priority/medium" --color "FEF2C0" --description "Medium priority" --force
gh label create "priority/low" --color "F0F0F0" --description "Low priority" --force

# 4. Status
gh label create "status/in-progress" --color "2CBE4E" --description "Work in progress" --force
gh label create "status/review-needed" --color "E4E669" --description "Waiting for review" --force

echo "모든 라벨이 성공적으로 생성되었습니다 :)"
```

## 결과
![[스크린샷 2026-01-14 18.48.23.png]]