export type CategoryType = {
    id: number
    title: string
    url: string
}

export type SubcategoryType = {
    id: number
    title: string
    url: string
    category: CategoryType
}

export type CompanyCategoryType = {
    id: number
    title: string
    url: string
}

export type ProductType = {
    id: number
    header: string
    price: number
    description: string
    subcategory: SubcategoryType
}

export type SpoilerContentType = {
    title: string | undefined | null
    content: SubcategoryType[] | undefined | null
    categoryUrl: string | undefined
}

export type UserType = {
    email: string
    phoneNumber: string
}

export type BestSellersType = {
    id: number
    product: ProductType
}

export type CartType = {
    product: ProductType
    count: number
}