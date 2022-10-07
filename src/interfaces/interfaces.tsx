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
    productId: number
    count: number
}

export type UrlType = {
    categoryTea: string
    categoryCoffee: string
    categoryTableware: string
    categoryAccessory: string

    subcatMonosorta: string
    subcatSmesi: string

    subcatCherniy: string
    subcatZeleniy: string
    subcatUlun: string
    subcatBeliy: string
    subcatPuer: string
    subcatTravyanie: string
    subcatKrasniy: string

    companyAbout: string
    companyOptovikam: string
    companyKontakti: string
    companyDostavka: string

    isAllUrlReady: boolean
}

export type OrderType = {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    address: string
    orderNote: string
    methodPayment: string
    productDtoList: Array<CartType>
}

export type ProductCreateRequestBodyType = {
    header: string
    price: string
    description: string
    subcategory: {id: string}
}