import React, { ChangeEvent } from 'react';

export interface JobInputProps {
  id: 'job' | 'time';
  jobId: string;
  value: string | number;
  className: string;
  handleChange: (id: 'job' | 'time', value: string | number) => void;
};

export default function JobInput(props: JobInputProps) {
  const { id, jobId, value, handleChange, className } = props;

  return (
    <input
      className={className}
      key={`${jobId}-${id}`}
      id={`${jobId}-${id}`}
      type={id === 'job' ? 'text' : 'number'}
      value={value}
      onChange={
      (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(id, e.target.value);
      }}
    />
  )
}