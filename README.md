## Kullanılan Teknolojiler ve Nedenleri
- **React.js**: Komponent tabanlı kullanıcı arayüzü oluşturmak için.
- **Express.js**: Backend API oluşturmak için.
- **mathjs**: Matematiksel işlem hesaplamaları için tehlikeli olan `eval` yerine tercih edildi.
- **Framer Motion**: Kullanıcı arayüzüne program açılırken animasyonlar eklemek için.
- **Tailwind CSS**: Hızlı ve duyarlı stil vermek için.

## Kurulum ve Kullanım
Projeyi klonlayın
```bash
git clone https://github.com/kaanoctopus/calculator
cd calculator
```

Bağımlılıkları kurun
```bash
cd calculator && npm install
cd ../backend && npm install
```

Projeyi başlatın
```bash
cd backend && node index.js
cd ../calculator && npm start
```

Testlerin Çalıştırmak için:
```bash
cd calculator
npm test
```