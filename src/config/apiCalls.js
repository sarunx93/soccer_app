const thisSeason = new Date().getFullYear() - 1;

export const teamList = (season, league) =>
  `https://api-football-beta.p.rapidapi.com/teams?league=${league}&season=${season}`;
