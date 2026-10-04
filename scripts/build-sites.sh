#!/usr/bin/env bash
# templates/*/* 의 모든 앱을 각각 독립적으로 빌드해 _site/{slug}/{variant}/ 로 모은다.
# 워크플로와 로컬(npm run build:sites)이 같은 스크립트를 쓴다.
#   BASE_ROOT   주소 접두어 (기본 /agency-web-templates)
#   SITE_ORIGIN 도메인만. 앱의 absoluteUrl() 이 SITE_ORIGIN + basePath 로 조합한다
set -euo pipefail
BASE_ROOT=${BASE_ROOT:-/agency-web-templates}
SITE_ORIGIN=${SITE_ORIGIN:-https://hongjaang-star.github.io}
mkdir -p _site
for app in templates/*/*/; do
  [ -f "$app/package.json" ] || continue
  rel=${app#templates/}; rel=${rel%/}
  echo "::group::$rel"
  (cd "$app" && npm ci --no-audit --no-fund && NEXT_PUBLIC_NOINDEX=1 NEXT_PUBLIC_BASE_PATH="$BASE_ROOT/$rel" NEXT_PUBLIC_SITE_URL="$SITE_ORIGIN" npm run build)
  rm -rf "_site/$rel" && mkdir -p "_site/$rel" && cp -r "$app/out/." "_site/$rel/"
  echo "::endgroup::"
done
