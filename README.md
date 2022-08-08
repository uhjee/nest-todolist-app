# Todolist - issue

## 📌 @CreateDateColumn, @UpdateDateColumn `null`  로 입력되는 현상

---

[TypeORM CreateDateColumn 데코레이터와 value transformer 문제 | Jake Son Blog](https://jbl428.github.io/2021/12/09/typeorm-transformer/)

- ~~@BeforeInsert, @BeforeUpdate 사용해서 처리~~
- 🚨 queryBuilder로 사용할 경우, 직접 updatedAt에 세팅해줘야 함
- 아마 아래의 js-joda 사용을 위한 transformer 가 원인인 듯

## 📌 Date 타입을 js-joda로 대체하기

---

[js-joda 로 TypeORM Date 타입 대체하기 (with NestJS)](https://jojoldu.tistory.com/600)

- 이거 적용하면 @CreatedDateColumn 형제들 적용 안되는 것 같음
- 호출되는 순서가 생각보다 빠른 듯…
- 일단 적용 X

## 📌  Swagger 적용

---

- 제로초님 강의 참고

## 📌 ResponseEntity<T> 로 감싸기

---

- 향로님 github보고 작성

[monorepo-nestjs-typeorm/BaseTimeEntity.ts at da83faabce42ac8521203e19df5df928b3fa4b4d · jojoldu/monorepo-nestjs-typeorm](https://github.com/jojoldu/monorepo-nestjs-typeorm/blob/da83faabce/libs/entity/src/domain/BaseTimeEntity.ts)


## 📌 typeorm-seeding 의 typeORM 0.3 version  미지원

---

seedling 할 때 상당히 편할 것으로 보임

github에 0.3에 맞춰 개발 중이라고 하니 기다려봐야 할 듯

급한대로 dummy data insert sql문 저장

## 📌 회원가입 validation

---

1. class-validator 사용해 validator 데코레이터 작성
    - `src/users/dto/sign-up.dto.ts`

1. 파라미터 `ValidationPipe` 작성
    - `src/users/users.controller.ts`

1. password 암호화
    - lib: bcryptjs 설치
    - bycryptjs 를 사용해 암호화 후 password save
        - salt + password 형태로 저장

## 📌 로그인 기능 구현

---

1. 설치 Lib.
    - @nestjs/jwt
    - @nestjs/passport
    - passport-jwt
    - passport
    - @types/passport-jwt
2. 로그인 기능 구현
    1. jwt.strategy.ts 구현
    2. auth.module.ts 에 `PassportModule`, `JwtModule` 모듈 import
    3. 각 모듈에 AuthModule import
        1. 순환 참조를 끊기 위해 *`forwardRef()` 사용*

           [NestJS circular dependency 문제 해결](https://velog.io/@peter0618/NestJs-circular-dependency-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0)

    4. controller 레벨로 `@UseGuards(AuthGuard())` 작성

3. `@GetUser()` 데코레이터 생성 및 적용


## ⚠️ TODO

- [x] ResponseEntity로 감싸기
- [x] swagger? 문서화 도구 공부
- [x] 로그인 기능 구현 - jwt
- [x] Transaction 처리
- [ ] validation 공통화 고민
- [ ] 효율적인 project 구조 연습
- [ ] user role에 따른 권한 기능 구현
- [ ] 로그 저장 방법 고민
- [ ] Date 날짜 type 다루는 방법 고민
- [ ] deleteAt: soft delete 시 매번 조건절에 걸어야 하는지 확인
- [ ] todos-user 관계에서 user.password 가져오지 않는 방법
  - AS-IS: `User` 객체에서 일일히 `password` property 삭제
- [ ] FE에서 bearer token 다루는 법 공부
  - [ ] Refresh Token 적용
- [ ] PK Entity column D/T bigint로 전환해야 하는지 고민

