## Kullanılan Teknolojiler ve Nedenleri
- **React.js**: Komponent tabanlı kullanıcı arayüzü oluşturmak için.
- **Express.js**: Backend API oluşturmak için.
- **mathjs**: Matematiksel işlem hesaplamaları için tehlikeli olan `eval` yerine tercih edildi.
- **Framer Motion**: Kullanıcı arayüzüne program açılırken animasyonlar eklemek için.
- **Tailwind CSS**: Hızlı ve duyarlı stil vermek için.

## Kurulum ve Kullanım
1. Projeyi klonlayın:
```bash
git clone <repo-url>
cd calculator
```

2. Bağımlılıkları kurun:
```bash
cd calculator && npm install
cd ../backend && npm install
```

3. Projeyi başlatın:
```bash
cd backend && node index.js
cd ../calculator && npm start
```

4. Testlerin Çalıştırmak için:
```bash
cd calculator
npm test
```