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

- [x] ResponseEntity로 감싸기
- [ ] project 구조 연습
- [x] swagger? 문서화 도구 공부
- [ ] 로그인 기능 구현 - jwt
- [ ] user role에 따른 권한 기능 구현
- [ ] 로그 저장 방법 고민
- [ ] Date type 다루는 방법 고민