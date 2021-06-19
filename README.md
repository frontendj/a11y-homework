Непонятные моменты для незрячего пользователя

- смутил произнесенный кусок текста 'ский', пользователь подумал, что это часть от "английский" 
-- на самом деле это пропущенный баг, там должно было быть слово Русский целиком
- пользователь очень долго находился на внутренней странице, думаю, что это главная. Для наблюдателеля это выглядело, что слово "основная" (навигация) ввело в заблуждение
- для основных блоков нужны явные заголовки, по которым можно прыгать. Пример - навигация в футере
- для наблюдателя выглядело, что переход на главную вызвал затрудения
-- что тут можно улучшить?
- раздел Музей и табуляция - почему-то вызвали перезагрузку страницы. Выглядит так, что пользователь прыгает внутрь таба и немедленно активирует первую ссылку (+ здесь еще одна опечатка в коде - все ссылки ведут на #3). Очень странное поведение всего компонента.
-- Я смог воспроизвести проблему, но природа ее пока не понятна. При включении control option (передвижение стрелками, а не табами) нажатие пробела на элементе 'Информация, tab group' активирует первую ссылку внутри, редиректит на новую страницу и начинает читать весь экран в автоматическом режиме.
Тут мне как разработчику не очено, какие клавиши использовал пользователь для перемещения по табам
- ссылка "Билеты и льготы" в футере кажется более важной, чем "Посетителям с инвалидностью". Надо ее сделать первой
- социальные сети нужно делать заголовком - было бы удобнее к ним прыгнуть (думаю то же самое про Подписку на новости)
- блок "О музее" пользователь приедставил не так, как он выглядит. Думал, что там события
- (личное наблюдение) кажется, после авторизации недостаточно ставить фокус на элемент логина. Нужно уведомлять особо об успешном логине
- поиск по сайту объявляется дважды 
-- Это перемещение по словам и я пока не очень понимаю, как с этим бороться. Возможно, одно из решений - использовать текстовый лейбл, но скрывать его с помощью aria-hidden и дублировать с помощью aria-label на поле поиска

Из личных наблюдений за слабовидящим пользователем на аналогичном проекте
- подписи title для всех иконок нужны, т.к. часто люди не понимают, что иконка означает. В этом проекте такие есть у социальных кнопок, но не у кнопки поиска или авториазции

Понятные моменты
- карусель событий. Понравилось, что все слайды объявляются, включая их номер
- раздел выставок и событий с фильтром по датам комментариев не вызвал
- авторизация вроде удобная, фокус попадает на диалог - это хорошо
-- элемент сам по себе слишком простой, потому что принимает любые значения логина и пароля. В тестовых заданиях надо просить реализовать его с проверкой после сабмита + просить тестировщика проверить пустые поля

Ощущение от главной страницы 
- это нормально для главной быть большой, но конкретно данному пользователю удобнее работать с каждым разделом на отдельной странице (вывод - видимо все нужно дублировать + давать возможность прыгнуть медленно внутрь сайта). Типичное поведение пользователя - пробежаться по ссылкам, открыть все в новом окне, и дальше исследовать кажду, закрывая ненужные
- если задумываешься, нужен ли заголовок, лучше его поставить )

