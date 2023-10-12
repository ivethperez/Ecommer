type Url = string
type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[]

type TProductId = number

type TProductAttributes = {
 
}

type TProduct = {
  id: TProductId
  title: string  
  price: number
  category: {id: number,name:string,image:string}
  description: string
  images: [{}]
//   attributes: TProductAttributes
}

type TAPIAVODetailResponse = TProduct

type TAPIAvoResponse = {
  length: number
  data: TProduct[]
  error?: string
}