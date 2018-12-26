import React, { Component } from 'react';
import axios from 'axios'
import SearchResults from './SearchResults'
// import { Link } from 'react-router-dom'

// Imports

export default class Search extends Component {
    constructor() {
        super()
        this.state = {
            apps: [],
            searchchar: '',
            result: false,
        }
    }

    async search() {
        let { searchchar } = this.state
        let res = await axios.get(`/user/search/${searchchar}`)
        console.log(res.data)
        this.setState({
            apps: res.data
        })
    }

    async event (){
        await this.setState({
            result: true
        })
        this.search()
    }


    render() {
        let mappedSearchResults = this.state.apps.map(apps => {
            return (
                <SearchResults
                    key={apps.app_id}
                    appLink={apps.app_link}
                    appName={apps.app_name}
                    app_description={apps.app_description}
                    current_rating={apps.current_rating}
                    iconImg={apps.iconimg}
                    img1={apps.img1}
                    tags={apps.tags}
                    />
            )
        })
        return (
            <div>
                {this.state.result?
                    <div>
                        <input type='text' value={this.state.searchchar} onChange={(e) => { this.setState({ searchchar: e.target.value }) }} />
                        <button onClick={() => this.search()}>Search</button>
                        {mappedSearchResults}
                    </div>
                    :
                    <div>
                        <input type='text' value={this.state.searchchar} onChange={(e) => { this.setState({ searchchar: e.target.value }) }} />
                        <button onClick={() => this.event()}>Search</button>
                        <h1>Trending</h1>
                        {/* {mappedSearchResults} */}
                    </div>}


            </div>
        )
    }
}