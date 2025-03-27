## Kullanılan Teknolojiler ve Nedenleri
- **React.js**: Komponent tabanlı kullanıcı arayüzü oluşturmak için.
- **Express.js**: Backend API oluşturmak için.
- **mathjs**: Matematiksel işlem hesaplamaları için tehlikeli olan `eval` yerine tercih edildi.
- **Framer Motion**: Kullanıcı arayüzüne program açılırken animasyonlar eklemek için.
- **Tailwind CSS**: Hızlı ve duyarlı stil vermek için.
- **JWT (JSON Web Tokens)**: Kullanıcı kimlik doğrulama ve güvenlik için.
- **Netlify Functions**: Backend fonksiyonları için serverless yapılar.

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

## API Dokümantasyonu

### Auth Endpoints

- **POST `/api/auth/register`**
  - Kullanıcı kaydı için.
  - **Request Body**:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **POST `/api/auth/login`**
  - Kullanıcı giriş işlemi.
  - **Request Body**:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "JWT_TOKEN_HERE"
    }
    ```

- **GET `/api/auth/me`**
  - Kullanıcının profil bilgilerini almak için (JWT gerektirir).
  - **Response**:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com"
    }
    ```

- **PUT `/api/auth/me`**
  - Kullanıcının profilini güncellemek için. (JWT gerektirir)
  - **Request Body**:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Profile updated successfully"
    }
    ```

- **DELETE `/api/auth/me`**
  - Kullanıcıyı silmek için. (JWT gerektirir)
  - **Response**:
    ```json
    {
      "message": "User account deleted successfully"
    }
    ```

- **POST `/api/auth/logout`**
  - Kullanıcıyı çıkış yapmaya yönlendirir.

### Calculator Endpoints

- **POST `/api/calculate`**
  - Matematiksel bir ifade alır ve sonucu döndürür.
  - **Request Body**:
    ```json
    {
      "expression": "5+5"
    }
    ```
  - **Response**:
    ```json
    {
      "result": 10
    }
    ```

- **GET `/api/history`**
  - Kullanıcının geçmiş hesaplamalarını alır (JWT gerektirir).
  - **Response**:
    ```json
    [
      {
        "expression": "5+5",
        "result": 10,
        "timestamp": "2025-03-25T15:30:00"
      }
    ]
    ```

- **POST `/api/history`**
  - Yeni hesaplamayı geçmişe kaydeder.
  - **Request Body**:
    ```json
    {
      "expression": "2*3",
      "result": 6
    }
    ```