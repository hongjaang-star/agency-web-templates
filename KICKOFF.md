# 시작 방법

## 1. 최초 1회 (사람)
1. setup-agency-repo.ps1 실행 → 저장소 생성, 이 키트 업로드, Pages 활성화
2. https://claude.ai/code 접속 → GitHub 연결 → 저장소 `agency-web-templates` 선택
3. 첫 지시: `/migrate` → PR 병합

## 2. 매일 (자동)
Claude Code 에서 `/schedule` 로 아래 지시를 평일 오전 9시 반복 작업으로 등록:

> /next-site

## 3. 사람이 하는 일
1. 시안 PR 병합 (휴대폰 가능) → 1~2분 뒤 시안 주소에서 3개 비교
2. 고른 시안을 Claude Code 에 지시: `/build-site <slug> <concept>`
3. 완성 PR 확인 후 병합 → 자동 배포
