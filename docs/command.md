# Comandi Livescore

## Inizializzazione struttura e dati db
npx ts-node src/commands/initDb.ts 

## Inserimento Country da feed API

npx ts-node src/liveScoreApi/api/Federation.ts
npx ts-node src/liveScoreApi/api/Country.ts -a importAllCountries
npx ts-node src/liveScoreApi/api/Competition.ts -a importAllCompetition
npx ts-node src/liveScoreApi/api/Team.ts -a importAllTeam
npx ts-node src/liveScoreApi/api/matches/importFixtureMatch.ts
npx ts-node src/liveScoreApi/api/matches/ImportLiveMacth.ts
