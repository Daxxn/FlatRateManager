import React, {useState} from 'react';
import JobModel from '../../Models/JobModel';
import '../../styles/JobSelector.css';

export interface JobSelectorProps {
  allJobs: JobModel[] | null;
}

const JobSelector = (props: JobSelectorProps): JSX.Element => {
  const { allJobs } = props;
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const [select, setSelect] = useState<JobModel | null>(null);

  return (
    <div className="jsContainer">
      <div className="jsBase">
        <p>Selec Job</p>
        <button id="select-button" onClick={() => setDropOpen(!dropOpen)}>{select ? select.job : 'none'}</button>
        <div className={`jsDropDown ${dropOpen ? 'open' : 'closed'}`}>
          {dropOpen ? (
            <ul>
              {allJobs?.map(job => (
                <li key={`dd-item-${job._id}`}>{job.job}</li>
              ))}
            </ul>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
};

export default JobSelector;