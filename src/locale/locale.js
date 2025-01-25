export const translations = {
  uk: {
    register: {
      appName: 'RestaurantBrowser',
      title: 'Реєстрація',
      firstName: {
        placeholder: 'Введіть ім\'я',
        error: 'Будь ласка, введіть ваше ім\'я'
      },
      lastName: {
        placeholder: 'Введіть прізвище',
        error: 'Будь ласка, введіть ваше прізвище'
      },
      email: {
        placeholder: 'Введіть email',
        error: 'Будь ласка, введіть ваш email'
      },
      password: {
        placeholder: 'Введіть пароль',
        error: 'Будь ласка, введіть ваш пароль'
      },
      submitButton: 'РЕЄСТРАЦІЯ',
      haveAccount: 'Є акаунт? Увійдіть',
      copyright: '© RestaurantBrowser 2024. All rights reserved.'
    },
    login: {
      appName: 'RestaurantBrowser',
      title: 'Логін',
      emailPlaceholder: 'Введіть email',
      passwordPlaceholder: 'Введіть пароль',
      buttonText: 'ЛОГІН',
      noAccountText: 'Ще не маєте акаунта? Зареєструйтесь',
      copyright: 'RestaurantBrowser 2024. Всі права захищені.',
      validations: {
        emailRequired: 'Будь ласка, введіть ваш email',
        passwordRequired: 'Будь ласка, введіть ваш пароль'
      }
    },
    header: {
      home: 'Головна',
      restaurants: 'Ресторани',
      favorite: 'Улюблене',
      about: 'Про нас',
      adminAccount: 'Акаунт адміна',
      logout: 'Вийти',
      reservationsModal: {
        title: 'Мої бронювання',
        restaurant: 'Ресторан',
        tableNumber: 'Стіл №',
        date: 'Дата',
        time: 'Час',
        guestCount: 'Кількість гостей',
        status: 'Статус',
        noReservations: 'Бронювань не знайдено',
        statuses: {
          CONFIRMED: 'Підтверджено',
          CANCELLED: 'Скасовано',
          PENDING: 'Очікує',
          FREE: 'Вільно'
        },
        cancel: 'Скасувати',
        actions: 'Дії',
        delete: 'Видалити бронювання',
        success: {
          cancelled: 'Бронювання успішно скасовано',
          deleted: 'Бронювання успішно видалено'
        },
        errors: {
          fetchError: 'Помилка при завантаженні бронювань',
          cancelError: 'Помилка при скасуванні бронювання',
          deleteError: 'Помилка при видаленні бронювання'
        }
      },
      myRestaurantsModal: {
        title: 'Мої ресторани',
        name: 'Назва ресторану',
        cuisine: 'Тип кухні',
        rating: 'Рейтинг',
        address: 'Адреса',
        actions: 'Дії',
        edit: 'Редагувати',
        create: 'Створити новий ресторан',
        noRestaurants: 'Ресторанів не знайдено',
        viewReservations: 'Переглянути бронювання',
        searchPlaceholder: "Пошук за назвою, кухнею чи адресою"
      },
      messagesModal: {
        title: 'Повідомлення',
        date: 'Дата',
        message: 'Повідомлення',
        type: 'Тип',
        actions: 'Дії',
        confirm: 'Підтвердити',
        cancel: 'Скасувати',
        noMessages: 'Немає повідомлень',
        types: {
          request: 'Запит на бронювання',
          confirmation: 'Підтвердження',
          cancellation: 'Скасування',
          general: 'Загальне'
        },
        delete: 'Видалити повідомлення',
        markAsRead: 'Позначити як прочитане',
        markAllAsRead: "Позначити все як прочитане",
        success: {
          confirmed: 'Бронювання успішно підтверджено',
          cancelled: 'Бронювання успішно скасовано',
          deleted: 'Повідомлення успішно видалено',
          markedAsRead: 'Повідомлення позначено як прочитане',
          allMarkedAsRead: "Всі повідомлення позначено як прочитані",
        },
        errors: {
          fetchError: 'Помилка при завантаженні повідомлень',
          confirmError: 'Помилка при підтвердженні бронювання',
          cancelError: 'Помилка при скасуванні бронювання',
          deleteError: 'Помилка при видаленні повідомлення',
          markAsReadError: 'Помилка при позначенні повідомлення як прочитане',
          markAllAsReadError: "Не вдалося позначити всі повідомлення як прочитані",
        }
      },
      adminReservationsModal: {
        title: 'Бронювання ресторанів',
        customer: 'Клієнт',
        phone: 'Телефон',
        restaurant: 'Ресторан',
        tableNumber: 'Номер столика',
        date: 'Дата',
        time: 'Час',
        guestCount: 'Кількість гостей',
        status: 'Статус',
        actions: 'Дії',
        confirm: "Підтвердити",
        cancel: 'Скасувати',
        delete: 'Видалити',
        noReservations: 'Бронювань не знайдено',
        statuses: {
          PENDING: 'Очікує підтвердження',
          CONFIRMED: 'Підтверджено',
          CANCELLED: 'Скасовано'
        },
        success: {
          cancelled: 'Бронювання успішно скасовано',
          deleted: 'Бронювання успішно видалено'
        },
        errors: {
          fetchError: 'Помилка при завантаженні бронювань',
          cancelError: 'Помилка при скасуванні бронювання',
          deleteError: 'Помилка при видаленні бронювання'
        }
      }
    },
    footer: {
      appName: 'RestaurantBrowser',
      aboutUs: 'Про нас',
      home: 'Головна',
      restaurants: 'Ресторани',
      favourites: 'Улюблене',
      followUs: 'Підписуйтесь на нас',
      copyright: 'RestaurantBrowser 2024. Всі права захищені.'
    },
    home: {
      mainContent: {
        title: 'Найкращі ресторани Львова\nВибирай підходящий для себе та насолоджуйся!',
        subtitle: 'RestaurantBrowser допоможе вам знайти найкращий ресторан!\nБільше 100 кафе, ресторанів і т. д. у вашому місті.',
        startButton: 'Почати зараз!',
        howToUseButton: 'Як користуватись?'
      },
      favorites: {
        title: 'Зберігайте улюблене!',
        button: 'До улюбленого!'
      },
      carousel: {
        title: 'Насолоджуйся переглядом найкращих ресторанів'
      },
      tour: {
        step1: {
          title: 'Шукайте ресторани на будь-який смак!',
          description: 'Переходьте сюди та шукайте!'
        },
        step2: {
          title: 'Зберігайте в улюблене!',
          description: 'Ви маєте можливість зберігати ресторани, які сподобались, щоб повернутись знову.'
        },
        step3: {
          title: 'Про нас',
          description: 'Ознайомтесь з усіма можливостями сайту.'
        }
      },
      infoCarousels: {
        first: [
          {
            header: 'Чому наш сайт?',
            text: 'Відкрийте для себе найбільший вибір ресторанів у Львові. Чи ви бажаєте спробувати страви місцевої кухні чи міжнародні страви, ми маємо все необхідне. Досліджуйте, обирайте та насолоджуйтеся чудовими враженнями від їжі.'
          },
          {
            header: '200+ ресторанів',
            text: 'Досліджуйте різноманітну колекцію з понад 200 ресторанів у Львові. Від затишних кафе до ресторанів преміум-класу - наша платформа пропонує багатий вибір кулінарних варіантів для задоволення будь-якого смаку.'
          },
          {
            header: 'Всі види кухонь',
            text: 'Випадайте в гастрономічну подорож з нашою платформою, яка пропонує широкий спектр кухонь, щоб задовольнити будь-який смак. Від традиційних страв місцевої кухні до екзотичних міжнародних смаків, RestaurantBrowser забезпечує чудовий дегустаційний досвід для всіх.'
          }
        ],
        second: [
          {
            header: 'Оберіть свій улюблений',
            text: 'Відкрийте для себе різноманітні ресторани та оберіть свій улюблений з нашого обширного списку.'
          },
          {
            header: 'Сортуйте за рейтингом',
            text: 'Досліджуйте ресторани, які оцінені нашими користувачами, і знаходьте найкращі місця у Львові.'
          },
          {
            header: 'Сортуйте за популярністю',
            text: 'Перевірте найпопулярніші ресторани у Львові та дізнайтеся, де їдять всі.'
          }
        ],
        third: [
          {
            header: 'Пошук за назвою',
            text: 'Знайдіть свій улюблений ресторан, шукаючи його назву та отримуйте детальну інформацію про нього.'
          },
          {
            header: 'Найбільший сайт в Україні з цієї теми',
            text: 'Відкрийте для себе найбільшу платформу в Україні, присвячену наданню інформації про ресторани.'
          },
          {
            header: 'Дайте свої відгуки',
            text: 'Поділіться своїми думками та враженнями, надаючи відгуки про ресторани, які ви відвідали.'
          }
        ]
      }
    },
    about: {
      title: 'Про нас',
      description: 'Я, високомотивований Java Developer, хотів би зробити життя українців зручнішим, адже сам неодноразово стикався з проблемою пошуку відповідного закладу для посиденьок у Львові. На цьому сайті ви можете підібрати ресторан згідно ваших уподобань (кухня, місто, рейтинг, популярність), а також дізнатись коротку інформацію про кількість столиків, меню, контактну інформацію, адресу розташування.',
      contactInfo: {
        title: 'Контактна інформація',
        email: 'Email: vitok2misze@gmail.com',
        phone: 'Номер телефону: +380639968849'
      }
    },
    restaurants: {
      notFound: 'Ресторани не знайдено',
      pagination: {
        prev: '«',
        next: '»'
      }
    },
    restaurant: {
      shortDescription: {
        title: 'Короткий опис',
        readMore: 'Читати більше...',
        brief: 'Коротко'
      },
      drawer: {
        mainTitle: 'Інформація про ресторан',
        details: {
          title: 'Деталі',
          name: 'Назва',
          cuisineType: 'Тип кухні',
          priceCategory: 'Цінова категорія',
          rating: 'Рейтинг',
          popularity: 'Популярність'
        },
        contactInfo: {
          title: 'Контактна інформація',
          phone: 'Номер телефону',
          email: 'Email',
          city: 'Місто',
          address: 'Адреса'
        },
        additionalInfo: {
          title: 'Додаткова інформація',
          website: 'Сайт',
          menu: 'Меню',
          reviewCount: 'Кількість відгуків',
          moreDetails: 'Детальніше',
          clickHere: 'Натисніть сюди'
        }
      }
    },
    restaurantView: {
      breadcrumb: {
        restaurantsList: 'Список ресторанів',
        restaurant: 'Ресторан'
      },
      details: {
        title: 'Деталі',
        description: 'Опис',
        contactInfo: 'Контактна Інформація',
        reviews: 'Відгуки',
        location: {
          title: 'Деталі'
        },
        contacts: {
          title: 'Контакти'
        },
        menu: {
          title: 'Меню'
        },
        workHours: {
          title: 'Години роботи',
          dayOff: "Вихідний"
        },
        tables: {
          title: 'Вмістимість столиків'
        }
      },
      photos: {
        selectFile: 'Вибрати файл',
        uploadPhoto: 'Завантажити фото',
        pleaseSelect: 'Будь ласка виберіть файл',
        uploadSuccess: 'Фото успішно додано!',
        uploadError: 'Помилка додавання!'
      },
      popularity: 'Популярність'
    },
    favourite: {
      noFavorites: 'Немає улюблених ресторанів',
      pagination: {
        prev: '«',
        next: '»'
      }
    },
    addRestaurant: {
      button: 'Додати ресторан',
      modalTitle: 'Додати ресторан',
      name: {
        label: 'Назва',
        placeholder: 'Назва',
        error: 'Будь ласка, вкажіть назву',
        maxLengthError: "Назва не може перевищувати 50 символів"
      },
      description: {
        label: 'Опис',
        placeholder: 'Опис',
        error: 'Будь ласка, вкажіть опис'
      },
      address: {
        label: 'Адреса',
        placeholder: 'Адреса',
        error: 'Будь ласка, введіть адресу',
        latitude: 'Широта',
        longitude: 'Довгота'
      },
      workHours: {
        label: 'Години роботи',
        startError: 'Будь ласка, введіть початковий час',
        endError: 'Будь ласка, введіть кінцевий час',
        days: {
          MONDAY: 'Понеділок',
          TUESDAY: 'Вівторок',
          WEDNESDAY: 'Середа',
          THURSDAY: 'Четвер',
          FRIDAY: 'П\'ятниця',
          SATURDAY: 'Субота',
          SUNDAY: 'Неділя'
        },
        start: 'початок',
        end: 'кінець',
        dayOff: "вихідний"
      },
      cuisineType: {
        label: 'Тип кухні',
        placeholder: 'Виберіть тип кухні',
        error: 'Будь ласка, виберіть тип кухні'
      },
      priceCategory: {
        label: "Цінова категорія",
        placeholder: "Оберіть цінову категорію",
        error: "Будь ласка, оберіть цінову категорію"
      },
      city: {
        label: 'Місто',
        placeholder: 'Місто',
        error: 'Будь ласка, введіть місто'
      },
      tables: {
        label: 'Столи',
        capacity: {
          placeholder: 'Місткість',
          error: 'Будь ласка, введіть місткість'
        },
        addButton: 'Додати стіл'
      },
      website: {
        label: 'Сайт',
        placeholder: 'Сайт',
        error: 'Будь ласка, введіть веб-сайт'
      },
      contactInfo: {
        label: 'Контактна інформація',
        phone: {
          label: 'Номер телефону',
          placeholder: 'Номер телефону',
          error: 'Будь ласка, введіть номер телефону'
        },
        email: {
          label: 'Email',
          placeholder: 'Email',
          error: 'Будь ласка, введіть email'
        }
      },
      menu: {
        label: 'Меню',
        placeholder: 'Меню',
        error: 'Будь ласка, введіть меню'
      },
      buttons: {
        add: 'Додати',
        cancel: 'Відмінити'
      }
    },
    filter: {
      placeholder: 'Виберіть фільтр',
      categories: {
        city: 'місто',
        cuisine: 'кухня',
        rating: 'рейтинг',
        priceCategory: 'цінова категорія'
      },
      cities: {
        lviv: 'Львів',
        kyiv: 'Київ',
        dnipro: 'Дніпро',
        kharkiv: 'Харків',
        odesa: 'Одеса'
      },
      cuisines: {
        international: 'Інтернаціональна',
        italian: 'Італійська',
        ukrainian: 'Українська',
        chinese: 'Китайська',
        mexican: 'Мексиканська',
        indian: 'Індійська',
        american: 'Американська'
      }
    },
    sorter: {
      header: 'Сортувати за:',
      options: {
        popularity: 'популярністю',
        rating: 'рейтингом'
      }
    },
    search: {
      placeholder: 'Пошук...'
    },
    feedback: {
      writeReview: 'Написати відгук',
      modalTitle: 'Відгук',
      rateHeader: 'Поставте оцінку',
      advantagesHeader: 'Переваги',
      advantagesPlaceholder: 'Переваги',
      disadvantagesHeader: 'Недоліки',
      disadvantagesPlaceholder: 'Недоліки',
      commentHeader: 'Коментар',
      commentPlaceholder: 'Залишіть свій відгук',
      publishButton: 'Опублікувати',
      cancelButton: 'Відмінити',
      rateRequired: 'Будь ласка, поставте оцінку',
      advantagesRequired: 'Будь ласка, опишіть переваги',
      disadvantagesRequired: 'Будь ласка, опишіть недоліки',
      commentRequired: 'Будь ласка, напишіть коментар',
      deleteConfirmTitle: 'Видалити коментар',
      deleteConfirmDescription: 'Ви впевнені що хочете видалити коментар?',
      yes: 'Так',
      no: 'Ні',
    },
    tableModal: {
      reserveTableButton: 'Забронювати стіл',
      modalTitle: 'Забронювати стіл'
    },
    tableReservation: {
      modal: {
        title: 'Зробити резервацію',
      },
      form: {
        customerName: {
          label: 'Ім\'я',
          placeholder: 'Введіть ваше ім\'я',
          error: 'Будь ласка, введіть ваше ім\'я'
        },
        customerPhone: {
          label: 'Телефон',
          placeholder: 'Введіть ваш номер телефону',
          error: 'Будь ласка, введіть ваш номер телефону'
        },
        reservationTime: {
          label: 'Дата та час',
          error: 'Будь ласка, оберіть дату та час'
        },
        guestCount: {
          label: 'Кількість гостей',
          error: 'Будь ласка, вкажіть кількість гостей'
        }
      },
      table: {
        capacity: 'Місткість',
        capacityPeople: 'осіб',
        tableNumber: 'Стіл',
        reservedFor: 'Заброньовано для'
      },
      buttons: {
        select: 'Обрати',
        cancelReservation: 'Скасувати резервацію',
        confirmReservation: 'Підтвердити резервацію'
      },
      messages: {
        success: {
          created: 'Резервацію успішно створено',
          cancelled: 'Резервацію успішно скасовано'
        },
        error: {
          fetchTables: 'Не вдалося завантажити столи',
          createReservation: 'Не вдалося створити резервацію',
          cancelReservation: 'Не вдалося скасувати резервацію'
        }
      }
    },
    editRestaurant: {
      modalTitle: "Редагування ресторану",
      buttons: {
        update: "Оновити ресторан",
        cancel: "Скасувати"
      },
      success: "Ресторан успішно оновлено",
      errors: {
        fetchError: "Не вдалося завантажити деталі ресторану",
        updateError: "Не вдалося оновити ресторан"
      }
    },
    analytics: {
      title: "Аналітика ресторану",
      categories: {
        general: "Загальна статистика",
        feedback: "Статистика відгуків",
        workHours: "Робочі години",
        reservations: "Столи та бронювання"
      },
      statistics: {
        rating: "Рейтинг",
        totalFeedbacks: "Всього відгуків",
        tables: "Столи",
        popularity: "Популярність",
        workingDays: "Робочі дні",
        totalCapacity: "Загальна місткість",
        priceCategory: "Цінова категорія",
        avgHoursDay: "Сер. годин/день",
        hours: "год",
        totalReservations: "Всього бронювань",
        reservationRate: "Успішність"
      },
      charts: {
        capacityDistribution: {
          title: "Розподіл місткості столів",
          seats: "місць"
        },
        workingHours: {
          title: "Робочі години по днях",
          hours: "Робочі години"
        },
        reservationTrends: {
          title: "Бронювання по місяцях",
          count: "Бронювань"
        },
        feedbackDistribution: {
          title: "Розподіл відгуків"
        }
      },
      feedback: {
        latest: "Останні відгуки",
        pros: "Переваги",
        cons: "Недоліки",
        excellent: "Відмінно",
        good: "Добре",
        average: "Середньо",
        poor: "Погано"
      },
      days: {
        monday: "Понеділок",
        tuesday: "Вівторок",
        wednesday: "Середа",
        thursday: "Четвер",
        friday: "П'ятниця",
        saturday: "Субота",
        sunday: "Неділя"
      },
      priceCategories: {
        low: "Економ",
        medium: "Середній",
        high: "Преміум"
      }
    }
  },
  en: {
    register: {
      appName: 'RestaurantBrowser',
      title: 'Registration',
      firstName: {
        placeholder: 'Enter first name',
        error: 'Please enter your first name'
      },
      lastName: {
        placeholder: 'Enter last name',
        error: 'Please enter your last name'
      },
      email: {
        placeholder: 'Enter email',
        error: 'Please enter your email'
      },
      password: {
        placeholder: 'Enter password',
        error: 'Please enter your password'
      },
      submitButton: 'REGISTER',
      haveAccount: 'Have an account? Sign in',
      copyright: '© RestaurantBrowser 2024. All rights reserved.'
    },
    login: {
      appName: 'RestaurantBrowser',
      title: 'Login',
      emailPlaceholder: 'Enter email',
      passwordPlaceholder: 'Enter password',
      buttonText: 'LOGIN',
      noAccountText: 'Don\'t have an account? Sign up',
      copyright: 'RestaurantBrowser 2024. All rights reserved.',
      validations: {
        emailRequired: 'Please enter your email',
        passwordRequired: 'Please enter your password'
      }
    },
    header: {
      home: 'Home',
      restaurants: 'Restaurants',
      favorite: 'Favorites',
      about: 'About Us',
      adminAccount: 'Admin Account',
      logout: 'Logout',
      reservationsModal: {
        title: 'My Reservations',
        restaurant: 'Restaurant',
        tableNumber: 'Table №',
        date: 'Date',
        time: 'Time',
        guestCount: 'Number of Guests',
        status: 'Status',
        noReservations: 'No reservations found',
        statuses: {
          CONFIRMED: 'Confirmed',
          CANCELLED: 'Cancelled',
          PENDING: 'Pending',
          FREE: 'Free'
        },
        cancel: 'Cancel',
        actions: 'Actions',
        delete: 'Delete reservation',
        success: {
          cancelled: 'Reservation cancelled successfully',
          deleted: 'Reservation deleted successfully'
        },
        errors: {
          fetchError: 'Error fetching reservations',
          cancelError: 'Error cancelling reservation',
          deleteError: 'Error deleting reservation'
        }
      },
      myRestaurantsModal: {
        title: 'My Restaurants',
        name: 'Restaurant Name',
        cuisine: 'Cuisine Type',
        rating: 'Rating',
        address: 'Address',
        actions: 'Actions',
        edit: 'Edit',
        create: 'Create New Restaurant',
        noRestaurants: 'No restaurants found',
        viewReservations: 'View Reservations',
        searchPlaceholder: "Search by name, cuisine, or address"
      },
      messagesModal: {
        title: 'Messages',
        date: 'Date',
        message: 'Message',
        type: 'Type',
        actions: 'Actions',
        confirm: 'Confirm',
        cancel: 'Cancel',
        noMessages: 'No messages',
        types: {
          request: 'Reservation Request',
          confirmation: 'Confirmation',
          cancellation: 'Cancellation',
          general: 'General'
        },
        delete: 'Delete message',
        markAsRead: 'Mark as read',
        markAllAsRead: "Mark all as read",
        success: {
          confirmed: 'Reservation confirmed successfully',
          cancelled: 'Reservation cancelled successfully',
          deleted: 'Message deleted successfully',
          markedAsRead: 'Message marked as read',
          allMarkedAsRead: "All messages marked as read",
        },
        errors: {
          fetchError: 'Error fetching messages',
          confirmError: 'Error confirming reservation',
          cancelError: 'Error cancelling reservation',
          deleteError: 'Error deleting message',
          markAsReadError: 'Error marking message as read',
          markAllAsReadError: "Failed to mark all messages as read",
        }
      },
      adminReservationsModal: {
        title: 'Restaurant Reservations',
        customer: 'Customer',
        phone: 'Phone',
        restaurant: 'Restaurant',
        tableNumber: 'Table Number',
        date: 'Date',
        time: 'Time',
        guestCount: 'Number of Guests',
        status: 'Status',
        actions: 'Actions',
        confirm: "Confirm",
        cancel: 'Cancel',
        delete: 'Delete',
        noReservations: 'No reservations found',
        statuses: {
          PENDING: 'Pending',
          CONFIRMED: 'Confirmed',
          CANCELLED: 'Cancelled'
        },
        success: {
          cancelled: 'Reservation cancelled successfully',
          deleted: 'Reservation deleted successfully'
        },
        errors: {
          fetchError: 'Error fetching reservations',
          cancelError: 'Error cancelling reservation',
          deleteError: 'Error deleting reservation'
        }
      },
    },
    footer: {
      appName: 'RestaurantBrowser',
      aboutUs: 'About Us',
      home: 'Home',
      restaurants: 'Restaurants',
      favourites: 'Favourites',
      followUs: 'Follow Us',
      copyright: 'RestaurantBrowser 2024. All rights reserved.'
    },
    home: {
      mainContent: {
        title: 'Best Restaurants in Lviv\nChoose the right one for you and enjoy!',
        subtitle: 'RestaurantBrowser will help you find the best restaurant!\nMore than 100 cafes, restaurants, etc. in your city.',
        startButton: 'Start Now!',
        howToUseButton: 'How to Use?'
      },
      favorites: {
        title: 'Save to Favorites!',
        button: 'Go to Favorites!'
      },
      carousel: {
        title: 'Enjoy browsing the best restaurants'
      },
      tour: {
        step1: {
          title: 'Search for restaurants for any taste!',
          description: 'Go here and search!'
        },
        step2: {
          title: 'Save to favorites!',
          description: 'You have the ability to save restaurants you like to return again.'
        },
        step3: {
          title: 'About Us',
          description: 'Learn about all the features of the site.'
        }
      },
      infoCarousels: {
        first: [
          {
            header: 'Why our site?',
            text: 'Discover the largest selection of restaurants in Lviv. Whether you want to try local cuisine or international dishes, we have everything you need. Explore, choose and enjoy wonderful food experiences.'
          },
          {
            header: '200+ restaurants',
            text: 'Explore a diverse collection of over 200 restaurants in Lviv. From cozy cafes to premium restaurants - our platform offers a rich selection of culinary options to satisfy any taste.'
          },
          {
            header: 'All types of cuisines',
            text: 'Fall into a gastronomic journey with our platform that offers a wide range of cuisines to satisfy any taste. From traditional local dishes to exotic international flavors, RestaurantBrowser provides an excellent tasting experience for everyone.'
          }
        ],
        second: [
          {
            header: 'Choose your favorite',
            text: 'Discover various restaurants and choose your favorite from our extensive list.'
          },
          {
            header: 'Sort by rating',
            text: 'Explore restaurants rated by our users and find the best places in Lviv.'
          },
          {
            header: 'Sort by popularity',
            text: 'Check out the most popular restaurants in Lviv and find out where everyone eats.'
          }
        ],
        third: [
          {
            header: 'Search by name',
            text: 'Find your favorite restaurant by searching its name and get detailed information about it.'
          },
          {
            header: 'Largest site in Ukraine on this topic',
            text: 'Discover the largest platform in Ukraine dedicated to providing restaurant information.'
          },
          {
            header: 'Give your feedback',
            text: 'Share your thoughts and impressions by providing reviews about the restaurants you visited.'
          }
        ]
      }
    },
    about: {
      title: 'About Us',
      description: 'As a highly motivated Java Developer, I want to make life easier for Ukrainians, as I have personally experienced the challenge of finding suitable places to hang out in Lviv. On this website, you can find restaurants according to your preferences (cuisine, city, rating, popularity), as well as learn brief information about the number of tables, menu, contact information, and location address.',
      contactInfo: {
        title: 'Contact Information',
        email: 'Email: vitok2misze@gmail.com',
        phone: 'Phone: +380639968849'
      }
    },
    restaurants: {
      notFound: 'No restaurants found',
      pagination: {
        prev: '«',
        next: '»'
      }
    },
    restaurant: {
      shortDescription: {
        title: 'Brief Description',
        readMore: 'Read more...',
        brief: 'Brief'
      },
      drawer: {
        mainTitle: 'Restaurant Information',
        details: {
          title: 'Details',
          name: 'Name',
          cuisineType: 'Cuisine Type',
          priceCategory: 'Price Category',
          rating: 'Rating',
          popularity: 'Popularity'
        },
        contactInfo: {
          title: 'Contact Information',
          phone: 'Phone Number',
          email: 'Email',
          city: 'City',
          address: 'Address'
        },
        additionalInfo: {
          title: 'Additional Information',
          website: 'Website',
          menu: 'Menu',
          reviewCount: 'Number of Reviews',
          moreDetails: 'More Details',
          clickHere: 'Click here'
        }
      }
    },
    restaurantView: {
      breadcrumb: {
        restaurantsList: 'Restaurants List',
        restaurant: 'Restaurant'
      },
      details: {
        title: 'Details',
        description: 'Description',
        contactInfo: 'Contact Information',
        reviews: 'Reviews',
        location: {
          title: 'Details'
        },
        contacts: {
          title: 'Contacts'
        },
        menu: {
          title: 'Menu'
        },
        workHours: {
          title: 'Working Hours',
          dayOff: "Day off"
        },
        tables: {
          title: 'Table Capacity'
        }
      },
      photos: {
        selectFile: 'Select File',
        uploadPhoto: 'Upload Photo',
        pleaseSelect: 'Please select a file',
        uploadSuccess: 'Photo uploaded successfully!',
        uploadError: 'Upload error!'
      },
      popularity: 'Popularity'
    },
    favourite: {
      noFavorites: 'No favorite restaurants',
      pagination: {
        prev: '«',
        next: '»'
      }
    },
    addRestaurant: {
      button: 'Add Restaurant',
      modalTitle: 'Add Restaurant',
      name: {
        label: 'Name',
        placeholder: 'Name',
        error: 'Please enter a name',
        maxLengthError: "Name cannot exceed 50 characters"
      },
      description: {
        label: 'Description',
        placeholder: 'Description',
        error: 'Please enter a description'
      },
      address: {
        label: 'Address',
        placeholder: 'Address',
        error: 'Please enter an address',
        latitude: 'Latitude',
        longitude: 'Longitude'
      },
      workHours: {
        label: 'Working Hours',
        startError: 'Please enter start time',
        endError: 'Please enter end time',
        days: {
          MONDAY: 'Monday',
          TUESDAY: 'Tuesday',
          WEDNESDAY: 'Wednesday',
          THURSDAY: 'Thursday',
          FRIDAY: 'Friday',
          SATURDAY: 'Saturday',
          SUNDAY: 'Sunday'
        },
        start: 'start',
        end: 'end',
        dayOff: "day off"
      },
      cuisineType: {
        label: 'Cuisine Type',
        placeholder: 'Select cuisine type',
        error: 'Please select a cuisine type'
      },
      priceCategory: {
        label: "Price Category",
        placeholder: "Select price category",
        error: "Please select a price category"
      },
      city: {
        label: 'City',
        placeholder: 'City',
        error: 'Please enter a city'
      },
      tables: {
        label: 'Tables',
        capacity: {
          placeholder: 'Capacity',
          error: 'Please enter capacity'
        },
        addButton: 'Add Table'
      },
      website: {
        label: 'Website',
        placeholder: 'Website',
        error: 'Please enter a website'
      },
      contactInfo: {
        label: 'Contact Information',
        phone: {
          label: 'Phone Number',
          placeholder: 'Phone Number',
          error: 'Please enter a phone number'
        },
        email: {
          label: 'Email',
          placeholder: 'Email',
          error: 'Please enter an email'
        }
      },
      menu: {
        label: 'Menu',
        placeholder: 'Menu',
        error: 'Please enter menu'
      },
      buttons: {
        add: 'Add',
        cancel: 'Cancel'
      }
    },
    filter: {
      placeholder: 'Select filter',
      categories: {
        city: 'City',
        cuisine: 'Cuisine',
        rating: 'Rating',
        priceCategory: 'Price Category',
      },
      cities: {
        lviv: 'Lviv',
        kyiv: 'Kyiv',
        dnipro: 'Dnipro',
        kharkiv: 'Kharkiv',
        odesa: 'Odesa'
      },
      cuisines: {
        international: 'International',
        italian: 'Italian',
        ukrainian: 'Ukrainian',
        chinese: 'Chinese',
        mexican: 'Mexican',
        indian: 'Indian',
        american: 'American'
      }
    },
    sorter: {
      header: 'Sort by:',
      options: {
        popularity: 'popularity',
        rating: 'rating'
      }
    },
    search: {
      placeholder: 'Search...'
    },
    feedback: {
      writeReview: 'Write a review',
      modalTitle: 'Review',
      rateHeader: 'Rate your experience',
      advantagesHeader: 'Advantages',
      advantagesPlaceholder: 'Advantages',
      disadvantagesHeader: 'Disadvantages',
      disadvantagesPlaceholder: 'Disadvantages',
      commentHeader: 'Comment',
      commentPlaceholder: 'Leave your review',
      publishButton: 'Publish',
      cancelButton: 'Cancel',
      rateRequired: 'Please rate your experience',
      advantagesRequired: 'Please describe the advantages',
      disadvantagesRequired: 'Please describe the disadvantages',
      commentRequired: 'Please write a comment',
      deleteConfirmTitle: 'Delete comment',
      deleteConfirmDescription: 'Are you sure you want to delete this comment?',
      yes: 'Yes',
      no: 'No',
    },
    tableModal: {
      reserveTableButton: 'Reserve a table',
      modalTitle: 'Reserve a Table'
    },
    tableReservation: {
      modal: {
        title: 'Make Reservation',
      },
      form: {
        customerName: {
          label: 'Name',
          placeholder: 'Enter your name',
          error: 'Please enter your name'
        },
        customerPhone: {
          label: 'Phone',
          placeholder: 'Enter your phone number',
          error: 'Please enter your phone number'
        },
        reservationTime: {
          label: 'Date & Time',
          error: 'Please select date and time'
        },
        guestCount: {
          label: 'Number of Guests',
          error: 'Please enter number of guests'
        }
      },
      table: {
        capacity: 'Capacity',
        capacityPeople: 'people',
        tableNumber: 'Table',
        reservedFor: 'Reserved for'
      },
      buttons: {
        select: 'Select',
        cancelReservation: 'Cancel Reservation',
        confirmReservation: 'Confirm Reservation'
      },
      messages: {
        success: {
          created: 'Reservation created successfully',
          cancelled: 'Reservation cancelled successfully'
        },
        error: {
          fetchTables: 'Failed to fetch tables',
          createReservation: 'Failed to create reservation',
          cancelReservation: 'Failed to cancel reservation'
        }
      }
    },
    editRestaurant: {
      modalTitle: "Edit Restaurant",
      buttons: {
        update: "Update Restaurant",
        cancel: "Cancel"
      },
      success: "Restaurant updated successfully",
      errors: {
        fetchError: "Failed to load restaurant details",
        updateError: "Failed to update restaurant"
      }
    },
    analytics: {
      title: "Restaurant Analytics",
      categories: {
        general: "General Statistics",
        feedback: "Feedback Statistics",
        workHours: "Working Hours",
        reservations: "Tables & Reservations"
      },
      statistics: {
        rating: "Rating",
        totalFeedbacks: "Total Feedbacks",
        tables: "Tables",
        popularity: "Popularity",
        workingDays: "Working Days",
        totalCapacity: "Total Capacity",
        priceCategory: "Price Category",
        avgHoursDay: "Avg Hours/Day",
        hours: "hrs",
        totalReservations: "Total Reservations",
        reservationRate: "Success Rate"
      },
      charts: {
        capacityDistribution: {
          title: "Table Capacity Distribution",
          seats: "seats"
        },
        workingHours: {
          title: "Working Hours by Day",
          hours: "Working Hours"
        },
        reservationTrends: {
          title: "Monthly Reservations",
          count: "Reservations"
        },
        feedbackDistribution: {
          title: "Feedback Distribution"
        }
      },
      feedback: {
        latest: "Latest Feedbacks",
        pros: "Pros",
        cons: "Cons",
        excellent: "Excellent",
        good: "Good",
        average: "Average",
        poor: "Poor"
      },
      days: {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday"
      },
      priceCategories: {
        low: "Economy",
        medium: "Medium",
        high: "Premium"
      }
    }
  }
};