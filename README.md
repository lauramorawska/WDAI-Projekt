# WDAI-Projekt

Projekt Laury Morawskiej i Jakuba Zimy na przedmiot Wstęp do aplikacji internetowych

## Dokumentacja / co zostało zrobione

- Utworzono projekt w **React + TypeScript (Vite)** i uruchomiono środowisko developerskie.
- Dodano **routing (react-router-dom)** i nawigację (Navbar) z podstronami:
  - `/` (lista produktów)
  - `/product/:id` (szczegóły produktu)
  - `/cart` (koszyk)
  - `/orders` (historia zamówień)
  - `/orders/:id` (szczegóły zamówienia)
  - `/login` (logowanie)
  - `/register` (tworzenie użytkownika)

### Produkty

- Zaimplementowano pobieranie danych o produktach z **FakeStoreAPI**:
  - pobranie wszystkich produktów
  - pobranie pojedynczego produktu po ID
- Strona główna (`HomePage`) wyświetla produkty w siatce oraz posiada **wyszukiwarkę po nazwie**.
- Utworzono komponent `ProductCard` do prezentacji pojedynczego produktu na liście.
- Strona produktu (`ProductPage`) wyświetla szczegóły produktu oraz posiada input ilości + przycisk **Add to cart**.
- Dodano walidację ilości: przy `<= 0` wyświetlany jest komunikat błędu, a dla poprawnych wartości można swobodnie wpisywać ilość “z palca”.
- Dodano powiadomienie po kliknięciu **Add to cart** („Added to cart!”).

### Logowanie (mock) + sesja

- Zaimplementowano **mock logowanie** na podstawie zamockowanych kont (`usersMock`).
- Dodano **AuthContext** z metodami `login/logout`.
- Zaimplementowano **zachowanie sesji** użytkownika (ID użytkownika zapisywane w `localStorage`).
- Navbar wyświetla stan sesji (Login/Register gdy niezalogowany, email + Logout gdy zalogowany).

### Koszyk

- Zaimplementowano **koszyk globalny** (Context) z zapisem do **localStorage**:
  - dodawanie produktu (zwiększanie ilości jeśli już jest w koszyku)
  - usuwanie produktu
  - zmiana ilości
  - czyszczenie koszyka
  - obliczanie sumy koszyka
- Dodano wymaganie dostępu: **dodanie do koszyka jest możliwe tylko po zalogowaniu** (w przeciwnym razie przekierowanie na `/login`).

### Zamówienia

- Zaimplementowano **akceptację koszyka (checkout)**:
  - zapis zamówienia do `localStorage`
  - wyczyszczenie koszyka po akceptacji
- Zaimplementowano **historię zamówień** (`/orders`) – pobranie całej historii i wyświetlenie listy.
- Zaimplementowano **szczegóły zamówienia** (`/orders/:id`) – pobranie pojedynczego zamówienia i wyświetlenie produktów, ilości oraz sumy.
- Strony `/orders` i `/orders/:id` są **zabezpieczone** – wymagają zalogowania.
