## 개요

- 프로젝트 이름 : TIL 블로그
- 목적 : til 마크다운 파일을 블로그로 만들어서 내용 검색이 가능하게 관리하기 위함.
- 현재 til 문제점
  - til 을 작성하고, 내용을 검색 하기가 어려워서 회고 위주로만 작성을 하게 됨
  - 그래서 문제해결한 경험이나, 해결방법을 적는 빈도가 줄어들어서 영양가 있는 til작성을 잘 안하게 됨
  - 카테고리 분류가 안되있어서 카테고리별 검색이 어려움

## Blog

- 개발환경 : Nextjs
- 브라우저 랜더링 방식 : SSH(블로그 페이지), SSR(검색 페이지)
- 작동
  - 프론트 서버 : 마크다운 파일 -> ssr|ssh 방식으로 html 파일 생성
  - 브라우저 : html 파일 랜더링

## 개선방안

- header 에 카테고리를 넣고 다양한 회고, 문제해결 내용을 올려야함.
- category 가 늘어나면 카테고리별 검색 기능도 추가
- 마크다운 파일로 간단하게 til 작성 blog 로 간단하게 검색
- 수정 및 작성 기능을 추가 할 필요가 있는지 고민
