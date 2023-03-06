import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    teamMatchDetails: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchDetails()
  }

  convertSnakeCaseToCamelCase = eachItem => ({
    umpires: eachItem.umpires,
    result: eachItem.result,
    manOfTheMatch: eachItem.man_of_the_match,
    id: eachItem.id,
    date: eachItem.date,
    venue: eachItem.venue,
    competingTeam: eachItem.competing_team,
    competingTeamLogo: eachItem.competing_team_logo,
    // use value of the key 'competing_team' for alt as `latest match ${competing_team}`
    firstInnings: eachItem.first_innings,
    secondInnings: eachItem.second_innings,
    matchStatus: eachItem.match_status,
  })

  getTeamMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const modifiedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.convertSnakeCaseToCamelCase(
        data.latest_match_details,
      ),
      recentMatches: data.recent_matches.map(eachItem =>
        this.convertSnakeCaseToCamelCase(eachItem),
      ),
    }

    this.setState({
      teamMatchDetails: modifiedData,
      isLoading: false,
    })

    console.log(data)
    console.log(modifiedData)
  }

  renderLoaderSpinner = () => (
    <div data-testid="loader">
      {' '}
      <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
    </div>
  )

  render() {
    const {teamMatchDetails, isLoading} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchDetails

    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div className={`bg-container ${id.toLowerCase()}`}>
        <img
          src={teamBannerUrl}
          alt="team banner"
          className="whole-squad-img"
        />
        {isLoading ? (
          this.renderLoaderSpinner()
        ) : (
          <div className="all-matches-details">
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="previous-matches-list">
              {recentMatches.map(eachMatch => (
                <MatchCard recentMatchDetails={eachMatch} key={eachMatch.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
