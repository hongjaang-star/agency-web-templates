# 마루곁동물병원(가상) 사진 제작 지침 — GPT 실사 이미지용

세 시안(petcard · checkup · lifestage)은 `concepts/medical-veterinary/images/` 폴더의 아래 파일 이름을 그대로 읽습니다.
파일이 없으면 파일명이 적힌 자리표시가 보이고, 같은 이름으로 넣으면 코드 수정 없이 사진으로 바뀝니다.

목표는 두 가지입니다.
1. **한눈에 동물병원으로 보이게** — 거의 모든 사진에 강아지 · 고양이가 나오고, 수의사 가운 · 진료대 · 청진기처럼 동물병원에만 있는 물건이 함께 보입니다.
2. **같은 병원으로 보이게** — 아래 "고정 설정"의 공간 톤 · 옷 · 등장 동물을 모든 사진에서 똑같이 씁니다.

---

## 1. 고정 설정 (모든 사진 공통)

### 공간
- 벽: 따뜻한 흰색, 허리 높이까지 연한 오크 나무 판넬
- 바닥: 밝은 회색 미끄럼 방지 바닥 (반려동물 병원용)
- 가구: 연한 오크 + 흰색, 모서리가 둥근 형태
- 조명: 창으로 들어오는 부드러운 자연광 + 따뜻한 천장 조명. 형광등처럼 푸르스름하지 않게
- 색 포인트: 세이지 그린 쿠션 · 수건 하나 정도. 간판 · 글자 · 로고는 어디에도 없게

### 사람
- 수의사: 짙은 청록(딥 틸) 스크럽 위에 흰 가운. 이름표는 글자 없는 빈 명찰
- 테크니션(보조): 같은 색 스크럽, 가운 없음
- 보호자: 평범한 캐주얼 차림. 얼굴은 옆모습 · 뒷모습 위주로 크게 나오지 않게

### 등장 동물 (고정 캐스트 — 사진마다 이 중에서 고릅니다)
| 이름 | 모습 | 주로 나오는 사진 |
|---|---|---|
| 보리 | 갈색 곱슬털 소형 믹스견(토이푸들 계열), 3kg, 빨간 목줄 없음 · 갈색 가죽 목줄 | 대표 · 접종 · 진료실 |
| 콩이 | 흰색 중형견(진돗개 계열), 귀가 선 모습 | 대기 · 검진 · 외과 · 영상실 |
| 나비 | 치즈색 줄무늬 코리안 숏헤어 고양이 | 고양이 대기 · 고양이 진료 · 입원 |
| 모모 | 회색 단모 고양이, 초록 눈 | 고양이 진료실 · 치과 |
| 할배 | 주둥이에 흰 털이 섞인 노령 비글 | 노령동물 · 노령기 |

- 동물은 모두 **편안하고 건강해 보이게**: 꼬리 · 귀가 자연스럽고, 겁먹거나 아파 보이지 않게
- 강아지 · 고양이가 한 장면에 함께 나오는 사진은 대표 사진 2장뿐. 시설 사진에서는 **고양이 공간에 강아지가 나오지 않게**(이 병원의 특징이 동선 분리라서)

### 절대 넣지 않는 것
- 수술 중 장면, 절개 · 피 · 상처 · 붕대 감은 상처, 주사 바늘이 피부에 들어가는 장면 클로즈업
- 마취되어 누워 있는 동물, 입에 관을 넣은 동물, 울부짖거나 몸부림치는 동물
- 실제 브랜드 장비 로고, 모니터 속 글자 · 숫자, 약 상자 글씨, 벽 포스터 글씨
- 치료 전후 비교처럼 보이는 구도

---

## 2. 공통 프롬프트 꼬리 (모든 프롬프트 끝에 붙이기)

> Photorealistic editorial photograph for a fictional Korean veterinary clinic website. Warm white walls with pale oak wainscoting, light grey non-slip floor, soft natural window light with warm ceiling light, calm and friendly mood, sage green accent towel. Veterinarian wears deep teal scrubs under a white coat with a blank name badge. Animals look relaxed and healthy. Realistic fur texture, natural proportions, shallow depth of field, 35mm lens look. No text, no logos, no brand names, no readable screens, no signage, no watermark, no blood, no wounds, no surgery in progress, no needles in skin.

---

## 3. 샷 리스트 (26장)

열 설명: **파일** = 저장 이름 · **비율** = 저장 비율 · **사용** = A petcard / B checkup / C lifestage · **안전 영역** = 잘려도 되는 부분

### 3-1. 대표 사진 (3장)
| 파일 | 비율 | 사용 | 장면 | 안전 영역 |
|---|---|---|---|---|
| `hero.webp` | 4:3 | A 첫 화면 오른쪽 | 진료실에서 수의사(30대 여성)가 진료대 위 보리를 한 손으로 받쳐 주고, 옆 의자에 나비가 든 캐리어(문 열림, 나비가 고개만 내밂). 수의사는 보리를 보며 웃음 | 가장자리 10% |
| `hero-lobby.webp` | 16:9 | B 첫 화면 전체 배경 | 1층 대기실, 왼쪽은 비워 두고(글자가 올라감) 오른쪽 1/3에 보호자 옆모습과 콩이가 앉아 접수대 쪽을 봄. 창으로 빛 | **왼쪽 55%는 단순하게**(벽 · 창 정도), 피사체는 오른쪽 |
| `hero-family.webp` | 4:3 | C 첫 화면(위가 둥근 아치로 잘림) | 수의사(30대 남성)가 무릎을 꿇고 앉아 콩이를 쓰다듬고, 옆 낮은 선반 위 나비가 수의사를 봄. 정면에 가까운 구도 | **위쪽 모서리 양쪽 20%가 둥글게 잘림** — 머리 · 귀가 위 모서리에 닿지 않게 |

**프롬프트 예 (hero.webp)**
> A female veterinarian in her 30s gently steadies a small brown curly-haired toy poodle mix on a light oak exam table, smiling at the dog. On a chair beside the table, a cat carrier with its door open and an orange tabby Korean shorthair cat peeking out its head. Bright exam room. + 공통 꼬리

**프롬프트 예 (hero-lobby.webp)**
> Wide shot of a bright veterinary clinic waiting area. The left half of the frame is calm: warm white wall and a large window with soft daylight. In the right third, a pet owner seen from the side sits on an oak bench with a white medium-sized Korean jindo-type dog sitting calmly at their feet, both looking toward a reception desk without any text. + 공통 꼬리

**프롬프트 예 (hero-family.webp)**
> A male veterinarian in his 30s kneels on the floor petting a white jindo-type dog, while an orange tabby cat sits on a low oak shelf next to them looking at the vet. Front-facing composition with space above their heads. + 공통 꼬리

### 3-2. 수의사 프로필 (3장) — 4:5, 세 장 조명 · 배경 · 구도 같게
| 파일 | 사용 | 인물 |
|---|---|---|
| `vet-1.webp` | A · B · C | 한서진 대표 원장 — 40대 초반 여성, 어깨 길이 묶은 머리, 청진기를 목에 건 상반신, 품에 보리를 안음 |
| `vet-2.webp` | A · B · C | 윤도담 원장 — 30대 후반 남성, 짧은 머리, 팔짱 없이 서서 콩이 목을 쓰다듬음 (콩이는 화면 아래쪽) |
| `vet-3.webp` | A · B · C | 이채아 원장 — 30대 초반 여성, 단발, 품에 모모(회색 고양이)를 안음 |

> Chest-up portrait of [인물 설명] veterinarian holding [동물 설명], plain warm white background with soft oak panel at the bottom, even soft light, friendly closed-mouth smile, looking at camera. + 공통 꼬리

### 3-3. 병원 시설 (9장) — 4:3 · 시설은 **사람 0 – 1명, 동물 1마리**로 "어떤 방인지"가 먼저 보이게
| 파일 | 층 | 장면 | 반드시 보일 것 |
|---|---|---|---|
| `fac-reception.webp` | 1층 | 강아지 대기 · 접수. 오크 접수대(글자 없음), 바닥에 놓인 평판 체중계 위에 콩이가 올라가 있음 | 바닥 체중계, 접수대 |
| `fac-exam.webp` | 1층 | 진료실. 높낮이 조절 진료대(낮게 내린 상태), 벽걸이 이경 · 검안경 거치대, 진료대 옆에 보리 | 진료대, 벽 진료 도구 |
| `fac-lab.webp` | 1층 | 검사실. 하얀 작업대 위 혈액 분석기 2대(로고 · 화면 글자 없음), 현미경, 테크니션이 시험관을 꽂는 손만 보임 | 분석기, 현미경 |
| `fac-imaging.webp` | 1층 | 영상실. 엑스선 촬영대와 위에 달린 촬영기, 벽에 납 앞치마 걸이. 옆 카트에 초음파 기기(화면 꺼짐) | 엑스선 촬영대, 초음파 기기 |
| `fac-surgery.webp` | 1층 | 수술실 — **수술 전 비어 있는 상태**. 수술대 · 무영등 · 마취기 · 환자 감시 모니터(화면 꺼짐), 포장된 기구 세트 | 무영등, 마취기. 동물 · 사람 없음 |
| `fac-ward.webp` | 1층 | 강아지 입원실. 크기가 다른 스테인리스 입원장 여러 칸, 한 칸에 담요 깔고 엎드린 콩이(링거 · 붕대 없음) | 입원장, 담요 |
| `fac-cat-wait.webp` | 2층 | 고양이 대기실. 캐리어를 올려 두는 선반, 선반 위 캐리어 안에 나비. **강아지 없음** | 캐리어 선반 |
| `fac-cat-exam.webp` | 2층 | 고양이 진료실. 진료대에 수건, 위 뚜껑을 연 캐리어 안에서 모모를 진찰하는 수의사 손 | 수건, 열린 캐리어 |
| `fac-cat-ward.webp` | 2층 | 고양이 입원실. 칸마다 숨을 수 있는 상자 · 높은 단, 한 칸 상자 안에 나비 | 숨는 상자 |

**프롬프트 예 (fac-surgery.webp)**
> Empty, spotless veterinary operating room before surgery: a stainless surgical table, a round surgical light above, an anesthesia machine and a patient monitor with a dark screen, sealed sterile instrument packs on a tray. No animals, no people. + 공통 꼬리

**프롬프트 예 (fac-cat-exam.webp)**
> A quiet cat-only exam room. On an exam table covered with a soft sage towel, a cat carrier with its top removed; a grey short-haired cat with green eyes sits calmly inside while a veterinarian's gloved hands gently feel its neck. No dogs. + 공통 꼬리

### 3-4. 진료 범위 (8장) — 4:3 저장 · B에서는 3:2와 16:9로도 잘림 → **피사체를 가운데 60% 안에**
| 파일 | 진료 | 장면 | 피할 것 |
|---|---|---|---|
| `care-vaccine.webp` | 예방접종 | 수의사가 보리를 안고 테크니션이 목덜미를 쓰다듬는 순간. 주사기는 트레이에 놓여 있고 바늘은 보이지 않음 | 바늘 클로즈업 |
| `care-checkup.webp` | 건강검진 | 진료대 위 콩이 가슴에 청진기를 댄 수의사, 콩이는 앉아 있음 | — |
| `care-internal.webp` | 내과 | 수의사가 보호자(옆모습)에게 태블릿 속 그래프(글자 · 숫자 없이 흐릿하게)를 보여 주며 설명, 보호자 무릎에 보리 | 읽히는 화면 |
| `care-surgery.webp` | 외과 · 중성화 | **수술 후 회복**: 회복실 담요 위에서 넥카라를 한 콩이가 깨어 있고 수의사가 쓰다듬음 | 수술 장면 · 상처 · 붕대 |
| `care-dental.webp` | 치과 | 수의사가 모모의 입술을 살짝 들어 이빨을 보는 장면, 모모는 수건에 감싸여 편안함 | 피 · 스케일링 장면 |
| `care-cat.webp` | 고양이 진료 | 고양이 진료실 바닥에 앉은 수의사 앞으로 나비가 캐리어에서 스스로 걸어 나옴 | 강아지 |
| `care-senior.webp` | 노령동물 | 두꺼운 매트 위에 엎드린 할배(노령 비글), 수의사가 앞다리 관절을 부드럽게 만짐 | 아파 보이는 표정 |
| `care-skin.webp` | 피부 · 귀 | 수의사가 이경으로 보리 귀를 들여다봄, 보리는 테크니션 품에 | 피부 병변 클로즈업 |

### 3-5. 나이별 진료 (3장) — 4:3 · 시안 C
| 파일 | 장면 |
|---|---|
| `life-baby.webp` | 생후 2 – 3개월 강아지(보리의 아기 때 느낌)와 아기 고양이가 진료대 위 담요에 나란히, 수의사 손이 둘을 감쌈 |
| `life-adult.webp` | 보호자 옆모습과 콩이가 진료실에서 수의사와 하이파이브하듯 앞발을 맞춤 |
| `life-senior.webp` | 할배(노령 비글)가 보호자 품에 기대 쉬고, 수의사가 쭈그려 앉아 눈높이를 맞춰 말을 거는 장면 |

---

## 4. 작업 순서
1. **기준 이미지 먼저**: `fac-exam.webp`를 가장 먼저 만들고 마음에 들 때까지 고칩니다. 이 사진의 벽 · 바닥 · 조명을 다음 사진 프롬프트에 "same clinic interior as the reference image"로 함께 넣습니다.
2. **등장 동물 고정**: `hero.webp`(보리 · 나비)와 `fac-reception.webp`(콩이)를 만든 뒤, 다른 사진에서 "same dog as the reference"로 같은 동물을 이어 씁니다.
3. 수의사 3장은 한 번에 같은 배경으로 만듭니다.
4. 시설 9장 → 진료 범위 8장 → 나이별 3장 → 나머지 대표 2장 순서.
5. WebP(품질 80 내외), 긴 변 1600px 이하로 저장해 `images/`에 넣습니다.

## 5. 검수표 (한 장씩)
- [ ] 동물병원으로 보이는가: 동물 + 동물병원 물건(진료대 · 청진기 · 입원장 등)이 한 장에 함께 있다
- [ ] 같은 병원인가: 벽 오크 판넬 · 회색 바닥 · 딥 틸 스크럽
- [ ] 같은 동물인가: 등장 동물 표의 털색 · 크기와 맞다
- [ ] 금지 항목이 없다: 피 · 상처 · 수술 중 · 바늘 · 글자 · 로고
- [ ] 동물이 편안해 보인다
- [ ] 비율과 안전 영역이 맞다 (특히 `hero-lobby` 왼쪽 비움, `hero-family` 위 모서리)
- [ ] 고양이 공간 사진에 강아지가 없다
- [ ] 손가락 · 발가락 · 눈 모양이 자연스럽다

화면에는 사진마다 "AI 생성 예시"가 표시됩니다(rules/medical.md).
