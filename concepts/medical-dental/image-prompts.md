# 하루결치과의원(가상) 사진 지시서 — GPT 실사 이미지용

세 시안(arch · chart · bloom)은 `concepts/medical-dental/images/` 폴더의 아래 파일 이름을 그대로 읽습니다.
파일이 없으면 크기 · 파일명이 적힌 자리표시가 보이고, 같은 이름으로 넣으면 코드 수정 없이 사진으로 바뀝니다.

- 형식: WebP(품질 80 내외), 아래 비율 그대로. 긴 변 1600px 이하
- 화면에는 "AI 생성 예시 이미지"로 표기됩니다(rules/medical.md). 실존 인물 · 실제 병원이 아님
- 공통 금지: 글자 · 로고 · 워터마크, 환자 얼굴, 입안 · 치아 클로즈업, 피 · 수술 장면, 전후 비교, 과한 미백 치아 웃음

## 공통 톤 (모든 프롬프트 끝에 붙이기)
> Photorealistic editorial photograph for a fictional Korean dental clinic website. Soft natural daylight from a large window, clean warm-white walls, pale oak and light grey materials, calm and trustworthy mood, realistic skin and fabric texture, shallow depth of field, no text, no logos, no watermark, no patients, no visible teeth close-up, no blood.

## 원장 프로필 4장 — 비율 4:5 (예: 1024×1280)
얼굴이 서로 다른 가상의 한국인 의사. 가슴 위 상반신, 정면에서 살짝 비스듬히, 밝은 회백색 배경, 흰 가운 안에 단정한 셔츠, 차분하고 편안한 표정(입을 다물거나 살짝 미소, 치아가 크게 보이지 않게). 네 장의 조명 · 배경 · 구도를 같게 맞춥니다.

| 파일 | 인물 |
|---|---|
| `doctor-1.webp` | 한도윤 대표원장 — 40대 중반 남성, 짧은 머리, 얇은 테 안경, 하늘색 셔츠 |
| `doctor-2.webp` | 서이준 원장 — 30대 후반 남성, 단정한 머리, 네이비 셔츠, 팔짱 없이 자연스러운 자세 |
| `doctor-3.webp` | 윤채원 원장 — 30대 중반 여성, 어깨 길이 묶은 머리, 흰 블라우스 |
| `doctor-4.webp` | 강하린 원장 — 30대 초반 여성, 단발, 연한 민트 셔츠, 다정한 인상(소아치과) |

## 의료기기 4장 — 비율 4:3 (예: 1536×1152)
사람 없이 장비만. 실제 브랜드 로고 · 화면 글자는 보이지 않게(무명 장비).

| 파일 | 장면 |
|---|---|
| `equip-cbct.webp` | 밝은 촬영실의 치과용 콘빔 CT(CBCT) 장비, 서서 촬영하는 형태, 흰색 · 연회색, 깨끗한 바닥 |
| `equip-scanner.webp` | 유닛체어 옆 카트 위 무선 구강 스캐너와 꺼진 모니터, 장갑 · 소독 티슈 정돈 |
| `equip-microscope.webp` | 진료 의자 위에 팔이 뻗은 치과용 수술 현미경, 따뜻한 조명, 의자는 비어 있음 |
| `equip-sterilization.webp` | 스테인리스 작업대, 고압 멸균기(오토클레이브), 포장된 기구 파우치가 가지런한 멸균실 |

## 공간 2장 — 비율 3:2 (예: 1536×1024)
| 파일 | 장면 |
|---|---|
| `space-lobby.webp` | 큰 창이 있는 대기 공간, 오크 접수 데스크(글자 없음), 연회색 소파, 식물 몇 개, 사람 없음 |
| `space-operatory.webp` | 문이 달린 개별 진료실, 흰 유닛체어 하나, 창으로 들어오는 빛, 정돈된 카트, 사람 없음 |

## 넣는 방법
1. GPT로 만든 이미지를 위 파일 이름 · 비율로 저장합니다.
2. 채팅에 첨부해 주시면 WebP 변환 · 크기 조정 후 `images/`에 넣고 다시 배포합니다.
