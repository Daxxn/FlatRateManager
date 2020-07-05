import JobModel from '../Models/JobModel';
import VehicleModel from '../Models/VehicleModel';
import UserModel from '../Models/UserModel';

const fetchHelper = {
  baseUrl: process.env.REACT_APP_SERVER_URL,
  urlBuilder: (endpoint: string) => {
    console.log(process.env.REACT_APP_SERVER_URL + endpoint);
    return process.env.REACT_APP_SERVER_URL + endpoint;
  },
  methods: {
    get: 'GET',
    post: 'POST',
    patch: 'PATCH',
    delete: 'DELETE',
  },
  headers: {
    'Content-Type': 'application/json',
  }
}

export async function getVehicles(): Promise<VehicleModel[]> {
  const { urlBuilder, methods, headers } = fetchHelper;
  const response = await fetch(urlBuilder('vehicles'), {
    method: methods.get,
    headers
  });
  const data = (await response.json()) as VehicleModel[];
  console.log('in getVehicles');
  return data;
}

export function getJobs(): Promise<JobModel[]> {
  const { urlBuilder, methods, headers } = fetchHelper;
  return new Promise<JobModel[]>((resolve, reject) => {
    fetch(urlBuilder('jobs'), {
      method: methods.get,
      headers
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  })
}