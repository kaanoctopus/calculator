## Kullanılan Teknolojiler ve Nedenleri

-   **React.js**: Komponent tabanlı kullanıcı arayüzü oluşturmak için.
-   **Express.js**: Backend API oluşturmak için.
-   **mathjs**: Matematiksel işlem hesaplamaları için tehlikeli olan `eval` yerine tercih edildi.
-   **Framer Motion**: Kullanıcı arayüzüne program açılırken animasyonlar eklemek için.
-   **Tailwind CSS**: Hızlı ve duyarlı stil vermek için.
-   **JWT (JSON Web Tokens)**: Kullanıcı kimlik doğrulama ve güvenlik için.
-   **Netlify Functions**: Backend fonksiyonları için serverless yapı yedek API olarak kullanıldı.
-   **AWS Lambda**: Backend fonksiyonları için serverless yapı daha hızlı olduğundan ana API olarak kullanıldı.
-   **MongoDB**: Kullanıcı verilerini tuttuğumuz veritabanı.

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

.env dosyasını backend klasörü içinde oluşturun
cluster oluşturup linkini almak için https://www.mongodb.com/ ye gidiniz

```
MONGO_URI=mongodb+srv://name:password.*
JWT_SECRET=RANDOM_SECRET_KEY
EMAIL_SERVICE=gmail
EMAIL_USERNAME=mail@gmail.com
EMAIL_PASSWORD=this has to be app password https://support.google.com/accounts/answer/185833?hl=en
EMAIL_FROM=mail@gmail.com
AUTH_KEY=[key generated with jwt]
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

-   **POST `/api/auth/register`**

    -   Kullanıcı kaydı için.
    -   **Request Body**:
        ```json
        {
            "firstName": "John",
            "lastName": "Doe",
            "email": "johndoe@example.com",
            "password": "password123"
        }
        ```
    -   **Response**:
        ```json
        {
            "message": "User registered successfully"
        }
        ```

-   **POST `/api/auth/login`**

    -   Kullanıcı giriş işlemi.
    -   **Request Body**:
        ```json
        {
            "email": "johndoe@example.com",
            "password": "password123"
        }
        ```
    -   **Response**:
        ```json
        {
            "token": "JWT_TOKEN_HERE"
        }
        ```

-   **GET `/api/auth/me`**

    -   Kullanıcının profil bilgilerini almak için (JWT gerektirir).
    -   **Response**:
        ```json
        {
            "firstName": "John",
            "lastName": "Doe",
            "email": "johndoe@example.com"
        }
        ```

-   **PUT `/api/auth/me`**

    -   Kullanıcının profilini güncellemek için. (JWT gerektirir)
    -   **Request Body**:
        ```json
        {
            "firstName": "John",
            "lastName": "Doe",
            "email": "johndoe@example.com"
        }
        ```
    -   **Response**:
        ```json
        {
            "message": "Profile updated successfully"
        }
        ```

-   **DELETE `/api/auth/me`**

    -   Kullanıcıyı silmek için. (JWT gerektirir)
    -   **Response**:
        ```json
        {
            "message": "User account deleted successfully"
        }
        ```

-   **POST `/api/auth/logout`**

    -   Kullanıcıyı çıkış yapmaya yönlendirir.

-   **POST `/api/auth/forgot-password`**

    -   Kullanıcının verdiği mail'e şifre yenileme linki gönderir.
    -   **Request Body**:
        ```json
        {
            "email": "johndoe@example.com"
        }
        ```
    -   **Response**:

        ```json
        {
            "message": "Password reset email sent"
        }
        ```

-   **POST `/api/auth/reset-password`**

    -   Parametredeki tokeni kullanarak yeni bir şifre oluşturur.
    -   **Request Body**:
        ```json
        {
            "token": "RESET_TOKEN_FROM_EMAIL",
            "newPassword": "newSecurePassword123"
        }
        ```
    -   **Response**:
        ```json
        {
            "message": "Password has been reset"
        }
        ```

### Calculator Endpoints

-   **POST `/api/calculate`**

    -   Matematiksel bir ifade alır ve sonucu döndürür.
    -   **Request Body**:
        ```json
        {
            "expression": "5+5"
        }
        ```
    -   **Response**:
        ```json
        {
            "result": 10
        }
        ```

-   **GET `/api/history`**

    -   Kullanıcının geçmiş hesaplamalarını alır (JWT gerektirir).
    -   **Response**:
        ```json
        [
            {
                "expression": "5+5",
                "result": 10,
                "timestamp": "2025-03-25T15:30:00"
            }
        ]
        ```

-   **POST `/api/history`**
    -   Yeni hesaplamayı geçmişe kaydeder.
    -   **Request Body**:
        ```json
        {
            "expression": "2*3",
            "result": 6
        }
        ```

## Araştırma Konuları

### HTTP Metodları

1. **GET** – Veri çekme
   Sunucudan veri almak için kullanılır.

```bash
curl -X GET https://api.example.com/users
```

2. **POST** – Veri oluşturma
   Sunucuya yeni veri göndermek için kullanılır.

```bash
curl -X POST https://api.example.com/users -d '{"name": "John Doe", "age": 30}' -H "Content-Type: application/json"
```

3. **PUT** – Veri güncelleme
   Var olan bir kaynağın verilerini günceller.

```bash
curl -X PUT https://api.example.com/users/1 -d '{"name": "Jane Doe", "age": 28}' -H "Content-Type: application/json"
```

4. **PATCH** – Kısmi güncelleme
   Var olan bir kaynağın sadece belirli bir kısmını günceller.

```bash
curl -X PATCH https://api.example.com/users/1 -d '{"age": 29}' -H "Content-Type: application/json"
```

5. **DELETE** – Veri silme
   Var olan bir kaynağı silmek için kullanılır.

```bash
curl -X DELETE https://api.example.com/users/1
```

# REST API Nedir?

Açılımı "Representational state transfer" dır. İnternet üzerinden iletişim için kullanılan en yaygın metottur. HTTP metodlarının kullandığı sistemdir, statelesstır her istek birbirinden bağımsız çalışır.

### Kaynak odaklı tasarım

REST API'lerinde her şeyin bir kaynak olarak kabul edilmesidir. Kaynaklar, API'nin yönettiği verileri temsil eder ve her kaynağa benzersiz bir URI ile erişilir.

### URI standartları

URI internetteki kaynakları bulmak için kullanılır. Standart olarak düzgün okunaklı olmasını söyleyebiliriz. URL nin süpersetidir.

### Stateless mimari

Her HTTP isteği, önceki isteklerden bağımsızdır. Sunucu, istemciye her istekte kimlik doğrulama gibi bilgileri göndermelidir.

### Best practice örnekleri

yüklem yerine isim kullanmak örneğin
createUser yerine user

# Authentication vs Authorization

### Authentication

Kullanıcının kim olduğunu tanıma sürecidir

### Authorization

Kullanıcının hangi kaynaklara erişebileceğini belirleme sürecidir.

### Farkları

Farklarını anlamak için bir binada kullanılan giriş kartlarını düşünebiliriz, kartın verilme işlemi Authentication işlemine benzerken,
o kartı kullanarak odalara girmek Authorization işlemi olacaktır. Kart kişinin kim olduğunu kanıtlayacaktır. Ayrıca bu kartın değiştirilmediğine emin olmak için kontroller yapılır

# JWT nedir?

Authorization için kullanılan bir yöntemdir, buradaki önemli olan nokta authorization key inin server tarafında değil
client tarafında tutuluyor olmasıdır.

### Ne işe yarar?

Kullanıcının istenilen verilere erişme hakkı olup olmadığını kontrol etmek için kullanılır.

### Neden Kullanılır?

Mikroservislerin authenticationınını birbirine bağlamak için kullanılabilir.

### Örnek

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Jwt 3 kısımdan oluşur header, payload ve signature, bunlatı base64 ile şifreleyip "." ları kullanarak 3 parçaya ayırır bu parçalar örneğin yukarıdaki token için alttaki gibi olacaktır

-   **Header**: {"alg": "HS256", "typ": "JWT"}

-   **Payload**: {"sub": "1234567890", "name": "John Doe", "iat": 1516239022}

-   **Signature**: SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
