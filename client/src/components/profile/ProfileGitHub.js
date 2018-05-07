import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class ProfileGitHub extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            clientId: 'e62a6e7a90bb75be62d2',
            clientSecret: 'f4f93745274a141140d71b4251c47dbd0a7412d5',
            count: 5,
            sort: 'create: asc',
            repos: []
        }

    }

    componentDidMount() {
        const { username } = this.props;
        const { count, sort, clientId, clientSecret} = this.state;

        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data => {
                this.setState({repos: data})
            })
            .catch(err => console.log(err))
    }

    render() {

        const { repos } = this.state;

        console.log("repos", repos);

        const repoItems = repos.map(repo => (
            <div key={repo.id} className="card crad-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <Link to={repo.html_url} className="text-info" target="_blank">
                                {repo.name}
                            </Link>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div className="col-md-6">
                          <span className="badge badge-info mr-1">
                            Stars: {repo.stargazers_count}
                          </span>
                          <span className="badge badge-secondary mr-1">
                              Watchers: {repo.watchers_count}
                          </span>
                          <span className="badge badge-success">
                            Forks: {repo.forks_count}
                          </span>
                    </div>
                </div>
            </div>
        ))

        return (
            <div ref="myRef">
                <hr/>
                <h3 className="mb-4">Latest Github Repos</h3>
                    {repoItems}
            </div>
        )
    }
}

ProfileGitHub.propTypes = {
    username: PropTypes.string.isRequired
};

export default ProfileGitHub;
