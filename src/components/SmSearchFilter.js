import React, { Component } from 'react'

export default class SmSearchFilter extends Component {

    //passed down from Landing
    // props: distributionOptions, conservationOptions,
    // orchidColours, updateFormField, updateCheckbox,
    // distributionFilter, conservationFilter, colourFilter

    renderDropdown(options) {
        let selectOptions = options.map(
            eachOption => <option key={eachOption._id} value={eachOption._id}>{eachOption.name}</option>
        )
        return selectOptions
    }

    
    render() {
        return (
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="xs-sm-search-filter" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Filter by: </h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">

                <label>Region:</label>
                <select className='form-select mb-3 shadow-none'
                        name="distributionFilter" 
                        value={this.props.distributionFilter} 
                        onChange={this.props.updateFormField}>
                    {this.renderDropdown(this.props.distributionSelection)}    
                </select>
                
                
                <label>Conservation Status:</label>
                <select className='form-select mb-3 shadow-none'
                        name="conservationFilter" 
                        value={this.props.conservationFilter} 
                        onChange={this.props.updateFormField}>
                    {this.renderDropdown(this.props.conservationSelection)}    
                </select>

                <label>Colours:</label>
                {this.props.orchidColours.map( eachColour => 
                    <React.Fragment key={eachColour.value}>
                        <div className="form-check mb-1">
                            <input className="form-check-input shadow-none" 
                                    type="checkbox" 
                                    value={eachColour.value}
                                    name="colourFilter"
                                    id="flexCheckDefault"
                                    onChange={this.props.updateCheckbox}
                                    checked={this.props.colourFilter.includes(eachColour.value)}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                {eachColour.display}
                            </label>
                        </div>
                    </React.Fragment>
                )}

                <label className='mt-3'>Number of facts added:</label>
                <select className='form-select mb-3 shadow-none'
                        name="factsFilter" 
                        value={this.props.factsFilter} 
                        onChange={this.props.updateFormField}
                        >
                    <option key='1' value='noFilter'>No selection</option>
                    <option key='2' value='noFacts'>None</option>
                    <option key='3' value='factsGte3'>Three or more</option>
                </select>

                <button className="btn ms-auto me-3 style-btn" 
                    id="search-addon-xs-1"
                    onClick={() => {this.props.getSearchResults();
                                    this.props.setActivePage("readAllSpecies")}}
                    data-bs-dismiss="offcanvas"
                    >
                    Apply filters
                </button>
                <button className="btn style-btn"
                      id="search-addon-xs-2"
                      onClick={() => {
                        this.props.resetFilters()
                      }}
                    >
                      Reset filters
                </button>




            </div>
        </div>
        )
    }
}
