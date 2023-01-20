export const productsArray = [
  {
    id: 'price_1MS59UBylsLS2RbINsMhrmf2',
    title: 'Coffe',
    price: 4.99,
  },
  {
    id: 'price_1MS5A8BylsLS2RbIgXH2nMhr',
    title: 'Sunglasses',
    price: 29.99,
  },
  {
    id: 'price_1MS5AxBylsLS2RbIqx2HUf7C',
    title: 'Camera',
    price: 39.99,
  },
]

export function getProductData(id: string) {
  let productData = productsArray.find((product) => product.id === id)
  return productData
}

// 23 / 15:30
