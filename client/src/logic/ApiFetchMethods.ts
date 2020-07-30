import JobModel from '../Models/JobModel';
import VehicleModel from '../Models/VehicleModel';
// import UserModel from '../Models/UserModel';

const fetchHelper = {
  baseUrl: process.env.REACT_APP_SERVER_URL,
  urlBuilder: (endpoint: string, id?: string) => {
    let path = process.env.REACT_APP_SERVER_URL + endpoint;
    path = id ? path + `/${id}` : path;
    return path;
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

//#region GET
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

export function getVehicle(id: string): Promise<VehicleModel> {
  const { urlBuilder, methods, headers } = fetchHelper;
  return new Promise<VehicleModel>((resolve, reject) => {
    fetch(urlBuilder('vehicles', id), {
      method: methods.get,
      headers,
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  })
}

export function getJob(id: string): Promise<JobModel> {
  const { urlBuilder, methods, headers } = fetchHelper;
  return new Promise<JobModel>((resolve, reject) => {
    fetch(urlBuilder('jobs', id), {
      method: methods.get,
      headers,
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  })
}
//#endregion

//#region POST Methods
export function postBlankVehicle(): Promise<VehicleModel> {
  const { urlBuilder, methods, headers } = fetchHelper;
  return new Promise<VehicleModel>((resolve, reject) => {
    fetch(urlBuilder('vehicles/blank'), {
      method: methods.post,
      headers,
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  });
}

export function postBlankJob(): Promise<JobModel> {
  const { urlBuilder, methods, headers } = fetchHelper;
  return new Promise<JobModel>((resolve, reject) => {
    fetch(urlBuilder('jobs/blank'), {
      method: methods.post,
      headers,
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  });
}
//#endregion

//#region PATCH Methods
export function patchVehicle(vehicle: VehicleModel): Promise<VehicleModel> {
  const { urlBuilder, methods, headers } = fetchHelper;
  return new Promise<VehicleModel>((resolve, reject) => {
    fetch(urlBuilder('vehicles', vehicle._id), {
      method: methods.patch,
      headers,
      body: JSON.stringify(vehicle),
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  });
}

export function patchJob(job: JobModel): Promise<JobModel> {
  const { urlBuilder, methods, headers } = fetchHelper;
  return new Promise<JobModel>((resolve, reject) => {
    fetch(urlBuilder('jobs', job._id), {
      method: methods.patch,
      headers,
      body: JSON.stringify(job),
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  });
}
//#endregion

//#region BROKEN!!!
// export function getRequest<TModel>(
//   id: string,
//   type: 'JobModel' | 'vehicleModel'
// ): Promise<TModel> {
//   const { urlBuilder, methods, headers } = fetchHelper;
//   return new Promise<TModel>((resolve, reject) => {
//     fetch(
//       urlBuilder(
//         type === 'JobModel'
//         ? 'jobs'
//         : 'vehicles',
//         id
//       ), {
//       method: methods.get,
//       headers,
//     })
//     .then(res => res.json())
//     .then(data => resolve(data))
//     .catch(err => reject(err));
//   })
// }

// export function patchRequest<TModel>(
//   data: 
//     JobModel[] | JobModel |
//     VehicleModel[] | VehicleModel |
//     UserModel,
//   endpoint: string
// ): Promise<TModel> {
//   const { urlBuilder, methods, headers } = fetchHelper;
//   return new Promise<TModel>((resolve, reject) => {
//     fetch(urlBuilder(endpoint), {
//       method: methods.patch,
//       headers,
//       body: JSON.stringify(data)
//     })
//     .then(res => res.json())
//     .then(data => resolve(data))
//     .catch(err => reject(err));
//   });
// }

export function postRequest<TModel>(data: JobModel | VehicleModel, endpoint: string): Promise<TModel> {
  const { urlBuilder, methods, headers } = fetchHelper;
  return new Promise<TModel>((resolve, reject) => {
    fetch(urlBuilder(endpoint), {
      method: methods.post,
      headers,
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => resolve(data as TModel))
    .catch(err => reject(err));
  });
}
//#endregion
