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

    async event() {
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
                    appid={apps.app_id}
                />
            )
        })
        return (
            <div className='SearchComp'>
                {this.state.result ?
                    <div>
                        <div className='SearchBar'>
                            <input type='text' value={this.state.searchchar} onChange={(e) => { this.setState({ searchchar: e.target.value }) }} />
                            <button onClick={() => this.search()} className='SearchBar'>Search</button>
                        </div>
                        {/* <div>
                            {this.state.apps ? { mappedSearchResults } :
                                <h1> App Not Found, Try Searching Something Else</h1>}
                        </div> */}
                        {mappedSearchResults}

                    </div>
                    :
                    <div>
                        <div className='SearchBar'>
                            <input type='text' value={this.state.searchchar} onChange={(e) => { this.setState({ searchchar: e.target.value }) }} />
                            <button onClick={() => this.event()}>Search</button>
                        </div>
                        <h1>Trending</h1>
                        <h4 onClick={(e) => { this.setState({ searchchar: 'FortNite' }) }}> FortNite </h4>
                        <h4 onClick={(e) => { this.setState({ searchchar: 'MineCraft' }) }}> MineCraft </h4>
                        <h4 onClick={(e) => { this.setState({ searchchar: 'iBotta' }) }}> iBotta </h4>
                        <h4 onClick={(e) => { this.setState({ searchchar: 'Sweat' }) }}> Sweat </h4>
                        {/* {mappedSearchResults} */}
                    </div>}


            </div>
        )
    }
}