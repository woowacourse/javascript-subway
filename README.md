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
  - [x] 회원 가입 시 받는 정보는 `email`, `name`, `password`이다.
  - [x] 회원 가입 시 중복된 이메일이 존재하면, 경고 문구를 표시한다.
  - [x] 회원 가입 시 email이 유효한 형식인지 검사한다.
  - [x] 회원 가입 시 입력한 비밀번호와 재입력한 비밀번호가 다르면, 경고 문구를 표시한다.
- [x] 유저는 로그인할 수 있다.
  - [x] 로그인하고 나면 로그인 버튼은 로그아웃 버튼으로 변경되어야 한다.
  - [x] 로그인한 유저만 정보의 수정 및 열람이 가능하다.
- [x] 유저는 로그아웃할 수 있다.
  - [x] 로그아웃하면 로그인 페이지로 돌아온다.

## 🎯🎯 step2

- [ ] 사이트에 접속했을 때, 기존 지하철 목록, 노선 목록을 불러와서 store에 저장한다.

### 지하철역 관리 기능

- [x] 지하철역을 등록할 수 있다.
  - [x] 지하철역은 2글자 이상이어야 한다.
  - [x] 엔터키 또는 마우스 클릭으로 역을 추가할 수 있어야 한다.
  - [x] 지하철역의 이름은 최대 20자 이하이다.
  - [x] 지하철역의 이름은 한글만 등록할 수 있다.
  - [x] 지하철역의 이름에는 공백이 포함될 수 없다.
  - [x] 중복된 지하철역은 추가할 수 없다.
    - [x] 기존 지하철 목록에 존재하는 경우 경고 메시지를 표시한다.
  - [x] 등록이 가능한 경우 API 생성 요청을 보낸다. (POST /stations);
- [x] 지하철역의 이름을 수정할 수 있다.
  - [x] 수정하는 UI는 modal을 이용하여 수정할 수 있게 한다.
- [x] 지하철역을 삭제할 수 있다.
  - [x] 삭제 시 confirm을 이용하여 한 번 더 유저가 확인할 수 있어야 한다.
  - [x] 이미 노선에 등록된 역인 경우 삭제할 수 없다.
    - [x] 기존 노선 목록에 존재하는 경우 삭제하지 않고, 경고 메시지를 표시한다.
  - [x] 삭제할 수 있는 경우 API 삭제 요청을 보낸다. (DELETE /stations/1)

### 지하철 노선 관리 기능

- [x] 지하철 노선을 등록할 수 있다.
  - [x] 지하철 노선의 이름은 2글자 이상이어야 한다.
  - [x] 중복된 지하철 노선 이름이 등록될 수 없다.
  - [x] 지하철 노선의 이름은 최대 10자 이하이다.
  - [x] 지하철 노선 생성시 필요한 값은 색상, 상행역, 하행역, (최초 상행역과 하행역 구간의)거리, 시간이다.
- [x] 지하철 노선을 수정할 수 있다.
  - [x] 지하철 노선의 이름, (상행역, 하행역, 거리, 시간), 색상을 수정할 수 있다.
- [x] 지하철 노선을 삭제할 수 있다.
  - [x] 삭제 시 confirm을 이용하여 한 번 더 유저가 확인할 수 있어야 한다.

### 지하철 구간 관리 기능

- [ ] 지하철 노선에 구간을 추가, 수정, 삭제할 수 있다.
  - [ ] 하나의 역은 여러개의 노선에 추가될 수 있다.
  - [ ] 역과 역 사이에 새로운 역이 추가 될 수 있다.
  - [ ] 노선에서 갈래길은 생길 수 없다.
  - [x] 지하철 노선을 삭제할 수 있다.
- [ ] 구간 조회 시, 노선을 변경하면 해당 노선의 Color로 Select 엘리먼트의 배경색을 변경한다.

## 🎯🎯🎯 step3

### 전체보기 기능

- [ ] 노선의 상행 종점부터 하행 종점까지 연결된 순서대로 노선과 역 목록을 조회할 수 있다.
- [ ] 조회를 위한 UI는 스스로 만든다.

### 길찾기 기능

- [ ] 출발역과 도착역을 입력받아 경로를 조회한다.
- [ ] 경로 조회 시 총 거리, 총 소요 시간을 함께 출력한다.
- [ ] 경로 조회 시 최단 거리 또는 최소 시간 옵션을 선택할 수 있다.
- [ ] 길 찾기를 위한 UI는 스스로 만든다.

<br>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-subway/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-subway/blob/main/LICENSE) licensed.
