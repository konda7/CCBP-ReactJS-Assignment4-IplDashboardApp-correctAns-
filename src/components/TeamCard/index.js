import './index.css'

import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {teamCardDetails} = props
  const {id, title, teamImageUrl} = teamCardDetails

  return (
    <Link to={`/team-matches/${id}`} className="team-link">
      <li className="team-card">
        <img src={teamImageUrl} alt={title} className="team-card-img" />
        <p className="team-card-name">{title}</p>
      </li>
    </Link>
  )
}

export default TeamCard
