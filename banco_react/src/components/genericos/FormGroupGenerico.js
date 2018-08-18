import React, { Component } from 'react';

export class FormGroupGenerico extends Component{

    render(){
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input 
                    className = "form-control" 
                    id = {this.props.id} 
                    type = {this.props.type} 
                    step = {this.props.step} 
                    value = {this.props.value} 
                    onChange = {this.props.onChange} 
                    required = {this.props.required}
                    />
            </div>
        );
    }


}

FormGroupGenerico.defaultProps = { type: 'text' , step: null};
export default FormGroupGenerico;