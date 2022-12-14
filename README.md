# Todolist - issue

## ๐ย @CreateDateColumn, @UpdateDateColumn `null`  ๋ก ์๋ ฅ๋๋ ํ์

---

[TypeORM CreateDateColumn ๋ฐ์ฝ๋ ์ดํฐ์ value transformer ๋ฌธ์  | Jake Son Blog](https://jbl428.github.io/2021/12/09/typeorm-transformer/)

- ~~@BeforeInsert, @BeforeUpdate ์ฌ์ฉํด์ ์ฒ๋ฆฌ~~
- ๐จ queryBuilder๋ก ์ฌ์ฉํ  ๊ฒฝ์ฐ, ์ง์  updatedAt์ ์ธํํด์ค์ผ ํจ
- ์๋ง ์๋์ js-joda ์ฌ์ฉ์ ์ํ transformer ๊ฐ ์์ธ์ธ ๋ฏ

## ๐ย Date ํ์์ js-joda๋ก ๋์ฒดํ๊ธฐ

---

[js-joda ๋ก TypeORM Date ํ์ ๋์ฒดํ๊ธฐ (with NestJS)](https://jojoldu.tistory.com/600)

- ์ด๊ฑฐ ์ ์ฉํ๋ฉด @CreatedDateColumn ํ์ ๋ค ์ ์ฉ ์๋๋ ๊ฒ ๊ฐ์
- ํธ์ถ๋๋ ์์๊ฐ ์๊ฐ๋ณด๋ค ๋น ๋ฅธ ๋ฏโฆ
- ์ผ๋จ ์ ์ฉ X

## ๐ย  Swagger ์ ์ฉ

---

- ์ ๋ก์ด๋ ๊ฐ์ ์ฐธ๊ณ 

## ๐ย ResponseEntity<T> ๋ก ๊ฐ์ธ๊ธฐ

---

- ํฅ๋ก๋ github๋ณด๊ณ  ์์ฑ

[monorepo-nestjs-typeorm/base-time.entity.ts at da83faabce42ac8521203e19df5df928b3fa4b4d ยท jojoldu/monorepo-nestjs-typeorm](https://github.com/jojoldu/monorepo-nestjs-typeorm/blob/da83faabce/libs/entity/src/domain/BaseTimeEntity.ts)

## ๐ typeorm-seeding ์ typeORM 0.3 version  ๋ฏธ์ง์

---

seedling ํ  ๋ ์๋นํ ํธํ  ๊ฒ์ผ๋ก ๋ณด์

github์ 0.3์ ๋ง์ถฐ ๊ฐ๋ฐ ์ค์ด๋ผ๊ณ  ํ๋ ๊ธฐ๋ค๋ ค๋ด์ผ ํ  ๋ฏ

๊ธํ๋๋ก dummy data insert sql๋ฌธ ์ ์ฅ

## ๐ย ํ์๊ฐ์ validation

---

1. class-validator ์ฌ์ฉํด validator ๋ฐ์ฝ๋ ์ดํฐ ์์ฑ
    - `src/users/dto/sign-up.request.dto.ts`

1. ํ๋ผ๋ฏธํฐ `ValidationPipe` ์์ฑ
    - `src/users/users.controller.ts`

1. password ์ํธํ
    - lib: bcryptjs ์ค์น
    - bycryptjs ๋ฅผ ์ฌ์ฉํด ์ํธํ ํ password save
        - salt + password ํํ๋ก ์ ์ฅ

## ๐ย ๋ก๊ทธ์ธ ๊ธฐ๋ฅ ๊ตฌํ

---

1. ์ค์น Lib.
    - @nestjs/jwt
    - @nestjs/passport
    - passport-jwt
    - passport
    - @types/passport-jwt
2. ๋ก๊ทธ์ธ ๊ธฐ๋ฅ ๊ตฌํ
    1. jwt.strategy.ts ๊ตฌํ
    2. auth.module.ts ์ `PassportModule`, `JwtModule` ๋ชจ๋ import
    3. ๊ฐ ๋ชจ๋์ AuthModule import
        1. ์ํ ์ฐธ์กฐ๋ฅผ ๋๊ธฐ ์ํด *`forwardRef()` ์ฌ์ฉ*

           [NestJS circular dependency ๋ฌธ์  ํด๊ฒฐ](https://velog.io/@peter0618/NestJs-circular-dependency-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0)

    4. controller ๋ ๋ฒจ๋ก `@UseGuards(AuthGuard())` ์์ฑ

3. `@GetUser()` ๋ฐ์ฝ๋ ์ดํฐ ์์ฑ ๋ฐ ์ ์ฉ

- ์ฐธ์กฐ
    - [Nest.js Step-by-Step: Part 3 (Users and Authentication)
      ](https://www.codemag.com/Article/2001081/Nest.js-Step-by-Step-Part-3-Users-and-Authentication)

## ๐ ํ๋ก์ ํธ ๊ตฌ์กฐ ๋ณ๊ฒฝ

### 1. Application Module Layer, Web Module Layer ๋ถ๋ฆฌ

```text
users
โโโ application : domain์ ์ง์คํด ๋ก์ง ์์ฃผ์ ์ฝ๋
โย ย  โโโ dto
โย ย  โโโ entity
โโโ web : web์ ํนํ๋ ์ฝ๋ - application dir.์ ์ฃผ์๋ฐ์ ์ฌ์ฉ
    โโโ parameters 
    โโโ pipes
    โโโ request
    โโโ response
```

### 2. CQRS (Command, Query Resource Segregation) ๊ฐ๋ ์ ์ฉ

- command : Create, Update, Delete๋ฅผ ๋ด๋นํ๋ service ๋ถ๋ฆฌ
    - e.g. `user.command.service.ts`
- Query: Read ๋ด๋น service ๋ถ๋ฆฌ
    - e.g. `user.query.service.ts`

- ํ๋ฆ
    1. interface ๊ตฌํ
    2. interface ๊ตฌํ์ฒด ๊ตฌํ

- users.service.ts์์๋ ์์ ๋ service์ ๊ตฌํ์ฒด๋ฅผ ์ฃผ์๋ฐ์ ์ฌ์ฉ

---

## ๐ Interceptor ์ ์ฉ

### 1. Logging Time Interceptor ์ ์ฉ

### 2. Transform Response Entity Interceptor ์ ์ฉ

- controller์์ ๋ฐํํ๋ ๋ฐ์ดํฐ๋ฅผ ResponseEntity๋ก wrapping ํด์ฃผ๋ ์ญํ 
- controller์ ๋ฐํ๊ฐ ์กด์ฌ ์ฌ๋ถ์ ๋ฐ๋ผ ๋ถ๊ธฐ ์ฒ๋ฆฌ

---

## ๐Command ๋ก์ง ๋ฐํ๊ฐ ์ ์

1. create: ์์ฑํ entity ๋ฐํ
2. update: ์์ฑํ entity ๋ฐํ
3. delete: ์ฑ๊ณต ์ฌ๋ถ ๋ฐํ -> response entity์ ์ผ์

---

## ๐ Project Path Alias for typescript, jest

[์ฐธ์กฐ_ALAIS in NEST](https://velog.io/@modolee/nestjs-path-alias-feat-typeorm-jest)

- typescript: tsconfig.json ์์ 
- jest: package.json ๋ด json ์์ฑ ์์ 

## โ ๏ธ TODO

- [x] ResponseEntity๋ก ๊ฐ์ธ๊ธฐ
- [x] swagger? ๋ฌธ์ํ ๋๊ตฌ ๊ณต๋ถ
- [x] ๋ก๊ทธ์ธ ๊ธฐ๋ฅ ๊ตฌํ - jwt
- [x] Transaction ์ฒ๋ฆฌ
- [X] deleteAt: soft delete ์ ๋งค๋ฒ ์กฐ๊ฑด์ ์ ๊ฑธ์ด์ผ ํ๋์ง ํ์ธ
    - createQueryBuilder ๋ก ์กฐํ ์, typeorm์ด ์๋ ์กฐ๊ฑด ์ถ๊ฐํด์ค
      ```sql
      `deletedAt` IS NULL
      ``
- [X] Custom Repository ๊ฑท์ด๋ด๊ธฐ - ํธํ Unit Test๋ฅผ ์ํด
    - ๊ฐ์ ์ด์ ๋ก Service ๋ ์ด์ด์์๋ ๊ฐ์ Service ๋ ์ด์ด ์์กด ์ง์
- [X] validation ๊ณตํตํ ๊ณ ๋ฏผ
    - Global pipe ์ ์ฉ (class-validate)
- [X] ํจ์จ์ ์ธ project ๊ตฌ์กฐ ์ฐ์ต
    - web, app ๋จ์ ๋ถ๋ฆฌ
    - service (CQRS) ์ ์ฉ
        - Toto:: interface ํธ์ถํ๋๋ก ์์ ํด์ผ ํจ โ
- [X] `todo.service` > `getTodosByUserId` ๋ฐํํ  ๋, `user.password` ๋ด๊ธฐ์ง ์๋๋ก ์ฒ๋ฆฌ
  - Entity์์ `@Column` ๋ฐ์ฝ๋ ์ดํฐ select ์ต์์ผ๋ก ์ฒ๋ฆฌ
  - ๋ฐ๋๋ก ์ค์  ์กฐํ๋ฅผ ์ํด์๋ queryBuilder๋ก select์  ์ปฌ๋ผ ๋ช์ํด์ผ ํจ
- [X] PK Entity column D/T bigint๋ก ์ ํํด์ผ ํ๋์ง ๊ณ ๋ฏผ
- bigint ์ ์ฉ ์ฝ๊ฒ ๋๋๋ฏ
- Dto์ `toJson()` ๊ตฌํ
- [ ] user role์ ๋ฐ๋ฅธ ๊ถํ ๊ธฐ๋ฅ ๊ตฌํ
    - passport ์ฌ์ฉ
- [ ] ๋ก๊ทธ ์ ์ฅ ๋ฐฉ๋ฒ ๊ณ ๋ฏผ
    - file system
- [ ] Date ๋ ์ง type ๋ค๋ฃจ๋ ๋ฐฉ๋ฒ ๊ณ ๋ฏผ
    - joda-js ํ๋ณํ ์์  ๊ณ ๋ฏผ

- [ ] todos-user ๊ด๊ณ์์ user.password ๊ฐ์ ธ์ค์ง ์๋ ๋ฐฉ๋ฒ
    - AS-IS: `User` ๊ฐ์ฒด์์ ์ผ์ผํ `password` property ์ญ์ 
        - query๋ ์ต๋ํ queryBuilder ์ฌ์ฉํํ์
- [ ] ๋ก๊ทธ์ธ ์ด์
    - [X] FE์์ bearer token ๋ค๋ฃจ๋ ๋ฒ ๊ณต๋ถ
        - axios instance์ header ์ค์ 
- JWT (FE ๊ณตํต)
    - [ ] Refresh Token ์ ์ฉ

- [ ] ๐ฅ TEST ์ฝ๋ ์์ฑ

------


Logging

- Application์ด ๋จ์ผํ  ๊ฒฝ์ฐ
- Application์ด ์ธ์ ๋  Scale Out์ด ๋  ์ ์๋ ๊ฒฝ์ฐ
    - ๋ก๊ทธ ์์ง๊ธฐ (FluentD)
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
User - ํ์๊ฐ์

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

