# Comandi Livescore

## Inizializzazione struttura e dati db
npx ts-node src/commands/initDb.ts 

## Inserimento Country da feed API

npx ts-node src/commands/initDb.ts
npx ts-node src/liveScoreApi/api/Federation.ts
npx ts-node src/liveScoreApi/api/Country.ts -a importAllCountries
npx ts-node src/liveScoreApi/api/Country.ts -a setTopCountries
npx ts-node src/liveScoreApi/api/Competition.ts -a importAllCompetitionByFederation
npx ts-node src/liveScoreApi/api/Competition.ts -a importAllCompetitionByCountry
npx ts-node src/liveScoreApi/api/Competition.ts -a setTopCompetition
npx ts-node src/liveScoreApi/api/Team.ts -a importAllTeam
npx ts-node src/liveScoreApi/api/Standing.ts -a importAllStandings
npx ts-node src/liveScoreApi/api/matches/ImportFixtureMatch.ts ** 1 Volta al giorno alle 2 di notte **
npx ts-node src/liveScoreApi/api/matches/ImportLiveMacth.ts ** Ogni 1 secondo**
    