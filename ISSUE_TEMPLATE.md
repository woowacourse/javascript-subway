## 🤦🏻 이슈 내용

POST /members HTTP/1.1
Content-Type: application/json; charset=UTF-8
Host: localhost:42745
Content-Length: 96

{
"email" : "OTHER_login@email.com",
"password" : "OTHER_password",
"name" : "사용자"
}
HTTP/1.1 201 Created
Vary: Origin
Vary: Access-Control-Request-Method
Vary: Access-Control-Request-Headers
Location: /members/2
Date: Thu, 18 Mar 2021 18:30:48 GMT
Keep-Alive: timeout=60
Connection: keep-alive

## 🕵🏼 기대 결과
