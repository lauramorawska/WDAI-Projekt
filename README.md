# WDAI-Projekt

Projekt Laury Morawskiej i Jakuba Zimy na przedmiot Wstęp do aplikacji internetowych

## Dokumentacja

- Utworzono projekt w **React + TypeScript (Vite)** i uruchomiono środowisko developerskie.
- Dodano **routing (react-router-dom)** i podstawową nawigację (Navbar) z podstronami:
  - `/` (lista produktów)
  - `/product/:id` (szczegóły produktu)
  - `/cart` (koszyk)
  - `/login`, `/orders` (na razie proste widoki / przygotowane trasy)
- Zaimplementowano pobieranie danych o produktach z **FakeStoreAPI**:
  - lista wszystkich produktów
  - pobieranie produktu po ID
- Strona główna (`HomePage`) wyświetla produkty w siatce oraz posiada **wyszukiwarkę po nazwie**.
- Utworzono komponent `ProductCard` do prezentacji pojedynczego produktu na liście.
- Strona produktu (`ProductPage`) wyświetla szczegóły produktu oraz umożliwia wybór ilości i **dodanie do koszyka**.
- Zaimplementowano **koszyk globalny** (Context) z zapisem do **localStorage**:
  - dodawanie produktu (zwiększanie ilości jeśli już jest w koszyku)
  - usuwanie produktu
  - zmiana ilości
  - czyszczenie koszyka
  - obliczanie sumy koszyka
- Dodano proste powiadomienie po kliknięciu **Add to cart** („Added to cart!”).
