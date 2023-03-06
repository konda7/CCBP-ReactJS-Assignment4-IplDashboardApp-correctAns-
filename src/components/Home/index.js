import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

class Home extends Component {
  state = {
    teamCardDetails: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const modifiedData = data.teams.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))
    // console.log(data)

    this.setState({
      teamCardDetails: modifiedData,
      isLoading: false,
    })
  }

  renderteamCards = () => {
    const {teamCardDetails} = this.state

    return (
      <ul className="teams-list-container">
        {teamCardDetails.map(eachItem => (
          <TeamCard teamCardDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoaderSpinner = () => (
    <div data-testid="loader">
      {' '}
      <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo-img"
          />
          <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
        </div>
        {isLoading ? this.renderLoaderSpinner() : this.renderteamCards()}
      </div>
    )
  }
}

export default Home
