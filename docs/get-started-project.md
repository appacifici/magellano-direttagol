:arrow_left: [Index](index.md)

# Installazione Progetto Symfony in docker 

Come installare ed eseguire il progetto.

### Install

#### Preparazione
Spostati nel repository docker precedentemente installato:
```bash
cd docker-lamp-nginx
```


Se non presente crea le cartelle  `<www>` e  `<www/html>`
```bash
mkdir www
mkdir www/html
```

Poi entra nella directory html e clona il progetto
```bash
cd www/html
git clone git@bitbucket.org:alepacifici/wpSite.git
mv wpSite project
```