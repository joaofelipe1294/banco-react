import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class FormGroupPesquisaGenerico extends Component{

    render(){
        return(
            <div class="input-group mb-3">
                <input className="form-control" placeholder={this.props.label} aria-label={this.props.label} type = {this.props.type} aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                    <button className="btn btn-outline-info" type="button">
                        <FontAwesomeIcon icon="search"/>
                    </button>
                </div>
            </div>
        );
    }


}