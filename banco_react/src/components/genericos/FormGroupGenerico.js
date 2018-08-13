import React, { Component } from 'react';

export class FormGroupGenerico extends Component{

    constructor (){
        super();
    }

    render(){
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.name}</label>
                <input className="form-control" id={this.props.id} type = {this.props.type} step = {this.props.step}/>
            </div>
        );
    }


}

FormGroupGenerico.defaultProps = { type: 'text' , step: null};
export default FormGroupGenerico;