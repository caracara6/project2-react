import React, { Component } from 'react';
import axios from 'axios';
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBinFill } from 'react-icons/ri'
import { TiTick } from 'react-icons/ti'
import { MdCancel } from 'react-icons/md'

export default class FactsModal extends Component {

    state = {
        action: "readingFacts",
        facts: this.props.eachItem.facts,
        newFact: "",
        factIdBeingEdited: "",
        factToChange: {}

    }

    updateFormField = (evt) => {
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }

    BASE_API_URL = "https://tgc16-p2-api.herokuapp.com"

    apiFactsPost = async () => { 
        await axios.post(this.BASE_API_URL + '/orchid_species/' + this.props.eachItem._id + '/facts',{
            fact: this.state.newFact
        })
        this.setState({
            newFact: ""
        })

        return this.refreshFacts();
    }

    apiFactsPut = async() => {
        await axios.put(this.BASE_API_URL + '/orchid_species/' + this.props.eachItem._id + '/facts/' + this.state.factIdBeingEdited,{
            fact: this.state.factToChange
        })
        this.setState({
            factToChange: "",
            factIdBeingEdited: ""
        })
        return this.refreshFacts();
    }

    apiFactsDelete = async(factIdToDelete) => {
        await axios.delete(this.BASE_API_URL + '/orchid_species/' + this.props.eachItem._id + '/facts/' + factIdToDelete)
        return this.refreshFacts();
    }

    refreshFacts = async () => {
            let factsResponse = await axios.get(this.BASE_API_URL + '/orchid_species/' + this.props.eachItem._id + '/facts')
            this.setState({
                facts: factsResponse.data.facts,
                action: "readingFacts"
            })
    }

    renderTextbox() {
            return (
            <React.Fragment>
                <textarea className="form-control" 
                        type="text" 
                        row='3'
                        placeholder="New fact"
                        value={this.state.newFact}
                        name="newFact"
                        onChange={this.updateFormField}
                    >
                </textarea>
                
                <div className='d-flex'>
                    <button className='btn style-btn mt-3 shadow-none ms-auto me-2'
                            onClick={() => this.setState({action: "readingFacts"})}>
                        Back
                    </button>
                    <button onClick={() => this.apiFactsPost()}
                            className="btn style-btn mt-3 shadow-none me-auto"
                    >
                        Add to collection
                    </button>
                </div>
            </React.Fragment>
            )
    }

    editFact = (factIdBeingEdited) => {
        let factBeingEdited = this.state.facts.find( fact => fact._id === factIdBeingEdited)
        this.setState({
            factIdBeingEdited: factIdBeingEdited,
            factToChange: factBeingEdited.fact
        })
    }

    renderUpdateFact = (f) => {
        return <React.Fragment key={f._id}>
            <div className='row '>
                <div className='col-9'>
                    <input className="form-control" 
                            type="text" 
                            row='3'
                            value={this.state.factToChange}
                            name='factToChange'
                            onChange={this.updateFormField}
                    />
                </div>
                <div className='col-1'>
                    <button className='btn shadow-none'
                            onClick={this.apiFactsPut}>
                        <TiTick/>
                    </button>
                </div>
                <div className='col-1'>
                    <button className='btn shadow-none'
                            onClick={() => {this.setState({
                                factIdBeingEdited: "",
                                factToChange: ""
                            })}}
                    >
                        <MdCancel/>
                    </button>
                </div>
            </div>
        </React.Fragment>
    }

    renderReadFacts = (f) => {
        return <React.Fragment key={f._id}>
            <div className='row'>
                <div className='col-9'>
                    <li className="list-group-item">{f.fact}</li>
                    <div className="collapse" id={'collapseExample' + f._id}>
                        <div className="card card-body">
                            Are you sure you wish to delete the above fact?
                        </div>
                        <div className='row my-2'>
                            <div className='col-6 d-flex'>
                                <button className='btn style-btn ms-auto shadow-none '
                                        onClick={() => {this.apiFactsDelete(f._id)}}
                                >
                                    Delete
                                </button>
                            </div>
                            <div className='col-6 d-flex'>
                                <button className='btn style-btn me-auto shadow-none '
                                        data-bs-toggle="collapse" 
                                        data-bs-target={"#collapseExample" + f._id} 
                                        aria-expanded="false" 
                                        aria-controls="collapseExample"
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='col-1'>
                    <button className='btn shadow-none '
                            onClick={() => {this.editFact(f._id)}}
                            >
                        <AiFillEdit  />
                    </button>
                </div>
                <div className='col-1'>
                    <button className='btn shadow-none '
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target={"#collapseExample" + f._id} 
                            aria-expanded="false" 
                            aria-controls="collapseExample"
                            
                            >
                        <RiDeleteBinFill />
                    </button>
                </div>
            </div>
        </React.Fragment>
    }

    renderFacts() {
        let factsJSXs = [];
        if(this.state.facts.length !== 0){
            this.state.facts.map(
                f => {
                    if(this.state.factIdBeingEdited !== f._id) {
                        return <ul className="list-group">
                            {factsJSXs.push(this.renderReadFacts(f))}
                        </ul>
                    } else {
                                factsJSXs.push(this.renderUpdateFact(f))
                    }
                }
            )
        }
        return factsJSXs
    }

    renderContent() {
        if(this.state.action === 'addingNewFact'){
            return this.renderTextbox();
        } else if(this.state.action === 'readingFacts'){
            return this.renderFacts();
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="modal fade"
                    id={"modal-facts" + this.props.eachItem._id}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    {this.props.eachItem.officialName}
                                </h5>
                                <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className = 'row'>
                                    <div className='col col-md-8 mx-auto'>
                                    {this.renderContent()}
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" 
                                        className="btn style-btn shadow-none"
                                        onClick={() => {
                                            this.setState({
                                                action: 'addingNewFact'
                                            })
                                        }}
                                >
                                    Add new fact
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

