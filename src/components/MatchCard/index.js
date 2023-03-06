import './index.css'

const MatchCard = props => {
  const {recentMatchDetails} = props
  const {
    competingTeam,
    result,
    competingTeamLogo,
    matchStatus,
  } = recentMatchDetails

  const winOrLostClassName = matchStatus.toLowerCase()

  return (
    <li className="match-item-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-card-img"
      />
      <p className="match-card-team-name">{competingTeam}</p>
      <p className="match-card-result">{result}</p>
      <p className={winOrLostClassName}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
