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
- [x] 유저는 로그아웃할 수 있다.
  - [x] 로그아웃하면 `/` 루트 페이지로 돌아온다.

## 🎯🎯 step2

### 지하철역 관리 기능

- [x] 지하철역을 등록할 수 있다.
  - [x] 지하철역은 2글자 이상이어야 한다.
  - [x] 엔터키 또는 마우스 클릭으로 역을 추가할 수 있어야 한다.
  - [x] 지하철역의 이름은 최대 20자 이하이다.
  - [x] 중복된 지하철역은 추가할 수 없다.
- [x] 지하철역의 이름을 수정할 수 있다.
  - [x] 수정하는 UI는 modal을 이용하여 수정할 수 있게 한다.
- [x] 지하철역을 삭제할 수 있다.
  - [x] 삭제 시 confirm을 이용하여 한 번 더 유저가 확인할 수 있어야 한다.
  - [x] 이미 노선에 등록된 역인 경우 삭제할 수 없다.

### 지하철 노선 관리 기능

- [x] 지하철 노선을 등록할 수 있다.
  - [x] 지하철 노선의 이름은 2글자 이상이어야 한다.
  - [x] 중복된 지하철 노선 이름이 등록될 수 없다.
  - [x] 지하철 노선의 이름은 최대 10자 이하이다.
- [x] 지하철 노선을 수정 수 있다.
  - [x] 지하철 노선의 이름, 색상을 수정할 수 있다.
- [x] 지하철 노선을 삭제할 수 있다.
  - [x] 삭제 시 confirm을 이용하여 한 번 더 유저가 확인할 수 있어야 한다.

### 지하철 구간 관리 기능

- [x] 지하철 노선에 구간을 추가, 삭제할 수 있다.
- [x] 구간 조회 시, 노선을 변경하면 해당 노선의 Color로 Select 엘리먼트의 배경색을 변경한다.

## 🎯🎯🎯 step3

### 전체보기 기능

- [ ] 노선의 상행 종점부터 하행 종점까지 연결된 순서대로 노선과 역 목록을 조회할 수 있다.
- [ ] 조회를 위한 UI는 스스로 만든다.

<br>

[기능 목록 / 테스트 케이스](./docs/README.md)
