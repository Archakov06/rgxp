import React from 'react';

function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const notFoundTexts = [
  {
    title: 'Увы, но пусто',
    text: 'Очень долго и усердно я пытался найти информацию, но такой регулярки нет :(',
  },
  {
    title: 'Ничего не найдено',
    text: 'Не-а, такой регулярки у нас вообще нет. Мб поищешь другую?',
  },
  {
    title: 'Может быть ошибся с запросом?',
    text:
      'Знаешь, жизнь такая штука, что если Array.filter() вернул пустой массив, то встречаемся мы тут каждый раз.',
  },
  {
    title: 'Кажется тут пусто',
    text: 'Регулярок нет. Жизнь тлен. Для чего это всё? ЗАШТОООО ЭТО НАКАЗАНИЕ!?',
  },
  {
    emoji: 12,
    title: 'Тут пусто, брат!!1',
    text: 'Кто хочет - ищет способ, кто не хочет - ищет причину... (с) Пацанский цитатник',
  },
  {
    emoji: 13,
    title: 'Конфуций сказал:',
    text: 'Трудно найти в тёмной комнате чёрную кошку, особенно, если её там нет.',
  },
  {
    emoji: 12,
    title: 'Регулярку не нашёл, брат, но',
    text: 'главное в жизни найти: себя, своих и свою… <br/>(с) Ещё одна пацанская цитата',
  },
];

export const NotFoundPage: React.FC = () => {
  const randomInfo = notFoundTexts[randomRange(0, notFoundTexts.length - 1)];
  const randomEmojiImg = `/emoji/${randomInfo.emoji || randomRange(1, 11)}.png`;

  return (
    <div>
      <div className="patterns__no-result">
        <img width={60} height={60} src={randomEmojiImg} alt="Not found emoji" />
        <h2>{randomInfo.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: randomInfo.text }} />
      </div>
    </div>
  );
};
