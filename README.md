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

## 🧩 step2 테스트 구현 목록
- [x] 지하철명을 작성후 확인 버튼을 누르면, 아래 목록에 추가된다.
- [x] 역의 '수정' 버튼을 누르면 모달창이 열린다
- [x] 모달창에 빈칸에 새로운 역명을 작성후 확인 버튼을 누르면, 해당 역명이 변경된다.
- [x] 역의 '삭제' 버튼을 누르면 confirm창 나오고 확인을 누르면 해당 역이 삭제된다.

- [ ] 노선 관리 버튼을 누르면 노선 관리 페이지로 이동한다
- [ ] 노선 추가 버튼을 누르면 모달창이 열린다
- [ ] 노선 이름, 상행역, 하행역, 상행역 거리, 상행 하행역 시간, 색상 선택을 하고 확인 버튼을 누르면, 노선 관리 목록에 색상과 노선 이름이 보여진다.
- [ ] 생성된 노선의 수정버튼을 눌러, 이름과 색깔을 변경하고 확인버튼을 누르면 변경된 노선 색상과 이름이 목록에 보여진다.

- [ ] 구간 관리 버튼을 누르면 구간 관리 페이지로 이동한다
- [ ] 관리할 호선 선택목록에서 호선을 선택하면, 해당 호선의 상행역, 하행역이 보여진다.
- [ ] 구간 추가 버튼을 누르면 구간 추가 모달창이 열린다
- [ ] 노선, 추가할 구간, 다음역, 두 역간의 거리, 두역간의 시간을 입력후 확인 버튼을 누르면, 선택한 위치에 해당역이 추가된다.
- [ ] 구간에 있는 역을 삭제하면 해당 역이 구간에서 삭제된다

- [ ] 노선 관리에서 호선 삭제버튼을 누르면 해당 노선이 삭제된다.



## 🎯 step2 구현 목록
1. **지하철역 관리 기능**
   - [x] 지하철 역을 등록할 수 있다.
     - [x] 지하철 역은 2글자 이상이어야 한다.
     - [x] 엔터키 또는 마우스 클릭으로 역을 추가할 수 있어야 한다.
     - [x] 지하철 역의 이름은 최대 20자 이하이다.
     - [x] 중복된 지하철 역은 추가할 수 없다.
   - [x] 지하철 역의 이름을 수정할 수 있다.
     - [x] 수정하는 ui는 modal을 이용하여 수정한다.
     - [x] 수정 ui는 직접 구현한다.
   - [x] 지하철 역을 삭제할 수 있다.
     - [x] 삭제 시 confirm을 이용하여 한번 더 유저가 확인할 수 있어야 한다.
     - [x] 이미 노선에 등록된 역인 경우 삭제할 수 없다.
     - [x] 지하철 역 리스트를 조회할 수 있다.

<br>

2. **지하철 노선 관리 기능**
   - [x] 지하철 노선을 등록할 수 있다.
     - [x] 지하철 노선의 이름은 2글자 이상이어야 한다.
     - [x] 중복된 지하철 노선 이름이 등록될 수 없다.
     - [x] 지하철 노선의 이름은 최대 10자 이하이다.
     - [x] 지하철 노선 생성시 필요한 값은 색상, 상행역, 하행역, (최초 상행역과 하행역 구간의)거리, 시간이다.
   - [x] 지하철 노선 수정
     - [x] 지하철 노선의 이름, 상행역, 하행역, 거리, 시간, 색상을 수정할 수 있다.
   - [x] 지하철 노선을 삭제할 수 있다.
   - [x] 지하철 노선 리스트를 조회할 수 있다.
  
  <br>

3. **지하철 구간 관리 기능**
   - [x] 지하철 노선에 구간을 추가, 삭제할 수 있다.
     - [x] 지하철 노선에 구간을 추가하는 기능은 노선에 역을 추가하는 기능이라고도 할 수 있다.
     - [x] 역과 역사이를 구간이라 하고 이 구간들의 모음이 노선이다.
     - [x] 하나의 역은 여러개의 노선에 추가될 수 있다.
     - [x] 역과 역 사이에 새로운 역이 추가 될 수 있다.
     - [x] 노선에서 갈래길은 생길 수 없다.
   - [x] 구간 조회시, 노선을 변경하면 해당 노선의 Color로 Select 엘리먼트의 배경색을 변경한다.
   - [ ] 
<br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-subway/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-subway/blob/main/LICENSE) licensed.
