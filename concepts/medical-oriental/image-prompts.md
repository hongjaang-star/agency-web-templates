# 온지한의원(가상) 사진 지시서 — GPT 실사 이미지용

세 시안(munjin · pulse · yakjang)은 `concepts/medical-oriental/images/` 폴더의 아래 파일 이름을 그대로 읽습니다.
파일이 없으면 파일명 · 비율이 적힌 자리표시가 보이고, 같은 이름으로 넣으면 코드 수정 없이 사진으로 바뀝니다.

- 형식: WebP(품질 80 내외), 아래 비율 그대로. 긴 변 1600px 이하
- 화면에는 "AI 생성 예시 이미지"로 표기됩니다(rules/medical.md). 실존 인물 · 실제 한의원이 아님
- 공통 금지: 글자 · 로고 · 간판 · 워터마크, 환자 얼굴, 침이 꽂힌 피부 클로즈업, 피, 전후 비교, 특정 처방명이 적힌 약 봉투

## 공통 톤 (모든 프롬프트 끝에 붙이기)
> Photorealistic editorial photograph for a fictional Korean traditional medicine clinic website. Soft natural daylight, warm hanji-paper white walls, walnut and pale oak wood, a few green plants, calm and clean mood, realistic texture, shallow depth of field, no text, no logos, no signage, no watermark, no patients, no needles in skin.

## 한의사 프로필 2장 — 비율 4:5 (예: 1024×1280)
얼굴이 서로 다른 가상의 한국인 한의사. 가슴 위 상반신, 정면에서 살짝 비스듬히, 밝은 한지색 배경, 흰 가운 안에 단정한 셔츠, 차분하고 편안한 표정. 두 장의 조명 · 배경 · 구도를 같게 맞춥니다.

| 파일 | 인물 |
|---|---|
| `doctor-1.webp` | 서지안 대표 한의사 — 40대 초반 남성, 짧은 머리, 둥근 뿔테 안경, 베이지 셔츠 |
| `doctor-2.webp` | 문하람 한의사 — 30대 후반 여성, 낮게 묶은 머리, 연한 세이지색 블라우스, 다정한 인상 |

## 공간 3장 — 비율 3:2 (예: 1536×1024) · 시안 C(yakjang)에서 사용
| 파일 | 장면 |
|---|---|
| `space-lobby.webp` | 창이 큰 대기 공간, 호두나무 접수 데스크(글자 없음), 한지 조명, 낮은 소파, 사람 없음 |
| `space-room.webp` | 문이 닫히는 개별 진료실, 흰 시트가 깔린 진료 베드 하나, 정돈된 작은 카트(밀봉된 일회용 침 상자), 사람 없음 |
| `space-herb.webp` | 원내 조제실, 서랍이 많은 나무 약장과 스테인리스 달임 기계, 저울 위 약재 소량, 사람 없음, 라벨 글자 없음 |

## 넣는 방법
1. GPT로 만든 이미지를 위 파일 이름 · 비율로 저장합니다.
2. `concepts/medical-oriental/images/` 에 넣고 커밋하면 세 시안에 바로 표시됩니다.
3. 얼굴 · 손이 어색하거나 글자가 생긴 이미지는 다시 만듭니다.
