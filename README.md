# Dochub

Dochub dokümanlar üzerinde arama yapıp, yeni dökümanlar eklemek için geliştirilen elasticsearch uygulamasının arayüz projesidir.

## NPM

Lokalde nodejs kurulduktan sonra aşağıdaki adımlarla ayağa kaldırılması gerekiyor.

### Kurulum

Öncelikle bağımlılıkları tatmin etmek için sliconf-web klasörüne girip kurulumunu yapmamız gerekiyor.

#Dikkat: proje ana dizininde olduğunuzdan emin olunuz.

```
$npm install
```

### Ayağa kaldırılması

Projeyi 3000 portunda ayağa kaldırabiliriz.

```
$npm start:js
```

Komut, eğer hiç warning yok ise aşağıdakine benzer bir çıktı döndürmeli
```
Compiled successfully!

You can now view sliconf in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.1.2:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

Eğer warning var ise şu şekilde bir çıktı alırsınız
```
Compiled with warnings.

./src/container/App.js
  Line 10:  'PrivateRoute' is defined but never used  no-unused-vars
  Line 11:  'PublicRoute' is defined but never used   no-unused-vars

Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.
```

Bu, projenin çalışmadığını göstermez. Sadece bazı eksikler olduğunu söyler.
