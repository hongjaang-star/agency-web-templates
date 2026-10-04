최초 1회 이관 작업.
1. https://github.com/hongjaang-star/medical-dermatology 를 templates/medical-dermatology/lumiere/ 로,
   https://github.com/hongjaang-star/pro-tax-office 를 templates/pro-tax-office/trust/ 로 가져온다(.git, node_modules, .github 제외).
2. 각 앱의 .github/workflows 는 쓰지 않는다. 루트 .github/workflows/deploy.yml 이 모든 앱을 빌드한다.
3. 두 앱이 루트 워크플로로 빌드되는지 확인한다(npm ci, npm run build, basePath 환경변수).
4. registry/sites.json 의 두 사이트 정보를 확인·보완한다.
5. 브랜치 chore/migrate 로 PR을 열고, 병합 후 주소를 PR 본문에 적는다:
   https://hongjaang-star.github.io/agency-web-templates/
