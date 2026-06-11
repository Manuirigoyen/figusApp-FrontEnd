/**
 * Represents a product entity that can be either a pack or combo
 */
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

/**
 * Data transfer object for creating a new product
 */
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

/**
 * Data transfer object for updating an existing product with all fields
 */
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

const API_URL =
  'http://localhost:3000/api/v1/stores';

/**
 * Fetches a product by its unique identifier
 * @param id - The product ID to retrieve (must be greater than 0)
 * @returns Promise resolving to the Product object
 * @throws Error if ID is invalid or product not found
 */
export const getProductById = async (
  id: number,
): Promise<Product> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID del producto debe ser mayor a 0',
    );
  }

  const response = await fetch(`${API_URL}/${id}`);

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

/**
 * Fetches all products from the store
 * @returns Promise resolving to an array of all Product objects
 * @throws Error if products cannot be retrieved
 */
export const getProducts = async (): Promise<
  Product[]
> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      'No se pudieron obtener los productos',
    );
  }

  return response.json();
};

/**
 * Creates a new product with provided metadata
 * @param data - The product data (code, name, description, pricing, stock, type, optional cover image)
 * @returns Promise resolving to the created Product object with generated ID
 * @throws Error if data is invalid, unauthorized, or creation fails
 */
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

/**
 * Updates an existing product with complete data
 * @param id - The product ID to update (must be greater than 0)
 * @param data - The complete product data to update with
 * @returns Promise resolving to the updated Product object
 * @throws Error if ID is invalid, data is invalid, unauthorized, or product not found
 */
export const updateProduct = async (
  id: number,
  data: UpdateProductDto,
): Promise<Product> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID del producto debe ser mayor a 0',
    );
  }

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

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: 'PUT',
      credentials: 'include',
      body: formData,
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

/**
 * Deletes a product by its ID
 * @param id - The product ID to delete (must be greater than 0)
 * @returns Promise that resolves when deletion is complete
 * @throws Error if ID is invalid, unauthorized, or product not found
 */
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