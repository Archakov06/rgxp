![RGXP.RU](https://archakov.im/uploads/rgxp-logo.svg?1)
=========

Набор готовых регулярных выражений на все случаи жизни 👀
Проект open-source и каждый желающий может помочь проекту. Задается вопрос: "Как?".

 1. Добавив своих регулярных выражений.
 2. Посоветовать более элегантное решение (по коду).
 3. Поделиться своими идеями по развитию этого проекта (в issues).

![](https://archakov.im/uploads/rgxp.png)

## Зачем?
Я отвечу сразу на несколько вопросов - **затем**. Мне часто требовались регулярные выражения на разные случаи. И чаще всего, я их находил в StackOverflow или на Toster. Однако, хотелось базу регулярных выражений на все возможные случаи.

В итоге, было решено создать этот проект - [RGXP.RU](https://rgxp.ru)

## Что использовалось при разработке?

- **Front end:** ReactJS, Redux, Recompose, React Router, Stylus.
- **Back end:** NodeJS, Express, Knex.
 - ECMAScript 6 (клиент и сервер).
 - Webpack

## Как добавить свои регулярные выражения?

Все паттерны содержатся в файле **patterns.json**.

**Внимание!** Перед тем, как отправить свои паттерны, проверьте JSON на валидность - https://jsonlint.com/

Чтобы добавить свой паттерн, создайте **pull request** соблюдая следующий шаблон:

```json
{
  "title": {
    "en": "Title in english",
    "ru": "Заголовок на русском"
  },
  "description": {
    "en": "Description in english",
    "ru": "Описание на русском"
  },
  "pattern": "<title>(.*?)</title>",
  "placeholder": "<title>My site</title>",
  "tags": "title,html,tags",
  "nickname": "Archakov06"
}
```

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">required</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>title</td>
      <td>object</td>
      <td>yes</td>
      <td>Заголовок. Объект состоящий из двух свойств: <b>ru</b> и <b>en</b> (string, required).</td>
    </tr>
    <tr>
      <td>description</td>
      <td>object</td>
      <td>yes</td>
      <td>Описание паттерна. Объект состоящий из двух свойств: <b>ru</b> и <b>en</b> (string, required).</td>
    </tr>
    <tr>
      <td>pattern</td>
      <td>string</td>
      <td>yes</td>
      <td>Регулярное выражения (шаблон).</td>
    </tr>
    <tr>
      <td>placeholder</td>
      <td>string</td>
      <td>yes</td>
      <td>Подсказка <br>(<i>в основном, указывается значение соответствующее паттерну</i>)</td>
    </tr>
    <tr>
      <td>tags</td>
      <td>string</td>
      <td>optional</td>
      <td>Основные тэги вашего паттерна. Указывать через запятую.<br>(<i>требуется для поиска и категорий</i>).</td>
    </tr>
    <tr>
      <td>nickname</td>
      <td>string</td>
      <td>optional</td>
      <td>Ваш никнейм от GitHub</td>
    </tr>
    </tbody>
</table>

## Как оповестить о баге или предложить идею?
Вы можете создать issue в разделе
<https://github.com/Archakov06/trycode/issues>. Если у вас есть вопросы, предложения или вы хотите поругать меня за быдлокод, свяжитесь со мной через GitHub или через контакты ниже. (p.s.: Обратите внимание, что проект на стадии beta).

- Telegram: [@archakov06](https://t.me/archakov06)
- Вконтакте: https://vk.com/amonbower
- E-Mail: [hello@archakov.im](mailto:hello@archakov.im)

## Обновления

##### Update 10.12.2017
- Переписал весь быдлокод на новый быдлокод (рефакторинг)
- Заменил некоторые классы на stateless component.
- Подключил библиотеку Recompose (HOC).
- Подключил React Router.
- Добавил поддержку копирования выражений одним кликом.
- Пересоздал проект через CRA (create-react-app).
- Я - молодец.

##### Update 08.07.2017
- Поправил исходники по правилам ESLint.
- Обновил правила eslint.
- Поправил паттерны (отдельное спасибо [@limitedeternity](https://github.com/limitedeternity) за перевод остального текста).
- Небольшие правки с компонентом паттерна. Добавил слэши в начале и в конце к каждому паттерну. Сделал выделение паттерна при клике на поле.
- Я - молодец.

##### Update 1.07.2017
- Поправил баг с тем, что паттерны отображались после второго клика на тэг (категорию).
- Поправил немного стили.
- Решили обновы писать в README. Не знаю, хорошая ли это идея.

##### Update 29.06.2017
- Добавил функцию просмотра всех совпадений по паттерну.
- Добавил новых паттернов.
- Поправил адаптивку.

##### Update 28.06.2017
- Добавил возможность открывать определенный тэг по запросу.
- Удалил рейтинг (временно).
- Разделил конфиги для webpack (dev/prod).
- Перенес паттерны на репозиторий (временно, а может и нет).
- Добавил больше правил для ESLint.
- Разделил стили от бандла.
- Поправил поиск паттернов.
- Небольшие фиксы.
- В общем, я красавчик!

## License

MIT License - Archakov Denis 2017
