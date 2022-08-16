# Todolist - issue

## 📌 @CreateDateColumn, @UpdateDateColumn `null`  로 입력되는 현상

---

[TypeORM CreateDateColumn 데코레이터와 value transformer 문제 | Jake Son Blog](https://jbl428.github.io/2021/12/09/typeorm-transformer/)

- ~~@BeforeInsert, @BeforeUpdate 사용해서 처리~~
- 🚨 queryBuilder로 사용할 경우, 직접 updatedAt에 세팅해줘야 함
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

[monorepo-nestjs-typeorm/base-time.entity.ts at da83faabce42ac8521203e19df5df928b3fa4b4d · jojoldu/monorepo-nestjs-typeorm](https://github.com/jojoldu/monorepo-nestjs-typeorm/blob/da83faabce/libs/entity/src/domain/BaseTimeEntity.ts)

## 📌 typeorm-seeding 의 typeORM 0.3 version  미지원

---

seedling 할 때 상당히 편할 것으로 보임

github에 0.3에 맞춰 개발 중이라고 하니 기다려봐야 할 듯

급한대로 dummy data insert sql문 저장

## 📌 회원가입 validation

---

1. class-validator 사용해 validator 데코레이터 작성
    - `src/users/dto/sign-up.request.dto.ts`

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

- 참조
    - [Nest.js Step-by-Step: Part 3 (Users and Authentication)
      ](https://www.codemag.com/Article/2001081/Nest.js-Step-by-Step-Part-3-Users-and-Authentication)

## 📌 프로젝트 구조 변경

### 1. Application Module Layer, Web Module Layer 분리

```text
users
├── application : domain에 집중해 로직 위주의 코드
│   ├── dto
│   └── entity
└── web : web에 특화된 코드 - application dir.을 주입받아 사용
    ├── parameters 
    ├── pipes
    ├── request
    └── response
```

### 2. CQRS (Command, Query Resource Segregation) 개념 적용

- command : Create, Update, Delete를 담당하는 service 분리
    - e.g. `user.command.service.ts`
- Query: Read 담당 service 분리
    - e.g. `user.query.service.ts`

- 흐름
    1. interface 구현
    2. interface 구현체 구현

- users.service.ts에서는 위의 두 service의 구현체를 주입받아 사용

---
## 📌 Interceptor 적용
### 1. Logging Time Interceptor 적용

### 2. Transform Response Entity Interceptor 적용
- controller에서 반환하는 데이터를 ResponseEntity로 wrapping 해주는 역할
- controller의 반환값 존재 여부에 따라 분기 처리

---
## 📌Command 로직 반환값 정의
1. create: 생성한 entity 반환
2. update: 생성한 entity 반환
3. delete: 성공 여부 반환 -> response entity에 일임

---
## 📌 Project Path Alias for typescript, jest
[참조_ALAIS in NEST](https://velog.io/@modolee/nestjs-path-alias-feat-typeorm-jest)
- typescript: tsconfig.json 수정
- jest: package.json 내 json 속성 수정

## ⚠️ TODO

- [x] ResponseEntity로 감싸기
- [x] swagger? 문서화 도구 공부
- [x] 로그인 기능 구현 - jwt
- [x] Transaction 처리
- [X] deleteAt: soft delete 시 매번 조건절에 걸어야 하는지 확인
    - createQueryBuilder 로 조회 시, typeorm이 아래 조건 추가해줌
      ```sql
      `deletedAt` IS NULL
      ```
- [ ] validation 공통화 고민
    - Global pipe 적용 (class-validate)
- [ ] 효율적인 project 구조 연습
    - web, app 단위 분리
    - service (CQRS) 적용
        - Toto:: interface 호출하도록 수정해야 함
- [ ] user role에 따른 권한 기능 구현
    - passport 사용
- [ ] 로그 저장 방법 고민
    - file system
- [ ] Date 날짜 type 다루는 방법 고민
    - joda-js 형변환 시점 고민

- [ ] todos-user 관계에서 user.password 가져오지 않는 방법
  - AS-IS: `User` 객체에서 일일히 `password` property 삭제
    - query는 직접 query 작성
- [ ] 로그인 이슈
    - [ ] FE에서 bearer token 다루는 법 공부
    - [ ] todo.service > getTodosByUserId 반환할 때, user.password 담기지 않도록 처리
- JWT (FE 공통)
  - [ ] Refresh Token 적용
- [ ] PK Entity column D/T bigint로 전환해야 하는지 고민
- [ ] TEST 코드 작성

------


Logging

- Application이 단일할 경우
- Application이 언제든 Scale Out이 될 수 있는 경우
    - 로그 수집기 (FluentD)
    - Message Queue (RabbitMQ, Kafka, )
    - Storage( RDB, MongoDB, Elastic Search, ...)

------

Session Table

| userId | loggedAt |token | createdAt |
|--------| -------- |--|-------------------|
| 1 | 2022/01/01 12:00:00 | uuid() | 2022/01/01 12:00:00 |

-------

Redis Cache

redis = {}

[key : value]

[userId : token] <= ttl(Time - To - Live)

const token = redisCache.getByUserId(1)
if(token) {
const milliseconds = redisCache.checkTTL(1)
if((milliseconds * 1000) < 60 ) {
const newToken = createToken()
redisCache.set(1, newToken)

}
return true;
} else {
return false;
}


--------------------------
User - 회원가입

```typescript
import { LocalDateTime } from 'js-joda';

export class User {
  private constructor() {
  }

  static createNewUser({ name, age }: { name: string, age: number }) {
    this.createdAt = LocalDateTime.now();
  }
}

export interface QueryUserSchema {
  name: string;
  age: number;
  email: string;
  createdAt: LocalDateTime;
}

export class DefaultUserQuery {
  private name: string;
  private age: number;
  private createdAt: LocalDateTime;

  constructor(queryUserSchema: QueryUserSchema) {
    this.name = name;
    this.age = age;
    this.createdAt = convertTo(createdAt, Timzone);
  }

  toJSON() {
    return {
      name: name,
      age: age,
      createdAt: convert(this.createdAt, `yyyy-MM-dd HH:mm:dd`)
    }
  }
}

const user = User.createNewUser()


this.repository.save(user);

```

