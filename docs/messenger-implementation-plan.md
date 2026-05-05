# Messenger Implementation Plan (WS + HTTP, TanStack-only)

Last updated: 2026-05-04

## 1) Discovery & decisions

- [x] Перевірено live Swagger (`/api/v1/swagger-json`) для messenger-контрактів.
- [x] Підтверджені HTTP ендпоінти:
  - [x] `GET /api/v1/messenger`
  - [x] `GET /api/v1/messenger/{dialoguePartnerId}`
  - [x] `PUT /api/v1/messenger`
  - [x] `DELETE /api/v1/messenger/{id}`
- [x] Підтверджено: WS події не задокументовані в Swagger.
- [x] Підтверджено наявні WS події в коді:
  - [x] `message-send`
  - [x] `receive-message`
  - [x] `update-message`
  - [x] `message-deleted`
  - [x] `error`
- [x] Узгоджено архітектурні рішення:
  - [x] `partnerId` передаємо в messenger через query.
  - [x] Відправка повідомлення тільки через WS.
  - [x] `TanStack Query` only (без RTK Query).
  - [x] Пошук діалогів через `searchName` + debounce.
  - [x] Cursor pagination + infinite scroll вгору для повідомлень.
  - [x] Optimistic send (`sending` -> reconcile by `clientId`).
  - [x] Після reconnect робимо refetch dialogs + active chat.
  - [x] Порожнє повідомлення блокуємо на UI + transport guard.

## 2) Data layer (implementation)

- [x] Створити `features/messenger/api/messenger.api.ts`.
- [ ] Додати:
  - [x] `useDialogsInfiniteQuery(searchName)`
  - [x] `useMessagesInfiniteQuery(dialoguePartnerId)`
  - [x] `useUpdateMessagesStatusMutation()`
  - [x] `useDeleteMessageMutation()`
- [ ] Уніфікувати query keys:
  - [x] `['messenger','dialogs',{searchName}]`
  - [x] `['messenger','dialog',dialoguePartnerId]`
- [x] Створити `features/messenger/api/useMessengerSocket.ts` для realtime sync.

## 3) Navigation flow

- [x] Оновити кнопку `Send message` у профілі: `/messenger?partnerId=<id>`.
- [x] На messenger page читати `partnerId` з query.
- [x] Empty state, якщо `partnerId` відсутній.

## 4) Messenger UI

- [x] Ліва колонка: search + список чатів + unread badges.
- [x] Server search (`searchName`) з debounce 300-400ms.
- [x] Права колонка: header + messages list + composer.
- [x] Infinite scroll вгору для старіших повідомлень.

## 5) Send flow (WS-only)

- [x] Disable `Send message`, якщо `trim().length === 0`.
- [x] Guard перед `socket.emit` (не емiтити пустий текст).
- [x] Optimistic message зі статусом `sending`.
- [ ] Reconcile по `clientId` на `receive-message`.
- [x] Error handling (`failed` + retry).

## 6) Read status flow

- [x] На відкритті чату batch-mark вхідних непрочитаних через `PUT /api/v1/messenger`.
- [ ] Оновити локальний кеш unread стану.
- [x] Додати м'який retry на помилку.

## 7) Reconnect consistency

- [ ] На reconnect оновлювати токен у socket query.
- [x] Після reconnect: invalidate/refetch dialogs + active dialog.
- [ ] Захист від дублів (`id` + `clientId`).

## 8) QA checklist

- [ ] Сценарій: profile -> open chat -> send -> render.
- [ ] Сценарій: empty message blocked.
- [ ] Сценарій: search + pagination.
- [ ] Сценарій: reconnect consistency.
- [ ] Сценарій: infinite up без стрибка скролу.
- [ ] Сценарій: read status update.

## 9) Execution order

- [x] API hooks + keys
- [x] Messenger page query-flow
- [x] Dialogs list + search
- [x] Active dialog + infinite
- [x] WS sync
- [x] Composer + optimistic send
- [x] Read status
- [ ] Reconnect + QA
