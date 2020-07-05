import React, { ChangeEvent } from 'react';

const makeStyles = (id: string) => {
  let location = '';
  if (id === 'job') {
    location = '1';
  } else {
    location = '2';
  }
  return {
    gridColum: location,
    gridRow: '1',
    backgroundColor: '#b5dcff',
  };
}

export interface JobInputProps {
  id: 'job' | 'time';
  jobId: string;
  value: string | number;
  handleChange: (id: 'job' | 'time', value: string | number) => void;
};

export default function JobInput(props: JobInputProps) {
  const { id, jobId, value, handleChange } = props;
  const styles = makeStyles(id);
  return (
    <div>
      <p>{`${id}:`}</p>
      <input
        key={`${jobId}-${id}`}
        style={styles}
        id={`${jobId}-${id}`}
        type={id === 'job' ? 'text' : 'number'}
        value={value}
        onChange={
        (e: ChangeEvent<HTMLInputElement>) => {
          handleChange(id, e.target.value);
        }}
      />
    </div>
  )
}