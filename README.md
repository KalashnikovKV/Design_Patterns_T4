# Task Manager

Интерактивное приложение для управления задачами, демонстрирующее использование паттернов проектирования.

## Использованные паттерны

### 1. Observer

Паттерн Observer используется для обновления пользовательского интерфейса при изменении состояния задач. Это позволяет:

- Отделить логику обновления UI от бизнес-логики
- Обеспечить автоматическое обновление всех компонентов при изменении данных
- Упростить добавление новых типов наблюдателей

### 2. Command

Паттерн Command реализован для операций с задачами (создание, удаление, изменение состояния). Преимущества:

- Возможность отмены операций (undo)
- Инкапсуляция операций в отдельные объекты
- Возможность создания макросов из последовательности команд

### 3. Factory Method

Паттерн Factory Method используется для создания различных типов задач (обычные, срочные, важные). Это позволяет:

- Инкапсулировать логику создания объектов
- Легко добавлять новые типы задач
- Упростить тестирование и поддержку кода

### 4. State

Паттерн State реализован для управления состоянием задач (новая, в процессе, завершенная). Преимущества:

- Инкапсуляция логики изменения состояний
- Упрощение добавления новых состояний
- Улучшение читаемости кода

### 5. Singleton

Паттерн Singleton применен к классу TaskManager для обеспечения единственного экземпляра менеджера задач. Это позволяет:

- Централизовать управление задачами
- Обеспечить глобальный доступ к менеджеру
- Контролировать создание экземпляров

## Функциональность

- Создание новых задач
- Изменение состояния задач
- Удаление задач
- Фильтрация задач по состоянию
- Отмена последнего действия
- Поддержка различных типов задач (обычные, срочные, важные)
