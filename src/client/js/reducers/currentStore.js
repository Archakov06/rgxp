const initialState = {
  patterns: [],
  filtredPattrens: [],
  tag: '',
  language: (window.navigator.userLanguage || window.navigator.language) == 'ru' ? 'ru' : 'en',
  languages: {
    en: {
      menu: [
        {label: 'E-Mail', url: 'email'},
        {label: 'Uri', url: 'uri'},
        {label: 'Numbers', url: 'numbers'},
        {label: 'Strings', url: 'strings'},
        {label: 'Date/Time', url: 'date-time'},
      ],
      otherMenuLabel: 'Other',
      otherMenu: [
        {label: 'HTML', url: 'html'},
        {label: 'CSS', url: 'css'},
        {label: 'Address / Phone', url: 'adress-phone'},
        {label: 'Markup / Code', url: 'markup-code'},
      ],
      searchPlaceholder: 'Search...',
      searchResult: {
        notFoundTitle: 'Nothing found',
        notFoundText: 'No results were found for this search.',
      },
      loadingLabel: 'Loading...',
      addForm: {
        boxTitle: 'Add regular expression',
        boxTitleInput: 'Title',
        boxPatternInput: 'Pattern',
        boxPatternInputPlaceholder: 'Enter your pattern',
        boxPlaceholderInput: 'Placeholder',
        boxPlaceholderInputPlaceholder: 'Enter a hint for your pattern',
        boxDescriptionInput: 'Description',
        boxTagsInput: 'Tags',
        closeBtn: 'Close',
        addBtn: 'Add',
        mainBtn: 'Add regexp',
        tagPlaceholder: 'Enter tag...',
      },
      footer: {
        links: [
          {label: 'News', url: '#'},
          {label: 'Issues', url: 'https://github.com/Archakov06/rgxp/issues'},
          {label: 'Contacts', url: 'https://github.com/Archakov06/rgxp#contacts'},
          {label: 'GitHub', url: 'https://github.com/Archakov06/rgxp'},
        ]
      },
    },
    ru: {
      menu: [
        {label: 'Почта', url: 'email'},
        {label: 'Uri', url: 'uri'},
        {label: 'Цифры', url: 'numbers'},
        {label: 'Строки', url: 'strings'},
        {label: 'Дата/Время', url: 'date-time'},
      ],
      otherMenuLabel: 'Другое',
      otherMenu: [
        {label: 'HTML', url: 'html'},
        {label: 'CSS', url: 'css'},
        {label: 'Adress / Phone', url: 'adress-phone'},
        {label: 'Markup / Code', url: 'markup-code'},
      ],
      searchPlaceholder: 'Поиск...',
      searchResult: {
        notFoundTitle: 'Ничего не найдео',
        notFoundText: 'По данному запросу, ничего не найдено',
      },
      loadingLabel: 'Загрузка...',
      addForm: {
        boxTitle: 'Добавить регулярное выражение',
        boxTitleInput: 'Заголовок',
        boxPatternInput: 'Паттерн',
        boxPatternInputPlaceholder: 'Введите ваш паттерн',
        boxPlaceholderInput: 'Подсказка',
        boxPlaceholderInputPlaceholder: 'Укажите верный вариант',
        boxDescriptionInput: 'Описание',
        boxTagsInput: 'Тэги',
        closeBtn: 'Закрыть',
        addBtn: 'Добавить',
        mainBtn: 'Добавить регулярку',
        tagPlaceholder: 'Введите тэг...',
      },
      footer: {
        links: [
          {label: 'Новости', url: '#'},
          {label: 'Вопросы', url: 'https://github.com/Archakov06/rgxp/issues'},
          {label: 'Контакты', url: 'https://github.com/Archakov06/rgxp#contacts'},
          {label: 'GitHub', url: 'https://github.com/Archakov06/rgxp'},
        ]
      },
    }
  }
}

export default function currentStore(state = initialState, action) {

  switch (action.type) {
    case 'SET_PATTERNS':
      return {
        ...state,
        patterns: action.payload,
        filtredPattrens: action.payload
      }
    case 'SET_TAG':
      return {
        ...state,
        tag: action.payload
      }
    case 'SET_RATING':
      const patterns = state.patterns.filter((item)=>{
        if (item.id == action.payload.id) item.rating = action.payload.status == 'up' ? item.rating + 1 : item.rating - 1;
        return item;
      });
      return {
        ...state,
        patterns: patterns
      }
    case 'SEACH_PATTERNS':
      const val = action.payload.toLowerCase();
      return {
        ...state,
        filtredPattrens: state.patterns.filter((item) =>
          item.title.toLowerCase().indexOf(val) >= 0 ||
          item.tags.toLowerCase().indexOf(val) >= 0 ||
          ( item.description.hasOwnProperty(state.language) && item.description[state.language].toLowerCase().indexOf(val) >= 0 )
        )
      }
    default:
      return state;
  }

}
