import React, { Component } from 'react';
import JobModel from '../Models/JobModel';

export interface AddJobControlProps {
    // addNewJob: Function,
    // linkJob: Function
}
 
export interface AddJobControlState {
    addNewJobBool: boolean,
    selectedJob: JobModel,
}
 
class AddJobControl extends Component<AddJobControlProps, AddJobControlState> {
    constructor(props: AddJobControlProps) {
        super(props);
        this.state = {
            addNewJobBool: false,
            selectedJob: new JobModel('', ' ', 0),
        }
        this.selectJob = this.selectJob.bind(this);
    }

    selectJob() {
        this.setState(prevState => {
            return { addNewJobBool: ! prevState.addNewJobBool };
        });
    }

    render() {
        const addJobState = this.state.addNewJobBool ? (<div><p>TEST</p></div>) : <div></div>
        return (
            <div>
                <button type="button" onClick={this.selectJob}>select Job</button>
                {addJobState}
            </div>
        );
    }
}
 
export default AddJobControl;
