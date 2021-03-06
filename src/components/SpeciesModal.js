import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { BsSuitHeart } from 'react-icons/bs'
import { BsSuitHeartFill } from 'react-icons/bs'
import { RiDeleteBinFill } from 'react-icons/ri'




function SpeciesModal(props) {
    // console.log(props.eachItem);
    return (
        <React.Fragment>
            <div className="modal fade"
                id={"modal" + props.eachItem._id}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="exampleModalLabel"
                            >
                                {props.checkWordCount(props.eachItem.officialName)}
                            </h5>
                            <button type="button"
                                className="btn-close shadow-none"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => props.clearInstructions()}
                            >
                            </button>
                        </div>
                        <div className="modal-body">
                            <img src={props.eachItem.imageUrl}
                                alt={props.eachItem.officialName}
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "1rem",
                                    height: "30%",
                                    width: "100%"
                                }}
                            />
                            <   table className="table table-borderless">
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Common Name </th>
                                        <td>{props.eachItem.commonName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Genus</th>
                                        <td>{props.eachItem.genus}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Hybrid Parents</th>
                                        {/* <td colSpan="2">{props.eachItem.hybridParents[0]} {props.eachItem.hybridParents[1]}</td> */}
                                        <td>{props.eachItem.hybridParents.length > 0 ? props.eachItem.hybridParents[0] + ', ' + props.eachItem.hybridParents[1] : "Unknown"}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Genus</th>
                                        <td>{props.eachItem.genus}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Creation/Discovery</th>
                                        {/* <td>{props.eachItem.creation.creatorName} {props.eachItem.creation.creationYear}</td> */}
                                        <td>{props.eachItem.creation.creatorName && props.eachItem.creation.creationYear ? props.eachItem.creation.creatorName + ', in ' + props.eachItem.creation.creationYear : "Unknown"}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Colours</th>
                                        <td>{props.eachItem.colours.map((c, i) => <p key={i}>{c[0].toUpperCase() + c.slice(1)}</p>)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Petal Pattern</th>
                                        <td>{(props.eachItem.petalPattern)[0].toUpperCase() + (props.eachItem.petalPattern).slice(1)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Scents</th>
                                        <td>{props.eachItem.scents.map((s, i) => <p key={i}>{s[0].toUpperCase() + s.slice(1)}</p>)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Floral Grouping</th>
                                        <td>{(props.eachItem.floralGrouping)[0].toUpperCase() + (props.eachItem.floralGrouping).slice(1)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Native Distribution:</th>
                                        <td>{props.activeDistribution}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Conservation Status:</th>
                                        <td>{props.activeConservation}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>{props.instructionMsg}</p>
                            {/* <p>{props.deleteSpeciesMsg}</p> */}
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn shadow-none"
                                data-bs-dismiss="modal"
                                onClick={
                                    () => {
                                        props.clearInstructions();
                                        props.selectEdit(props.eachItem._id);
                                        props.setActivePage('updateSpecies');
                                    }
                                }
                            >
                                <AiFillEdit size={25}/>
                            </button>
                            <button type="button"
                                className="btn shadow-none"
                                data-bs-dismiss={props.closeModal}
                                onClick={
                                    () => {
                                        props.setInstructions()
                                        props.checkApiUserFavourite(props.eachItem._id);
                                        // props.setActivePage('readUserProfile');
                                    }
                                }
                            >
                                {props.favourited === true ? <BsSuitHeartFill size={25} color='red' /> : <BsSuitHeart size={25} />}
                            </button>

                            <button type="button"
                                className="btn shadow-none"
                                data-bs-toggle="collapse"
                                data-bs-target={"#collapse" + props.eachItem._id}
                                aria-expanded="false"
                                aria-controls={"collapse" + props.eachItem._id}
                                onClick={
                                    () => {
                                        props.clearInstructions();
                                    }
                                }
                            >
                                <RiDeleteBinFill size={25}/>
                            </button>
                            {/* { this.state.confirmDelete?  */}
                            <div className="collapse" id={"collapse" + props.eachItem._id}>
                                <div className="card card-body">
                                    Are you sure you wish to delete this species from The Daily Orchid's database?
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-6 d-flex'>
                                        <button className='btn ms-auto shadow-none style-btn'
                                            data-bs-toggle="collapse"
                                            data-bs-target={"#collapse" + props.eachItem._id}
                                            aria-expanded="false"
                                            aria-controls={"collapse" + props.eachItem._id}
                                        >
                                            Go back
                                        </button>
                                    </div>
                                    <div className='col-6 d-flex'>
                                        <button className='btn me-auto shadow-none style-btn'
                                                data-bs-dismiss="modal"
                                                // data-bs-toggle="collapse"
                                                // data-bs-target={"#collapse" + props.eachItem._id}
                                                // aria-expanded="false"
                                                // aria-controls={"collapse" + props.eachItem._id}
                                        onClick={() => {props.deleteApiSpecies(props.eachItem._id)}}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div> 
                            {/* : null } */}



                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}

export default SpeciesModal