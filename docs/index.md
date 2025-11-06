# CSC

## Opiskelijaprojektin luominen

Kirjaudu HAKA-tunnistautumisen kautta opiskelijatunnuksilla:

https://my.csc.fi/welcome

![alt text](image-4.png)

Luo uusi projekti
![alt text](image-5.png)

Valitse Course:
![alt text](image-6.png)

Täytä tiedot:
![alt text](image-7.png)

Valitse Servicet, cPouta = VPS ja Rahti = OKD Kubernetes klusteri
![alt text](image-8.png)


![alt text](image-9.png)

Perehdy käyttöehtoihin ja hyväksy ne, opiskelijaprojektissa EI saa käsitellä tai kerätä henkilötietoja!
![alt text](image-10.png)

Valmista!
![alt text](image-11.png)

## cPouta

Docs: https://research.csc.fi/service/cpouta-community-cloud-service/

Getting Started: https://docs.csc.fi/cloud/pouta/getting-started/

SSH: https://docs.csc.fi/cloud/pouta/connecting-to-vm/


Kirjaudu cPoudan paneeliin:
![alt text](image-12.png)

Ennen instanssin luomista täytyy tehdä SSH avaimet!

![alt text](image-13.png)

![alt text](image-14.png)

Huom! avain (.pem tiedosto) latautuu heti luonnin jälkeen automaattisesti!

![alt text](image-15.png)

Sitten luodaan uusi virtuaalikoneen instanssi:

![alt text](image-16.png)

Täydennä omilla tiedoilla:

![alt text](image-17.png)

![alt text](image-18.png)

Lisää distro:
![alt text](image-22.png)

![alt text](image-19.png)
![alt text](image-20.png)

Valitse luotu SSH avain `fullstack` tässä esimerkissä pienestä nuolesta nostamalla se aktiiviseksi. Lisää adminille salasana, tätä ei todennäköisesti tarvita mutta lisätään varalta toistaiseksi.
![alt text](image-21.png)

### Launch Instance

Pitäisi näkyä Instances listauksessa tällä tavoin:

![alt text](image-23.png)


Seuraavaksi allokoidaan IP-osoite:

![alt text](image-24.png)

Kun Floating IP on luotu, klikkaa `associate` ja kytke luotu IP-osoite luomaasi instanssiin:

![alt text](image-25.png)

![alt text](image-26.png)


PowerShell SSH-clientin käyttö Windowsilla ja .pem tiedoston lisääminen ja salaaminen salasanalla:

``` ps1
PS C:\Users\<your_user>\Downloads> ls *.pem


    Directory: C:\Users\<your_user>\Downloads


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         4.11.2025     15.25           1679 fullstack.pem


PS C:\Users\<your_user>\Downloads> mkdir ~/.ssh
    Directory: C:\Users\<your_user>
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         4.11.2025     15.46                .ssh

PS C:\Users\<your_user>\Downloads> mv fullstack.pem ~/.ssh/
PS C:\Users\<your_user>\Downloads> cd ~/.ssh
PS C:\Users\<your_user>\.ssh> ls

    Directory: C:\Users\<your_user>\.ssh

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         4.11.2025     15.25           1679 fullstack.pem

PS C:\Users\<your_user>\.ssh> ssh-keygen.exe -p -f .\fullstack.pem
Enter new passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved with the new passphrase.


PS C:\Users\<your_user>\.ssh> ssh -i .\fullstack.pem ubuntu@86.50.21.125
The authenticity of host '86.50.21.125 (86.50.21.125)' can't be established.
ED25519 key fingerprint is SHA256:GstyXiM5e60V4wD8mSbzz3LqH7Ebsi0vKhGLkvWL8LQ.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes

Warning: Permanently added '86.50.21.125' (ED25519) to the list of known hosts.
Enter passphrase for key '.\fullstack.pem':
Welcome to Ubuntu 24.04.3 LTS (GNU/Linux 6.8.0-86-generic x86_64)

```

SSH kirjautuminen onnistunut käyttäen powershellin sisäänrakennettua ssh-clientia:

![alt text](image-28.png)



