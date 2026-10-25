# 분양 홍보 이미지 생성 가이드 (결온 가람숲 · 휘담 서림 더힐)

가상 업체 데모용 지침입니다. 결온 · 결온건설 · 결온 가람숲 · 휘담 · 휘담건설 · 휘담 서림 더힐 · 가람신도시 · 다온시는 모두 실제가 아닙니다.

- 웹 가이드: https://hongjaang-star.github.io/agency-web-templates/concepts/realty-presale/brand/
- 적용 사이트 A (결온 가람숲): https://hongjaang-star.github.io/agency-web-templates/concepts/realty-presale/grove/
- 적용 사이트 C (휘담 서림 더힐): https://hongjaang-star.github.io/agency-web-templates/concepts/realty-presale/dusk/
- 구글 드라이브 폴더: "분양 홍보 이미지 · 결온 · 휘담" (이 문서와 "생성 이미지" 폴더) https://drive.google.com/drive/folders/1jdziBxTu50CpSzktF_Dyg907gwpm4Dux
- 구글 문서(GPT가 드라이브에서 바로 읽는 사본): https://docs.google.com/document/d/1TCObf_jipa17I00sywuGErsQQ5S6winWEefslby5x9Q/edit
- 원본 문서: GitHub `hongjaang-star/agency-web-templates` 저장소의 `concepts/realty-presale/IMAGE-GUIDE.md`

> 이 파일을 고치면 같은 내용으로 구글 문서도 갱신합니다(사이트 담당).

## 0. GPT 작업 지침 (이 문서를 읽는 이미지 생성 담당에게)

1. 이 문서 전체를 먼저 읽고, 2장 "단지 고정 설정"과 3장 "촬영 규칙"을 모든 이미지에 지킵니다.
2. 5장 샷 리스트의 14장을 7장 작업 순서대로 만듭니다. 기준 외관 1장(`aerial-day`)과 기준 실내 1장(`living-84a`)을 먼저 사용자에게 확인받은 뒤 나머지를 만듭니다.
3. 프롬프트는 6장의 "공통 블록"(외관 또는 실내) 뒤에 해당 파일의 "장면 블록"을 이어 붙여 씁니다. 두 번째 이미지부터는 기준 이미지를 참조 이미지로 첨부하고 "same complex as the reference image" 또는 "same material palette and lighting as the reference"를 앞에 붙입니다.
4. 파일 이름은 샷 리스트의 이름 그대로(확장자 png 또는 jpg), 비율은 표의 원본 비율 그대로 저장합니다.
5. 사진 안에 글자 · 로고 · 간판 · 워터마크 · 실존 랜드마크 · 알아볼 수 있는 얼굴을 넣지 않습니다. 같은 사진을 두 브랜드 사이트가 함께 쓰기 때문입니다.
6. 이미지마다 8장 검수표로 스스로 확인하고, 맞지 않으면 다시 만듭니다.
7. 완성 파일은 구글 드라이브 "분양 홍보 이미지 · 결온 · 휘담" 폴더 안의 "생성 이미지" 폴더에 올리거나 사용자에게 전달합니다. 사이트 적용(WebP 변환 · 배포)은 사이트 담당(Claude)이 합니다.

## 1. 두 사이트에 함께 쓰는 방식

- 이미지 한 세트(14장)를 결온 가람숲(A)과 휘담 서림 더힐(C)이 함께 씁니다.
- 파일을 저장소 `concepts/realty-presale/images/`에 넣으면 두 사이트의 해당 칸에 동시에 들어갑니다. 설명 문구와 "CG · 이미지 컷" 표기는 사이트가 자동으로 붙입니다.
- 두 브랜드는 이름 · 지역 · 문구가 다르므로, 사진에는 어느 한쪽 브랜드나 지역을 알 수 있는 요소가 없어야 합니다.
- 파일이 없는 칸은 사이트에 단지 일러스트와 파일 이름이 대신 보입니다. 일부만 먼저 만들어도 됩니다.

## 2. 단지 고정 설정 (모든 외관 이미지에 똑같이)

| 항목 | 설정 |
|---|---|
| 동 구성 | 9개 동, 지상 25~29층 혼합(가운데 동이 가장 높음), 슬림한 판상 · 탑상 혼합, 동 사이 간격 넓게 |
| 외벽 | 린넨 화이트 패널(#EFE9DC) 바탕, 동 모서리마다 깊은 숲색(#24493A) 세로 핀, 옥상에 브라스색(#A77B3C) 가로 띠 조명(크라운) |
| 저층부 | 1~2층 밝은 석재, 필로티 일부, 정문은 낮은 수평 캐노피(목재 톤) |
| 조경 | 단지 가운데를 가로지르는 숲 산책로, 지상에 차 없음, 키 큰 소나무 · 단풍나무 · 낮은 관목 |
| 주변 | 북쪽: 낮은 숲 언덕과 초등학교 낮은 건물. 남동쪽: 넓은 도로와 먼 도시. 바다 · 강 · 큰 산 · 실존 랜드마크 없음 |
| 계절 | 늦봄~초여름(연한 초록), 모든 이미지 같은 계절 |

## 3. 촬영 규칙

**카메라**

- 조감도: 남서쪽 하늘에서 35° 내려다보기, 35mm
- 투시도: 눈높이 1.6m, 24mm, 세로선 똑바로
- 실내: 눈높이 1.2m, 20~24mm, 창은 화면 오른쪽, 세로선 똑바로

**빛과 시간**

- 주간: 오전 10시 부드러운 햇빛, 맑은 하늘에 얇은 구름
- 해 질 녘: 해 지고 20분 뒤 푸른 하늘, 창문 약 60%에 따뜻한 불빛(2700K)
- 실내: 남쪽 창으로 들어오는 자연광, 조명은 은은하게

**색 보정**

- 초록은 채도를 낮춰 #24493A 쪽으로, 밝은 곳은 따뜻한 린넨 톤
- 강조색은 브라스 한 가지. 청록 · 주황 과보정 금지
- 대비는 중간, 그림자는 너무 검지 않게

**실내 마감 (기본형 기준)**

- 밝은 오크 마루, 린넨 화이트 벽, 천장 높이 약 2.3m의 현실적인 비례
- 주방 하부장 무광 숲색, 상판 밝은 석재, 손잡이 브라스
- 실제 기본형보다 고급스러운 자재나 넓은 공간으로 연출하지 않습니다(부당 광고 우려)

## 4. 안전 영역 (어느 비율로 잘려도 보이도록)

- 사이트는 같은 사진을 21:9, 4:3, 가로 띠(약 3.5:1), 휴대폰 1:1 등으로 가운데를 기준으로 잘라 씁니다.
- 핵심 피사체(단지 전체, 정문, 거실 가구 배치)는 가로 가운데 55%, 세로 가운데 50% 안에 둡니다.
- 외관 사진의 가장자리(좌우 각 20%, 위아래 각 25%)에는 하늘 · 숲 · 길처럼 잘려도 되는 것만 둡니다.
- 휴대폰 홈 첫 화면은 세로 이미지 `aerial-day-m`을 따로 씁니다.

## 5. 샷 리스트와 두 사이트 적용 위치 (14장)

| 파일 | 원본 비율 · 크기 | A 결온 가람숲 | C 휘담 서림 더힐 | 화면에서 잘리는 모양 | 장면 |
|---|---|---|---|---|---|
| aerial-day | 16:9 · 2400×1350 | 홈 히어로(PC), 사업개요 머리 | 사업개요 머리, 홈 16:00 챕터, 단지안내 | 가로 띠, 4:3, 21:9 | 주간 조감도, 단지 전체와 북쪽 숲 언덕 |
| aerial-day-m | 9:16 · 1080×1920 | 홈 히어로(휴대폰 전용) | 쓰지 않음 | 휴대폰 세로 화면 | 같은 단지를 세로 구도로, 위 40% 하늘(글자 자리), 단지는 아래 60% |
| aerial-dusk | 16:9 · 2400×1350 | 분양안내 머리 | 홈 히어로, 브랜드 머리 | 21:9, 가로 띠 | 같은 구도의 해 질 녘, 크라운 조명과 창 불빛 |
| gate | 3:2 · 2400×1600 | 단지안내 머리, 조경 | 단지안내 머리, 홈 08:10 챕터 | 21:9, 4:3, 가로 띠 | 정문 투시도, 수평 캐노피와 숲 산책로 입구, 사람 2~3명 뒷모습 |
| park-walk | 16:9 · 2400×1350 | 브랜드 · 입지환경 머리, 조경 | 홈 06:40 챕터, 단지안내 | 4:3, 가로 띠 | 단지 중앙 숲 산책로, 아침 빛, 멀리 동 입구 |
| lounge | 4:3 · 2000×1500 | 단지안내 커뮤니티 | 홈 18:30 챕터, 휘담 클럽 | 4:3 | 커뮤니티 라운지(작은 도서관과 카페), 저녁 조명 |
| living-59a | 3:2 · 2400×1600 | 세대안내 59A, 홈 타입 탭 | 세대안내 59A, 홈 타입 카드 | 3:2, 4:3 | 59A 거실과 주방, 작은 가족 생활감 |
| living-74a | 3:2 · 2400×1600 | 세대안내 74A, 홈 타입 탭 | 세대안내 101A 연출 컷, 홈 카드 | 3:2, 4:3 | 74A 거실, 아이 방 문이 보이는 구도 (C에서는 101A 대용, 납품 전 교체) |
| living-84a | 3:2 · 2400×1600 | 세대안내 머리 · 84A, 홈 타입 탭 | 세대안내 84A, 홈 카드 | 3:2, 4:3, 가로 띠 | 84A 4Bay 거실, 맞통풍이 보이는 긴 시선 (실내 기준 컷) |
| kitchen-84a | 3:2 · 2400×1600 | 세대안내 84A · 84B | 세대안내 84A · 84B | 3:2 | 84㎡ 주방, 숲색 하부장과 브라스 손잡이 |
| bed-84a | 3:2 · 2400×1600 | 쓰지 않음 | 홈 22:00 챕터, 세대안내 59A · 101A | 4:3, 3:2 | 84A 안방, 밤 무드 조명 |
| alpha-84b | 3:2 · 2400×1600 | 세대안내 84B | 세대안내 84B, 홈 카드 | 3:2, 4:3 | 84B 알파룸 재택 공간, 책상과 책장 |
| gallery-ext | 16:9 · 2400×1350 | 쓰지 않음 | 휘담 갤러리 머리 | 21:9 | 홍보관 외관, 낮은 박공과 목재 루버, 간판 글자 없음, 해 질 녘 |
| gallery-int | 3:2 · 2400×1600 | 홍보관 머리 | 쓰지 않음 | 가로 띠 | 홍보관 내부, 단지 모형 테이블과 상담 라운지 |

## 6. 프롬프트

### 외관 공통 블록 (aerial-day, aerial-day-m, aerial-dusk, gate, park-walk, gallery-ext)

```
Photorealistic architectural CGI of a fictional Korean apartment complex.
Nine slim residential towers, 25 to 29 floors, the central tower tallest, generous spacing between towers.
Facade: warm linen-white panels (#EFE9DC), deep forest-green vertical fins at every tower corner (#24493A), a thin brass-colored horizontal light band at each rooftop crown (#A77B3C).
Podium: light natural stone on floors 1-2, partial pilotis, low horizontal wooden entrance canopy.
Landscape: a forest walking path crossing the center of the complex, no cars above ground, tall pines, maples and low shrubs.
Context: a low forested hill and a low-rise elementary school to the north, a wide road and distant city to the southeast. Late spring, soft fresh greens.
Color grading: muted forest greens, warm linen highlights, single brass accent, medium contrast, no teal-orange look.
Keep the main subject inside the central 55% width and central 50% height of the frame.
No text, no signage letters, no logos, no watermarks, no real landmarks, no sea or large mountains, no recognizable faces.
```

### 실내 공통 블록 (lounge, living-59a, living-74a, living-84a, kitchen-84a, bed-84a, alpha-84b, gallery-int)

```
Photorealistic interior CGI of a standard Korean apartment unit, realistic 2.3 m ceiling height and real-world proportions.
Light oak wooden floor, linen-white walls, matte deep forest-green lower kitchen cabinets (#24493A), light stone countertop, slim brass handles (#A77B3C).
Natural daylight from south-facing windows on the right side of the frame, soft ambient lighting, eye level 1.2 m, 20-24 mm lens, perfectly vertical lines.
Calm, tidy, lived-in but minimal styling. Same material palette in every room.
Keep the main furniture group inside the central 55% width and central 50% height of the frame.
No luxury exaggeration, no oversized spaces, no text, no logos, no watermarks, no people's faces.
```

### 장면 블록 (공통 블록 뒤에 붙임)

| 파일 | 장면 블록 |
|---|---|
| aerial-day | Aerial view from the southwest at 35° elevation, 35 mm, whole complex centered in the middle 55% of a 16:9 frame, sky and forest at the edges, 10 a.m. soft sunlight, clear sky with thin clouds. |
| aerial-day-m | Same complex and lighting as the reference image, vertical 9:16 composition: the whole complex in the lower 60% of the frame, calm open sky in the upper 40% with no objects, camera slightly lower than the reference. |
| aerial-dusk | Exactly the same camera position and composition as the reference image, blue hour 20 minutes after sunset, about 60% of windows lit warm 2700K, rooftop brass light bands glowing softly. |
| gate | Eye-level view (1.6 m, 24 mm) of the main gate with the low horizontal wooden canopy centered, the forest path entrance behind it, two or three residents seen from behind, morning light, 3:2. |
| park-walk | Eye-level view along the central forest walking path, path vanishing point in the center, dappled morning light, tower entrances in the distance, a parent and child seen from behind far away, 16:9. |
| lounge | Community lounge combining a small library and cafe seating, warm evening lighting, wooden shelves, large windows to the landscaped garden, no people, 4:3. |
| living-59a | Compact 59 m² living room and kitchen seen together, small family lived-in feeling, sofa and dining table centered, 3:2. |
| living-74a | 74 m² living room with an open door to a child's room visible, toys neatly stored, daylight, furniture centered, 3:2. |
| living-84a | Long view through a 4-bay living room toward the kitchen on the opposite side showing cross ventilation, sheer curtains moving slightly, 3:2. (interior master) |
| kitchen-84a | Kitchen of the same unit, matte forest-green lower cabinets with brass handles, light stone counter, window light, 3:2. |
| bed-84a | Master bedroom at night, warm low bedside light, calm and quiet mood, bed centered, window with distant soft city lights, 3:2. |
| alpha-84b | Small alpha room used as a home office, desk facing the window, bookshelf, daylight, 3:2. |
| gallery-ext | Exterior of a low sales gallery pavilion with a gentle gable roof and wooden louvers, no signage letters, dusk, landscaped entrance centered, 16:9. |
| gallery-int | Sales gallery interior with a large architectural model table in the center and a consultation lounge behind, warm neutral lighting, no people faces, 3:2. |

## 7. 작업 순서

1. 기준 외관: `aerial-day`를 여러 번 만들어 2장 단지 고정 설정에 가장 맞는 1장을 고르고 사용자 확인을 받습니다.
2. 외관 나머지: 기준 외관을 참조 이미지로 첨부하고 "same complex as the reference image" + 외관 공통 블록 + 장면 블록으로 `aerial-day-m`, `aerial-dusk`, `gate`, `park-walk`, `gallery-ext`를 만듭니다.
3. 기준 실내: `living-84a`를 만들어 사용자 확인을 받습니다.
4. 실내 나머지: 기준 실내를 첨부하고 "same material palette and lighting as the reference" + 실내 공통 블록 + 장면 블록으로 `living-59a`, `living-74a`, `kitchen-84a`, `bed-84a`, `alpha-84b`, `lounge`, `gallery-int`를 만듭니다.
5. 저장 · 전달: 샷 리스트의 파일 이름 그대로 저장해 드라이브 "생성 이미지" 폴더에 올리거나 사용자에게 전달합니다.
6. 적용(사이트 담당): WebP 변환(가로 2400px, 세로 이미지는 1080px, 품질 80, sRGB) 후 `concepts/realty-presale/images/`에 넣고 두 사이트를 다시 배포합니다.

## 8. 검수표

**일관성**

- 동 수 9개, 가운데 동이 가장 높은가
- 숲색 세로 핀과 브라스 크라운이 모든 외관에 있는가
- 계절 · 하늘 · 색 보정이 같은가
- 실내 마감(오크 마루, 숲색 하부장, 브라스 손잡이)이 모든 방에서 같은가

**표시 · 광고**

- 실제보다 넓거나 고급스럽게 보이지 않는가
- 없는 시설 · 조망 · 랜드마크가 들어가지 않았는가
- 글자 · 로고 · 워터마크 · 알아볼 수 있는 얼굴이 없는가
- 두 사이트 어디에 써도 어색하지 않은가(특정 브랜드 · 지역 단서 없음)

**파일**

- 파일 이름과 비율이 샷 리스트와 같은가
- 핵심 피사체가 안전 영역(가로 가운데 55%, 세로 가운데 50%) 안에 있는가
- 사이트 고지에 AI 생성 이미지임을 표기 (사이트가 자동 처리)
