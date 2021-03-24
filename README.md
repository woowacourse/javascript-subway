<p align="middle" >
  <img width="200px;" src="./src/images/subway_emoji.png"/>
</p>
<h2 align="middle">level1 - 지하철 노선도 관리 SPA</h2>
<p align="middle">Browser History API를 이용해 구현하는 지하철 노선도 관리 SPA</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 🔥 Projects!

<p align="middle">
  <img src="./src/images/readme/subway_app_preview.png">
</p>

## 🎯 step1

### Webpack을 통한 번들링

- [x] Webpack에서 babel을 설정한다.
- [x] 기타 플러그인 및 설정은 본인이 필요에 따라 추가한다.

### 라우팅 기능

- [x] Browser History Api를 이용하여 SPA처럼 라우팅을 적용한다.

### 회원 기능

- [x] 유저는 회원 가입을 할 수 있다,
  - [x] 회원 가입시 받는 정보는 `email`, `name`, `password`이다.
- [x] 유저는 로그인 할 수 있다.
  - [x] 로그인하고 나면 로그인 버튼은 로그아웃 버튼으로 변경되어야 한다.
  - [x] 로그인한 유저만, 정보의 수정이 가능하다.
  - [x] 로그인하지 않은 유저가 기능에 접근했을 때는, 로그인이 필요하다는 안내를 보여준다.
- [x] 유저는 로그아웃할 수 있다.

  - [x] 로그아웃하고 나면 로그인 버튼으로 변경되어야 한다.

- [x] `access token`이 만료된 경우, 사용자를 로그아웃 시키고 로그인 화면으로 이동시킨다.
