import {translations} from "../../../locale/locale";

export const getTreeData = (language) => {
  const text = translations[language];

  return [
    {
      value: 'city',
      title: text.filter.categories.city,
      children: [
        {
          value: 'Львів',
          title: text.filter.cities.lviv
        },
        {
          value: 'Київ',
          title: text.filter.cities.kyiv
        },
        {
          value: 'Дніпро',
          title: text.filter.cities.dnipro
        },
        {
          value: 'Харків',
          title: text.filter.cities.kharkiv
        },
        {
          value: 'Одеса',
          title: text.filter.cities.odesa
        }
      ]
    },
    {
      value: 'cuisine',
      title: text.filter.categories.cuisine,
      children: [
        {
          value: 'international',
          title: text.filter.cuisines.international
        },
        {
          value: 'italian',
          title: text.filter.cuisines.italian
        },
        {
          value: 'Ukrainian',
          title: text.filter.cuisines.ukrainian
        },
        {
          value: 'Chinese',
          title: text.filter.cuisines.chinese
        },
        {
          value: 'Mexican',
          title: text.filter.cuisines.mexican
        },
        {
          value: 'Indian',
          title: text.filter.cuisines.indian
        },
        {
          value: 'American',
          title: text.filter.cuisines.american
        }
      ]
    },
    {
      value: 'rating',
      title: text.filter.categories.rating,
      children: [
        {
          value: '1',
          title: '1'
        },
        {
          value: '2',
          title: '2'
        },
        {
          value: '3',
          title: '3'
        },
        {
          value: '4',
          title: '4'
        },
        {
          value: '5',
          title: '5'
        }
      ]
    },
    {
      value: 'priceCategory',
      title: text.filter.categories.priceCategory,
      children: [
        {
          value: 'low',
          title: '$'
        },
        {
          value: 'medium',
          title: '$$'
        },
        {
          value: 'high',
          title: '$$$'
        }
      ]
    }
  ];
};