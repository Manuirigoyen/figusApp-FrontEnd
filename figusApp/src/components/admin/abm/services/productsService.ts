export interface Product {
  id: number;
  product_code: string;
  name: string;
  description: string;
  price_usd: number;
  discount_usd: number;
  discount_active: number;
  stock_available: number;
  cover_image?: string | null;
  product_type: 'pack' | 'combo';
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductDto {
  product_code: string;
  name: string;
  description: string;
  price_usd: number;
  discount_usd?: number;
  stock_available: number;
  product_type: 'pack' | 'combo';
  cover_image?: File;
}

export interface UpdateProductDto {
  product_code: string;
  name: string;
  description: string;
  price_usd: number;
  discount_usd?: number;
  stock_available: number;
  product_type: 'pack' | 'combo';
  cover_image?: File;
}

const BASE_URL = import.meta.env.VITE_API_BASE;
const API_URL = `${BASE_URL}/stores`;

export const getProductById = async (
  id: number,
): Promise<Product> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID del producto debe ser mayor a 0',
    );
  }

  const response = await fetch(`${API_URL}/${id}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Producto no encontrado');
    }

    throw new Error(
      'No se pudo obtener el producto',
    );
  }

  return response.json();
};

export const getProducts = async (): Promise<
  Product[]
> => {
  const response = await fetch(API_URL, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(
      'No se pudieron obtener los productos',
    );
  }

  return response.json();
};

export const createProduct = async (
  data: CreateProductDto,
): Promise<Product> => {
  const formData = new FormData();

  formData.append(
    'product_code',
    data.product_code,
  );
  formData.append('name', data.name);
  formData.append(
    'description',
    data.description,
  );
  formData.append(
    'price_usd',
    String(data.price_usd),
  );
  formData.append(
    'discount_usd',
    String(data.discount_usd ?? 0),
  );
  formData.append(
    'stock_available',
    String(data.stock_available),
  );
  formData.append(
    'product_type',
    data.product_type,
  );

  if (data.cover_image) {
    formData.append(
      'cover_image',
      data.cover_image,
    );
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado');
    }
    if (response.status === 400) {
      throw new Error(
        'Datos inválidos para crear el producto',
      );
    }
    throw new Error(
      'No se pudo crear el producto',
    );
  }

  return response.json();
};

export const updateProduct = async (
  id: number,
  data: UpdateProductDto | FormData,
): Promise<Product> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID del producto debe ser mayor a 0',
    );
  }

  let body: FormData;

  if (data instanceof FormData) {
    body = data;
  } else {
    body = new FormData();

    body.append(
      'product_code',
      data.product_code,
    );
    body.append(
      'name',
      data.name,
    );
    body.append(
      'description',
      data.description,
    );
    body.append(
      'price_usd',
      String(data.price_usd),
    );
    body.append(
      'discount_usd',
      String(data.discount_usd ?? 0),
    );
    body.append(
      'stock_available',
      String(data.stock_available),
    );
    body.append(
      'product_type',
      data.product_type,
    );

    if (data.cover_image) {
      body.append(
        'cover_image',
        data.cover_image,
      );
    }
  }

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: 'PUT',
      credentials: 'include',
      body,
    },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado');
    }
    if (response.status === 404) {
      throw new Error(
        'Producto no encontrado',
      );
    }
    if (response.status === 400) {
      throw new Error(
        'Datos inválidos para modificar el producto',
      );
    }
    throw new Error(
      'No se pudo modificar el producto',
    );
  }

  return response.json();
};

export const deleteProduct = async (
  id: number,
): Promise<void> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID del producto debe ser mayor a 0',
    );
  }

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type':
          'application/json',
      },
    },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado');
    }
    if (response.status === 404) {
      throw new Error(
        'Producto no encontrado',
      );
    }
    throw new Error(
      'No se pudo eliminar el producto',
    );
  }
};