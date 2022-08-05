
-- `todolist-app`.`user` insert

INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-03 13:21:55.975', '2022-08-05 15:26:23.838', NULL, 1, '222@naver.com', 'admin', '1111', 'ADMIN', 0);
INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-03 13:23:18.050', '2022-08-05 15:26:23.848', NULL, 2, '123@naver.com', 'manager1', '1111', 'MANAGER', 0);
INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-03 13:23:20.303', '2022-08-05 15:26:23.850', NULL, 3, '1234@naver.com', 'manager2', '1111', 'MANAGER', 0);
INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-03 13:23:22.346', '2022-08-05 15:26:23.851', NULL, 4, 'user1@naver.com', 'user1', '1111', 'USER', 0);
INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-04 15:09:51.587', '2022-08-05 15:26:23.853', NULL, 5, 'user2@naver.com', 'user2', '1111', 'USER', 0);
INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-04 15:09:51.587', '2022-08-04 15:09:51.587', NULL, 6, 'user3@naver.com', 'user3', '1111', 'USER', 0);

-- `todolist-app`.`todo` insert

INSERT INTO `todolist-app`.todo
(createdAt, updatedAt, deletedAt, id, content, status, userId)
VALUES('2022-08-05 15:36:47.860', '2022-08-05 15:38:40.258', NULL, 1, '할 일1', 'NOT_DONE', 1);
INSERT INTO `todolist-app`.todo
(createdAt, updatedAt, deletedAt, id, content, status, userId)
VALUES('2022-08-05 15:36:47.860', '2022-08-05 15:36:47.860', NULL, 2, '할 일2', 'NOT_DONE', 2);
INSERT INTO `todolist-app`.todo
(createdAt, updatedAt, deletedAt, id, content, status, userId)
VALUES('2022-08-05 15:36:47.860', '2022-08-05 15:36:47.860', NULL, 3, '할 일3', 'NOT_DONE', 2);
INSERT INTO `todolist-app`.todo
(createdAt, updatedAt, deletedAt, id, content, status, userId)
VALUES('2022-08-05 15:36:47.860', '2022-08-05 15:36:47.860', NULL, 4, '할 일4', 'NOT_DONE', 2);
INSERT INTO `todolist-app`.todo
(createdAt, updatedAt, deletedAt, id, content, status, userId)
VALUES('2022-08-05 15:36:47.860', '2022-08-05 15:36:47.860', NULL, 5, '할 일5', 'NOT_DONE', 3);
INSERT INTO `todolist-app`.todo
(createdAt, updatedAt, deletedAt, id, content, status, userId)
VALUES('2022-08-05 15:36:47.860', '2022-08-05 15:36:47.860', NULL, 6, '할 일6', 'NOT_DONE', 3);
INSERT INTO `todolist-app`.todo
(createdAt, updatedAt, deletedAt, id, content, status, userId)
VALUES('2022-08-05 15:36:47.860', '2022-08-05 15:36:47.860', NULL, 7, '할 일7', 'NOT_DONE', 3);
INSERT INTO `todolist-app`.todo
(createdAt, updatedAt, deletedAt, id, content, status, userId)
VALUES('2022-08-05 15:36:47.860', '2022-08-05 15:36:47.860', NULL, 8, '할 일8', 'NOT_DONE', 3);
INSERT INTO `todolist-app`.todo
(createdAt, updatedAt, deletedAt, id, content, status, userId)
VALUES('2022-08-05 15:36:47.860', '2022-08-05 15:36:47.860', NULL, 9, '할 일9', 'NOT_DONE', 4);
INSERT INTO `todolist-app`.todo
(createdAt, updatedAt, deletedAt, id, content, status, userId)
VALUES('2022-08-05 15:36:47.860', '2022-08-05 15:36:47.860', NULL, 10, '할 일10', 'NOT_DONE', 5);
INSERT INTO `todolist-app`.todo
(createdAt, updatedAt, deletedAt, id, content, status, userId)
VALUES('2022-08-05 15:36:47.860', '2022-08-05 15:36:47.860', NULL, 11, '할 일11', 'NOT_DONE', 5);
INSERT INTO `todolist-app`.todo
(createdAt, updatedAt, deletedAt, id, content, status, userId)
VALUES('2022-08-05 15:36:47.860', '2022-08-05 15:36:47.860', NULL, 12, '할 일12', 'NOT_DONE', 5);
