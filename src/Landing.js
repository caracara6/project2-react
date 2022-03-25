import axios from "axios";
import React from "react";
import ReadAllSpecies from "./components/ReadAllSpecies";
import CreateSpecies from "./components/CreateSpecies";
import UpdateSpecies from "./components/UpdateSpecies";
import ReadSingleSpecies from "./components/ReadSingleSpecies";
import ReadAllDistribution from "./components/ReadAllDistribution";
import MdSearchFilter from "./components/MdSearchFilter";
import CreateUserProfile from  "./components/CreateUserProfile";
import ReadUserProfile from "./components/ReadUserProfile";



export default class Landing extends React.Component {
    state = {
        activePage: 'main',
        showMdSearchFilter: true,
        species: [],
        distribution: []
    }

    renderPage() {
        switch (this.state.activePage) {
            case "readAllSpecies":
                return <ReadAllSpecies />
                break;
            case "createSpecies":
                return <CreateSpecies />
                break;
            case "updateSpecies":
                return <UpdateSpecies />
                break;
            case "readSingleSpecies":
                return <ReadSingleSpecies />
                break;
            case "readAllDistribution":
                return <ReadAllDistribution />
                break;
            case "createUserProfile":
                return <CreateUserProfile />
                break;
            case "readUserProfile":
                return <ReadUserProfile />
                break;
            default:
                break;
        }
    }

    setActivePage(page) {
        this.setState({
            activePage: page
        })
    }

    showMdSearchFilter() {
        return this.state.showMdSearchFilter ? <MdSearchFilter /> : null
    }


    BASE_API_URL = "https://tgc16-p2-api.herokuapp.com"

    async componentDidMount() {
        let speciesResponse = await axios.get(this.BASE_API_URL + "/orchid_species");
        let distributionResponse = await axios.get(this.BASE_API_URL + "/distribution")

        this.setState({
            species: speciesResponse.data,
            distribution: distributionResponse.data
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container border border-danger">
                    {/* MAIN NAV BAR */}
                    <ul className="nav d-flex border border-warning">
                        <li className="nav-item me-auto">
                            <a className="nav-link"
                                aria-current="page"
                            >
                                Project 2
                            </a>
                        </li>
                        <li className="nav-item">
                            <div className="dropdown">
                                <button className="btn btn-secondary" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <li>
                                        <button 
                                            className="dropdown-item" 
                                            type="button"
                                            onClick = {() => {
                                                this.setActivePage('createUserProfile');
                                                this.setState({
                                                    showMdSearchFilter: false
                                                });
                                            }}
                                            >
                                                Create Account
                                        </button> 
                                    </li>
                                    <li>
                                        <button 
                                            className="dropdown-item" 
                                            type="button"
                                            onClick = {() => {
                                                this.setActivePage('readUserProfile');
                                                this.setState({
                                                    showMdSearchFilter: false
                                                });
                                            }}
                                            >
                                                View Profile
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Search (XS-SM)</a>
                        </li>
                    </ul>
                    {/* VIEW OPTIONS */}
                    <ul className="nav nav-pills justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link"
                                aria-current="page"
                                href="#"
                                onClick={() => {
                                    this.setActivePage('readAllSpecies');
                                    this.setState({
                                        showMdSearchFilter: true
                                    });
                                }}>
                                View Species
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                                href="#"
                                onClick={() => {
                                    this.setActivePage('readAllDistribution');
                                    this.setState({
                                        showMdSearchFilter: true
                                    });
                                }}>
                                Orchid Distribution
                            </a>
                        </li>
                    </ul>
                    {/* SEACRCH AND FILTER FOR >MD */}
                    <div className="d-none d-md-block border border-primary">
                        {this.showMdSearchFilter()}
                    </div>
                    <div className="border border-success">
                        {this.renderPage()}

                    </div>
                </div>
            </React.Fragment>
        )
    }
}