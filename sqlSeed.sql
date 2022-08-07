
-- `todolist-app`.`user` insert

INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-07 06:37:19.509', '2022-08-07 06:37:19.509', NULL, 1, 'admin@gmail.com', 'admin', '$2a$10$D1x9Gj0tBBSD4j2eat9.xOEIURBuow59walu5fXckJiXibNRNLxuW', 'admin', 0);
INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-07 06:37:34.803', '2022-08-07 06:37:34.803', NULL, 2, 'admin1@gmail.com', 'admin1', '$2a$10$YDd9A5B4L3RMxINxxlngwuEFSS5/nucqCuOLCeHV.9R2HcEi5tr1W', 'admin', 0);
INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-07 06:37:47.690', '2022-08-07 06:37:47.690', NULL, 3, 'manager@gmail.com', 'manager', '$2a$10$r48KRJ0knTl.EtbHAPhIsekoZxT.IIUX7MrqxQtzrWoejTpOe69R6', 'manager', 0);
INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-07 06:37:58.868', '2022-08-07 06:37:58.868', NULL, 4, 'manager1@gmail.com', 'manager1', '$2a$10$rUZgS5NfoJUv5R27KPhK5ekc2pQ4Bf5cmtdSNPBh7slydDYbIm0rW', 'manager', 0);
INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-07 06:38:06.249', '2022-08-07 06:38:06.249', NULL, 5, 'manager2@gmail.com', 'manager2', '$2a$10$FKnsNIq/CJrMUhKM4N0Fwu1GHdO/g5m8aViomngbseAW.Tt4l5tqW', 'manager', 0);
INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-07 06:38:16.589', '2022-08-07 06:38:16.589', NULL, 6, 'user@gmail.com', 'user', '$2a$10$ns1uWnCdPoylfPoYC.rO8eHZB8wkTQNmBwy.0bmgSJl230w5pX/Ca', 'user', 0);
INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-07 06:38:24.239', '2022-08-07 06:38:24.239', NULL, 7, 'user2@gmail.com', 'user2', '$2a$10$IrK0.owC/K2xltSYFjOgW.qy.BBKbwCIOZBvtXN8g//OK9TIJmUdm', 'user', 0);
INSERT INTO `todolist-app`.`user`
(createdAt, updatedAt, deletedAt, id, email, name, password, `role`, isBlackUser)
VALUES('2022-08-07 06:38:31.253', '2022-08-07 06:38:31.253', NULL, 8, 'user3@gmail.com', 'user3', '$2a$10$1OBSZQ9Va3aeGgmfcGNm5Oyi1UvzwT6GcouVM.P/al4qEhEnLztwe', 'user', 0);

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
