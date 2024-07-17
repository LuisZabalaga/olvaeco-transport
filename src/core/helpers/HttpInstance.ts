import apiInstance from "./Interceptors";

const baseURL = process.env.REACT_APP_API_URL;
// const baseURL = 'http://127.0.0.1:8000/api/';

// LOGIN
const sendLoginData = async (dataLogin:any) => {
  const { data } = await apiInstance.post(`${baseURL}auth/login`, dataLogin);
  return data;
};

// USERS
const registerUser = async (userdata:any) => {
  const { data } = await apiInstance.post(`${baseURL}register`, userdata);
  return data;
};
const getAllUsers = async () => {
  const { data } = await apiInstance.get(`${baseURL}users`);
  return data;
};
const getUserById = async (userId:any) => {
  const { data } = await apiInstance.get(`${baseURL}users/${userId}`);
  return data;
};
const createUser = async (userdata:any) => {
  const { data } = await apiInstance.post(`${baseURL}users`, userdata);
  return data;
};
const updatedUserById = async (userdata:any, userId:any) => {
  const { data } = await apiInstance.put(`${baseURL}users/${userId}`, userdata);
  return data;
};
const deleteUserById = async (userId:any) => {
  const { data } = await apiInstance.delete(`${baseURL}users/${userId}`);
  return data;
};

// EMPLEADOS
const createEmployeeUser = async (employeeData:any) => {
  const { data } = await apiInstance.post(`${baseURL}auth/registeremployee_a`, employeeData);
  return data;
};

const getAllEmployees = async () => {
  const { data } = await apiInstance.get(`${baseURL}api/empleados`);
  return data;
};
const getEmployeeById = async (employeeId:any) => {
  const { data } = await apiInstance.get(`${baseURL}api/empleados/obtenerPorId/${employeeId}`);
  return data;
};
const createEmployee = async (employeeData:any) => {
  const { data } = await apiInstance.post(`${baseURL}api/empleados/guardar`, employeeData);
  return data;
};
const updatedEmployeeById = async (employeeData:any, userId:any) => {
  const { data } = await apiInstance.put(`${baseURL}api/empleados/actualizar/${userId}`, employeeData);
  return data;
};
const deleteEmployeeById = async (employeeId:any) => {
  const { data } = await apiInstance.delete(`${baseURL}api/empleados/eliminar/${employeeId}`);
  return data;
};

// CLIENTES
const createCustomerUser = async (customerData:any) => {
  const { data } = await apiInstance.post(`${baseURL}auth/register_a`, customerData);
  return data;
};

const getAllCustomers = async () => {
  const { data } = await apiInstance.get(`${baseURL}api/clientes`);
  return data;
};
const getCustomerById = async (customerId:any) => {
  const { data } = await apiInstance.get(`${baseURL}api/clientes/obtenerPorId/${customerId}`);
  return data;
};
const createCustomer = async (customerData:any) => {
  const { data } = await apiInstance.post(`${baseURL}api/clientes/guardar`, customerData);
  return data;
};
const updatedCustomerById = async (customerData:any, customerId:any) => {
  const { data } = await apiInstance.put(`${baseURL}api/clientes/actualizar/${customerId}`, customerData);
  return data;
};
const deleteCustomerById = async (customerId:any) => {
  const { data } = await apiInstance.delete(`${baseURL}api/clientes/eliminar/${customerId}`);
  return data;
};

// ENVIOS
// const getAllShipments = async () => {
//   const { data } = await apiInstance.get(`${baseURL}products`);
//   return data;
// };
// const getShipmentById = async (productId:any) => {
//   const { data } = await apiInstance.get(`${baseURL}products/${productId}`);
//   return data;
// };
// const createProduct = async (productData:any) => {
//   const { data } = await apiInstance.post(`${baseURL}products`, productData);
//   return data;
// };
// const updatedProductById = async (productData:any, productId:any) => {
//   const { data } = await apiInstance.put(`${baseURL}products/${productId}`, productData);
//   return data;
// };
// const deleteProductById = async (productId:any) => {
//   const { data } = await apiInstance.delete(`${baseURL}products/${productId}`);
//   return data;
// };


// PAQUETES
const getAllPackages = async () => {
  const { data } = await apiInstance.get(`${baseURL}api/paquetes`);
  return data;
};
const getPackageById = async (packageId:any) => {
  const { data } = await apiInstance.get(`${baseURL}api/paquetes/obtenerPorId/${packageId}`);
  return data;
};
const createPackage = async (packageData:any) => {
  const { data } = await apiInstance.post(`${baseURL}api/paquetes/guardar`, packageData);
  return data;
};
const updatedPackageById = async (packageData:any, packageId:any) => {
  const { data } = await apiInstance.put(`${baseURL}api/paquetes/actualizar/${packageId}`, packageData);
  return data;
};
const deletePackageById = async (packageId:any) => {
  const { data } = await apiInstance.delete(`${baseURL}api/paquetes/eliminar/${packageId}`);
  return data;
};

// TIPO DE PAQUETES
const getAllPackageTypes = async () => {
  const { data } = await apiInstance.get(`${baseURL}api/tipopaquetes`);
  return data;
};
const getPackageTypeById = async (packageTypeId:any) => {
  const { data } = await apiInstance.get(`${baseURL}api/tipopaquetes/obtenerPorId/${packageTypeId}`);
  return data;
};
const createPackageType = async (packageTypeData:any) => {
  const { data } = await apiInstance.post(`${baseURL}api/tipopaquetes/guardar`, packageTypeData);
  return data;
};
const updatedPackageTypeById = async (packageTypeData:any, packageTypeId:any) => {
  const { data } = await apiInstance.put(`${baseURL}api/tipopaquetes/actualizar/${packageTypeId}`, packageTypeData);
  return data;
};
const deletePackageTypeById = async (packageTypeId:any) => {
  const { data } = await apiInstance.delete(`${baseURL}api/tipopaquetes/eliminar/${packageTypeId}`);
  return data;
};

// ENVIOS
const getAllShipments = async () => {
  const { data } = await apiInstance.get(`${baseURL}api/envios/list`);
  return data;
};
const getAllShipmentsByCustomer = async () => {
  const { data } = await apiInstance.get(`${baseURL}api/envios/misenvios`);
  return data;
};
const getShipmentById = async (shipmentId:any) => {
  const { data } = await apiInstance.get(`${baseURL}api/envios/obtenerPorId/${shipmentId}`);
  return data;
};
const createShipment = async (shipmentData:any) => {
  const { data } = await apiInstance.post(`${baseURL}api/envios/guardar`, shipmentData);
  return data;
};
const updatedShipmentById = async (shipmentData:any, shipmentId:any) => {
  const { data } = await apiInstance.put(`${baseURL}api/envios/actualizar/${shipmentId}`, shipmentData);
  return data;
};
const deleteShipmentById = async (shipmentId:any) => {
  const { data } = await apiInstance.delete(`${baseURL}api/envios/eliminar/${shipmentId}`);
  return data;
};

// FUNCIONES DE ENVIOS
const anularShipmentById = async (shipmentId:any) => {
  const { data } = await apiInstance.put(`${baseURL}api/envios/anular/${shipmentId}`);
  return data;
};
const iniciarShipmentById = async (shipmentId:any) => {
  const { data } = await apiInstance.post(`${baseURL}api/envios/iniciarentrega/${shipmentId}`);
  return data;
};
const finalizarShipmentById = async (shipmentId:any) => {
  const { data } = await apiInstance.post(`${baseURL}api/envios/finalizarentrega/${shipmentId}`);
  return data;
};



export default {

    sendLoginData,
    registerUser,
    getAllUsers,
    getUserById,
    createUser,
    updatedUserById,
    deleteUserById,

    createEmployeeUser,
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updatedEmployeeById,
    deleteEmployeeById,

    createCustomerUser,
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updatedCustomerById,
    deleteCustomerById,	

    // getAllShipments,
    // getShipmentById,
    // createProduct,
    // updatedProductById,
    // deleteProductById,

    getAllPackages,
    getPackageById,
    createPackage,
    updatedPackageById,
    deletePackageById,

    getAllPackageTypes,
    getPackageTypeById,
    createPackageType,
    updatedPackageTypeById,
    deletePackageTypeById,

    getAllShipments,
    getAllShipmentsByCustomer,
    getShipmentById,
    createShipment,
    updatedShipmentById,
    deleteShipmentById,

    anularShipmentById,
    iniciarShipmentById,
    finalizarShipmentById,

}