import React, {useState} from 'react';
import JobModel from '../../Models/JobModel';
import '../../styles/JobSelector.css';

const filterJobsById = (currentJobs: JobModel[] | null): string[] => {
  if (currentJobs) {
    // return currentJobs.map(job => job._id);
    const jobs = currentJobs.map(job => job._id);
    // console.log(jobs);s
    return jobs;
  }
  return [];
};

export interface JobSelectorProps {
  allJobs: JobModel[] | null;
  currentJobs: JobModel[] | null;
  handleSelectedJobChange: (jobIds: string[]) => void;
}

const JobSelector = (props: JobSelectorProps): JSX.Element => {
  const { allJobs, currentJobs, handleSelectedJobChange } = props;
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const [selectedJobs, setSelectedJobs] = useState<string[]>(filterJobsById(currentJobs));

  const handleJobSelect = (id: string) => {
    // console.log(id);
    const newSelectedJobs = selectedJobs;
    if (selectedJobs.includes(id)) {
      const index = selectedJobs.findIndex(job => job === id);
      newSelectedJobs.splice(index);
    } else {
      newSelectedJobs.push(id);
    }
    setSelectedJobs(newSelectedJobs);
  }

  return (
    <div className="jsContainer">
      <div className="jsBase">
        <p>Selec Job</p>
        <button id="select-button" onClick={() => setDropOpen(!dropOpen)}>{`Current Jobs: ${currentJobs?.length}`}</button>
        <div className={`jsDropDown ${dropOpen ? 'open' : 'closed'}`}>
          {dropOpen ? (
            <ul className="jslist">
              {allJobs?.map(job => (
                <li className="jsJobItem" id={job._id} onClick={() => handleJobSelect(job._id)} key={`dd-item-${job._id}`}>
                  <div className={`jsCheckBox ${selectedJobs?.includes(job._id) ? 'jsCheckBoxChecked' : ''}`}></div>
                  {/* <input className="jsCheckBox" type="checkbox" checked></input> */}
                  {job.job}
                </li>
                ))}
              <button
                className="closeBtn"
                onClick={() => {
                  setDropOpen(false);
                  handleSelectedJobChange(selectedJobs);
                }}
              >
                Close
              </button>
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