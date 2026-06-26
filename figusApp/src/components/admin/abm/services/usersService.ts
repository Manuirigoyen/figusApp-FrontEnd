export interface User {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  email: string;
  phone_number: string | null;
  role: 'user' | 'admin';
  profile_picture?: string | null;
}

export interface CreateUserDto {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  email: string;
  phone_number?: string;
  password: string;
  role: 'user' | 'admin';
  profile_picture?: File;
}

export interface UpdateUserDto {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  email: string;
  phone_number?: string;
  role: 'user' | 'admin';
  profile_picture?: File;
}

const API_URL = 'http://localhost:3000/api/v1/users';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado');
    }
    throw new Error('No se pudieron obtener los usuarios');
  }

  return response.json();
};

export const getUsers = async (limit: number): Promise<User[]> => {
  const users = await getAllUsers();
  return users.slice(0, limit);
};

export const getUserById = async (id: number): Promise<User> => {
  if (!id || id < 1) {
    throw new Error('El ID del usuario debe ser mayor a 0');
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado');
    }

    if (response.status === 404) {
      throw new Error('Usuario no encontrado');
    }

    throw new Error('No se pudo obtener el usuario');
  }

  return response.json();
};

export const createUser = async (data: CreateUserDto): Promise<User> => {
  const formData = new FormData();

  formData.append('first_name', data.first_name);
  formData.append('last_name', data.last_name);
  formData.append('date_of_birth', data.date_of_birth);
  formData.append('nationality', data.nationality);
  formData.append('email', data.email);
  formData.append('phone_number', data.phone_number ?? '');
  formData.append('password', data.password);
  formData.append('role', data.role);

  if (data.profile_picture) {
    formData.append('profile_picture', data.profile_picture);
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Datos inválidos para crear el usuario');
    }

    if (response.status === 401) {
      throw new Error('No autorizado');
    }

    throw new Error('No se pudo crear el usuario');
  }

  return response.json();
};

export const updateUser = async (id: number, data: UpdateUserDto): Promise<User> => {
  if (!id || id < 1) {
    throw new Error('El ID del usuario debe ser mayor a 0');
  }

  const formData = new FormData();

  formData.append('first_name', data.first_name);
  formData.append('last_name', data.last_name);
  formData.append('date_of_birth', data.date_of_birth);
  formData.append('nationality', data.nationality);
  formData.append('email', data.email);
  formData.append('phone_number', data.phone_number ?? '');
  formData.append('role', data.role);

  if (data.profile_picture) {
    formData.append('profile_picture', data.profile_picture);
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Datos inválidos para modificar el usuario');
    }

    if (response.status === 401) {
      throw new Error('No autorizado');
    }

    if (response.status === 404) {
      throw new Error('Usuario no encontrado');
    }

    throw new Error('No se pudo modificar el usuario');
  }

  return response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  if (!id || id < 1) {
    throw new Error('El ID del usuario debe ser mayor a 0');
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado');
    }

    if (response.status === 404) {
      throw new Error('Usuario no encontrado');
    }

    throw new Error('No se pudo eliminar el usuario');
  }
};