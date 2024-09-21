import { createStore, createEvent } from "effector";

const app = document.getElementById("app");

// 1

const addNumber = createEvent();

const $store = createStore(0).on(addNumber, (state, number) => state + number);

$store.watch((state) => {
  app.textContent = state;
});

addNumber(10);

// 2

const extractPartOfArray = createEvent();

const array = createStore([]).on(extractPartOfArray, (_, arr) => arr.slice(2));

array.watch((part) => {
  console.log(part);
});

extractPartOfArray([1, 2, 3, 4, 5]); // 3, 4, 5

// 3 map(fn)

const updateUser = createEvent();
const userNameUpdated = updateUser.map(({ name }) => name);
const userRoleUpdated = updateUser.map(({ role }) => role.toUpperCase());

userNameUpdated.watch((name) =>
  console.log(`Имя пользователя изменено на ${name}`)
);
userRoleUpdated.watch((role) =>
  console.log(`Роль пользователя изменена на ${role}`)
);

updateUser({ name: "john", role: "admin" });

// 4 prepend(fn)

const userPropertyChanged = createEvent();

userPropertyChanged.watch(({ field, value }) => {
  console.log(`Свойство пользователя "${field}" изменено на ${value}`);
});

const changeName = userPropertyChanged.prepend((name) => ({
  field: "name",
  value: name,
}));
const changeRole = userPropertyChanged.prepend((role) => ({
  field: "role",
  value: role.toUpperCase(),
}));

changeName("john");
// => Свойство пользователя "name" изменено на john

changeRole("admin");
// => Свойство пользователя "role" изменено на ADMIN

changeName("alice");
// => Свойство пользователя "name" изменено на alice