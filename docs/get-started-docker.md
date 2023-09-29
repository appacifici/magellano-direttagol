:arrow_left: [Index](index.md)

# Inizializzazione docker LAMP 

#### Tools
Installa sul tuo ambiente locale se non già installati i seguenti tools:
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [docker](https://docs.docker.com/engine/install/)
- [docker compose](https://docs.docker.com/compose/install/)

#### Preparazione ambiente
Clone questo repository con:
```bash
git clone git@github.com:MagelannoTechSolutions/docker-lemp.git `<dir>` ( se si vuole cambiare il nome )
```

dove `<dir>`è la directory in cui vuoi clonare il repository.

Attenzione :warning: : se il processo di clonazione fallisce, è probabilmente a causa delle autorizzazioni ssh, in tal caso consulta i documenti di Github e assicurati che il tuo utente github abbia accesso al repository e abbia la tua chiave ssh associata.

Passa al progetto `<dir>`(ad esempio cd docker-lemp).


Modifica il file variables.env, settando i dati del db o altre variabili necessarie da passare a wordpress

* Clonare repository del progetto da scaricare
* ```bash
    cd www/html   
    git clone git@github.com:MagelannoTechSolutions/ItalyNews.git   
    mv ItalyNews project
  ```
* Caricare se necessario i certificati ssl nel path `nginx/ssl` del al progetto docker

### Avvio ambiente
Nell'ambiente locale abbiamo bisogno di una composizione docker aggiuntiva, quindi è necessario copiare il file docker-compose.override.yml.dist in docker-compose.override.yml.

Ora torna nella directory principale di docker 
```bash
cd ../../
```

Ora esegui il pull delle immagini necessarie ( solo se si aggiungono/ immagini da utilizzare ):
```bash
docker compose pull
```

Ora esegui la build dei containers ( solo se si aggiungono/modificano le configurazioni dei container ):
```bash
docker compose build
```
Se da errore per container già esistente lanciare il seguende comando:
```bash
  docker rm -f $(docker ps -aq)
```

Avvia tutti i container containers attivi:
```bash
docker compose up -d  [togliere -d (deamon) per vedere il processo di creazione]
ES: docker compose run php  importDb wpdb project/dump/italynews-2023-03-04.sql
```


Controlla tutti i containers attivi:
```bash
docker compose ps
```

Importa il database necessario al progetto da gestire.
* I file .sql dei database che si vogliono importare devono essere presenti nella cartella `/www/html/project/dump/` del progetto 
    * Poi lanciare il comando per importare il db 
        ```bash
        docker compose run php  importDb <nomeDb> project/dump/<nomeFile>.sql
      ```

Dovresti vedere tutti i servizi docker-compose.yml e docker-compose.override.yml in esecuzione.

### Modifiche al progetto wordpress
Modificare il file .env con le variabili di ambiente

```php
  define( 'WP_CACHE', true); 
  define( 'DB_NAME', $_ENV['MYSQL_DATABASE'] );

  /** Database username */
  define( 'DB_USER', $_ENV['MYSQL_USER'] );

  /** Database password */
  define( 'DB_PASSWORD', $_ENV['MYSQL_PASSWORD'] );

  /** Database hostname */
  define( 'DB_HOST', $_ENV['MYSQL_HOST'].':'.$_ENV['MYSQL_TCP_PORT'] );

  /** Database charset to use in creating database tables. */
  define( 'DB_CHARSET', 'utf8' );

  /** The database collate type. Don't change this if in doubt. */
  define( 'DB_COLLATE', '' );<>
```

Se il progetto wp fa redirect al sito originale lanciare la query
```bash
docker compose run php  execQuery "update wp_options set option_value = 'http://192.168.1.74' where option_name in ('siteurl','home')"
```

Apri sul browser la seguente url: http://192.168.1.74

### Utilita

Per eseguire una query su mysql senza necessita di loggarsi
```bash
docker compose run php  execQuery "update wp_options set option_value = 'http://192.168.1.74' where option_name in ('siteurl','home')"
```

Per accedere alla shell del conteiner
```bash
docker compose run mysql bash
docker compose run php bash
docker compose run nginx bash
docker compose run redis bash
docker compose run elasticsearch bash

```
Per stoppare tutti i container
```bash
docker compose stop
```

Per eliminare tutti i container
```bash
 docker rm -f $(docker ps -aq) 
```