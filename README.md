# Лабораторные работы по курсу "Технологии сети интернет" (2019-2020 гг.)
## Темы лабораторных работ:
1) Знакомство с Javascript. Работа с DOM-структурой HTML-страницы. Исходный код: `labs/lab_1`.
2) Введение в Node.js. Клиент-серверное приложение. Исходный код: `labs/lab_2`.

## Подробное описание лабораторных работ:
1) Требуется создать страницу HTML, содержащую четыре кнопки: “создать таблицу”, “удалить таблицу”, “добавить строку”, “добавить столбец”. При нажатии на кнопку “создать таблицу” на странице отображается таблица с одной строкой и одним столбцом. При нажатии кнопок “добавить строку” или “добавить столбец” в таблицу добавляется строка или столбец соответственно. При нажатии кнопки “удалить таблицу” вся таблица удаляется.

2) Прокат велосипедов. Требуется разработать веб-приложение, позволяющее брать велосипеды напрокат. На основной странице приложения должен быть представлен выбор велосипедов (по их марке). С каждой маркой велосипеда связано его изображение и короткое описание (15-20 слов). Выбор марки осуществляется путем нажатия пользователя на соответствующее марке изображение. Каждая марка велосипеда имеет собственную стоимость проката. Стоимость проката рассчитывается за час времени. После выбора марки велосипеда, пользователь выбирает удобный для него пункт проката (мы считаем что во всех пунктах проката в наличии всегда есть все необходимые велосипеды), дату и время, свое имя и номер телефона; резервирует таким образом для себя велосипед, получая ссылку на активацию проката. Придя в прокат и получив велосипед, пользователь переходит по полученной ссылке и на странице проката активирует прокат – с этого момента начинает идти время проката (мы считаем всех наших пользователей кристально честными людьми, которые всегда активируют прокат, после получения велосипеда). После того, как пользователь воспользовался прокатом, он переходит по той же самой ссылке, по которой активировал начало проката, выбирает пункт проката, в который он привез велосипед и нажимает кнопку “завершить прокат”, после чего на этой же странице ему показывается стоимость проката, рассчитанная, как суммарное время проката умноженное на стоимость одного часа, время округляется вверх до целых часов. Все используемые системой данные хранятся в базе данных.
Дополнительно (не реализовано): добавить возможность авторизации пользователя и наличие у него “личного кабинета” с возможностью указать имя и телефон, которые затем автоматически включаются в резервирование велосипеда. Выделение отдельной роли “сотрудник пункта проката”, который активирует начало проката и окончание проката вместо пользователя.

## Техническая информация (только для л/р №2)
Требуются следующие инструменты:
* `Node.js` (ver. 12.18.2) (download: [x86][Node.js (x86)]/[x64][Node.js (x64)])
* `MongoDB` (ver. 2012plus-4.2.8) (download: [x86_64][MongoDB])
* `MongoDB Compass` (ver. 1.22.1) (download: [x86_x64][MongoDB Compass]) [`необязательно`]

Автоматическая установка `Node.js` и `MongoDB` возможна путем выполнения скрипта `scripts/install.ps1` с правами администратора в `PowerShell` (обратите внимание: может потребоваться изменение политики выполнения скриптов без цифровой подписи).

Серверная часть требует базу данных! Для корректной работы используйте дамп `db_dump/NewDB`. Для этого после установки `MongoDB` аналогично предыдущему пункту выполните скрипт `scripts/db_import.ps1`.  
В случае неудачи используйте инструмент `mongorestore` и попробуйте восстановить базу вручную.


[Node.js (x64)]: https://nodejs.org/dist/v12.18.2/node-v12.18.2-x64.msi
[Node.js (x86)]: https://nodejs.org/dist/v12.18.2/node-v12.18.2-x86.msi
[MongoDB]: https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.8-signed.msi
[MongoDB Compass]: https://downloads.mongodb.com/compass/mongodb-compass-1.22.1-win32-x64.exe