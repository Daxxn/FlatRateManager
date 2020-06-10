import React, { Component } from 'react';
import JobModel from '../../Models/JobModel';

export interface SelectJobsProps {
    allJobs: JobModel[],
    selectJob: Function,
}
 
const SelectJobs: React.SFC<SelectJobsProps> = (props) => {
    return (
        <ul>
            
        </ul>
    );
}
 
export default SelectJobs;
